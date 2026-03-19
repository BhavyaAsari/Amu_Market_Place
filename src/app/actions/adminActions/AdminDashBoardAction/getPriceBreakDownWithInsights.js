"use server";

import Product from "@/models/Product";
import { connectDB } from "@/libs/db";

export async function getPriceBreakDown() {
  await connectDB();

  try {
    //  1. Get min & max
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: "$price" },
          max: { $max: "$price" },
        },
      },
    ]);

    const minPrice = stats[0]?.min || 0;
    const maxPrice = stats[0]?.max || 0;

    //  2. Config
    const BUCKET_COUNT = 6;

    const round = (num) => Math.round(num / 10000) * 10000;

    const normalizeStep = (step) => {
      if (step <= 10000) return 5000;
      if (step <= 20000) return 10000;
      if (step <= 50000) return 20000;
      if (step <= 100000) return 50000;
      return 100000;
    };

    const rawStep = (maxPrice - minPrice) / BUCKET_COUNT;
    const step = normalizeStep(rawStep);

    //  3. Generate boundaries (CORRECT)
    const boundaries = [];

    for (let i = 0; i <= BUCKET_COUNT; i++) {
      boundaries.push(round(minPrice + step * i));
    }

    // Ensure last boundary covers max
    if (boundaries[boundaries.length - 1] < maxPrice) {
      boundaries[boundaries.length - 1] = round(maxPrice + step);
    }

    //  4. Create buckets
    const buckets = [];

    for (let i = 0; i < BUCKET_COUNT; i++) {
      buckets.push({
        name: `${boundaries[i] / 1000}k - ${
          boundaries[i + 1] / 1000
        }k`,
        min: boundaries[i],
        max: boundaries[i + 1],
        count: 0,
        revenue: 0,
      });
    }

    //  5. Fetch products
    const products = await Product.find(
      {},
      { price: 1, soldCount: 1 }
    );

    //  6. Fill buckets
    products.forEach((p) => {
      const price = p.price;
      const revenue = price * (p.soldCount || 0);

      const bucket = buckets.find(
        (b) =>
          price >= b.min &&
          (price < b.max || b === buckets[buckets.length - 1])
      );

      if (bucket) {
        bucket.count++;
        bucket.revenue += revenue;
      }
    });

    //  7. Chart Data
    const ChartAnalytics = buckets.map((b) => ({
      name: b.name,
      value: b.count,
    }));

    //  8. Insights
    const sortedByCount = [...buckets].sort(
      (a, b) => b.count - a.count
    );

    const sortedByRevenue = [...buckets].sort(
      (a, b) => b.revenue - a.revenue
    );

    const mostProducts = sortedByCount[0];
    const leastProducts = sortedByCount[sortedByCount.length - 1];
    const highestRevenue = sortedByRevenue[0];

    const totalRevenue = buckets.reduce(
      (sum, b) => sum + b.revenue,
      0
    );

    const revenueShare =
      (highestRevenue.revenue / totalRevenue) * 100;

    const inSights = {
      productStrategy: {
        case: `${leastProducts.name} has the lowest product count`,
        inSight: "Gap in this segment",
        action: `Add more products in ${leastProducts.name}`,
      },

      revenue: {
        case: `${highestRevenue.name} contributes ${revenueShare.toFixed(
          1
        )}% of total revenue`,
        inSight: "This segment drives profit",
        action: "Focus marketing and inventory in this segment",
      },
    };

    return {
      ChartAnalytics,
      inSights,
    };
  } catch (error) {
    console.error("Error fetching price breakdown:", error);
  }
}
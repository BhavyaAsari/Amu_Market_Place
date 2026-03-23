"use server";

import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";

export async function getRevenueData(range = "monthly") {
  await connectDB();

  function formatMillion(value) {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + "M";
    }
    return value.toLocaleString("en-IN"); //  better fallback
  }

  const now = new Date();

  let startDate = null;
  let endDate = null;

  //  DATE RANGES
  if (range === "weekly") {
    endDate = new Date();
    endDate.setDate(now.getDate() - 1);
    endDate.setHours(23, 59, 59, 999);

    startDate = new Date();
    startDate.setDate(now.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);
  }

  if (range === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    startDate.setHours(0, 0, 0, 0);

    endDate = now;
  }

  //  FETCH ORDERS
  let orders;

  if (range === "weekly" || range === "monthly") {
    orders = await Orders.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  } else {
    orders = await Orders.find();
  }

  const revenueMap = {};
  let totalRevenue = 0;

  //  PREFILL

  // Weekly (last 7 days till yesterday)
  if (range === "weekly") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - 1 - i);

      const key = d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric", //  prevents duplicate labels
      });

      revenueMap[key] = 0;
    }
  }

  // Monthly (1 → today)
  if (range === "monthly") {
    const today = now.getDate();

    for (let i = 1; i <= today; i++) {
      revenueMap[i.toString()] = 0;
    }
  }

  //  PROCESS ORDERS
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    let key = "";

    if (range === "weekly") {
      key = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      });
    } else if (range === "monthly") {
      key = date.getDate().toString();
    } else if (range === "yearly") {
      key = date.getFullYear().toString();
    }

    if (!revenueMap[key]) {
      revenueMap[key] = 0;
    }

    const value = Number(order.total) || 0;

    revenueMap[key] += value;
    totalRevenue += value;
  });

  //  FORMAT DATA
  let data = Object.entries(revenueMap).map(([label, revenue]) => ({
    label,
    revenue: Number(revenue.toFixed(2)),
  }));

  //  SORTING

  if (range === "weekly") {
    data.sort((a, b) => {
      return new Date(a.label) - new Date(b.label);
    });
  }

  if (range === "monthly") {
    data.sort((a, b) => Number(a.label) - Number(b.label));
  }

  if (range === "yearly") {
    data.sort((a, b) => Number(a.label) - Number(b.label));
  }

  //  STATS
  const latest = data[data.length - 1]?.revenue || 0;
  const previous = data[data.length - 2]?.revenue || 0;

  let statChange = 0;

  if (previous === 0 && latest > 0) {
    statChange = 100;
  } else if (previous !== 0) {
    statChange = ((latest - previous) / previous) * 100;
  }

  return {
    title: "Revenue Over Time",
    subtitle: `${range} revenue analytics`,
    statValue: formatMillion(latest),
    statChange: statChange.toFixed(2),
    totalValue: formatMillion(totalRevenue),
    totalLabel: "Total Revenue",
    data,
    dataKey: "revenue",
    unit: "₹", //  fixed for India
  };
}
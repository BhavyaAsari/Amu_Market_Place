"use server";

import User from "@/models/Users";
import Product from "@/models/Product";
import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";

export async function getProductStats() {
  await connectDB();

  function formatMillion(value) {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + "M";
    }
    return value.toLocaleString("en-IN");
  }

  try {
    const [ordersCount, usersCount, productsCount, revenueResult] =
      await Promise.all([
        Orders.countDocuments(),
        User.countDocuments(),
        Product.countDocuments(),
        Orders.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$total" },
            },
          },
        ]),
      ]);

    const revenue = Number(revenueResult[0]?.totalRevenue) || 0;

    return {
      orders: ordersCount,
      users: usersCount,
      products: productsCount,
      revenue: formatMillion(revenue),
      currency: "₹",
    };
  } catch (error) {
    console.error("Dashboard Error", error);

    return {
      orders: 0,
      users: 0,
      products: 0,
      revenue: 0,
      currency: "₹",
    };
  }
}
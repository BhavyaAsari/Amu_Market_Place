"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";

export async function getCustomersScatterData() {
  await connectDB();

  try {
    // 🔹 Step 1: Aggregate user data
    const usersData = await Orders.aggregate([
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$total" },
          totalItems: {
            $sum: {
              $reduce: {
                input: "$items",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.quantity"] },
              },
            },
          },
        },
      },
    ]);

    if (!usersData.length) return { success: true, data: [] };

    // 🔹 Step 2: Median-based classification (outlier-resistant)
    const mid = Math.floor(usersData.length / 2);

    const medianSpent = [...usersData]
      .sort((a, b) => a.totalSpent - b.totalSpent)[mid].totalSpent;

    const medianOrders = [...usersData]
      .sort((a, b) => a.totalOrders - b.totalOrders)[mid].totalOrders;

    // 🔹 Step 3: Classify users using median thresholds
    const finalData = usersData.map((user) => {
      let category = "low";

      if (
        user.totalOrders > medianOrders &&
        user.totalSpent > medianSpent
      ) {
        category = "high";
      } else if (
        user.totalSpent > medianSpent * 0.5 ||
        user.totalOrders > medianOrders * 0.5
      ) {
        category = "medium";
      }

      return {
        userId: user._id.toString(),
        totalOrders: user.totalOrders,
        totalSpent: user.totalSpent,
        totalItems: user.totalItems,
        category,
      };
    });

    return { success: true, data: finalData };

  } catch (error) {
    console.error("Scatter Data Error:", error);
    return {
      success: false,
      error: "Failed to fetch Customer Scatter data",
    };
  }
}
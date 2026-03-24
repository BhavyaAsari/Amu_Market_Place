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

    // 🔹 Step 2: Calculate averages
    const totalUsers = usersData.length;

    const avgOrders =
      usersData.reduce((sum, u) => sum + u.totalOrders, 0) / totalUsers;

    const avgSpent =
      usersData.reduce((sum, u) => sum + u.totalSpent, 0) / totalUsers;

    // 🔹 Step 3: Classify users dynamically
    const finalData = usersData.map((user) => {
      let category = "low";

      if (
        user.totalOrders > avgOrders &&
        user.totalSpent > avgSpent
      ) {
        category = "high";
      } else if (
        user.totalSpent > avgSpent * 0.5
      ) {
        category = "medium";
      }

      return {
        userId: user._id.toString(),
        totalOrders: user.totalOrders,
        totalSpent: user.totalSpent,
        totalItems: user.totalItems,
        category, // 🔥 important
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
"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";

export async function getRegionOrderAnalytics({ country, state } = {}) {
  await connectDB();

  try {
    let match = {
      OrderStatus: { $ne: "cancelled" },
        total: { $gt: 100 }, // Only consider orders with total greater than 100

      // Filter out gibberish — real place names only have letters, spaces, hyphens, dots
      "shippingAddress.country": {
        $regex: "^[a-zA-Z\\s\\-\\.]{2,}$",
      },
    };

    if (country) {
      match["shippingAddress.country"] = {
        $regex: `^${country}$`,
        $options: "i",
      };
    }

    if (state) {
      match["shippingAddress.state"] = {
        $regex: `^${state}$`,
        $options: "i",
        // Also validate the state field itself
        $and: [{ $regex: "^[a-zA-Z\\s\\-\\.]{2,}$" }],
      };
    }

    const groupField = state
      ? "$shippingAddress.city"
      : country
      ? "$shippingAddress.state"
      : "$shippingAddress.country";

    const data = await Orders.aggregate([
      { $match: match },

      // Normalize to lowercase before grouping — fixes "India" vs "india" duplicates
      {
        $addFields: {
          regionKey: { $toLower: groupField },
          displayName: groupField,
        },
      },

      {
        $group: {
          _id: "$regionKey",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
          displayName: { $first: "$displayName" },
        },
      },

      {
        $project: {
          region: {
            $concat: [
              { $toUpper: { $substrCP: ["$displayName", 0, 1] } },
              {
                $substrCP: [
                  "$displayName",
                  1,
                  { $strLenCP: "$displayName" },
                ],
              },
            ],
          },
          orders: "$totalOrders",
          revenue: "$totalRevenue",
          _id: 0,
        },
      },

      { $sort: { orders: -1 } },
      { $limit: 5 },
    ]);

    return { success: true, data };
  } catch (error) {
    console.error("Region Analytics error:", error);
    return { success: false, data: [] };
  }
}
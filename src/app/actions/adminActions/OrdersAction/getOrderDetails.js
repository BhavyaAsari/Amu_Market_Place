"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { unstable_cache } from "next/cache";

async function getCachedOrder({
  page = 1,
  limit = 10,
  status,
  search,
  paymentStatus,
}) {
  await connectDB();

  const skip = (page - 1) * limit;
  let query = {};

  if (status) query.orderStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { "shippingAddress.phone": { $regex: search, $options: "i" } },
    ];
  }

  const [orders, total] = await Promise.all([
    Orders.find(query)
      .select(
        "orderNumber total orderStatus paymentStatus paymentMethod createdAt user shippingAddress items",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username email")
      .lean(), //  returns plain JS objects, not Mongoose docs

    Orders.countDocuments(query),
  ]);

  //  Convert ObjectIds and Dates to strings for serialization
  const serialized = orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    user: order.user ? { ...order.user, _id: order.user._id.toString() } : null,
    createdAt: order.createdAt?.toString(),
    updatedAt: order.updatedAt?.toString(),
  }));

  return {
    orders: serialized,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export const getOrderDetails = async (params = {}) => {
  return unstable_cache(
    async () => getCachedOrder(params),
    ["orders", JSON.stringify(params)],
    { revalidate: 60, tags: ["orders"] },
  )();
};

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";

export async function getAllOrders() {

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectDB();

  const orders = await Orders.find({ user: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return orders.map(order => ({
    ...order,
    _id: order._id.toString(),
    user: order.user?.toString(),
    createdAt: order.createdAt?.toISOString(),
    updatedAt: order.updatedAt?.toISOString(),

    // FIX NESTED ITEMS
    items: order.items.map(item => ({
      ...item,
      product: item.product?.toString(),
    }))
  }));
}
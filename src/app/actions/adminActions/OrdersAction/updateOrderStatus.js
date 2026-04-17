"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { logAdminAction } from "@/libs/logger";
import { revalidatePath } from "next/cache";

// updateOrderStatus.js
export async function updateOrderStatus(orderId, newStatus) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return { success: false, message: "Unauthorized" };
        }

        const adminId = session.user.id;
        const adminName = session.user.name;

        const order = await Orders.findById(orderId);

        if (!order) return { success: false, message: "Order not found" };

        const oldStatus = order.orderStatus;

        if (oldStatus === newStatus) {
            return { success: false, message: "No change in status" };
        }

        //  updateOne skips full validation — only updates what you set
        await Orders.updateOne(
            { _id: orderId },
            { $set: { orderStatus: newStatus } }
        );

        await logAdminAction({
            adminId,
            adminName,
            action: "UPDATE_ORDER_STATUS",
            module: "order",
            targetId: orderId,
            before: { orderStatus: oldStatus },
            after: { orderStatus: newStatus }
        });

        return { success: true, message: "Order status updated" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "Server error" };
    }
}
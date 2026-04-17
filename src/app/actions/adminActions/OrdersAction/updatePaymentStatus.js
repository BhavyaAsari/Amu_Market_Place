"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { logAdminAction } from "@/libs/logger";


// updatePaymentStatus.js
export async function updatePaymentStatus(orderId, newPaymentStatus) {
    await connectDB();

    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return { success: false, message: "Unauthorized" };
        }

        const adminId = session.user.id;
        const adminName = session.user.name;
        // console.log("Admin nanme",adminName);

        const order = await Orders.findById(orderId);

        if (!order) return { success: false, message: "Order not found" };

        const oldPaymentStatus = order.paymentStatus;

        if (oldPaymentStatus === newPaymentStatus) {
            return { success: false, message: "No change" };
        }

        //  updateOne skips full validation — only updates what you set
        await Orders.updateOne(
            { _id: orderId },
            { $set: { paymentStatus: newPaymentStatus } }
        );

        await logAdminAction({
            adminId,
            adminName,
            action: "UPDATE_PAYMENT_STATUS",
            module: "Order",
            targetId: orderId,
            before: { paymentStatus: oldPaymentStatus },
            after: { paymentStatus: newPaymentStatus }
        });

        return { success: true };

    } catch (error) {
        console.error(error);
        return { success: false, message: "Error updating payment status" };
    }
}
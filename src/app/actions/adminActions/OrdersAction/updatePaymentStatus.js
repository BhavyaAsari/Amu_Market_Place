"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { logAdminAction } from "@/libs/logger";


export async function updatePaymentStatus(orderId,newPaymentStatus) {

    await connectDB();

    try {

        const session = await getServerSession(authOptions);

        if(!session || session.user.role !== "admin") {

            return {success:false,message:"Unauthorized"};
        }

        const adminId = session.user.id;
        const adminName = session.user.name;

        const order = await Orders.findById(orderId);

        if(!order) {

            return {success:false,message:"Order not found"};
        }

        const oldPaymentStatus = order.paymentStatus;

        if(oldPaymentStatus === newPaymentStatus) {

            return {success:false,message:"No change"};
        }

        order.paymentStatus = newPaymentStatus;
        await order.save();

        await logAdminAction({

            adminId,
            adminName,
            action:"UPDATE_PAYMENT_STATUS",
            module:"Order",
            targetId:orderId,
            before:{paymentStatus:oldPaymentStatus},
            after:{paymentStatus:newPaymentStatus}
        });

        return {success:true};


    } catch(error) {

        console.error(error);
        return {success:false,message:"Error in updating payment status,order section"}
    }
}
"use server";

import Logs from "@/models/Logs";
import { connectDB } from "./db";

export async function logAdminAction ({

    adminId,
    adminName,
    action,
    module,
    targetId,
    before,
    after
}) {

    await connectDB();
 // Static action messages
    const actionMessages = {
        UPDATE_ORDER_STATUS: "Order status updated",
        UPDATE_PAYMENT_STATUS: "Payment status updated",

        DELETE_USER: "User deleted",
        CREATE_USER: "New user created",

        DELETE_PRODUCT: "Product deleted",
        CREATE_PRODUCT: "New product added",
    };

    let message = actionMessages[action] || "Action performed";

    // Format field names (camelCase → readable)
    const formatField = (field) =>
        field.replace(/([A-Z])/g, " $1").toLowerCase();

    //Dynamic message for updates
    if (action === "UPDATE_USER" || action === "UPDATE_PRODUCT") {

        const changedFields = Object.keys(after || {}).map(formatField);

        if (changedFields.length === 1) {
            message = `${changedFields[0]} updated`;
        } 
        else if (changedFields.length === 2) {
            message = `${changedFields[0]} & ${changedFields[1]} updated`;
        } 
        else if (changedFields.length > 2) {
            const firstTwo = changedFields.slice(0, 2);
            const remaining = changedFields.length - 2;

            message = `${firstTwo.join(", ")} +${remaining} more updated`;
        }
    }


    try {

        await Logs.create({

            adminId,
            adminName,
            action,
            module,
            targetId,
            message,
            changes :{before,after},
        });

        
    } catch (error) {

        console.log("Log error",error);
    }


}
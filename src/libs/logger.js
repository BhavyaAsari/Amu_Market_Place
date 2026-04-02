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

    try {

        await Logs.create({

            adminId,
            adminName,
            action,
            module,
            targetId,
            changes :{before,after},
        });

        
    } catch (error) {

        console.log("Log error",error);
    }


}
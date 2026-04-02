"use server";

import Logs from "@/models/Logs";
import { connectDB } from "@/libs/db";

export async function getAdminLogs() {

    await connectDB();

    try {

        const logs = await Logs.find({})
        .sort({createdAt:-1})
        .lean();

        return logs;
    } catch(error) {

        console.log("Fetch logs error",error);
        return [];
    }
}
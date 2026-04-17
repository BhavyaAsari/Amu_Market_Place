"use server";

import Logs from "@/models/Logs";
import { connectDB } from "@/libs/db";

export async function getAdminLogs() {

    await connectDB();

    try {

        const logs = await Logs.find({})
        .sort({createdAt:-1})
        .lean();

        const serialized = logs.map((log) => ({
            ...log,
            _id: log._id.toString(),
            adminId: log.adminId?.toString() ?? null,
            targetId: log.targetId?.toString() ?? null,
            createdAt: log.createdAt?.toISOString() ?? null,
            changes: log.changes ? JSON.parse(JSON.stringify(log.changes)) : null,
        }));

        return serialized;

       
    } catch(error) {

        console.log("Fetch logs error",error);
        return [];
    }
}
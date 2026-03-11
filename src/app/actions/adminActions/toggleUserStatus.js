"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import { adminGuard } from "@/libs/adminGuard";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";



export async function toggleUserStatus(userId) {

    await connectDB();

    const session = getServerSession();
    const adminId = session?.user?.id;

    const check = adminGuard(adminId,userId);

    if(!check.allowed) {

        return {success:false,message:check.message}
    }

    const user = check.user;

    const newStatus = user.status === "active" ? "blocked" : "active";

    await User.findByIdAndUpdate(
        userId,
        { status:newStatus

        });

        revalidatePath("/admin/Users/edit/${row.id}");


        return {success:true};

    
}
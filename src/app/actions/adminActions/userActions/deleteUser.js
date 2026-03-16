"use server";

import { connectDB } from "@/libs/db";
import { adminGuard } from "@/libs/adminGuard";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";

export async function deleteUser (userId) {

    await connectDB();

    const session = getServerSession(authOptions);
    const adminId = session?.user?.id;

    const check = await adminGuard(adminId,userId);

    if(!check.allowed) {

        return {success:false, message:check.message}
    };

    await User.findByIdAndDelete(userId);

        revalidatePath("/admin/Users/edit/${row.id}");
    return {success:true};
}
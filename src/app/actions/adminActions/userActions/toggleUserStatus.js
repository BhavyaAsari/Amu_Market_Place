"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import { adminGuard } from "@/libs/adminGuard";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { logAdminAction } from "@/libs/logger";

export async function toggleUserStatus(userId) {
  await connectDB();

  const session = await getServerSession();
  const adminId = session?.user?.id;

  const check = await adminGuard(adminId, userId);

  if (!check.allowed) {
    return { success: false, message: check.message };
  }

  const user = check.user;

  const oldStatus = user.status;
  const newStatus = user.status === "active" ? "blocked" : "active";

  await User.findByIdAndUpdate(userId, { status: newStatus });

  await logAdminAction({
    adminId,
    adminName,
    action: newStatus === "blocked" ? "BLOCK_USER" : "ACTIVATE_USER",
    module: "User",
    targetId: "userId",
    before: { status: oldStatus },
    after: { status: newStatus },
  });

  revalidatePath("/admin/Users/edit/${row.id}");

  return { success: true };
}

"use server";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async function resetPasswordProfile(formData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "All fields are required" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  await connectDB();
  const user = await User.findById(session.user.id);

  if (!user.password) {
    return {
      success: false,
      message: "Password update not available for Google users",
    };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return { success: false, message: "Current password incorrect" };
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  return { success: true };
}

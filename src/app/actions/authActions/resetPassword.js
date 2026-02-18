"use server";

import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "@/models/Users";
import { connectDB } from "@/libs/db";

export async function ResetPasswordAction(prevState, formData, token) {
  try {
    if (!token) {
      return {
        success: false,
        message: "",
        error: "Invalid reset token",
      };
    }

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!password || !confirmPassword) {
      return { success: false, message: "", error: "All fields are required" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "",
        error: "Password must be at least 6 characters",
      };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "", error: "Passwords do not match" };
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return {
        success: false,
        message: "",
        error: "Invalid or expired reset link",
      };
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return {
      success: true,
      message: "Password reset successfully",
      error: "",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: "",
      error: "Reset failed. Please try again.",
    };
  }
}

"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async function getUserStats() {

  await connectDB();

  try {

    const totalUsers = await User.countDocuments();

    const blockedUsers = await User.countDocuments({
      status: "blocked"
    });

    const activeUsers = await User.countDocuments({
      status: "active"
    });

    // Last 7 days signup
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newSignups = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Current month users
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const usersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Previous month users
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const usersLastMonth = await User.countDocuments({
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth
      }
    });

    // Growth percentage
    let growthPercent = "0%";

    if (usersLastMonth > 0) {
      const growth =
        ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;

      growthPercent = `${growth.toFixed(1)}%`;
    }

    return {
      totalUsers,
      activeUsers,
      blockedUsers,
      newSignups,
      usersThisMonth,
      growthPercent
    };

  } catch (error) {

    console.error("User stats error:", error);

    return {
      totalUsers: 0,
      activeUsers: 0,
      blockedUsers: 0,
      newSignups: 0,
      usersThisMonth: 0,
      growthPercent: "0%"
    };
  }
}
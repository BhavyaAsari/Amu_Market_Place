"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async function getUsersDetails({ search = "", page = 1 }) {
  await connectDB();

  try {
    const limit = 15;

    const skip = (page - 1) * limit;

    let query = {};

    // console.log("search",search)

    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(query)
      .select("username email image role provider  status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // console.log("users",users)
    const totalUsers = await User.countDocuments(query);

    const totalPages = Math.ceil(totalUsers / limit);

    return { users: JSON.parse(JSON.stringify(users)), totalPages };
  } catch (error) {
    console.error("Error fetching Users: ", error);
    return [];
  }
}

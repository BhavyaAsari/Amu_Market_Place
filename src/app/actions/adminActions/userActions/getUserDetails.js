"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import {revalidatePath, unstable_cache} from "next/cache"



const getChachedUsers = unstable_cache(

  async ({search,page}) => {

    await connectDB();

     const limit = 15;

    const skip = (page - 1) * limit;

    let query = {};

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

       const totalUsers = await User.countDocuments(query);

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users: JSON.parse(JSON.stringify(users)),
      totalPages,
    };
  },
  ["Users-list"],
  {
    revalidate:60,
    tags:["Users"],
  }
);


export async function getUsersDetails({ search = "", page = 1 }) {
  await connectDB();

  try {
   

    
      return await getChachedUsers({search,page})
    // console.log("search",search)

   

    

    // console.log("users",users)
   

  } catch (error) {
    console.error("Error fetching Users: ", error);
    return  { users: [], totalPages: 0 };
  }
}

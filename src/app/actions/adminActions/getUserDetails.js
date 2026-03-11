"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";


export async function getUsersDetails() {

    await connectDB();

    try {

        const users = await User.find({})
        .select("username email image role provider  status createdAt")
        .sort({createdAt:-1});

        // console.log("users",users)

        return JSON.parse(JSON.stringify(users));


    } catch(error) {

        console.error("Error fetching Users: ",error);
        return[];


    }
}
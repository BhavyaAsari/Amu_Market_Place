"use server";

import { getServerSession } from "next-auth";
import { connectDB } from "@/libs/db";
import { revalidatePath } from "next/cache";
import User from "@/models/Users";
import { authOptions } from "@/libs/authOptions";
export async function UpdateProfile(data) {

try {

    const session = await getServerSession(authOptions);
    // console.log("session",session);

    if(!session) {

        return {success:false,message:"Unathorized"};
    }

    await connectDB();

   const updatedUser =  await User.findOneAndUpdate(

        {email:session.user.email},
        {

            username:data.username,
            phone:data.phone,
            country:data.country,
            postalCode:data.postalCode,
            image:data.image,
        },

        {new:true}
    );

    if (!updatedUser) {
  return { success: false, message: "User not found" };
}

    revalidatePath("/profile");
    return {success:true}



} catch(error) {

    console.error("Update Profile error:",error);

    return {

        success:false,
        message:"Failed to update profile",
    };
  }  
}
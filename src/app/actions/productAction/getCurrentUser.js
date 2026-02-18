"use server";

import { getServerSession } from "next-auth";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import { authOptions } from "@/libs/authOptions";
export default async function getCurrentUser() {

    try {

        const session = await getServerSession(authOptions);

        if(!session) {

            return {success:false,message:"Unauthorized"}
        }

        await connectDB();

        const user = await User.findOne({

            email:session.user.email,
        }).lean();

        if(!user) {

            return {success:false,message:"User not found"}
        }

        const nameParts = user.username?.trim().split(" ") || [];
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join("") || "";

        const defaultAddress = 
          user.addresses?.find((addr) => addr.isDefault) ||
          user.addresses?.[0] ||
          null;
          
          
              return {
      success: true,
      user: {
        firstName,
        lastName,
        email: user.email || "",
        phone: defaultAddress?.phone || user.phone || "",
        street: defaultAddress?.street || "",
        city: defaultAddress?.city || "",
        state: defaultAddress?.state || "",
        postalCode: defaultAddress?.postalCode || user.postalCode || "",
        country: defaultAddress?.country || user.country || "",
      },
    };



    } catch(error) {

        console.error("error",error);

        return {

            success:false,
            message:"soemthing went wrong while loading user"
        };


    }





}
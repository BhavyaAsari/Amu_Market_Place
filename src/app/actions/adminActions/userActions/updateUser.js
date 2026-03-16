"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { adminGuard } from "@/libs/adminGuard";

export async function updateUsersAdmin(userId,data) {

  try {

    await connectDB();

    //Getting AdminID from the server session   
    const session = await getServerSession(authOptions);
    const adminId = session?.user?.id;

    const check = await adminGuard(adminId,userId);

    if(!check.allowed) {

        return {success:false,message:check.message};
    }

    //Extracting details of the user  from the front-end sende data

    const {firstName,lastName,phone,country,postalCode,role,status} = data;

    const username = `${firstName} ${lastName}`;

    await User.findByIdAndUpdate(
      userId,
      {
        username,
        phone,
        country,
        postalCode,
        role,
        status
      }
    );

        revalidatePath("/admin/Users/edit/${row.id}");

    return { success:true };

  } catch (error) {

    console.error(error);

    return { success:false, message:"Server error" };
  }
}
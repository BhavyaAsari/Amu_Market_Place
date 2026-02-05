import bcrypt from "bcrypt";
import { UpdateUserPassword } from "./updatePassword";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async function resetPasswordProfile(formData) {

    const session = getServerSession(authOptions);

    if(!session) {

        throw new Error("Unauthorized");
    }

    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");


    if(!currentPassword||!newPassword) {

        throw new Error("All fields are must required");
    }

    if(newPassword !== currentPassword) {

        throw new Error("Password doesnot match");
    }

    await connectDB();

    const user = await User.findById(session.user.id);

    if(!user.password) {

        throw new Error("Password update not availabe for google users ")
    }

    const isMatch = await bcrypt.compare(currentPassword,user.password);

    if(!isMatch) {

        throw new Error("Current password is not correct");
    }

    await UpdateUserPassword(user._id,newPassword);

    return {success:true};



}
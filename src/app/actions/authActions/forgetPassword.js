"use server";

import crypto from "crypto";
import User from "@/models/Users";
import { connectDB } from "@/libs/db";
import { ForgetPasswordMail } from "@/libs/ForgetPassword";


export async function ForgetPasswordAction (prevState,formData) {

    try {

        const email = formData.get("email");

        if(!email) {

            return {success:false,message:"Email is required"};
        }

        await connectDB();

        const user = await User.findOne({email});

        if(!user) {

            return {success:true,
                    message:"If this email exists,a reset link has been sent."
            };
        }


        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        user.resetPasswordExpire = Date.now()+3*60*1000;

        await user.save();


        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

        //send email

        ForgetPasswordMail({

            to:user.email,
            name:user.username || "there",
            resetUrl,
        });

        return {

            success:true,
            message:"Password link has been sent to user account",

        };



    } catch(error) {

        console.error("Forget Mail failed",error);
        return {success:false,message:"Something went wrong"};


    }


}
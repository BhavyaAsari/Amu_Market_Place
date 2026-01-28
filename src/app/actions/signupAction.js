"use server";

import User from "@/models/Users";
import bcrypt from "bcrypt";
import { connectDB } from "@/libs/db";
import { WElcomeMail } from "@/libs/resend";

function validateSignup(formData) {
  const fname = formData.get("fname");
  const lname = formData.get("lname");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword")
  const terms = formData.get("terms");

  if (!fname || !lname || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if(password != confirmPassword) {

    throw new Error("password does not match")
  }

  if (!terms) {
    throw new Error("You must agree to the terms");
  }

  return { fname, lname, email, password };
}

export async function SignupValid(prevState, formData) {
  try {
    const { fname, lname, email, password } = validateSignup(formData);

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  const useer =  await User.create({
      username: `${fname} ${lname}`,
      email,
      password: hashedPassword,
      role: "user",
    });
    console.log(useer,"user hhhyyyyyyy")

    // const username = `${fname} ${lname}`;
    // try {
    //   await WElcomeMail({
    //     to: email,
    //     username,
    //   });
    // } catch (err) {
    //   console.error("Welcome email failed", err);
    // }

    return { success: true, message: "Account created successfully!",};

  } catch (error) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

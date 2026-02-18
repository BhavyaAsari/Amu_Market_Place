import bcrypt from "bcrypt";
import User from "@/models/Users";

export async function UpdateUserPassword (userId,newPassword) {

    const hashedPassword = await  bcrypt.hash(newPassword,10);
    await User.find(userId,{newPassword:hashedPassword})


}
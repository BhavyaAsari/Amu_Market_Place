import User from "@/models/Users";
import { connectDB } from "./db";

//Validate User actions
export async function  adminGuard(adminId,targetUserId) {

    await connectDB();

    if(!adminId) {

        return {allowed:false,message:"Unauthorized Action"};
    }

    if(adminId === targetUserId) {

        return {

            allowed:false,
            message:"Admin caanot modify their account"
        };
    }

    const targetuser = await User.findById(targetUserId);

    if(targetuser.role === "admin") {

        return {

            allowed:false,
            message:"Admin cannot modify other Admins"
        };
    }

    return {

        allowed:true,
        user:targetuser
    };


    
}
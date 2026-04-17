  "use server";

  import { connectDB } from "@/libs/db";
  import User from "@/models/Users";
  import { revalidatePath } from "next/cache";
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/libs/authOptions";
  import { adminGuard } from "@/libs/adminGuard";
  import { logAdminAction } from "@/libs/logger";
import successPage from "@/app/(main)/success/[id]/page";

  export async function updateUsersAdmin(userId,data) {

    try {

      await connectDB();

      //Getting AdminID from the server session   
      const session = await getServerSession(authOptions);
      const adminId = session?.user?.id;
      const adminName = session?.user?.name;

      const check = await adminGuard(adminId,userId);

      if(!check.allowed) {

          return {success:false,message:check.message};
      }

      //Extract exisiting User
      const exisitingUser = await User.findById(userId);

      if(!exisitingUser) {

        return {success:false,message:"User not found"};
      }

      //Extracting details of the user  from the front-end sende data

      const {firstName,lastName,phone,country,postalCode,role,status} = data;

      const username = `${firstName} ${lastName}`;

      const before = {};
      const after = {};
      const updateData = {};

      const fieldsTOCheck = {

        username,
        phone,
        country,
        postalCode,
        role,
        status
      };

      for (let key in fieldsTOCheck) {

  if (
    fieldsTOCheck[key] !== undefined &&
    fieldsTOCheck[key] !== exisitingUser[key]
  ) {
    before[key] = exisitingUser[key];
    after[key] = fieldsTOCheck[key];
    updateData[key] = fieldsTOCheck[key];
  }
}

      //No changes case 
      if(Object.keys(updateData).length === 0) {

        return {success:false,message:"No changes detected"};
      }

      await User.findByIdAndUpdate(
        userId,
        updateData
      );

      await logAdminAction({

        adminId,
        adminName,
        action:"UPDATE_USER",
        module:"User",
        targetId:userId,
        before,
        after
      });

          revalidatePath("/admin/Users/edit/${row.id}");

      return { success:true, message:"User updated Successfully" };

    } catch (error) {

      console.error(error);

      return { success:false, message:"Server error" };
    }
  }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileSec from "@/components/heroComponents/profileSection";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export default async  function ProfilePage() {

    const session = await getServerSession();

    if(!session) {

        redirect("/login");
    }

    await connectDB();

    const user = await User.findOne({email:session.user.email}).lean();
    // console.log("user",user);
     if (!user) {
    redirect("/login");
  }

    return(

        <>
        
        <h1>Profile Page</h1>
        <ProfileSec
      user={{
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
        image: user.image || "",
      }}
    />
        </>
    );
}
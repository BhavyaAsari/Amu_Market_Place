import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import MyAccountPage from "@/components/profileComonents/MyAccount";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) redirect("/login");

  return (
    <MyAccountPage
      user={{
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
        image: user.image || "",
      }}
    />
  );
}

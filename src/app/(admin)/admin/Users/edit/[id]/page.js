import EditUserForm from "@/components/admin/UserSegment/editUserForm";
import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export default async function UserEdit({ params }) {

  const { id } = await params;

  await connectDB();

  const user = await User.findById(id).lean();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <main className="">
      <EditUserForm user={JSON.parse(JSON.stringify(user))} />
    </main>
  );
}
import { getProductStats } from "@/app/actions/adminActions/getProductStats";
import { getRevenueData } from "@/app/actions/adminActions/getRevenueData";
import { getUsersDetails } from "@/app/actions/adminActions/getUserDetails";
import { getUserStats } from "@/app/actions/adminActions/getUserStats";
import AdminLayout from "@/components/admin/AdminLayOut";

export default async function AdminDashBoard() {

  const stats = await getProductStats();
  const revenueData = await getRevenueData();
  const users = await getUsersDetails();
  const userStats = await getUserStats();

  console.log("user Stats",userStats)

  return (
    <AdminLayout
      stats={stats}
      revenueData={revenueData}
      users = {users}
      userStats={userStats}
    />
  );
}
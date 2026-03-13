import { getProductStats } from "@/app/actions/adminActions/getProductStats";
import { getRevenueData } from "@/app/actions/adminActions/getRevenueData";
import { getUsersDetails } from "@/app/actions/adminActions/getUserDetails";
import { getUsersGrowth } from "@/app/actions/adminActions/getUsersGrowth";
import { getUserStats } from "@/app/actions/adminActions/getUserStats";
import AdminLayout from "@/components/admin/AdminLayOut";

export default async function AdminDashBoard({searchParams}) {

  const params = await searchParams;
const search = params.search || "";
const page = Number(params.page) || 1;

// console.log("search",search)

  const stats = await getProductStats();
  const revenueData = await getRevenueData();
  const {users,totalPages} = await getUsersDetails({search,page});
  const userStats = await getUserStats();
  const usersGrowth = await getUsersGrowth();

  // console.log("user Stats",userStats);

  return (
    <AdminLayout
      stats={stats}
      revenueData={revenueData}
      users = {users}
      totalPages={totalPages}
      userStats={userStats}
      usersGrowth={usersGrowth}
    />
  );
}
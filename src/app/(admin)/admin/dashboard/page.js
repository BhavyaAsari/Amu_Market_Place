import { getProductStats } from "@/app/actions/adminActions/getProductStats";
import { getRevenueData } from "@/app/actions/adminActions/getRevenueData";
import { getUsersDetails } from "@/app/actions/adminActions/getUserDetails";
import AdminLayout from "@/components/admin/AdminLayOut";

export default async function AdminDashBoard() {

  const stats = await getProductStats();
  const revenueData = await getRevenueData();
  const users = await getUsersDetails();

  return (
    <AdminLayout
      stats={stats}
      revenueData={revenueData}
      users = {users}
    />
  );
}
import { getProductStats } from "@/app/actions/productActions/getProductStats";
import { getRevenueData } from "@/app/actions/productActions/getRevenueData";
import { getUsersDetails } from "@/app/actions/adminActions/userActions/getUserDetails";
import { getUsersGrowth } from "@/app/actions/adminActions/userActions/getUsersGrowth";
import { getUserStats } from "@/app/actions/adminActions/userActions/getUserStats";
import { getProductAnalytics } from "@/app/actions/productActions/getProductAnalytics";

import AdminLayout from "@/components/admin/AdminLayOut";
import { getProductDetails } from "@/app/actions/productActions/getProductDetails";

export default async function AdminDashBoard({searchParams}) {

  const params = await searchParams;
const search = params.search || "";
const page = Number(params.page) || 1;

// console.log("search",search)

const [
  stats,
  revenueData,
  usersData,
  userStats,
  usersGrowth,
  productAnalytics,
  productsData
] = await Promise.all([
  getProductStats(),
  getRevenueData(),
  getUsersDetails({ search, page }),
  getUserStats(),
  getUsersGrowth(),
 getProductAnalytics(),
 getProductDetails({search,page})

]);

  const { users, totalPages } = usersData;

  const {productsDetails,productPages} = productsData;

  // console.log("product Data",productsData);
  // console.log("products Detaisl",productsDetails)

  // console.log("user Stats",userStats);

  return (
    <AdminLayout
      stats={stats}
      revenueData={revenueData}
      users = {users}
      totalPages={totalPages}
      userStats={userStats}
      usersGrowth={usersGrowth}
      productAnalytics={productAnalytics}
      productPages={productPages}
      productsDetails = {productsDetails}
    />
  );
}
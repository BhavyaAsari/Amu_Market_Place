
import AdminLayout from "@/components/admin/AdminLayOut";


import { getDashBoardData } from "@/app/actions/adminActions/AdminDashBoardAction/getDashBoardData";

export default async function AdminDashBoard({searchParams}) {

const params = await searchParams;
const search = params.search || "";
const page = Number(params.page) || 1;

// console.log("search",search)

const data = await getDashBoardData({ search, page });

  return (
    <AdminLayout data={data} />
  );
}
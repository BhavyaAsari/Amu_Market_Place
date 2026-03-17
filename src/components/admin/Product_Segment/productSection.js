"use client";

import {
  LuLaptop,
  LuCircleX,
  LuTriangleAlert,
  LuTrendingUp,
  LuCircleCheck,
} from "react-icons/lu";

import { useMemo } from "react";

import StatsGrid from "../Reusable_Components/statsGrid";
import AdminCard from "../adminCard";
import ProductTable from "./productTable";
import ReusableBarChart from "../Reusable_Components/BarChart";

export default function ProductSection({ data }) {

  //  Extract domain data
  const {
    analytics: productAnalytics,
    list: productsDetails,
    totalPages: productPages,
    topSelling: topSellingData
  } = data;

  //  Stats items
  const items = [
    {
      label: "Total Products",
      value: productAnalytics.totalProducts,
      icon: LuLaptop,
    },
    {
      label: "Active Products",
      value: productAnalytics.activeProducts,
      icon: LuCircleCheck,
    },
    {
      label: "Blocked Products",
      value: productAnalytics.blockedProducts,
      icon: LuCircleX,
    },
    {
      label: "Out of Stock",
      value: productAnalytics.outOfStock,
      icon: LuTriangleAlert,
    },
    {
      label: "Total Units Sold",
      value: productAnalytics.totalUnitsSold,
      icon: LuTrendingUp,
    },
  ];

  //  Optimized chart data
  const chartData = useMemo(() =>
    topSellingData.map((p) => ({
      name: p.title.split(" ").slice(0, 2).join(" "), // shorter = cleaner UI
      value: p.soldCount,
    })),
  [topSellingData]);

  return (
    <main className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="AdminTitle">Products</h1>
        <p className="subTitleAdmin">Manage all the products</p>
      </div>

      {/* Stats */}
      <AdminCard bgColor="bg-gradient-to-b from-[#4c1d95] via-[#6d28d9] to-[#9333ea]">
        <h1 className="font-semibold text-white text-xl mb-3">
          Product Insights
        </h1>

        <StatsGrid items={items} />
      </AdminCard>

      {/* Chart */}
      <AdminCard bgColor="bg-gradient-to-br from-purple-500 via-violet-800 to-purple-500">
        <h1 className="font-extrabold text-white text-2xl ml-4 mt-2">
          Top Selling Series
        </h1>

        <ReusableBarChart data={chartData} />
      </AdminCard>

      {/* Table (scrollable for UX) */}
      <div className="max-h-125 overflow-y-auto rounded-xl">
        <ProductTable
          productsDetails={productsDetails}
          totalPages={productPages}
        />
      </div>

    </main>
  );
}
"use client";
import {
  LuLaptop,
  LuCircleX,
  LuTriangleAlert,
  LuTrendingUp,
  LuCircleCheck,
} from "react-icons/lu";
import StatsGrid from "../statsGrid";
import AdminCard from "../adminCard";
import ProductTable from "./productTable";

export default function ProductSection({
  productAnalytics,
  productsDetails,
  productPages,
}) {
  // console.log("product Analytics",productAnalytics.totalProducts);

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
      label: "Block Products",
      value: productAnalytics.blockedProducts,
      icon: LuCircleX,
    },
    {
      label: "out of stock",
      value: productAnalytics.outOfStock,
      icon: LuTriangleAlert,
    },
    {
      label: "Total Units Sold",
      value: productAnalytics.totalUnitsSold,
      icon: LuTrendingUp,
    },
  ];

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="AdminTitle">Products</h1>
        <p className="subTitleAdmin">Manage all the products</p>
      </div>
      <AdminCard bgColor="bg-gradient-to-b from-[#4c1d95] via-[#6d28d9 #9333ea] to-[#9333ea]">
        <h1 className="font-semibold text-white text-xl mb-3">Product Insights</h1>

        <StatsGrid items={items} />
      </AdminCard>
      <ProductTable
        productsDetails={productsDetails}
        totalPages={productPages}
      />
    </main>
  );
}

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
import Scattergraph from "../Reusable_Components/ScatterGraph";

export default function ProductSection({ data, stockTrendsData }) {
  //  Extract domain data
  const {
    analytics: productAnalytics,
    list: productsDetails,
    totalPages: productPages,
    topSelling: topSellingData,
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
  const chartData = useMemo(
    () =>
      topSellingData.map((p) => ({
        name: p.title.split(" ").slice(0, 2).join(" "), // shorter = cleaner UI
        value: p.soldCount,
      })),
    [topSellingData],
  );

  console.log("charts", stockTrendsData);

  return (
    <main className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="AdminTitle">Products</h1>
        <p className="subTitleAdmin">Manage all the products</p>
      </div>

      {/* Stats */}
      <AdminCard bgColor="bg-gradient-to-b from-[#4c1d95] via-[#6d28d9] to-[#9333ea]">
        <h1 className="font-semibold text-white text-xl mb-3 textDropShadow text-glow ">
          Product Insights
        </h1>

        <StatsGrid items={items} />
      </AdminCard>

      {/* Chart */}
      <AdminCard bgColor="bg-linear-to-br from-purple-500 via-violet-800 to-purple-500">
        <section className="flex">
          <div className="titleContainer mt-3"></div>
          <h1 className="font-extrabold text-white text-2xl ml-2 textDropShadow text-glow ">
          Top 5 Selling Series
        </h1>
        </section>
        <p className="text-purple-200 text-sm ml-5 mt-1 textDropShadow text-glow ">
          Insights of popular products across the brands
        </p>

        <ReusableBarChart data={chartData} />
      </AdminCard>

      <AdminCard bgColor="bg-linear-to-br from-violet-500 via-purple-400 to-violet-600">
        <section className="flex justify-between">
          <div>
            <section className="flex gap-2">
              <div className="titleContainer mt-5"></div>
            <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2">
              Inventory vs Demand Insights
            </h2>
            </section>
            
            <p className="text-purple-200 text-sm textDropShadow text-glow ml-5">
              Stock vs Sales performance
            </p>
          </div>

          <div
            className="flex flex-col gap-3 text-xs text-white mt-4 mb-4 border  border-white/20 bg-linear-to-br 
from-purple-900/40 
via-purple-700/30 
to-purple-500/30 backdrop-blur-md shadow-lg  p-2 rounded-lg  "
          >
            <span className="font-semibold textDropShadow ">Graph Markers</span>
            <div className="flex gap-3">
              <span className="flex items-center gap-1 l">
                <div className="w-3 h-3 bg-red-500 rounded-full" /> Critical
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-full" /> Good
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full " /> Low
                Demand
              </span>
            </div>
          </div>
        </section>

        <Scattergraph
          data={stockTrendsData?.data || []}
          xKey="stock"
          yKey="sellThroughRate"
        />

        <div className="mt-4 text-sm text-purple-100 flex justify-between ">
          <p className="flex gap-2">
            <LuTrendingUp size={22} className="text-green-400 text-glow " />
            <span className="textDropShadow text-glow ">High demand products need restocking</span>
          </p>
          <p className="flex gap-2">
            <LuTriangleAlert size={22} className="text-red-400 text-glow " />
            <span className="textDropShadow text-glow ">Overstock items may require discounts</span>
          </p>
        </div>
      </AdminCard>

      {/* Table (scrollable for UX) */}
      <div className=" mt-6">
        <ProductTable
          productsDetails={productsDetails}
          totalPages={productPages}
        />
      </div>
    </main>
  );
}

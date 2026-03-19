"use client";

import { useState } from "react";
import {
  LuUser,
  LuPackage,
  LuLayoutDashboard,
  LuLaptopMinimal,
} from "react-icons/lu";

import { LuTrendingUp, LuShoppingCart } from "react-icons/lu";

import StatsGrid from "./Reusable_Components/statsGrid";
import GraphRevenue from "./revenueGraphChat";
import InsightBrandsChart from "./InsigthBrandsChart";
import PriceBreakdown from "./Reusable_Components/PriceBreakdownChart";
import UserSegment from "./UserSegment/userSection";
import SideMenuAdmin from "./SideBarMenu";
import AdminCard from "./adminCard";
import ProductSection from "./Product_Segment/productSection";
import useSync from "@/hooks/useRealTimeRefresh";

export default function AdminLayout({ data }) {
  const [active, setActive] = useState("dashboard");

  useSync();

  //  FIX 1: Extract data FIRST
  const { stats, revenue, users, products, stock,analyticsData } = data;

  const priceData = analyticsData?.priceAnalysis?.ChartAnalytics || [];
const insights = analyticsData?.priceAnalysis?.inSights || {};

  console.log("charts", stock.stocksTrend);

  const menuItems = [
    { key: "dashboard", name: "Dashboard", icon: LuLayoutDashboard },
    { key: "products", name: "Products", icon: LuLaptopMinimal },
    { key: "users", name: "Users", icon: LuUser },
    { key: "orders", name: "Orders", icon: LuPackage },
  ];

  const statsItems = [
    {
      label: "Revenue",
      value: `$${stats.revenue}`,
      icon: LuTrendingUp,
    },
    {
      label: "Orders",
      value: stats.orders,
      icon: LuShoppingCart,
    },
    {
      label: "Users",
      value: stats.users,
      icon: LuUser,
    },
    {
      label: "Products",
      value: stats.products,
      icon: LuPackage,
    },
  ];

  return (
    <main className="admin-container">
      <SideMenuAdmin
        menuItems={menuItems}
        active={active}
        setActive={setActive}
      />

      <div className="flex flex-col gap-8">
        {active === "dashboard" && (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Managing the Admin Panel</p>
            </div>

            <AdminCard bgColor="bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#9333ea]">
              <h1 className="text-xl mb-2 font-semibold text-white textDropShadow">
                Admin Insights
              </h1>
              <StatsGrid items={statsItems} />
            </AdminCard>

            <GraphRevenue data={revenue} />
            <AdminCard bgColor="bg-linear-to-br from-violet-600 via-purple-500 to-violet-600">

  <section className="flex items-center justify-between ">
    <h2 className="text-2xl font-semibold text-white textDropShadow">
      Price Breakdown Analysis
    </h2>
  </section>

  {/* 🔥 Chart + Insights */}
  <div className="flex ">

    {/* LEFT → CHART */}
    <div className="w-full "><PriceBreakdown data={priceData} /></div>

    {/* RIGHT → INSIGHTS */}
    <div className="flex flex-col gap-4">

      {/*  Product Strategy */}
      <div className="text-glow p-4 rounded-xl bg-linear-to-br from-purple-300/90 via-fuchsia-400/50 to-purple-500">
        <h3 className="text-lg font-semibold text-white textDropShadow text-glow ">
           Product Strategy
        </h3>

        <p className="text-sm text-white textDropShadow text-glow mt-2">
          <b>Case:</b> {insights?.productStrategy?.case}
        </p>

        <p className="text-sm text-white textDropShadow text-glow mt-1">
           {insights?.productStrategy?.inSight}
        </p>

        <p className="text-sm text-white textDropShadow text-glow mt-1">
           {insights?.productStrategy?.action}
        </p>
      </div>

      {/*  Revenue Insight */}
      <div className="text-glow p-4 rounded-xl bg-linear-to-br from-purple-300/90 via-fuchsia-400/50 to-purple-500">
        <h3 className="text-lg font-semibold text-white textDropShadow text-glow">
           Revenue Optimization
        </h3>

        <p className="text-sm   text-white textDropShadow text-glow mt-1">
          <b>Case:</b> {insights?.revenue?.case}
        </p>

        <p className="text-sm text-white textDropShadow text-glow mt-1 ">
          {insights?.revenue?.inSight}
        </p>

        <p className="text-sm text-white textDropShadow text-glow mt-1">
          {insights?.revenue?.action}
        </p>
      </div>

    </div>

  </div>
</AdminCard>

            <InsightBrandsChart />
          </>
        )}

        {/*  FIX 2 */}
        {active === "users" && <UserSegment data={users} />}

        {active === "products" && (
          <ProductSection data={products} stockTrendsData={stock.stocksTrend} />
        )}

        {active === "orders" && <div>Orders Section</div>}
      </div>
    </main>
  );
}

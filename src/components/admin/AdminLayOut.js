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
import PriceBreakdown from "./PriceBreakdownChart";
import UserSegment from "./UserSegment/userSection";
import SideMenuAdmin from "./SideBarMenu";
import AdminCard from "./adminCard";
import ProductSection from "./Product_Segment/productSection";

export default function AdminLayout({ data }) {
  const [active, setActive] = useState("dashboard");



  //  FIX 1: Extract data FIRST
  const { stats, revenue, users, products ,stock} = data;

      console.log("charts",stock.stocksTrend);


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
              <p className="text-gray-500 text-sm">
                Managing the Admin Panel
              </p>
            </div>

            <AdminCard bgColor="bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#9333ea]">
              <h1 className="text-xl mb-2 font-semibold text-white textDropShadow">
                Admin Insights
              </h1>
              <StatsGrid items={statsItems} />
            </AdminCard>

            <GraphRevenue data={revenue} />
            <PriceBreakdown />
            <InsightBrandsChart />
          </>
        )}

        {/*  FIX 2 */}
        {active === "users" && <UserSegment data={users} />}

        {active === "products" && <ProductSection data={products}   stockTrendsData={stock.stocksTrend}/>}

        {active === "orders" && <div>Orders Section</div>}
      </div>
    </main>
  );
}
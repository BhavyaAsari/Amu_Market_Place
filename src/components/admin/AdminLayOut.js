"use client";

import { useState } from "react";
import {
  LuUser,
  LuPackage,
  LuLayoutDashboard,
  LuLaptopMinimal,
} from "react-icons/lu";

import { LuTrendingUp, LuShoppingCart } from "react-icons/lu";

import StatsGrid from "./statsGrid";
import GraphRevenue from "./revenueGraphChat";
import InsightBrandsChart from "./InsigthBrandsChart";
import PriceBreakdown from "./PriceBreakdownChart";
import UserSegment from "./UserSegment/userSection";
import SideMenuAdmin from "./SideBarMenu";

export default function AdminLayout({ stats, revenueData, users }) {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    {
      key: "dashboard",
      name: "Dashboard",
      icon: LuLayoutDashboard,
    },
    {
      key: "products",
      name: "Products",
      icon: LuLaptopMinimal,
    },
    {
      key: "users",
      name: "Users",
      icon: LuUser,
    },
    {
      key: "orders",
      name: "Orders",
      icon: LuPackage,
    },
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
            <StatsGrid items={statsItems} /> 
            <GraphRevenue data={revenueData} />
            <PriceBreakdown />
            <InsightBrandsChart />
          </>
        )}

        {active === "users" && <UserSegment users={users} />}

        {active === "products" && <div>Products Section</div>}

        {active === "orders" && <div>Orders Section</div>}
      </div>
    </main>
  );
}

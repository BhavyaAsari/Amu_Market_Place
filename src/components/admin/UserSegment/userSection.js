"use client";

import { LuTriangleAlert, LuTrendingUp } from "react-icons/lu";

import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Table from "../Reusable_Components/Table";
import { LuPencil, LuBan } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toggleUserStatus } from "@/app/actions/adminActions/userActions/toggleUserStatus";
import StatsTabUser from "./statsTabs";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import AdminCard from "../adminCard";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState, useEffect, useMemo } from "react";
import Scattergraph from "../Reusable_Components/ScatterGraph";

export default function UserSegment({ data, scatterData }) {
  // console.log("data of Scatter", scatterData);
  const router = useRouter();

  //  Extract domain data
  const {
    list: users,
    stats: userStats,
    growth: usersGrowth,
    totalPages,
  } = data;

  const userScatterConfig = {
    xKey: "totalOrders",
    yKey: "totalSpent",
    zKey: "totalItems",
    minRadius: 6,
    maxRadius: 6,

    xDomain: [0, 70],
    xTicks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],

    yDomain: [0, 20000000],
    yTicks: [
      0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000,
      500000, 600000, 700000, 800000, 900000, 1000000, 2000000, 5000000,
      10000000, 15000000, 20000000,
    ],

    getColor: (item) => {
      if (item.category === "high") return "#22c55e";
      if (item.category === "medium") return "#facc15";
      return "#ef4444";
    },

    tooltipRenderer: (item) => (
      <div
        className="
      backdrop-blur-md
      bg-linear-to-br 
      from-[#4c1d95]/90 
      via-[#6d28d9]/90 
      to-[#9333ea]/90
      border border-white/20
      rounded-xl
      px-4 py-3
      shadow-xl
      text-white
      text-xs
      min-w-45
    "
      >
        {/* Title */}
        <p className="font-semibold text-sm mb-1 textDropShadow text-glow">
          👤 User Analytics
        </p>

        {/* Divider */}
        <div className="h-px bg-white/20 my-1" />

        {/* Data */}
        <div className="space-y-1 text-purple-100 textDropShadow text-glow">
          <p>
            📦 Orders: <span className="text-white">{item.totalOrders}</span>
          </p>
          <p>
            💰 Spent:{" "}
            <span className="text-white">
              ₹{item.totalSpent.toLocaleString()}
            </span>
          </p>
          <p>
            🛒 Items: <span className="text-white">{item.totalItems}</span>
          </p>
        </div>
      </div>
    ),
  };

  const [filter, setFilter] = useState("weekly");
  const [loadingId, setLoadingId] = useState(null);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const growthData = usersGrowth?.[filter] || [];
  //  Optimized mapping
  const formattedRows = useMemo(
    () =>
      users.map((user, index) => ({
        id: user._id,
        image: user.image,
        number: index + 1,
        name: user.username || user.email.split("@")[0],
        email: user.email,
        provider: user.provider,
        status: user.status || "active",
        joined: new Date(user.createdAt).toLocaleDateString(),
      })),
    [users],
  );

  //  Action with loading state
  async function handleBlock(userId) {
    setLoadingId(userId);

    const result = await toggleUserStatus(userId);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("User status updated");
      router.refresh();
    }

    setLoadingId(null);
  }

  const columns = [
    {
      key: "image",
      label: "#",
      render: (_, row) => (
        <div className="relative w-20 h-20">
          <Image
            fill
            src={row.image || "/default.png"}
            alt="user"
            className="rounded-full object-cover"
          />
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (value) => (
        <span className="font-bold text-sm text-gray-800">{value}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <span className="font-semibold text-sm text-purple-700">{value}</span>
      ),
    },
    {
      key: "provider",
      label: "Provider",
      render: (value) => {
        if (value === "google") {
          return (
            <div className="flex items-center bg-purple-200/70 backdrop-blur-sm rounded-lg px-2 py-1 gap-2">
              <FcGoogle size={20} />
              <span>Google</span>
            </div>
          );
        }

        return (
          <div className="flex items-center bg-violet-200/70 backdrop-blur-sm rounded-lg px-2 py-1 gap-2">
            <MdEmail size={20} className="text-purple-600" />
            <span>Email</span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "active"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "joined", label: "Joined on" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className=" adminActionButtonCntainer">
          <button
            className="BtnAction text-purple-500 hover:text-purple-800"
            onClick={() => router.push(`/admin/Users/edit/${row.id}`)}
          >
            <LuPencil size={18} />
          </button>

          <button
            className="BtnAction text-red-600 hover:text-red-800"
            disabled={loadingId === row.id}
            onClick={() => handleBlock(row.id)}
          >
            <LuBan size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="flex flex-col gap-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="AdminTitle">Users</h1>
        <p className="subTitleAdmin">Manage all registered users.</p>
      </div>

      {/* Stats */}
      <StatsTabUser userStats={userStats} />

      {/* Chart */}
      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
        <div className=" w-70 flex flex-col   ml-auto mr-5 -top-2 relative ">
          {/* <h2 className=" text-2xl font-semibold text-glow text-black textDropShadow">Filter</h2> */}

          <LocalDropDown
            options={filterOptions}
            value={filter}
            onChange={setFilter}
          />
        </div>

        <AnalyticalChartLayout
          title="User Growth"
          subtitle={`${filter} user growth`}
          statValue={userStats.usersThisMonth}
          statChange={`${userStats.growthPercent}% this month`}
          totalValue={userStats.totalUsers}
          totalLabel="Total users"
          data={growthData}
          dataKey="users"
          unit="users"
        />
      </AdminCard>

      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
        <section className="flex justify-between">
          <div>
            <section className="flex gap-2">
              <div className="titleContainer mt-5"></div>
              <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
                User Engagement vs Orders
              </h2>
            </section>

            <p className="text-purple-200 text-sm textDropShadow text-glow ml-5">
              Track how user activity translates into purchases
            </p>
          </div>

          <div
            className="flex flex-col gap-3 text-xs text-white mt-4 mb-4 border  border-white/20 bg-linear-to-br 
from-purple-900/40 
via-purple-700/30 
to-purple-500/30 backdrop-blur-md shadow-lg  p-2 rounded-lg  "
          >

            
            <span className="font-semibold textDropShadow ">Graph Markers</span>
            <div className="flex  flex-col gap-3 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
              <span className="flex items-center gap-1 l">
                🔴 Critical — Low conversion segment
              </span>
              <span className="flex items-center gap-1">
                🟢 Good — High engagement users
              </span>
              <span className="flex items-center gap-1">
                🟡 Low — Low activity users
              </span>
            </div>
          </div>
        </section>
        <Scattergraph data={scatterData} config={userScatterConfig} />

        <div className="mt-4 text-sm text-purple-100 flex justify-between ">
          <p className="flex gap-2">
            <LuTrendingUp size={22} className="text-green-400 text-glow " />
            <span className="textDropShadow text-glow ">
              High engagement users driving strong order growth
            </span>
          </p>
          <p className="flex gap-2">
            <LuTriangleAlert size={22} className="text-red-400 text-glow " />
            <span className="textDropShadow text-glow ">
              Many users but low orders — conversion needs improvement
            </span>
          </p>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <Table columns={columns} rows={formattedRows} totalPages={totalPages} />
      </AdminCard>
    </main>
  );
}

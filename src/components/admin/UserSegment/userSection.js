"use client";

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

export default function UserSegment({ data }) {
  const router = useRouter();

  //  Extract domain data
  const { list: users, stats: userStats, growth: usersGrowth, totalPages } = data;

  const [filter, setFilter] = useState("weekly");
  const [loadingId, setLoadingId] = useState(null);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];

const growthData = usersGrowth?.[filter] || usersGrowth;
  //  Optimized mapping
  const formattedRows = useMemo(() => 
    users.map((user, index) => ({
      id: user._id,
      image: user.image,
      number: index + 1,
      name: user.username || user.email.split("@")[0],
      email: user.email,
      provider: user.provider,
      status: user.status || "active",
      joined: new Date(user.createdAt).toLocaleDateString()
    })),
  [users]);

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
        <div className="relative w-12 h-12">
          <Image
            fill
            src={row.image || "/default.png"}
            alt="user"
            className="rounded-full object-cover"
          />
        </div>
      )
    },
    {
      key: "name",
      label: "Name",
      render: (value) => (
        <span className="font-bold text-sm text-gray-800">
          {value}
        </span>
      )
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <span className="font-semibold text-sm text-purple-700">
          {value}
        </span>
      )
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
      }
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
      )
    },
    { key: "joined", label: "Joined on" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
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
      )
    }
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
      <section className="relative flex flex-col justify-between items-center mt-24">

        <div className="absolute z-50 -top-24 w-full 
          bg-linear-to-bl from-purple-400 via-purple-500 to-purple-700 
          flex items-center justify-between px-4 py-3 rounded-xl">

          <span className="font-semibold text-white text-2xl">
            User Stats
          </span>

          <div className="w-60">
            <LocalDropDown
              options={filterOptions}
              value={filter}
              onChange={setFilter}
            />
          </div>
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

      </section>

      {/* Table */}
      <div className="max-h-125 overflow-y-auto rounded-xl">
        <Table columns={columns} rows={formattedRows} totalPages={totalPages} />
      </div>

    </main>
  );
}
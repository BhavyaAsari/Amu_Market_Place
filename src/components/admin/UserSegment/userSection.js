"use client";

import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Table from "../Reusable_Components/Table";
import { LuPencil, LuBan } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toggleUserStatus } from "@/app/actions/adminActions/toggleUserStatus";
import StatsTabUser from "./statsTabs";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import AdminCard from "../adminCard";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState, useEffect } from "react";

export default function UserSegment({ users, userStats, usersGrowth }) {

  const router = useRouter();

  const [filter, setFilter] = useState("weekly");
  const [growthData, setGrowthData] = useState(usersGrowth);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];

  // fetch chart data when filter changes
  useEffect(() => {

    async function fetchGrowth() {

      const res = await fetch(`/api/admin/usersGrowth?range=${filter}`);
      const data = await res.json();

      setGrowthData(data);

    }

    fetchGrowth();

  }, [filter]);


  async function handleBlock(userId) {

    const result = await toggleUserStatus(userId);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("User status updated");
      router.refresh();
    }

  }


  const formattedRows = users.map((user, index) => ({
    id: user._id,
    image: user.image,
    number: index + 1,
    name: user.username || user.email.split("@")[0],
    email: user.email,
    provider: user.provider,
    status: user.status || "active",
    joined: new Date(user.createdAt).toLocaleDateString()
  }));


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
            <div className="flex items-center bg-purple-200 rounded-lg p-1 gap-2">
              <FcGoogle size={28}/>
              <span>Google</span>
            </div>
          );
        }

        return (
          <div className="flex rounded-lg bg-violet-200 items-center p-1 gap-2">
            <MdEmail size={28} className="text-purple-600"/>
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
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
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
            <LuPencil size={18}/>
          </button>

          <button
            className="BtnAction text-red-600 hover:text-red-800"
            onClick={() => handleBlock(row.id)}
          >
            <LuBan size={18}/>
          </button>

        </div>

      )
    }

  ];


  return (

    <main className="flex flex-col gap-10">

      <div className="mb-6">

        <h1 className="text-2xl font-semibold text-gray-800">
          Users
        </h1>

        <p className="text-gray-700 text-sm">
          Manage all registered users.
        </p>

      </div>

      <StatsTabUser userStats={userStats} />

      {/* User Growth Chart */}

      <AdminCard>
<section className="flex justify-between items-center mb-4 ">
        <p className="font-semibold text-lg">User Stats</p>

       <div className=" w-60  h-20 rounded-xl mb-4 ">
         <LocalDropDown
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
       </div>
      </section>

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

      <Table columns={columns} rows={formattedRows} />

    </main>

  );
}
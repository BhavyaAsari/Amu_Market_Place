"use client";

import AdminCard from "./adminCard";
import LocalDropDown from "../productComponents/localDropDown";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function GraphRevenue() {

  const [filter, setFilter] = useState("monthly");
  const [datafilter, setData] = useState([]);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];

  useEffect(() => {

    async function fetchRevenue() {

      const res = await fetch(`/api/admin/revenue?range=${filter}`);
      const result = await res.json();

      // console.log("result", result);

      setData(result);

    }

    fetchRevenue();

  }, [filter]);

  return (
    <AdminCard>

      {/* Header */}
      <section className="flex justify-between items-center mb-4">
        <p className="font-semibold text-lg">Revenue Over Time</p>

        <LocalDropDown
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
      </section>

      {/* Chart */}
      <div className="chartContainer">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={datafilter}>

            <CartesianGrid stroke="#7F00FF" />

            <XAxis
              dataKey="label"
              tick={{ fill: "#c4b5fd" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#fff",
                stroke: "#c084fc",
                strokeWidth: 3
              }}
              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>

    </AdminCard>
  );
}
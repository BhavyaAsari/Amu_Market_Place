"use client";

import AdminCard from "./adminCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Cell } from "recharts";

export default function InsightBrandsChart() {
  const data = [
    { name: "Dell", value: 4000 },
    { name: "HP", value: 3000 },
    { name: "Lenovo", value: 2000 },
    { name: "Asus", value: 1500 },
  ];

  const colors = ["#60a5fa", "#a855f7", "#fb923c", "#facc15"];

  return (
    <AdminCard>
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Top Selling Brands
        </h2>

        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar dataKey="value" radius={[0,10,10,0]} barSize={14}>
  {data.map((entry, index) => (
    <Cell key={index} fill={colors[index]} />
  ))}
</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminCard>
  );
}
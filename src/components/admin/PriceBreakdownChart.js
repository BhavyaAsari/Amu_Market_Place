"use client";

import AdminCard from "./adminCard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function PriceBreakdown() {

  const data = [
    { name: "20k - 40k", value: 220 },
    { name: "40k - 60k", value: 160 },
    { name: "60k - 80k", value: 140 },
    { name: "80k+", value: 90 },
  ];

  const COLORS = [
    "#a855f7",
    "#fb923c",
    "#60a5fa",
    "#c084fc"
  ];

  return (
    <AdminCard>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">
        Price Breakdown Analysis
      </h2>

      {/* Chart */}
      <div className="chartContainer h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              stroke="none"
            >

              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-sm mt-4">

        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">

            <span
              className="w-3 h-3 rounded-full"
              style={{ background: COLORS[index] }}
            />

            <span className="text-gray-600">
              {item.name}
            </span>

          </div>
        ))}

      </div>

    </AdminCard>
  );
}
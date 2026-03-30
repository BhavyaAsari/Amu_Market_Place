"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ReusableDoubleBargraph({
  data = [],
  xKey = "region",
  bars = [],
  height = 350,
  
}) {
  return (
    <div className="w-full p-4" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={5} barCategoryGap="30%">
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" opacity={0.15} />

          <XAxis
            dataKey={xKey}
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 13 }}
            // Capitalize the label so "india" shows as "India"
            tickFormatter={(val) =>
              val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : val
            }
          />

          {/* Left axis — Orders (small whole numbers) */}
          <YAxis
            yAxisId="left"
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 13 }}
            allowDecimals={false}
            domain={[5,"auto"]}
            tickFormatter={(v) => v.toLocaleString()}
            label={{
              value: "Orders",
              angle: -90,
              position: "insideLeft",
              fill: "#ffffff",
              fontSize: 12,
              dy: 40,
            }}
          />

          {/* Right axis — Revenue (large numbers, formatted as K/M) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 13 }}
            tickFormatter={(v) => {
              if (v >= 1_000_000) return `₹${(v / 1_000_000).toFixed(1)}M`;
              if (v >= 1_000) return `₹${(v / 1_000).toFixed(0)}K`;
              return `₹${v}`;
            }}
            label={{
              value: "Revenue",
              angle: 90,
              position: "insideRight",
              fill: "#ffffff",
              fontSize: 12,
              dy: -40,
            }}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{
              background: "rgba(124, 58, 200, 0.8)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
            labelStyle={{ color: "#ddd" }}
            formatter={(value, name) => {
              // Format revenue differently from orders in the tooltip
              if (name?.toLowerCase().includes("revenue")) {
                return [`₹${value.toLocaleString()}`, name];
              }
              return [value.toLocaleString(), name];
            }}
          />

          <Legend wrapperStyle={{ color: "#ffffff", fontWeight: 500 }} />

          {bars.map((bar, index) => (
            <Bar
              key={index}
              yAxisId={bar.yAxisId || "left"} // ← use yAxisId not yAxis
              dataKey={bar.dataKey}
              name={bar.name}
              fill={
                bar.dataKey === "orders"
                  ? "url(#ordersGradient)"
                  : "url(#revenueGradient)"
              }
              style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))" }}
              radius={[4, 4, 0, 0]} // ← rounded top corners look cleaner
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
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

export default function ResusableDoubleBargraph({
  data = [],
  xKey = "region",
  bars = [],
  height = 350,
}) {
  console.log("refined child regional data", data);
  return (
    <div className="w-full p-4" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}
        barGap={5}
        barCategoryGap="30%">
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
          <CartesianGrid
            stroke="#ffffff"
            strokeDasharray="3 3"
            opacity={0.55}
          />

          <XAxis
            dataKey={xKey}
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 20 }}
          />
          <YAxis
            yAxisId="left"
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 15 }}
            allowDecimals={false}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 15 }}
          />
          <Tooltip
  cursor={{ fill: "rgba(255,255,255,0.1)" }}  
  wrapperStyle={{
    background: "transparent",
    border: "none",
  }}
  contentStyle={{
    background: "rgba(124, 58, 200, 0.8)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
  }}
  labelStyle={{ color: "#ddd" }}
  formatter={(value, name) => [value.toLocaleString(), name]}  
/>
<Legend wrapperStyle={{ color: "#ffffff", fontWeight: 500 }} />

          {bars.map((bar, index) => (
            <Bar
              key={index}
              yAxisId={bar.yAxis || "left"}
              dataKey={bar.dataKey}
              style={{
    filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))"
  }}
              name={bar.name}
              fill={
                bar.dataKey === "orders"
                  ? "url(#ordersGradient)"
                  : "url(#revenueGradient)"
              }
              radius={[0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

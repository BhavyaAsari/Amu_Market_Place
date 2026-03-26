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

    console.log("refined child regional data",data);
  return (
    <div className="w-full p-4" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey={xKey} />

          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />

          <Tooltip />
          <Legend />

          {bars.map((bar, index) => (
            <Bar
              key={index}
              yAxisId={bar.yAxis || "left"}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
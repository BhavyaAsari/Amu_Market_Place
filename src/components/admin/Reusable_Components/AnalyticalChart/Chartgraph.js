"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

import CustomToolTip from "./customToolTip";

const CustomDot = ({ cx, cy }) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#e879f9"
      stroke="white"
      strokeWidth={2}
    />
  );
};

export default function ChartGraph({ data, dataKey, unit }) {
  if (!data || data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e879f8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.25)"
          strokeDasharray="5 5"
          vertical={false}
        />

        <XAxis
          dataKey="label"
          tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 16 }}
          axisLine={false}
          tickLine={false}
          domain={[0, "dataMax + 1"]}
          tickMargin={10}
        />

        <YAxis
          axisLine={false}
          allowDecimals={false}
          domain={[0, "dataMax + 1"]}
          tickLine={false}
          tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 16 }}
        />

        <Tooltip content={<CustomToolTip unit={unit} />} />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#e879f8"
          strokeWidth={3}
          fill="url(#lineGrad)"
          dot={<CustomDot />}
          activeDot={{ r: 7 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

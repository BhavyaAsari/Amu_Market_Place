"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function Scattergraph({ data = [], config = {} }) {
  const { xKey, yKey, zKey, title, subtitle, getColor, tooltipRenderer } =
    config;

  return (
    <main className="w-full h-96">
      {/* 🔥 Dynamic Title */}
      {title && (
        <div className="mb-3">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          {subtitle && <p className="text-purple-200 text-sm">{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer>
        <ScatterChart>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
            type="number"
            dataKey={xKey}
            stroke="rgba(255,255,255,0.5)"
            domain={[0, "dataMax + 2"]}
          />

          <YAxis
            type="number"
            dataKey={yKey}
            scale="log"
            stroke="rgba(255,255,255,0.5)"
            domain={["auto", "auto"]}
          />

          <Tooltip
            content={({ payload, active }) => {
              if (!active || !payload || !payload.length) return null;
              const item = payload[0].payload;
              return tooltipRenderer ? tooltipRenderer(item) : null;
            }}
          />

          <Scatter
            data={data}
            shape={(props) => {
              const { payload, cx, cy } = props;

              const color = getColor ? getColor(payload) : "#a855f7";

              const radius = zKey ? Math.min(12, 4 + payload[zKey]) : 6;

              return (
                <circle cx={cx} cy={cy} r={radius} fill={color} stroke="#fff" />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </main>
  );
}

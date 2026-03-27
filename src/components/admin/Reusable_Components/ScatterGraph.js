"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Scattergraph({ data = [], config = {} }) {
  const {
    xKey,
    yKey,
    zKey,
    title,
    subtitle,
    getColor,
    tooltipRenderer,
    xDomain,
    xTicks,
    xTickFormatter,
    yDomain,
    yTicks,
    yTickFormatter,
    minRadius = 6,
    maxRadius = 18,
  } = config;

  // 🔹 Pre-compute min/max for normalization
  const zValues = zKey ? data.map((d) => d[zKey]) : [];
  const minZ = zValues.length ? Math.min(...zValues) : 0;
  const maxZ = zValues.length ? Math.max(...zValues) : 1;

  return (
    <main className="w-full h-96">
      {title && (
        <div className="mb-3">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          {subtitle && <p className="text-purple-200 text-sm">{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer>
        <ScatterChart margin={{ top: 80, right: 80, bottom: 10, left: 20 }}>
          <defs>
            <style>{`.recharts-surface { overflow: visible; }`}</style>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
            type="number"
            dataKey={xKey}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
            domain={xDomain || [0, "dataMax + 2"]}
            ticks={xTicks || undefined}
            tickFormatter={xTickFormatter || ((val) => val)}
          />

          <YAxis
            type="number"
            dataKey={yKey}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
            domain={yDomain || [0, "dataMax"]}
            ticks={yTicks || undefined}
            tickFormatter={
              yTickFormatter ||
              ((val) => {
                if (val >= 1000000) return `₹${(val / 1000000).toFixed(1)}M`;
                if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
                return val;
              })
            }
            width={70}
          />

          <Tooltip
            content={({ payload, active }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload;
              return tooltipRenderer ? tooltipRenderer(item) : null;
            }}
          />

          <Scatter
            data={data}
            
            shape={(props) => {
              const { payload, cx, cy } = props;
              const color = getColor ? getColor(payload) : "#a855f7";

              let radius = minRadius;
              if (zKey && payload[zKey] != null) {
                const normalized =
                  maxZ === minZ
                    ? 0.5
                    : (payload[zKey] - minZ) / (maxZ - minZ);
                radius = minRadius + normalized * (maxRadius - minRadius);
              }

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={color}
                  fillOpacity={0.85}
                            style={{
    filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))"
  }}
                  stroke="#fff"
                  strokeWidth={1}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </main>
  );
}
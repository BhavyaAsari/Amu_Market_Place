"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function PriceBreakdown({ data }) {

  const COLORS = [
    "#fdf4ff",
    "#fbcfe8",
    "#f9a8d4",
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#a855f7",
    "#6d28d9"
  ];

  // Highlight last segment (you can customize logic)
  const highlightIndex = data.length - 1;

  return (
    <>
      {/* Chart Container */}
      <div className="h-[240px] p-4 rounded-xl  shadow-xsm drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              stroke="none"
              isAnimationActive={true}
              animationDuration={800}
               labelLine={false}  
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    index === highlightIndex
                      ? "#db2777"
                      : COLORS[index % COLORS.length]
                  }
                  style={{
                    filter:
                      index === highlightIndex
                        ? "drop-shadow(0 0 10px rgba(219,39,119,0.6))"
                        : "none"
                  }}
                />
              ))}
            </Pie>

           <Tooltip
  contentStyle={{
    background: "linear-gradient(135deg, rgba(30, 20, 60, 0.7), rgba(60, 20, 80, 0.6))",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
    padding: "10px 12px"
  }}

  labelStyle={{
    color: "#e9d5ff",
    fontWeight: 600,
    fontSize: "13px",
    marginBottom: "6px",
    letterSpacing: "0.3px"
  }}

  itemStyle={{
    color: "#f5f3ff",
    fontSize: "12.5px",
    padding: "3px 0",
    opacity: 0.9
  }}

  cursor={{
    fill: "rgba(168, 85, 247, 0.15)",
    stroke: "rgba(168, 85, 247, 0.4)",
    strokeWidth: 1
  }}
/>

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Legend */}
      <div className="space-y-2 text-sm mt-4">

        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">

            <span
              className="w-3 h-3 rounded-full shadow-md"
              style={{
                background:
                  index === highlightIndex
                    ? "#db2777"
                    : COLORS[index % COLORS.length]
              }}
            />

            <span className="text-white/80 font-medium">
              {item.name}
            </span>

          </div>
        ))}

      </div>
    </>
  );
}
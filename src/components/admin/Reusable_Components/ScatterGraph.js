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


export default function Scattergraph({ data = [], xKey, yKey }) {
  console.log("data of scatter", data);

  console.log("xKey:", xKey);
  console.log("yKey:", yKey);
  console.log("sample item:", data[0]);
  console.log("x value:", data[0]?.[xKey]);
  console.log("y value:", data[0]?.[yKey]);

  return (
    <main className="w-full h-96">
      <ResponsiveContainer>
        <ScatterChart>
             <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
            type="number"
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            stroke="rgba(255,255,255,0.5)"
            domain={[0, "dataMax + 2"]}
          />

          <YAxis
            type="number"
            dataKey={yKey}
            stroke="rgba(255,255,255,0.5)"
            tickLine={false}
            ticks={[0, 25, 50, 75, 100]}
            axisLine={false}
            domain={[0, "dataMax + 10"]}
          />

         <ReferenceLine x={5} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" />
          <ReferenceLine y={50} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" />
         
         <Tooltip
  cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "3 3" }}
  animationDuration={700}
  content={({ payload,active }) => {
    if (!active ||!payload || !payload.length) return null;

    const item = payload[0].payload;

    return (
      <div className="
        backdrop-blur-md
        bg-linear-to-br 
        from-[#4c1d95]/90 
        via-[#6d28d9]/90 
        to-[#9333ea]/90
        border border-white/20
        rounded-xl
        px-4 py-3
        shadow-xl
        text-white
        text-xs
        min-w-45
      ">
        {/* Title */}
        <p className="font-semibold text-sm mb-1">
          {item.title}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/20 my-1" />

        {/* Data */}
        <div className="space-y-1 text-purple-100">
          <p>📦 Stock: <span className="text-white">{item[xKey]}</span></p>
          <p>📊 Rate: <span className="text-white">{item.sellThroughRate}%</span></p>
        </div>
      </div>
    );
  }}
/>

          <Scatter
            data={data}
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
            shape={(props) => {
              const { payload, cx, cy } = props;

              let color = "#a855f7";

              if (payload.highDemand && payload.lowStock) {
                color = "#ef4444"; //Critical
              } else if (payload.highDemand) {
                color = "#22c55e"; //Good
              } else {
                color = "#facc15"; //Low Demand
              }

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={1}
                  fillOpacity={0.8}
                  style={{
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
        }}
                  className="drop-shadow-md cursor-pointer transition-all duration-300 hover:r-8"
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </main>
  );
}

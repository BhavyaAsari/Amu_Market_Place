"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid
} from "recharts";

export default function ReusableBarChart({ data }) {
  // A palette that goes from high-energy highlight to deep, sophisticated tones
  const COLORS = [
   
  "#f0abfc",
  "#e879f9",
  "#d946ef",
  "#c026d3",
  "#86198f"

  ];

  return (
    <section className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ top: 20, right: 45, left: 40, bottom: 20 }}
        >
             <CartesianGrid
                  stroke="rgba(255,255,222,0.40)"
                  strokeDasharray="5 5"
                  vertical={false}
                />

 <XAxis 
  type="number"
  domain={[0, "dataMax + 25"]}
  hide
/>
          
          <YAxis 
            type="category" 
            
            dataKey="name" 
            width={120} 
            axisLine={false}
      tickLine={false}
            tick={{ 
              fill: '#ffffff', 
              fontSize: 14, 
              fontWeight: 500,
              // Adding a subtle shadow to text for better contrast against vibrant BGs
              style: { filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }
            }}
          />

             <Tooltip
contentStyle={{
  backgroundColor: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "10px",
  color: "#fff"
}}

            labelStyle={{ color: "#ddd6fe", fontWeight: "bold", marginBottom: "4px" }}

            itemStyle={{ color: "#f5f3ff", fontSize: "13px", padding: "2px 0" }}

            cursor={{ fill: "rgba(139, 92, 246, 0.12)" }}

          />

          <Bar 
            dataKey="value" 
            radius={[0, 15, 15, 0]} 
            barSize={28}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                // Highlight the first bar with a stroke and neon glow
                stroke={index === 0 ? "#ffffff" : "none"}
                strokeWidth={index === 0 ? 1 : 0}
                style={{
                  filter: index === 0 
                    ? "" 
                    : "none",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
            <LabelList 
              dataKey="value" 
              position="right" 
              fill="#fff" 
              offset={12} 
              style={{ fontWeight: 'bold', fontSize: '15px' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
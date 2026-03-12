import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", users: 1400 },
  { month: "Feb", users: 2200 },
  { month: "Mar", users: 1900 },
  { month: "Apr", users: 3100 },
  { month: "May", users: 2900 },
  { month: "Jun", users: 4200 },
  { month: "Jul", users: 3900 },
  { month: "Aug", users: 5200 },
];

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  return (
    <circle cx={cx} cy={cy} r={5} fill="#e879f9" stroke="white" strokeWidth={2} />
  );
};

export default function UserGrowthCard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      background: "linear-gradient(160deg, #3b0764 0%, #6d28d9 40%, #a855f7 75%, #d8b4fe 100%)",
      borderRadius: "20px",
      padding: "32px",
      width: "100%",
      maxWidth: "780px",
      boxShadow: "0 25px 60px rgba(109, 40, 217, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Glass noise overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "20px",
        background: "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e879f9", boxShadow: "0 0 8px #e879f9" }} />
        <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.3px" }}>
          User Growth
        </span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginLeft: "4px" }}>
          Monthly active users
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "36px", margin: "20px 0 28px" }}>
        <div>
          <div style={{ fontSize: "42px", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
            5,200
          </div>
          <div style={{ fontSize: "12px", color: "#a78bfa", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#34d399" }}>▲ 33%</span> this month
          </div>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
        <div>
          <div style={{ fontSize: "42px", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
            24.3k
          </div>
          <div style={{ fontSize: "12px", color: "#a78bfa", marginTop: "4px" }}>Total users</div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : v}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(59, 7, 100, 0.9)",
              border: "1px solid rgba(232, 121, 249, 0.3)",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#e879f9" }}
            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="url(#lineGrad)"
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: "#e879f9", stroke: "white", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";


import {
  Pie,
  PieChart,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const configData = {

     Processing:{label:"Processing",color:"#facc15"},
     Shipped:{label:"Shipped",color:"#3b82fe"},
     delivered:{label:"Delivered",color:"#22c55e"},
     cancelled:{label:"Cancelled",color:"#ef4444"},
    }


export default function PieChartReusable({

    data = [],
    configData = [],
    dataKey = "count",
    nameKey = "status",
}) {
  



  return (
    <>
      <div className=" w-full h-96 shadow-xsm drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)] textDropShadow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={110}
            >
              {data.map((entry, index) => (
                <Cell 
                key={index} fill={configData[entry.status]?.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [value, configData[name]?.label || name]}
            />
            {/* <Legend formatter={(value) => configData[value]?.label || value} /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

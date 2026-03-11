"use client";

import AdminCard from "./adminCard";
import {
PieChart,Pie,Cell,ResponsiveContainer,Tooltip

} from "recharts";


export default function PriceBreakdown() {

    const data = [

    { name: "20k - 40k", value: 220 },
    { name: "40k - 60k", value: 160 },
    { name: "60k - 80k", value: 140 },
    { name: "80k+", value: 90 },
    ];


    const COLORS = [
    "#a855f7",
    "#fb923c",
    "#60a5fa",
    "#c084fc"
  ];

    return (

        <>


        <AdminCard>

            <h1>Price Breakdown Analysis</h1>

            <div className="chartContainer">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie 
                         data = {data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value">

                            {data.map((entery,index) => (

                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                       
                        </Pie>
                        <Tooltip/>
                    </PieChart>

                </ResponsiveContainer>
            </div>

             {/* Labels */}
        <div className="space-y-3 text-sm">

          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[index] }}
              />

              <span>{item.name}</span>

            </div>
          ))}

        </div>

        </AdminCard>


        
        
        
        </>
    )
}
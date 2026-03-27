"use client";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState } from "react";


export default function ChartHeader({ title, subtitle } = {}) {

      const [filter, setFilter] = useState("weekly");
    

    


    return (

        <main className="">
            <div className="HeaderContainer">
                <div className="titleContainer ">
                    {/* <span className="text-[22px] tracking-[0.2em] uppercase text-violet-500 font-mono">Analytics</span> */}
                    
                              
              
                </div>

                <h2 className="text-2xl font-extrabold text-white textDropShadow text-glow ">
                      {title}
                </h2>

                <p className="text-sm text-gray-800 mt-3 font-bold textDropShadow">{subtitle}</p>

            </div>
        </main>
    )
}
"use client";

import AdminCard from "./adminCard";
import LocalDropDown from "../productComponents/localDropDown";
import { useEffect, useState } from "react";
import AnalyticalChartLayout from "./Reusable_Components/AnalyticalChart/analyticalChartLayout";

export default function GraphRevenue() {

  const [filter, setFilter] = useState("weekly");
  const [analytics, setAnalytics] = useState(null);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];

  useEffect(() => {

    async function fetchRevenue() {

      const res = await fetch(`/api/admin/revenue?range=${filter}`);
      const result = await res.json();

      setAnalytics(result);

    }

    fetchRevenue();

  }, [filter]);

  return (
    // <AdminCard>
<AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
  <section className="flex justify-between items-center  ">
        {/* <p className="font-extrabold text-3xl">Revenue Stats</p> */}

       <div className=" w-60  h-20 rounded-xl relative   ml-auto top-18">
         <LocalDropDown
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
       </div>
      </section>

      <div className="">
        {analytics && (
          <AnalyticalChartLayout
            title={analytics.title}
            subtitle={analytics.subtitle}
            statValue={analytics.statValue}
            statChange={analytics.statChange}
            totalValue={analytics.totalValue}
            totalLabel={analytics.totalLabel}
            data={analytics.data}
            dataKey={analytics.dataKey}
            unit={analytics.unit}
          />
        )}
      </div>
</AdminCard>

    // </AdminCard>
  );
}
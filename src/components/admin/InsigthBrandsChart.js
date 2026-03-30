"use client";

import AdminCard from "./adminCard";
import ReusableBarChart from "./Reusable_Components/BarChart";

export default function InsightBrandsChart() {
  const data = [
    { name: "Dell", value: 4000 },
    { name: "HP", value: 3000 },
    { name: "Lenovo", value: 2000 },
    { name: "Asus", value: 1500 },
  ];

  const colors = ["#60a5fa", "#a855f7", "#fb923c", "#facc15"];

  return (
    <div>
      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
       
        <section className="flex gap-2 p-4">
              <div className="titleContainer mt-3"></div>
            <h2 className="text-2xl font-medium  mb-4 textDropShadow text-glow text-white drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
          Top Selling Brands across the globe
        </h2>
            </section>
        <ReusableBarChart data={data} />
      </AdminCard>
    </div>
  );
}

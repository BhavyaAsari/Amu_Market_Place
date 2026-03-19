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
      <AdminCard bgColor="bg-gradient-to-br from-purple-500 via-violet-800 to-purple-500">
       
        <section className="flex gap-2 p-4">
              <div className="titleContainer mt-3"></div>
            <h2 className="text-2xl font-medium  mb-4 textDropShadow text-glow text-white">
          Top Selling Brands across the globe
        </h2>
            </section>
        <ReusableBarChart data={data} />
      </AdminCard>
    </div>
  );
}

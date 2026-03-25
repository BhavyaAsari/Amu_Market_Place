"use client";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import OrderStatsUI from "./OrderStatsCardUI";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState } from "react";

export default function OrderSegment({ data }) {
  const { orderStatsAnalytics, orderGrowthAnalysis } = data;

  console.log("Orders Growth Data", orderGrowthAnalysis);

  const [filter, setFilter] = useState("weekly");

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const growthData = orderGrowthAnalysis?.[filter] || [];

  console.log("Data of the orders", data);

  return (
    <>
      <h1>Orders Section</h1>

      <OrderStatsUI dataOrders={orderStatsAnalytics} />

      <section className="flex flex-col justify-between items-center">
        <div className=" w-70 flex flex-col  z-100 ml-auto mr-5 ">
          <LocalDropDown
            options={filterOptions}
            value={filter}
            onChange={setFilter}
          />
        </div>

        <AnalyticalChartLayout
          title="Orders Growth"
          subtitle={`${filter} order growth`}
          statValue={orderStatsAnalytics.ordersThisMonth}
          statChange={`${orderStatsAnalytics.growthPercent}% this month`}
          totalValue={orderStatsAnalytics.totalOrders}
          totalLabel="Total Orders"
          data={orderGrowthAnalysis[filter]}
          dataKey="orders"
          unit="orders"
        />
      </section>
    </>
  );
}

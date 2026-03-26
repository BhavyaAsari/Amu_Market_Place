"use client";
import AdminCard from "../adminCard";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import ResusableDoubleBargraph from "../Reusable_Components/DoubleBarchart";
import OrderStatsUI from "./OrderStatsCardUI";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState } from "react";

import { getCountries,getStates,getCities,getPostalCodes } from "@/libs/locationData";

export default function OrderSegment({ data }) {
  const { orderStatsAnalytics, orderGrowthAnalysis, orderRegionalAnalysis } = data || {};

// console.log("orderRegionalAnalysis:", orderRegionalAnalysis);
// console.log("doubleBarData:", orderRegionalAnalysis?.orderDoubleBarRegionData);
  // console.log("Orders Growth Data", orderGrowthAnalysis);

  const [selectedCountry,setSelectedCountry] = useState("");
  const [selectedState,setSelectedState] = useState("");

  const countryOptions  = getCountries();

  const stateoptions = selectedCountry
  ?getStates(selectedCountry)
  :[];

  const cityOptions = selectedState
  ? getCities(selectedCountry,selectedState)
  : [];

  const [filter, setFilter] = useState("weekly");

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const growthData = orderGrowthAnalysis?.[filter] || [];

  const RegionalData =  orderRegionalAnalysis?.data

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
          data={growthData}
          dataKey="orders"
          unit="orders"
        />
      </section>

      <AdminCard>

        <LocalDropDown 
        label="Country"
        options={[
          {
            label:"All Countries",value:""
          },
          ...countryOptions.map((c) => ({label:c,value:c})),
        ]}
        value={selectedCountry}
        onChange={(val) => {

          setSelectedCountry(val);
          setSelectedState("");
        }}
        />

        <LocalDropDown
        label="state"
        options={[

          {label:"All states",value:""},
          ...stateoptions.map((s) => ({label:s,value:s})),
        ]}
        value={selectedState}
onChange={(val) => setSelectedState(val)}        />

        <ResusableDoubleBargraph
        data={ RegionalData || []}
        xKey="region"
         bars={[
    {
      dataKey: "orders",
      name: "Orders",
      color: "#8b5cf6",
      yAxis: "left",
    },
    {
      dataKey: "revenue",
      name: "Revenue",
      color: "#22c55e",
      yAxis: "right",
    },
  ]}
         />
      </AdminCard>
    </>
  );
}

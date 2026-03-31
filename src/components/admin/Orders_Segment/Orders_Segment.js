"use client";
import AdminCard from "../adminCard";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import ResusableDoubleBargraph from "../Reusable_Components/DoubleBarchart";
import OrderStatsUI from "./OrderStatsCardUI";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState, useTransition, useEffect } from "react";

import { getRegionOrderAnalytics } from "@/app/actions/adminActions/OrdersAction/getRegionRevenue";
import {
  getCountries,
  getStates,
  getCities,
  getPostalCodes,
} from "@/libs/locationData";
import PieChartReusable from "../Reusable_Components/pieChart";
import StatsCardGraph from "../Reusable_Components/GraphStatsCards";
import StatsDetails from "../Reusable_Components/graphsStatDetails";

export default function OrderSegment({ data }) {
  const {
    orderStatsAnalytics,
    orderGrowthAnalysis,
    orderRegionalAnalysis,
    orderStatusAnalysis,
    OrdersKpiData

  } = data || {};

  // console.log("orderRegionalAnalysis:", orderRegionalAnalysis);
  // console.log("doubleBarData:", orderRegionalAnalysis?.orderDoubleBarRegionData);
  // console.log("Orders Growth Data", orderGrowthAnalysis);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [regionalData, setRegionalData] = useState(
    orderRegionalAnalysis?.data || [],
  );
  const [isPending, startTransition] = useTransition();

  const countryOptions = getCountries();

  const stateoptions = selectedCountry ? getStates(selectedCountry) : [];

  const cityOptions = selectedState
    ? getCities(selectedCountry, selectedState)
    : [];

  const [filter, setFilter] = useState("weekly");

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const growthData = orderGrowthAnalysis?.[filter] || [];

  // const RegionalData =  orderRegionalAnalysis?.data

  // console.log("Data of the orders", data);

  //Re-fetch regional data whenever country or state changes

  useEffect(() => {
    startTransition(async () => {
      const result = await getRegionOrderAnalytics({
        country: selectedCountry || undefined,
        state: selectedState || undefined,
      });

      // console.log("Result of re-fetch",result);

      if (result.success) {
        setRegionalData(result.data);
      }
    });
  }, [selectedCountry, selectedState]);

  //OrderStatus
  const configData = {
  processing: { label: "Processing", color: "#f59e0b" },  // amber    — warm, energetic
  shipped:    { label: "Shipped",    color: "#06b6d4" },  // cyan     — cool, clean
  delivered:  { label: "Delivered",  color: "#10b981" },  // emerald  — positive, done
  cancelled:  { label: "Cancelled",  color: "#F13C59"}

};


const cardsData = [

  {

    label: "Total Orders",
    value:regionalData.reduce((sum,r) => sum + r.orders,0),
  },
  {
    label:"Total Revenue",
    value:`₹${(regionalData.reduce((sum,r) => sum + r.revenue,0)/1000).toFixed(0)}k`,
  },
  {

    label: "Top Region",
    value: regionalData[0]?.region || "-",
  },
  {
    label:"Regions Shown",
    value:regionalData.length,
  },
];

const KpiCards = [
  {
    label:"Delivery Rate",
    value: `${OrdersKpiData?.data?.deliveryRate} %`,
  },
  {
    label:"Cancel Rate",
    value:`${OrdersKpiData?.data?.cancelRate } %`,
  },
  {
    label:"Average Order Value ",
    value:`₹${OrdersKpiData?.data?.AOV.toLocaleString("en-IN")}`,
  },
]

// console.log("KPI CARDS",KpiCards);

  return (
    <>
      <div className="mb-6">
        <h1 className="AdminTitle ">Orders</h1>
        <p className="subTitleAdmin font-semibold">Manage all the orders.</p>
      </div>
      <OrderStatsUI dataOrders={orderStatsAnalytics} />

      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
        <div className=" w-70 flex flex-col   ml-auto mr-5  relative -top-2 ">
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
      </AdminCard>

      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
        {isPending && <p className="text-xl ">Loading...</p>}
        <section className="flex mr-auto gap-2">
          <div className="titleContainer mt-5"></div>
          <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2 shadow-xsm drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
            Regional Analytics
          </h2>
        </section>
        <p className="text-purple-200 text-sm textDropShadow text-glow ml-5">
          {selectedState
            ? `Cities in ${selectedState}`
            : selectedCountry
              ? `States in ${selectedCountry}`
              : "Top countries by orders & revenue"}
        </p>

        {/* ← Add this summary strip */}
        <StatsCardGraph
         cards={cardsData}/>

       
        <div className="grid grid-cols-2 gap-30 relative -top-32 w-full max-w-lg ml-auto">
          {/* <h1 className="text-2xl text-white text-glow textDropShadow">Filters</h1> */}

          <LocalDropDown
            label="Country"
            options={[
              {
                label: "All Countries",
                value: "",
              },
              ...countryOptions,
            ]}
            value={selectedCountry}
            onChange={(val) => {
              setSelectedCountry(val);
              setSelectedState("");
            }}
          />

          <LocalDropDown
            label="state"
            options={[{ label: "All states", value: "" }, ...stateoptions]}
            value={selectedState}
            onChange={(val) => setSelectedState(val)}
          />
        </div>

        <ResusableDoubleBargraph
          data={regionalData || []}
          xKey="region"
          bars={[
            {
              dataKey: "orders",
              name: "Orders",
              color: "#7c3aed",
              yAxisId: "left",
            },
            {
              dataKey: "revenue",
              name: "Revenue",
              color: "#4c1d95",
              yAxisId: "right",
            },
          ]}
        />
      </AdminCard>
<div className="bg-linear-to-tl from-purple-600 via-purple-400 to-purple-800 rounded-lg max-w-3xl">

  {/* 🔹 Header */}
  <div className="flex flex-col gap-1 mb-4">
    <section className="flex gap-2 ml-4"> <div className="titleContainer mt-5"></div> <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]"> Order Status Analytics </h2> </section>
    <p className="text-purple-200 text-sm ml-4">
      Status distribution snapshot
    </p>
  </div>

  {/* 🔹 KPI Cards */}
  <div className="mb-5">
    <StatsCardGraph cards={KpiCards} />
  </div>

  {/* 🔹 Chart + Details */}
  <div className="flex flex-col lg:flex-row gap-6 items-start">

    {/* 📊 Pie Chart */}
    <div className="flex-1 w-full">
      <PieChartReusable
        data={orderStatusAnalysis?.data || []}
        configData={configData}
        nameKey="status"
        dataKey="count"
      />
    </div>

    {/* 📋 Details */}
    <div className="w-full lg:w-75 mr-4">
      <StatsDetails
        statsDetails={orderStatusAnalysis?.data || []}
        statConfig={configData}
      />
    </div>

  </div>
</div>    </>
  );
}

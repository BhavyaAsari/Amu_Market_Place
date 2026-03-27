"use client";
import AdminCard from "../adminCard";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import ResusableDoubleBargraph from "../Reusable_Components/DoubleBarchart";
import OrderStatsUI from "./OrderStatsCardUI";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState,useTransition,useEffect } from "react";

import { getRegionOrderAnalytics } from "@/app/actions/adminActions/OrdersAction/getRegionRevenue";
import { getCountries,getStates,getCities,getPostalCodes } from "@/libs/locationData";

export default function OrderSegment({ data }) {
  const { orderStatsAnalytics, orderGrowthAnalysis, orderRegionalAnalysis } = data || {};

// console.log("orderRegionalAnalysis:", orderRegionalAnalysis);
// console.log("doubleBarData:", orderRegionalAnalysis?.orderDoubleBarRegionData);
  // console.log("Orders Growth Data", orderGrowthAnalysis);

  const [selectedCountry,setSelectedCountry] = useState("");
  const [selectedState,setSelectedState] = useState("");
  const [regionalData,setRegionalData] = useState(orderRegionalAnalysis?.data || []);
  const[isPending,startTransition] = useTransition();


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

      if(result.success) {

        setRegionalData(result.data);
      }
    });

  },[selectedCountry,selectedState]);

  return (
    <>
<div className="mb-6">
        <h1 className="AdminTitle">Orders</h1>
        <p className="subTitleAdmin font-semibold">Manage all the orders.</p>
      </div>
      <OrderStatsUI dataOrders={orderStatsAnalytics} />

      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400  to-purple-800">
        <div className=" w-70 flex flex-col  z-100 ml-auto mr-5  relative top-15 ">
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

        <div className="flex flex-col w-60 ml-auto">
          {/* <h1 className="text-2xl text-white text-glow textDropShadow">Filters</h1> */}
          <LocalDropDown 
        label="Country"
        options={[
          {
            label:"All Countries",value:""
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
        options={[

          {label:"All states",value:""},
          ...stateoptions,
        ]}
        value={selectedState}
onChange={(val) => setSelectedState(val)}        />
        </div>

        <ResusableDoubleBargraph
        data={ regionalData || []}
        xKey="region"
         bars={[
    {
      dataKey: "orders",
      name: "Orders",
      color: "#7c3aed",
      yAxis: "left",
    },
    {
      dataKey: "revenue",
      name: "Revenue",
      color: "#4c1d95",
      yAxis: "right",
    },
  ]}
         />
      </AdminCard>
    </>
  );
}

"use client";
import AdminCard from "../adminCard";
import StatsGrid from "../Reusable_Components/statsGrid";
import {
  LuPackageCheck,
  LuPackageX,
  LuShoppingCart,
  LuClock,
} from "react-icons/lu";

export default function OrderStatsUI({ dataOrders }) {

  console.log("data Orders UI",dataOrders);
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-Us", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const items = [
    {
      label: "Total Orders",
      value: dataOrders.totalOrders,
      icon: LuShoppingCart,
    },

    {
      label: "Pending Payment",
      value: dataOrders.totalPaymentPending,
      icon: LuClock,
    },

    {
      label: "Today's Orders",
      subLabel:`(${formattedDate})`,
      value: dataOrders.newTodayOrders,
      icon:LuPackageCheck,
    },

    {
      label: "Cancelled Orders",
      value: dataOrders.totalCancelledOrders,
      icon: LuPackageX,
    },
  ];
  return (
    <>
      <AdminCard bgColor="bg-gradient-to-b from-[#4c1d95] via-[#6d28d9 #9333ea] to-[#9333ea]">
        <h1 className="font-semibold text-white text-xl mb-3 textDropShadow">
          Orders Insight
        </h1>
        <StatsGrid items={items} />
      </AdminCard>
    </>
  );
}

"use client";

import { toast } from "react-toastify";
import AdminCard from "../adminCard";
import AnalyticalChartLayout from "../Reusable_Components/AnalyticalChart/analyticalChartLayout";
import ResusableDoubleBargraph from "../Reusable_Components/DoubleBarchart";
import OrderStatsUI from "./OrderStatsCardUI";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState, useTransition, useEffect, useMemo } from "react";
import { updateOrderStatus } from "@/app/actions/adminActions/OrdersAction/updateOrderStatus";
import { updatePaymentStatus } from "@/app/actions/adminActions/OrdersAction/updatePaymentStatus";
import { getRegionOrderAnalytics } from "@/app/actions/adminActions/OrdersAction/getRegionRevenue";
import { getCountries, getStates } from "@/libs/locationData";
import PieChartReusable from "../Reusable_Components/pieChart";
import StatsCardGraph from "../Reusable_Components/GraphStatsCards";
import StatsDetails from "../Reusable_Components/graphsStatDetails";
import Table from "../Reusable_Components/Table";

export default function OrderSegment({ data }) {
  const {
    orderStatsAnalytics,
    orderGrowthAnalysis,
    orderRegionalAnalysis,
    orderStatusAnalysis,
    OrdersKpiData,
    orderDetailAnalysis,
  } = data || {};

  const totalPages = orderDetailAnalysis?.pagination?.totalPages || 1;

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [regionalData, setRegionalData] = useState(orderRegionalAnalysis?.data || []);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("weekly");
  const [optimisticOverrides, setOptimisticOverrides] = useState({});

  const countryOptions = getCountries();
  const stateOptions = selectedCountry ? getStates(selectedCountry) : [];
  const growthData = orderGrowthAnalysis?.[filter] || [];

  const rows = useMemo(() => {
    const ords = orderDetailAnalysis?.orders || [];
    return ords.map((order) => ({
      id: order._id,
      orderNumber: order.orderNumber,
      user: {
        name: order.user?.username || order.user?.email || "N/A",
        email: order.user?.email || "",
      },
      items: order.items || [],
      total: order.total,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      shippingAddress: {
        city: order.shippingAddress?.city || "",
        state: order.shippingAddress?.state || "",
      },
      createdAt: order.createdAt,
      ...optimisticOverrides[order._id],
    }));
  }, [orderDetailAnalysis, optimisticOverrides]);

  useEffect(() => {
    startTransition(async () => {
      const result = await getRegionOrderAnalytics({
        country: selectedCountry || undefined,
        state: selectedState || undefined,
      });
      if (result.success) {
        setRegionalData(result.data);
      }
    });
  }, [selectedCountry, selectedState]);

  const filterOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  const orderStatusOptions = [
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const paymentStatusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Paid", value: "paid" },
    { label: "Failed", value: "failed" },
  ];

  const configData = {
    processing: { label: "Processing", color: "#f59e0b" },
    shipped: { label: "Shipped", color: "#06b6d4" },
    delivered: { label: "Delivered", color: "#10b981" },
    cancelled: { label: "Cancelled", color: "#F13C59" },
  };

  const cardsData = [
    { label: "Total Orders", value: regionalData.reduce((sum, r) => sum + r.orders, 0) },
    {
      label: "Total Revenue",
      value: `₹${(regionalData.reduce((sum, r) => sum + r.revenue, 0) / 1000).toFixed(0)}k`,
    },
    { label: "Top Region", value: regionalData[0]?.region || "-" },
    { label: "Regions Shown", value: regionalData.length },
  ];

  const KpiCards = [
    { label: "Delivery Rate", value: `${OrdersKpiData?.data?.deliveryRate} %` },
    { label: "Cancel Rate", value: `${OrdersKpiData?.data?.cancelRate} %` },
    { label: "Average Order Value", value: `₹${OrdersKpiData?.data?.AOV.toLocaleString("en-IN")}` },
  ];

  const columns = [
    {
      key: "orderNumber",
      label: "Order ID",
      render: (value) => <span className="font-bold text-sm text-gray-800">{value}</span>,
    },
    {
      key: "user",
      label: "Customer",
      render: (_, row) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">{row.user?.name}</span>
          <span className="text-xs font-semibold text-gray-500">{row.user?.email}</span>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (value) => (
        <span className="text-sm text-gray-600 font-semibold">{value?.length || 0} items</span>
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (value) => <span className="font-semibold">₹{value}</span>,
    },
    {
      key: "payment",
      label: "Payment",
      render: (_, row) => (
        <div>
          <div className="font-semibold text-lg">{row.paymentMethod}</div>
          <div className="text-xs font-semibold">{row.paymentStatus}</div>
        </div>
      ),
    },
    {
      key: "orderStatus",
      label: "Status",
      render: (value) => {
        const base = "px-2 py-2 rounded text-xs font-semibold";
        if (value === "processing") return <span className={`${base} bg-amber-100 text-amber-600`}>Processing</span>;
        if (value === "shipped") return <span className={`${base} bg-cyan-100 text-cyan-600`}>Shipped</span>;
        if (value === "delivered") return <span className={`${base} bg-emerald-100 text-emerald-600`}>Delivered</span>;
        return <span className={`${base} bg-rose-100 text-rose-600`}>Cancelled</span>;
      },
    },
    {
      key: "location",
      label: "Location",
      render: (_, row) => (
        <span className="font-semibold">
          {row.shippingAddress.city}, {row.shippingAddress.state}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex flex-col gap-2 min-w-35">
          <LocalDropDown
            label="Order Status"
            labelSize="sm"
            options={orderStatusOptions}
            value={row.orderStatus}
            onChange={async (val) => {
  const prev = optimisticOverrides[row.id]?.orderStatus ?? row.orderStatus;
  setOptimisticOverrides((o) => ({
    ...o,
    [row.id]: { ...o[row.id], orderStatus: val },
  }));

  const result = await updateOrderStatus(row.id, val);

  if (result?.success) {
    toast.success("Order status updated!");
  } else {
    toast.error(result?.message || "Failed to update order status");
    setOptimisticOverrides((o) => ({
      ...o,
      [row.id]: { ...o[row.id], orderStatus: prev },
    }));
  }
}}
          />
          <LocalDropDown
            label="Payment Status"
            labelSize="sm"
            options={paymentStatusOptions}
            value={row.paymentStatus}
            onChange={async (val) => {
  const prev = optimisticOverrides[row.id]?.paymentStatus ?? row.paymentStatus;
  setOptimisticOverrides((o) => ({
    ...o,
    [row.id]: { ...o[row.id], paymentStatus: val },
  }));

  const result = await updatePaymentStatus(row.id, val);

  if (result?.success) {
    toast.success("Payment status updated!");
  } else {
    toast.error(result?.message || "Failed to update payment status");
    setOptimisticOverrides((o) => ({
      ...o,
      [row.id]: { ...o[row.id], paymentStatus: prev },
    }));
  }
}}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="AdminTitle">Orders</h1>
        <p className="subTitleAdmin">Manage all the orders.</p>
      </div>

      <OrderStatsUI dataOrders={orderStatsAnalytics} />

      {/* Growth */}
      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400 to-purple-800">
        <div className="flex justify-end mb-4">
          <LocalDropDown options={filterOptions} value={filter} onChange={setFilter} />
        </div>
        <AnalyticalChartLayout
          title="Orders Growth"
          subtitle={`${filter} order growth`}
          statValue={orderStatsAnalytics.ordersThisMonth}
          statChange={`${orderStatsAnalytics.growthPercent}`}
          totalValue={orderStatsAnalytics.totalOrders}
          totalLabel="Total Orders"
          data={growthData}
          dataKey="orders"
        />
      </AdminCard>

      {/* Regional */}
      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400 to-purple-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <section className="flex gap-2">
              <div className="titleContainer mt-5"></div>
              <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
                Regional Analytics
              </h2>
            </section>
            <p className="text-purple-200 text-sm textDropShadow text-glow ml-5">
              Track how user activity translates into purchases
            </p>
          </div>
          <div className="flex gap-10 w-96">
            <LocalDropDown
              options={[{ label: "All Nations", value: "" }, ...countryOptions]}
              value={selectedCountry}
              onChange={(val) => {
                setSelectedCountry(val);
                setSelectedState("");
              }}
            />
            <LocalDropDown
              options={[{ label: "All states", value: "" }, ...stateOptions]}
              value={selectedState}
              onChange={setSelectedState}
            />
          </div>
        </div>
        <StatsCardGraph cards={cardsData} />
        <ResusableDoubleBargraph
          data={regionalData || []}
          xKey="region"
          bars={[
            { dataKey: "orders", name: "Orders", color: "#7c3aed", yAxisId: "left" },
            { dataKey: "revenue", name: "Revenue", color: "#4c1d95", yAxisId: "right" },
          ]}
        />
      </AdminCard>

      {/* Status */}
      <AdminCard bgColor="bg-linear-to-tl from-purple-600 via-purple-400 to-purple-800">
        <div>
          <section className="flex gap-2">
            <div className="titleContainer mt-5"></div>
            <h2 className="font-extrabold text-white text-2xl textDropShadow text-glow mt-2 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.6)]">
              Order Status Analytics
            </h2>
          </section>
          <p className="text-purple-200 text-sm textDropShadow text-glow ml-5">
            Track how user activity translates into purchases
          </p>
        </div>
        <div className=""><StatsCardGraph cards={KpiCards} /></div>
        <div className="flex flex-col lg:flex-row gap-6">
          <PieChartReusable
            data={orderStatusAnalysis?.data || []}
            configData={configData}
            nameKey="status"
            dataKey="count"
          />
          <div className="min-w-sm">
            <StatsDetails statsDetails={orderStatusAnalysis?.data || []} statConfig={configData} />
          </div>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <Table columns={columns} rows={rows} totalPages={totalPages} />
        </div>
      </AdminCard>
    </div>
  );
}
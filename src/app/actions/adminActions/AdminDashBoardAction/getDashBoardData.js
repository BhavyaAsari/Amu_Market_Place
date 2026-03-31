"use server";

import { connectDB } from "@/libs/db";

import { getProductStats } from "../productActions/getProductStats";
import { getRevenueData } from "../productActions/getRevenueData";
import { getTopSellingProducts } from "../productActions/getTopSellingProducts";
import { getProductAnalytics } from "../productActions/getProductAnalytics";
import { getProductDetails } from "../productActions/getProductDetails";
import { getStockTrend } from "../productActions/getStockVsSoldTopProducts";
import { getCustomersScatterData } from "./getDashBoardUserSpendingOnOrders";

//Users
import { getUsersDetails } from "../userActions/getUserDetails";
import { getUsersGrowth } from "../userActions/getUsersGrowth";
import { getUserStats } from "../userActions/getUserStats";
import { getPriceBreakDown } from "./getPriceBreakDownWithInsights";

//Orders
import { getOrderStats } from "../OrdersAction/getOrderStats";
import { getOrdersGrowth } from "../OrdersAction/getOrderGrowth";
import { getRegionOrderAnalytics } from "../OrdersAction/getRegionRevenue";
import { getOrderStatusDistribution } from "../OrdersAction/getOrderStatusDistribution";
import { getKpiStats } from "../OrdersAction/getKPIStats";

export async function getDashBoardData({search,page}) {

    await connectDB();

    try {

       const [
  productStats,
  revenue,
  topProducts,
  productAnalytics,
  productsData,
  usersData,
  userStats,
  usersGrowth,
  stockVsSoldData,
  priceBreakDownAnalytics,
  UsersVsOrdersData,
  orderStatsCard,
  ordersGrowth,
  orderDoubleBarRegionData,
  orderStatusData,
  KPIData
] = await Promise.all([
  getProductStats(),
  getRevenueData(),
  getTopSellingProducts(),
  getProductAnalytics(),
  getProductDetails({ search, page }),
  getUsersDetails({ search, page }),
  getUserStats(),
  getUsersGrowth(),
  getStockTrend(),
  getPriceBreakDown(),
  getCustomersScatterData(),
  getOrderStats(),
  getOrdersGrowth(),
  getRegionOrderAnalytics(),
  getOrderStatusDistribution(),
  getKpiStats(),
]);

      return {
  stats: productStats,
  revenue,

  users: {
    list: usersData.users,
    totalPages: usersData.totalPages,
    stats: userStats,
    growth: usersGrowth
  },

  products: {
    list: productsData.productsDetails,
    totalPages: productsData.productPages,
    analytics: productAnalytics,
    topSelling: topProducts
    
  },

  stock:{
    stocksTrend:stockVsSoldData
  },

  analyticsData: {
     priceAnalysis:priceBreakDownAnalytics
  },

  usersVsorders : {

    scatterDataUsers:UsersVsOrdersData?.data || []
  },

  ordersDataObject : {

    orderStatsAnalytics:orderStatsCard,
    orderGrowthAnalysis:ordersGrowth,
    orderRegionalAnalysis:orderDoubleBarRegionData,
    orderStatusAnalysis:orderStatusData,
    OrdersKpiData:KPIData
  }
};

    }  catch (error) {
    console.error("Dashboard error:", error);
    return null;
  }
}
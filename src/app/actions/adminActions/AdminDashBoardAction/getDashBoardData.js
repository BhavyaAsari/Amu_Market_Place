"use server";

import { connectDB } from "@/libs/db";

import { getProductStats } from "../productActions/getProductStats";
import { getRevenueData } from "../productActions/getRevenueData";
import { getTopSellingProducts } from "../productActions/getTopSellingProducts";
import { getProductAnalytics } from "../productActions/getProductAnalytics";
import { getProductDetails } from "../productActions/getProductDetails";
import { getStockTrend } from "../productActions/getStockVsSoldTopProducts";

//Users
import { getUsersDetails } from "../userActions/getUserDetails";
import { getUsersGrowth } from "../userActions/getUsersGrowth";
import { getUserStats } from "../userActions/getUserStats";

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
  stockVsSoldData
] = await Promise.all([
  getProductStats(),
  getRevenueData(),
  getTopSellingProducts(),
  getProductAnalytics(),
  getProductDetails({ search, page }),
  getUsersDetails({ search, page }),
  getUserStats(),
  getUsersGrowth(),
  getStockTrend()
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
  }
};

    }  catch (error) {
    console.error("Dashboard error:", error);
    return null;
  }
}
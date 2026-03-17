"use server";

import { connectDB } from "@/libs/db";

import { getProductStats } from "./getProductStats";
import { getRevenueData } from "./getRevenueData";
import { getTopSellingProducts } from "./getTopSellingProducts";
import { getProductAnalytics } from "./getProductAnalytics";
import { getProductDetails } from "./getProductDetails";

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
  usersGrowth
] = await Promise.all([
  getProductStats(),
  getRevenueData(),
  getTopSellingProducts(),
  getProductAnalytics(),
  getProductDetails({ search, page }),
  getUsersDetails({ search, page }),
  getUserStats(),
  getUsersGrowth()
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
  }
};

    }  catch (error) {
    console.error("Dashboard error:", error);
    return null;
  }
}
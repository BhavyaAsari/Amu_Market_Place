import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export async function getProductAnalytics() {

  await connectDB();

  try {

    const [
      totalProducts,
      blockedProducts,
      activeProducts,
      outOfStock,
      sold
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: "inactive" }),
      Product.countDocuments({ status: "active" }),
      Product.countDocuments({ stock: 0 }),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalSold: { $sum: "$soldCount" }
          }
        }
      ])
    ]);

    return {
      totalProducts,
      activeProducts,
      blockedProducts,
      outOfStock,
      totalUnitsSold: sold[0]?.totalSold || 0
    };

  } catch (error) {

    console.error("Something went wrong", error);

    return {
      totalProducts: 0,
      activeProducts: 0,
      blockedProducts: 0,
      outOfStock: 0,
      totalUnitsSold: 0
    };
  }
}
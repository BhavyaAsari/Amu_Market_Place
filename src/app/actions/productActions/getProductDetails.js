import { products } from "@/app/data/products";
import { connectDB } from "@/libs/db"
import Product from "@/models/Product"


export async function getProductDetails({ search = "", page = 1 }) {

  await connectDB();

  try {

    const limit = 100;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } }
        ]
      };
    }

    const products = await Product.find(query)
      .select("title price image category brand stock status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    const productPages = Math.ceil(totalProducts / limit);

    return {
      productsDetails: JSON.parse(JSON.stringify(products)),
      productPages
    };

  } catch (error) {

    console.error("Error", error);

    return {
      productsDetails: [],
      productPages: 0
    };
  }
}
"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export  async function getProductById(id) {
  await connectDB();

  const product = await Product.findById(id);


  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
}

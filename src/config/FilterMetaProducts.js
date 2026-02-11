"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export async function getMetaDataFilter() {

    await connectDB();

    const brands = await Product.distinct("brand");
  const rams = await Product.distinct("specs.ram");
  const storages = await Product.distinct("specs.storage");
  const processors = await Product.distinct("specs.processor");
  
  
  return {
    brands,
    rams,
    storages,
    processors,
  };
    
}
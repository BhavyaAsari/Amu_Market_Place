"use server";
import { connectDB } from "@/libs/db";
import Product from "@/models/Product";


export default async function getBrands() {

    await connectDB();

    const brands = await Product.distinct("brand");

    return brands;
}
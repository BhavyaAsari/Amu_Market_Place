"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export default async function getAllLaptops() {

    try {

        await connectDB();

        const Laptops = await Product.find({}).select(

            "id brand series title price image rating specs"
        ).sort({ createdAt: -1 })
        .limit(6)
        .lean();

        return Laptops;


    } catch(error) {

        console.error("Error fetching Laptops",error);
        throw new Error("Failed to fetch Laptops");

    }

}
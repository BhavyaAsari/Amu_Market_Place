"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";


export async function getTopSellingProducts() {

    await connectDB();

    try {
        
        //Extracting Top Selling Brands.
        const topSellingData = await Product.find({})
        .select("title soldCount brand")
        .sort({soldCount:-1})
        .limit(5);

        return JSON.parse(JSON.stringify(topSellingData));


    } catch(error) {

        console.error("Something went wrong ",error);
        return [];
    }


}
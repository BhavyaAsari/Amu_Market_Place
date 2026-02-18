"use server";
import { connectDB } from "@/libs/db";
import Product from "@/models/Product";
import { formatFeaturedProducts } from "@/libs/featuredProductsFormat";

export default async function getFeaturedProducts(limit=5) {


    try {

            await connectDB();

            // Fetch distinct brands
            const brands = await Product.distinct("brand");

              if (!brands || brands.length === 0) {
                return [];
            }

            const selectedBrands = brands.slice(0,limit);
            const featuredProducts = [];

            for(const brand of selectedBrands) {

                const product = await Product.findOne({brand}).lean();

                if(product) {

                    featuredProducts.push(formatFeaturedProducts(product))
                }

               
            }

             return featuredProducts;


    } catch(error) {

        console.error("Error fetching featured Products",error);
        return [];


    }

}


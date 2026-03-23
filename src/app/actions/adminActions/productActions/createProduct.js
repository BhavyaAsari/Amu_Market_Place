"use server";

import Product from "@/models/Product";
import { connectDB } from "@/libs/db";
import { authOptions } from "@/libs/authOptions";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { products } from "@/app/data/products";


export async function createProduct (data) {

    await connectDB();

    const session = await getServerSession(authOptions)

    if(!session || session.user.role !== "admin") {

        return {success:false,message:"Unauthorized"};
    }

    try {


        const newProduct = await Product.create({

            title:data.title,
            shortDescription:data.shortDescription || "",
            price:data.price,
            stock:data.stock,
            discount:data.discount || 0,
            image:data.image,
            images:data.images || [],
            status:data.status || "active",
        });


        // revalidatePath("")

        return {success:true,product: newProduct};


    } catch(error) {

        console.error(error);

        return {

            success:false,message:"Error creating product"
        };
    }


}
"use server";

import Product from "@/models/Product";
import { connectDB } from "@/libs/db";
import { authOptions } from "@/libs/authOptions";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import crypto from "crypto";

function generateProductId(title) {

    const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

    return `${base}-${crypto.randomBytes(3).toString("hex")}`;
}

async function  generateUniqueId(title) {

    let id;
    let exists = true;

    while(exists) {

        id =  generateProductId(title);
        exists = await Product.findOne({id});
    }

    return id;
    
}

export async function createProduct (data) {

    await connectDB();

    const session = await getServerSession(authOptions)

    if(!session || session.user.role !== "admin") {

        return {success:false,message:"Unauthorized"};
    }

    try {


        const id = await generateUniqueId(data.title);

        const newProduct = await Product.create({

            id,


            title:data.title,
            brand:data.brand,
            series:data.series,
            shortDescription:data.shortDescription,
            price:data.price,
            stock:data.stock,
            discount:data.discount || 0,
            image:data.image,
            status:data.status || "active",

            specs:data.specs || {},
        });


        // revalidatePath("")

        return {success:true,product: newProduct.toObject()};


    } catch(error) {

        console.error(error);

        return {

            success:false,message:"Error creating product"
        };
    }


}
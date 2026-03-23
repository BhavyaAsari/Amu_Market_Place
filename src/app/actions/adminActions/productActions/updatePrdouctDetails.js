"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { adminGuard } from "@/libs/adminGuard";
import { revalidatePath } from "next/cache";

export async function updateProductAdmin(productId,data) {

    try {

        await connectDB();

        //Getting AdminId from server session
        const session = await getServerSession(authOptions);
        
        if(!session || session.user.role !== "admin") {

            return {success:false,message:"Unauthorized"};
        }

        const allowedFields = [

            "price",
            "title",
            "brand",
            "discount",
            "image",
            "images",
            "stock",
            "status"
        ];


        const updateData = {};

        for(let key of allowedFields) {

            if(data[key] !== undefined) {

                updateData[key] = data[key];
            }
        }


        const updated = await Product.findByIdAndUpdate(

            productId,
            {$set:updateData},
            {new:true}
        );

        revalidatePath("/admin/adminProduct/edt/${row.id}");


        return {success:true, message:"Product Updated Successfully"};

    } catch(error) {

        console.error(error);

        return {success:false,message:"server error"};
    }
}
"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { adminGuard } from "@/libs/adminGuard";
import { revalidatePath } from "next/cache";
import Logs from "@/models/Logs";
import { logAdminAction } from "@/libs/logger";

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

        //Get Existing Project First
        const existingProduct = await Product.findById(productId);

        if(!existingProduct) {

            return {success:false, message: "Product not found"};
        }


        const updateData = {};
        const before = {};
        const after = {};

        for(let key of allowedFields) {

            if(data[key] !== undefined && data[key] !==  existingProduct[key]) {

                updateData[key] = data[key];

                before[key] =  existingProduct[key];
                after[key] = data[key];
            }
        }

        //No change occured
        if(Object.keys(updateData).length === 0) {

            return {success:false,message:"No changes detected"};
        }


         await Product.findByIdAndUpdate(

            productId,
            {$set:updateData},
            {new:true}
        );


        await logAdminAction({

            adminId,
            adminName,
            action:"Update Product",
            module:"Product",
            targetId:productId,
            before,
            after
        });

        revalidatePath("/admin/adminProduct/edt/${row.id}");


        return {success:true, message:"Product Updated Successfully"};

    } catch(error) {

        console.error(error);

        return {success:false,message:"server error"};
    }
}
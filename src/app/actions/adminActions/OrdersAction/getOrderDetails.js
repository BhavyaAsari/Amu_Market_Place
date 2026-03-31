"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { pagination } from "@heroui/theme";
import { unstable_cache } from "next/cache";

async function getCachedOrder({

    page =1,
    limit=10,
    status,
    search,
    paymentStatus,
}) {


    await connectDB();

    const skip = (page - 1 ) * limit;

    let query = {};

    if(status) {

        query.orderStatus = status;
    }

    if(paymentStatus) {

        query.paymentStatus = paymentStatus;
    }

    if(search) {

        query.$or = [

            {orderNumber: { $regex: search, $options:"i"}},
            {"shippingAddress.phone" : {$regex:search,$options: "i"}},
        ];
    }

    const [orders,total] = await Promise.all([

        Orders.find(query)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .populate("user","name email"),

        Orders.countDocuments(query),
    ]);


    return {

        orders,
        pagination : {

            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        },
    };
}


export const getOrderDetails = async (params = {}) =>  {

    return unstable_cache(

        async () => getCachedOrder(params),
        [

            "orders",
            JSON.stringify(params),
        ],
        {

            revalidate:60,
            tags:["orders"],
        }
    )
}
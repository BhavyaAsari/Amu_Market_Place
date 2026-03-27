"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";

export async function getRegionOrderAnalytics({country,state }= {}) {

            await connectDB();


    try {

        let match = {

            OrderStatus:{$ne:"cancelled"},
        };

        if(country) {

            match["shippingAddress.country"] = country;
        }

        if(state) {

            match["shippingAddress.state"] = state;
        }


        const data = await Orders.aggregate([

            {$match:match},

            {

                $group: {
                    
                    _id:state
                    ?"$shippingAddress.city"
                    : country
                    ? "$shippingAddress.state"
                    : "$shippingAddress.country",

                    totalOrders:{$sum:1},
                    totalRevenue:{$sum:"$total"},

                },
            },

            {

                $project : {

                    region:"$_id",
                    orders:"$totalOrders",
                    revenue:"$totalRevenue",
                    _id:0,
                },
            },

            {$sort:{orders: -1}},
            {$limit:5},
        ]);


        return {

            success:true,
            data,
        };

    
    } catch(error) {

        console.error("Region  Analytics error: ",error);

        return {

            success:false,
            data:[],
        };
    }
}
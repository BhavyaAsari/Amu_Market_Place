"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";


export async function getKpiStats() {

    await connectDB();

    try {

        const result = await Orders.aggregate([
            {

                $facet:{

                    totalOrders:[{$count:"count"}],

                    totalRevenue: [{

                        $group: {

                            _id:null,
                            total:{$sum: "$total"},
                        },
                    },
                ],

                statusCounts: [

                    {

                        $group: {

                            _id: "$orderStatus",
                            count:{$sum:1},
                        },
                    },
                ],
                
                },
        },
            
        ]);


        const KPIData = result[0];

        //Extract Values
        const totalOrders = KPIData.totalOrders[0]?.count || 0;
        const totalRevenue = KPIData.totalRevenue[0]?.total || 0;

        let delivered = 0;
        let cancelled = 0;

        KPIData.statusCounts.forEach((item) => {

            if(item._id === "delivered") delivered = item.count;
            if(item._id === "cancelled") cancelled = item.count;
         });


         const deliveryRate = totalOrders ? ((delivered/totalOrders)*100).toFixed(1)
         : 0;

         const cancelRate = totalOrders ? ((cancelled/totalOrders)*100).toFixed(1)
         : 0;

         const AOV = totalOrders ? Math.round(totalRevenue/totalOrders)
         : 0;



         return {

            success:true,
            data: {

                deliveryRate,
                cancelRate,
                AOV,
            },
         };

    }

    catch(error) {


        console.error("KPI Error",error);

        return {

            success:false,
            KPIData:{}
        }
    }


}
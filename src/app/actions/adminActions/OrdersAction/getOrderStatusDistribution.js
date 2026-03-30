"use server";
import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";
export async function getOrderStatusDistribution() {

    await connectDB();
    try {

        const data = await Orders.aggregate([

            {

                $group: {

                    _id: "$orderStatus",
                    count:{$sum:1},
                },
            },

            {

                $project: {

                    status:"$_id",
                    count:1,
                    _id:0,
                },
            },

        ]);

                    return {success:true,data};




    } catch(error) {

        console.log("Error in Order Status :",error); 
        return {success:false,data:[]};
    }





    

}
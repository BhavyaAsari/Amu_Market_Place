import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export async function getStockTrend() {

    await connectDB();

    try {

        const data = await Product.aggregate([

            //Filter only Active Products
           {
             $match:{status:"active",stock: { $gt: 0 }}
                
           },

            {
                 $addFields: {
          stockNum: { $toDouble: "$stock" },
          soldNum: { $toDouble: "$soldCount" }
        }
            },

           {

            //Compute Total units
            $addFields: {

                totalUnits:{$add:["$stockNum", "$soldNum"]}
            }
           },

           {

            //compute sell through rate
            $addFields: {

                sellThroughRate: {

                    $cond: [

                        {$eq:["$totalUnits",0]},
                        0,
                        {

                            $round:[
                                {

                                    $multiply:[

                                        {$divide:["$soldNum","$totalUnits"]},
                                        100
                                    ]
                                },
                                1
                            ]
                        }
                    ]
                }
            }
           },

           {

            //Buisness Flags
            $addFields:{

                lowStock:{$lte:["$stockNum",5]},
                highDemand:{$gte:["$sellThroughRate",80]}
            }
           },


           //Sort optimized
           

            { $sample: { size: 10 } },
           

           //Limiting to Top 10 Products
           {

            $limit:10
           },

           {

            //Shape Output for frontend
            $project: {

                _id:0,
                title:{$substr:["$title",0,25]},
                stock:"$stockNum",
                soldCount:"$soldNum",
                sellThroughRate:1,
                lowStock:1,
                highDemand:1
            }
           }

        ]);

        return {

            success:true,
            data
        };


    } catch(error) {

        console.error("Something Went Wrong ,Cannot getStocks data",error);

        return {

            success:false,
            message:error.message
        }
    }


}
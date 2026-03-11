import User from "@/models/Users";
import Product from "@/models/Product";
import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";


export  async function getProductStats() {

    await connectDB();

   try {

    const ordersCount = await Orders.countDocuments();
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    
    const revenueResult = await Orders.aggregate([

        {
            $group :{

                _id:null,
                totalRevenue:{$sum: "$total"}
            }
        }
    ]);

    const revenue = revenueResult[0]?.totalRevenue || 0;
    // console.log("Revenue",revenue);

    return {

        orders:ordersCount,
        users:usersCount,
        products:productsCount,
        revenue
    }


   } catch(error) {

    console.error('Dashboard Error',error);

    return {
        
      orders: 0,
      users: 0,
      products: 0,
      revenue: 0
    };


   }
    
}
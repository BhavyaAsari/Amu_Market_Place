"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async  function getUserStats()  {


    await connectDB();

    try {

        //Blocked users
        const blockedUsers = await User.countDocuments({

            status:"blocked"
        });

        //Active Users
        const activeUsers = await User.countDocuments({

            status:"active"
        });

        //New Sinups
        const sevenDaysAgo  = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const newSignups = await User.countDocuments({

            createdAt:{$gte:sevenDaysAgo}
        });

        return {

            blockedUsers,
            activeUsers,
            newSignups

        };


    } catch (error) {

        console.error("Message",error);

         return {
      totalUsers: 0,
      activeUsers: 0,
      blockedUsers: 0,
      newSignups: 0
    };
    }

}
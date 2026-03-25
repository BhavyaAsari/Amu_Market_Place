"use server";

import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";
import { notFound } from "next/navigation";

export async function getOrderStats() {


    await connectDB();

    try {

        // //Total Orders in the whole project
        // const totalOrders = await Orders.countDocuments();

        // //Total Cancelled Orders
        // const totalCancelledOrders = await Orders.countDocuments({orderStatus:"cancelled"});

        //Current Day's Orders
        const startofToday = new Date();
        startofToday.setHours(0,0,0,0);



        // const newTodayOrders = await Orders.countDocuments({createdAt:{$gte:startofToday}});

        // //Payment Pending Orders
        // const totalPaymentPending = await Orders.countDocuments({paymentStatus:"pending"});

        const [totalOrders,totalCancelledOrders, newTodayOrders,totalPaymentPending ] = await Promise.all ([

             Orders.countDocuments(),
             Orders.countDocuments({orderStatus:"cancelled"}),
             Orders.countDocuments({createdAt:{$gte:startofToday}}),
             Orders.countDocuments({paymentStatus:"pending"}),
        ]);

        //Current month Users
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(),1);

        const ordersThisMonth = await Orders.countDocuments({ createdAt:{$gte:startOfMonth}});

        //Previous Month Users 
        const startOfLastMonth = new Date(now.getFullYear(),now.getMonth() - 1,1);
        const endOfLastMonth = new Date(now.getFullYear(),now.getMonth(),0);

        const ordersLastMonth =  await Orders.countDocuments({

            createdAt: {

                $gte:startOfLastMonth,
                $lte:endOfLastMonth
            }

        });

        //Growth Percentage
        let growthPercent = "0%";

        if(ordersLastMonth > 0) {

            const growth = ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;

            growthPercent = `${growth.toFixed(1)}%`;
        }

        return {

            totalCancelledOrders,
            totalOrders,
            newTodayOrders,
            totalPaymentPending,
            ordersThisMonth,
            growthPercent
        }
    } catch (error) {

        console.error("Order stats data error",error);

        return {

             totalCancelledOrders:0,
            totalOrders:0,
            newTodayOrders:0,
            totalPaymentPending:0,
            ordersThisMonth,
            growthPercent:"0%"

        };


    }
}
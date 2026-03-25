import { connectDB } from "@/libs/db";
import Orders from "@/models/Orders";

export async function getOrdersGrowth(range = "monthly") {

    await connectDB();

    const order = await Orders.find({},{createdAt:1});

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    //Weekly Orders Growth 
    const weeklyCount = Array(7).fill(0);

    const today = new Date();

    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    order.forEach(or => {

        const orderDate = new Date(or.createdAt);

        if(orderDate >= startDate && orderDate <= endDate) {

            const diff = Math.floor(

                (endDate - orderDate) / (1000 * 60 * 60 * 24)
            );

            const index = 6 - diff;

            if(index >= 0 && index < 7) {

                weeklyCount[index] +=1;
            }


        }
    });

    const weekly = [];

    for(let i=0; i<7; i++) {

        const date = new Date(endDate);
        date.setDate(endDate.getDate() - (6 - i));

        const dayName = date.toLocaleDateString("en-us",{

            weekday:"short"
        });

        weekly.push({

            label:dayName,
            orders:weeklyCount[i],
            date:date.toISOString()
        });
    }

    //Monthly
    const monthlyCount = Array(12).fill(0);

    order.forEach(or => {

        const monthIndex = new Date(or.createdAt).getMonth();
        monthlyCount[monthIndex] +=1;
    });

    let runningTotal = 0;
    const currentMonth = new Date().getMonth();

    const monthly = months
    .slice(0,currentMonth +1)
    .map((month,index) => {

        runningTotal += monthlyCount[index];

        return {

            label:month,
            orders:runningTotal
        };
    });


    //Yearly 
    const yearMap = {};

    order.forEach(or => {

        const year = new Date(or.createdAt).getFullYear();
        yearMap[year] = (yearMap[year] || 0) + 1;
    });

    const yearly =  Object.entries(yearMap)
    .sort((a,b) => a[0] - b[0])
    .map(([year,count]) => ({

        label:year,
        orders:count
    }));

    return {

        weekly,
        monthly,
        yearly
    }



}
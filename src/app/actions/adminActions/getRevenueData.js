import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";

export async function getRevenueData(range = "monthly") {

  await connectDB();

  const orders = await Orders.find();

  const revenueMap = {};
  let totalRevenue = 0;

  const daysOrder = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthsOrder = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  orders.forEach(order => {

    const date = new Date(order.createdAt);
    let key = "";

    if (range === "weekly") {
      key = date.toLocaleDateString("en-US",{ weekday:"short" });
    } 
    else if (range === "yearly") {
      key = date.getFullYear().toString();
    } 
    else {
      key = date.toLocaleDateString("en-US",{ month:"short" });
    }

    if (!revenueMap[key]) {
      revenueMap[key] = 0;
    }

    const value = Number(order.total);

    revenueMap[key] += value;
    totalRevenue += value;

  });

  let data = Object.entries(revenueMap).map(([label,revenue]) => ({
    label,
    revenue: Number(revenue.toFixed(2))
  }));


  // Sorting
  if (range === "weekly") {
    data.sort((a,b)=> daysOrder.indexOf(a.label) - daysOrder.indexOf(b.label));
  }

  if (range === "monthly") {
    data.sort((a,b)=> monthsOrder.indexOf(a.label) - monthsOrder.indexOf(b.label));
  }


  // 📊 calculate change
  const latest = data[data.length - 1]?.revenue || 0;
  const previous = data[data.length - 2]?.revenue || 0;

  let statChange = 0;

  if (previous !== 0) {
    statChange = ((latest - previous) / previous) * 100;
  }

  return {
    title: "Revenue Over Time",
    subtitle: `${range} revenue analytics`,
    statValue: latest,
    statChange: statChange.toFixed(2),
    totalValue: totalRevenue.toFixed(2),
    totalLabel: "Total Revenue",
    data,
    dataKey: "revenue",
    unit: "$"
  };

}
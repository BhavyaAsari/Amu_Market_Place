import Orders from "@/models/Orders";
import { connectDB } from "@/libs/db";

export async function getRevenueData(range = "monthly") {

  await connectDB();

  const orders = await Orders.find();

  const revenueMap = {};

  const daysOrder = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthsOrder = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  orders.forEach(order => {

    const date = new Date(order.createdAt);
    let key = "";

    if (range === "weekly") {
      key = date.toLocaleDateString("en-US", { weekday: "short" });
    } 
    else if (range === "yearly") {
      key = date.getFullYear().toString();
    } 
    else {
      key = date.toLocaleDateString("en-US", { month: "short" });
    }

    if (!revenueMap[key]) {
      revenueMap[key] = 0;
    }

    revenueMap[key] += Number(order.total);

  });

  let result = Object.entries(revenueMap).map(([label, revenue]) => ({
    label,
    revenue: Number(revenue.toFixed(2))
  }));

  // Sorting
  if (range === "weekly") {
    result.sort((a,b) => daysOrder.indexOf(a.label) - daysOrder.indexOf(b.label));
  }

  if (range === "monthly") {
    result.sort((a,b) => monthsOrder.indexOf(a.label) - monthsOrder.indexOf(b.label));
  }

  return result;
}
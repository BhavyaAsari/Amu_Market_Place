import { connectDB } from "@/libs/db";
import User from "@/models/Users";

export async function getUsersGrowth(range = "monthly") {

  await connectDB();

  const users = await User.find({}, { createdAt: 1 });

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  // WEEKLY
  if (range === "weekly") {

    const weeklyCounts = Array(7).fill(0);

    users.forEach(user => {
      const dayIndex = new Date(user.createdAt).getDay();
      weeklyCounts[dayIndex] += 1;
    });

    return days.map((day, index) => ({
      label: day,
      users: weeklyCounts[index]
    }));

  }

  // YEARLY
  if (range === "yearly") {

    const yearMap = {};

    users.forEach(user => {

      const year = new Date(user.createdAt).getFullYear();

      if (!yearMap[year]) {
        yearMap[year] = 0;
      }

      yearMap[year] += 1;

    });

    return Object.entries(yearMap)
      .sort((a,b) => a[0] - b[0])
      .map(([year, count]) => ({
        label: year,
        users: count
      }));

  }

  // MONTHLY (default)

  const monthlyCounts = Array(12).fill(0);

  users.forEach(user => {

    const monthIndex = new Date(user.createdAt).getMonth();
    monthlyCounts[monthIndex] += 1;

  });

  let runningTotal = 0;
  const currentMonth = new Date().getMonth();

  const cumulativeGrowth = months
    .slice(0, currentMonth + 1)
    .map((month, index) => {

      runningTotal += monthlyCounts[index];

      return {
        label: month,
        users: runningTotal
      };

    });

  return cumulativeGrowth;

}
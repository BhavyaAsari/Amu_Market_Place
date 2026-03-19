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
  

    const weeklyCounts = Array(7).fill(0);

    const today = new Date();

    const endDate = new Date(today);
    endDate.setDate(today.getDate() -1);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

users.forEach(user => {

  const userDate = new Date(user.createdAt);

  if (userDate >= startDate && userDate <= endDate) {

    const diff = Math.floor(
      (endDate - userDate) / (1000 * 60 * 60 * 24)
    );

    const index = 6 - diff;

    if (index >= 0 && index < 7) {
      weeklyCounts[index] += 1;
    }
  }
});

   const weekly = [];

   for(let i=0; i<  7; i++) {

    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (6 - i));

    const dayName = date.toLocaleDateString("en-us", {

      weekday:"short"
    });

    weekly.push({

      label:dayName,
      users:weeklyCounts[i],
      date: date.toISOString()
    
    });
   }

  
  // MONTHLY (default)

  const monthlyCounts = Array(12).fill(0);

  users.forEach(user => {

    const monthIndex = new Date(user.createdAt).getMonth();
    monthlyCounts[monthIndex] += 1;

  });

  let runningTotal = 0;
  const currentMonth = new Date().getMonth();

  const monthly = months
  .slice(0,currentMonth +1)
  .map((month,index) => {

    runningTotal += monthlyCounts[index];

    return {

      label:month,
      users:runningTotal
    };
  });


  // YEARLY
    const yearMap = {};

    users.forEach(user => {

      const year = new Date(user.createdAt).getFullYear();
      yearMap[year] = (yearMap[year] || 0) + 1;

    
    });

    const yearly = Object.entries(yearMap)
    .sort((a,b) => a[0] - b[0])
    .map(([year,count]) => ({

      label:year,
      users:count
    }));


  


  return {

    weekly,
    monthly,
    yearly
  }
    

}
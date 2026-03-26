import dotenv from 'dotenv';
dotenv.config(); 


import { connectDB } from "../libs/db.js";
import Orders from "../models/Orders.js";
import { locationData } from "../libs/locationData.js";


async function cancelInvalidOrders() {
  try {
    await connectDB();

    const orders = await Orders.find({ status: { $ne: "cancelled" } });

    let cancelledCount = 0;

    for (const order of orders) {

      if (!order.shippingAddress) continue;

      const { country, state, city, postalCode } = order.shippingAddress;

      const countryData = locationData[country];
      const stateData = countryData?.states[state];
      const cityData = stateData?.cities.find(c => c.name === city);

      const isValid =
        countryData &&
        stateData &&
        cityData &&
        cityData.postalCodes.includes(postalCode);

      if (!isValid) {
        await Orders.findByIdAndUpdate(order._id, {
          status: "cancelled",
        });

        cancelledCount++;
        console.log(`❌ Cancelled: ${order._id}`);
      }
    }

    console.log(`✅ Done. Cancelled Orders: ${cancelledCount}`);
    process.exit();

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

cancelInvalidOrders();
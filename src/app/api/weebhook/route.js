export const config = {
  api: {
    bodyParser: false,
  },
};


import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { connectDB } from "@/libs/db";
import Cart from "@/models/CartModel";
import Orders from "@/models/Orders";

export async function POST(req) {

    await connectDB();

    const body = await req.text();
    const signature = headers().get("stripe-signature");

    let event;

    try {

      event = Stripe.webhooks.constructEvent(

        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    
    } catch(err) {

        console.error("Webhook signature verification failed.",err);
        return NextResponse.json({error:"Weebhook error"},{status:400});
    }


    //Handle Success
    if(event.type === "checkout.session.completed") {

        const session  = event.data.object;

        const order = await Orders.findOne({

            stripeSessionId:session.id,
        });

        if(order) {

            order.status = "paid";
            await order.save();

            await Cart.deleteOne({userId:order.user});
        }


        return NextResponse.json({ received: true });
    }
}


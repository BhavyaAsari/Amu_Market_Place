import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/libs/authOptions";
import Product from "@/models/Product";
import { connectDB } from "@/libs/db";
import Cart from "@/models/CartModel";
import Orders from "@/models/Orders";
import { stripe } from "@/libs/Stripe";

export async function POST(req) {

    try {

        await connectDB();

        const session = await getServerSession(authOptions);

        if(!session) {

            return NextResponse.json(

                {error:"Unauthorized"},
                {status:401}
            );
        }

        const {shippingAddress,paymentMethod,deliveryMethod} = await req.json();

        const cart = await Cart.findOne({

            userId:session.user.id,
        }).populate("items.product");

        if(!cart || cart.items.length ===0) {

            return NextResponse.json(

                {error:"Cart is empty"},
                {status:400}
            );
        }

        const subtotal = cart.items.reduce(

            (sum,item) => 

                sum + item.product.price * item.quantity,
                0
        );

        const  tax = subtotal*0.18;

     const shippingFee = deliveryMethod === "express" ? 199 : 99;

        const total = subtotal+tax+shippingFee;


        const order = await Orders.create({

            user:session.user.id,

            items:cart.items.map((item)=> ({

                product: item.product._id,
                title:item.product.title,
                image:item.product.image,
                price:item.product.price,
                quantity:item.quantity,
            })),

            shippingAddress,

            deliveryMethod:shippingAddress.deliveryMethod,

            paymentMethod,

            paymentStatus:"pending",

            subtotal,
            tax,
            shippingFee,
            total,


        });


        if(paymentMethod === "cod") {

            await Cart.deleteOne({

                userId:session.user.id,
            });

            return NextResponse.json({

                success:true,
            });
        }


        const   INR_TO_USD = 83;

        const stripeSession = 

        await stripe.checkout.sessions.create({

            payment_method_types:["card"],
            mode:"payment",

            line_items:cart.items.map((item) => ({

                price_data:{

                    currency:"usd",
                    product_data:{

                        name:item.product.title,
                    },

                    unit_amount:Math.round(

                        (item.product.price/INR_TO_USD)*100
                    ),

                },

                quantity:item.quantity,
            })),

            success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        });

        order.stripeSessionId = stripeSession.id;
        await order.save();


        return NextResponse.json({

            url:stripeSession.url,
        });

    } catch(error) {

        console.error("Checkout error:",error);

        return NextResponse.json(

            {error:"checkout Failed"},
            {status:500}
        );
    }
    
}


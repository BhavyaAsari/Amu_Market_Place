import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import Product from "@/models/Product";
import { connectDB } from "@/libs/db";
import Cart from "@/models/CartModel";
import Orders from "@/models/Orders";
import { stripe } from "@/libs/Stripe";
import mongoose from "mongoose";

function generateOrderNumber() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  const monthNames = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];

  const month = monthNames[now.getMonth()];
  const uniquePart = Date.now().toString().slice(-6);

  return `AMU-ORDER-${day}${month}${year}-${uniquePart}`;
}

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      buyNow,
      productId,
      quantity
    } = body;

    // ===============================
    // 🔒 BASIC FIELD VALIDATION
    // ===============================

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country
    } = shippingAddress;

    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !street?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !postalCode?.trim() ||
      !country?.trim()
    ) {
      return NextResponse.json(
        { error: "All shipping fields are required" },
        { status: 400 }
      );
    }

    const allowedPayments = ["cod", "card"];
    if (!allowedPayments.includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    const allowedDelivery = ["standard", "express"];
    if (!allowedDelivery.includes(deliveryMethod)) {
      return NextResponse.json(
        { error: "Invalid delivery method" },
        { status: 400 }
      );
    }

    let items = [];

    // ===============================
    //  BUY NOW FLOW
    // ===============================
    if (buyNow) {
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
          { error: "Invalid product ID" },
          { status: 400 }
        );
      }

      const qty = Math.max(1, quantity || 1);

      const product = await Product.findById(productId);

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      if (product.stock < qty) {
        return NextResponse.json(
          { error: "Insufficient stock" },
          { status: 400 }
        );
      }

      items = [{
        product: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: qty,
      }];

    } else {

      // ===============================
      //  CART FLOW
      // ===============================

      const cart = await Cart.findOne({
        userId: session.user.id,
      }).populate("items.product");

      if (!cart || cart.items.length === 0) {
        return NextResponse.json(
          { error: "Cart is empty" },
          { status: 400 }
        );
      }

      for (const item of cart.items) {
        if (!item.product) {
          return NextResponse.json(
            { error: "Invalid cart item" },
            { status: 400 }
          );
        }

        if (item.product.stock < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ${item.product.title}` },
            { status: 400 }
          );
        }
      }

      items = cart.items.map(item => ({
        product: item.product._id,
        title: item.product.title,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));
    }

    // ===============================
    //  PRICE CALCULATION (SERVER ONLY)
    // ===============================
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = subtotal * 0.18;
    const shippingFee = deliveryMethod === "express" ? 199 : 99;
    const total = subtotal + tax + shippingFee;

    // ===============================
    //  CREATE ORDER
    // ===============================
    const order = await Orders.create({
      orderNumber: generateOrderNumber(),
      user: session.user.id,
      items,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus: "pending",
      subtotal,
      tax,
      shippingFee,
      total,
    });

    // ===============================
    //  COD FLOW
    // ===============================
    if (paymentMethod === "cod") {

      if (!buyNow) {
        await Cart.deleteOne({ userId: session.user.id });
      }

      return NextResponse.json({
        success: true,
        orderId: order._id.toString()
      });
    }

    // ===============================
    //  STRIPE FLOW
    // ===============================

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map(item => ({
        price_data: {
          currency: "inr", // 🔥 Use INR directly
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success/${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    order.stripeSessionId = stripeSession.id;
    await order.save();

    return NextResponse.json({
      url: stripeSession.url,
    });

  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Checkout Failed" },
      { status: 500 }
    );
  }
}
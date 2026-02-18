import { NextResponse } from "next/server";
import Cart from "@/models/CartModel";
import { connectDB } from "@/libs/db";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/libs/authOptions";

export async function POST(req) {
  try {
    await connectDB();

    const { productId, delta } = await req.json();

    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();    // ✅ await added

    let userCart;                           // ✅ renamed to avoid clash

    if (session?.user?.id) {
      userCart = await Cart.findOne({ userId: session.user.id }); // ✅ Cart not cart
    } else {
      const guestId = cookieStore.get("guest_id")?.value;
      userCart = await Cart.findOne({ guestId });
    }

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const item = userCart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return NextResponse.json(userCart);

    item.quantity += delta;

    // ✅ remove item if quantity drops to 0 or below
    if (item.quantity <= 0) {
      userCart.items = userCart.items.filter(
        (i) => i.product.toString() !== productId
      );
    }

    await userCart.save();
    await userCart.populate("items.product");

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("POST /api/cart/update error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { cookies } from "next/headers";
import Cart from "@/models/CartModel";

export async function POST(req) {
  try {
    await connectDB();

    const { productId } = await req.json();

    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();    // ✅ await added

    let userCart;                           // ✅ renamed to avoid clash

    if (session?.user?.id) {
      userCart = await Cart.findOne({ userId: session.user.id }); // ✅ fixed typo
    } else {
      const guestId = cookieStore.get("guest_id")?.value;
      userCart = await Cart.findOne({ guestId });
    }

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    userCart.items = userCart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await userCart.save();
    await userCart.populate("items.product");

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("POST /api/cart/remove error:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
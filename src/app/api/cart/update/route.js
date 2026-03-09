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
    const cookieStore = await cookies();

    let userCart;

    if (session?.user?.id) {
      userCart = await Cart.findOne({ userId: session.user.id });
    } else {
      const guestId = cookieStore.get("guest_id")?.value;
      userCart = await Cart.findOne({ guestId });
    }

    if (!userCart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    const item = userCart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) {
      return NextResponse.json({ items: userCart.items });
    }

    item.quantity += delta;

    // remove item if quantity becomes 0
    if (item.quantity <= 0) {
      userCart.items = userCart.items.filter(
        (i) => i.product.toString() !== productId
      );
    }

    await userCart.save();

    await userCart.populate("items.product");

    // 🔹 remove broken products
    userCart.items = userCart.items.filter((item) => item.product !== null);

    await userCart.save();

    const plainCart = userCart.toObject();

    return NextResponse.json({
      items: plainCart.items,
    });

  } catch (error) {
    console.error("POST /api/cart/update error:", error);

    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
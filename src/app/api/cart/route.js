import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { cookies } from "next/headers";
import Product from "@/models/Product";
import { v4 as uuid } from "uuid";
import Cart from "@/models/CartModel";
import { connectDB } from "@/libs/db";

/* ---------------------------------------- */
/* 🔹 Helper: Get or Create Cart */
/* ---------------------------------------- */

async function getOrCreateCart() {
await connectDB();

const session = await getServerSession(authOptions);
const cookieStore = await cookies();

// Logged-in user
if (session?.user?.id) {
let userCart = await Cart.findOne({ userId: session.user.id });


if (!userCart) {
  userCart = await Cart.create({
    userId: session.user.id,
    items: [],
  });
}

return { cart: userCart, newGuestId: null };


}

// Guest user
let guestId = cookieStore.get("guest_id")?.value;
let newGuestId = null;

if (!guestId) {
guestId = uuid();
newGuestId = guestId;
}

let guestCart = await Cart.findOne({ guestId });

if (!guestCart) {
guestCart = await Cart.create({
guestId,
items: [],
});
}

return { cart: guestCart, newGuestId };
}

/* ---------------------------------------- */
/* 🔹 Helper: Set guest cookie */
/* ---------------------------------------- */

function withGuestCookie(response, newGuestId) {
if (newGuestId) {
response.cookies.set("guest_id", newGuestId, {
httpOnly: true,
secure: process.env.NODE_ENV === "production",
sameSite: "lax",
path: "/",
maxAge: 60 * 60 * 24 * 7,
});
}
return response;
}

/* ---------------------------------------- */
/* 1️⃣ GET CART */
/* ---------------------------------------- */

export async function GET() {
try {
const { cart, newGuestId } = await getOrCreateCart();


await cart.populate({
  path: "items.product",
  select: "title image price shortDescription",
});

// remove broken products
cart.items = (cart.items || []).filter((item) => item.product !== null);

await cart.save();

const plainCart = cart.toObject();

const response = NextResponse.json(plainCart);

return withGuestCookie(response, newGuestId);


} catch (error) {
console.error("GET /api/cart error:", error);


return NextResponse.json(
  { error: "Failed to fetch cart" },
  { status: 500 }
);


}
}

/* ---------------------------------------- */
/* 2️⃣ ADD TO CART */
/* ---------------------------------------- */

export async function POST(req) {
try {
const { productId, quantity = 1 } = await req.json();


// check product exists
const product = await Product.findById(productId);

if (!product) {
  return NextResponse.json(
    { error: "Product not found" },
    { status: 404 }
  );
}

const { cart, newGuestId } = await getOrCreateCart();

const existing = cart.items.find(
  (item) => item.product.toString() === productId
);

if (existing) {
  existing.quantity += quantity;
} else {
  cart.items.push({ product: productId, quantity });
}

await cart.save();

await cart.populate({
  path: "items.product",
  select: "title image price shortDescription",
});

// remove broken products
cart.items = (cart.items || []).filter((item) => item.product !== null);

await cart.save();

const plainCart = cart.toObject();

const response = NextResponse.json(plainCart);

return withGuestCookie(response, newGuestId);


} catch (error) {
console.error("POST /api/cart error:", error);


return NextResponse.json(
  { error: "Failed to add to cart" },
  { status: 500 }
);


}
}

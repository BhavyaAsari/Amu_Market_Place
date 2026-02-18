import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { cookies } from "next/headers";
import Cart from "@/models/CartModel";
import { connectDB } from "@/libs/db";

/* ---------------------------------------- */
/*  Get existing cart (no create) */
/* ---------------------------------------- */

export async function getCart() {
  await connectDB();

  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();

  if (session?.user?.id) {
    return Cart.findOne({ userId: session.user.id });
  }

  const guestId = cookieStore.get("guest_id")?.value;
  return guestId ? Cart.findOne({ guestId }) : null;
}

/* ---------------------------------------- */
/* Get or create cart */
/* ---------------------------------------- */

export async function getOrCreateCart() {
  await connectDB();

  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();

  // Logged-in user
  if (session?.user?.id) {
    let userCart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $setOnInsert: { userId: session.user.id, items: [] } },
      { upsert: true, new: true }
    );

    return { cart: userCart, newGuestId: null };
  }

  // Guest user
  let guestId = cookieStore.get("guest_id")?.value;
  let newGuestId = null;

  if (!guestId) {
    const { v4: uuid } = await import("uuid");
    guestId = uuid();
    newGuestId = guestId;
  }

  let guestCart = await Cart.findOneAndUpdate(
    { guestId },
    { $setOnInsert: { guestId, items: [] } },
    { upsert: true, new: true }
  );

  return { cart: guestCart, newGuestId };
}

/* ---------------------------------------- */
/*  Set guest cookie on response */
/* ---------------------------------------- */

export function withGuestCookie(response, newGuestId) {
  if (newGuestId) {
    response.cookies.set("guest_id", newGuestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
  return response;
}

/* ---------------------------------------- */
/*  Serialize Mongoose doc */
/* ---------------------------------------- */

export function serializeCart(cart) {
  return JSON.parse(JSON.stringify(cart));
}
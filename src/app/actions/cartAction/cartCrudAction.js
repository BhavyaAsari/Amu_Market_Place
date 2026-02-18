"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { connectDB } from "@/libs/db";
import Cart from "@/models/CartModel";

/* -------------------------------------- */
/* 🔹 Get Or Create Active Cart */
/* -------------------------------------- */

async function getOrCreateCart() {
  await connectDB();

  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();

  // 🔹 Logged In User
  if (session?.user?.id) {
    let userCart = await Cart.findOne({ userId: session.user.id });

    if (!userCart) {
      userCart = await Cart.create({
        userId: session.user.id,
        items: [],
      });
    }

    return userCart;
  }

  // 🔹 Guest User
  let guestId = cookieStore.get("guest_id")?.value;

  if (!guestId) {
    guestId = uuid();

    cookieStore.set("guest_id", guestId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  }

  let guestCart = await Cart.findOne({ guestId });

  if (!guestCart) {
    guestCart = await Cart.create({
      guestId,
      items: [],
    });
  }

  return guestCart;
}

/* -------------------------------------- */
/* 🔹 Get Cart */
/* -------------------------------------- */

export async function getCart() {
  const activeCart = await getOrCreateCart();
  return await activeCart.populate("items.product");
}

/* -------------------------------------- */
/* 🔹 Add To Cart */
/* -------------------------------------- */

export async function addToCart(productId, quantity = 1) {
  const activeCart = await getOrCreateCart();

  const existingItem = activeCart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    activeCart.items.push({ product: productId, quantity });
  }

  await activeCart.save();
  return await activeCart.populate("items.product");
}

/* -------------------------------------- */
/* 🔹 Update Quantity */
/* -------------------------------------- */

export async function updateQuantity(productId, delta) {
  const activeCart = await getOrCreateCart();

  const item = activeCart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) return activeCart;

  item.quantity += delta;

  if (item.quantity <= 0) {
    activeCart.items = activeCart.items.filter(
      (i) => i.product.toString() !== productId
    );
  }

  await activeCart.save();
  return await activeCart.populate("items.product");
}

/* -------------------------------------- */
/* 🔹 Remove Item */
/* -------------------------------------- */

export async function removeItem(productId) {
  const activeCart = await getOrCreateCart();

  activeCart.items = activeCart.items.filter(
    (i) => i.product.toString() !== productId
  );

  await activeCart.save();
  return await activeCart.populate("items.product");
}

/* -------------------------------------- */
/* 🔹 Clear Cart */
/* -------------------------------------- */

export async function clearCart() {
  const activeCart = await getOrCreateCart();

  activeCart.items = [];
  await activeCart.save();

  return activeCart;
}

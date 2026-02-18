import Cart from "@/models/CartModel";
import { connectDB } from "@/libs/db";

export async function mergeCart(userId, guestId) {
  await connectDB();

  if (!guestId) return;

  const guestCart = await Cart.findOne({ guestId });
  if (!guestCart) return;

  let userCart = await Cart.findOne({ userId });

  if (!userCart) {
    guestCart.userId = userId;
    guestCart.guestId = null;
    await guestCart.save();
  } else {
    guestCart.items.forEach((item) => {
      const existing = userCart.items.find(
        (i) => i.product.toString() === item.product.toString()
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        userCart.items.push(item);
      }
    });

    await userCart.save();
    await Cart.deleteOne({ guestId });
  }
}

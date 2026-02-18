"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }) {
  const { additionToCart } = useCart();
  const router = useRouter();

  const handleAdd = async () => {
    await additionToCart(product._id);
    router.push("/cart");
  };

  return (
    <button onClick={handleAdd} className="cartBtn">
      Add to cart
    </button>
  );
}

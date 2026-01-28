"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const router = useRouter();
  const handleAdd = () => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: Number(product.price.replace(/[₹,]/g, "")),
      image: product.image,

      
    };

    console.log("product image",product.image)

    addToCart(cartProduct);

    router.push("/cart");
  };

  return (
    <button
      onClick={handleAdd}
      className="border rounded-xl px-4 py-2 text-[#7C3AED] hover:bg-purple-100 hover:cursor-pointer transition"
    >
      Add to cart
    </button>
  );
}

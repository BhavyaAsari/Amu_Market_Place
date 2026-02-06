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
      price: Number(product.price),
      image: product.image,

      
    };

    // console.log("product image",product.image)

    addToCart(cartProduct);

    router.push("/cart");
  };

  return (
    <button
      onClick={handleAdd}
      className="cartBtn"
    >
      Add to cart
    </button>
  );
}

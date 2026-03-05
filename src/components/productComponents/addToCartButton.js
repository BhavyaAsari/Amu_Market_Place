"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";


export default function AddToCartButton({ product }) {
  const { additionToCart } = useCart();
  const router = useRouter();

  const handleAdd = async () => {
    await additionToCart(product._id);
    router.push("/cart");
  };

  return (
    <button onClick={handleAdd} className="cartBtn flex">
      <LuShoppingCart size={20} className=""/>
     <span className="ml-2 "> Add to cart</span>
    </button>
  );
}

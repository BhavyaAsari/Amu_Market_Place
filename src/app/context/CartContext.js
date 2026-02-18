"use client";

import { createContext, useContext, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  /* ------------------------------------ */
  /* 🔹 Load Cart (Clean Version) */
  /* ------------------------------------ */

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data?.items || []);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    fetchCart();
  }, [session]); // runs on mount + login/logout

  /* ------------------------------------ */
  /* 🔹 Add To Cart */
  /* ------------------------------------ */

  const additionToCart = (productId) => {
    startTransition(async () => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      setCart(data.items);
    });
  };

  /* ------------------------------------ */
  /* 🔹 Remove Item */
  /* ------------------------------------ */

  const removeFromCart = (productId) => {
    startTransition(async () => {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      setCart(data.items);
    });
  };

  /* ------------------------------------ */
  /* 🔹 Increase Quantity */
  /* ------------------------------------ */

  const increaseQty = (productId) => {
    startTransition(async () => {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, delta: 1 }),
      });

      const data = await res.json();
      setCart(data.items);
    });
  };

  /* ------------------------------------ */
  /* 🔹 Decrease Quantity */
  /* ------------------------------------ */

  const decreaseQty = (productId) => {
    startTransition(async () => {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, delta: -1 }),
      });

      const data = await res.json();
      setCart(data.items);
    });
  };

  /* ------------------------------------ */
  /* 🔹 Total Price */
  /* ------------------------------------ */

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        isPending,
        additionToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Logic: Initialize state by checking the environment immediately.
  // This avoids calling setState inside a useEffect later.
  const [cart, setCart] = useState(() => {
    // If we are on the server (Next.js pre-rendering), return empty array
    if (typeof window === "undefined") return [];

    // If we are on the client, grab the data immediately
    try {
      const savedCart = window.localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Local storage access failed:", error);
      return [];
    }
  });

  const isMounted = useRef(false);

  // 2. Logic: Syncing back to storage
  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      isMounted.current = true;
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
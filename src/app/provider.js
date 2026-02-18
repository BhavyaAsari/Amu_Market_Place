"use client";

import { ToastContainer } from "react-toastify";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";

import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
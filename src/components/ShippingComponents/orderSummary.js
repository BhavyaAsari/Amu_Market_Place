"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function OrderSummary({ deliveryMethod }) {
  const { cart, total } = useCart();

  const shippingFee =
    deliveryMethod === "express" ? 199 : 99;

  const tax = total * 0.18;
  const grandTotal = total + tax + shippingFee;

  return (
    <>
    <div>

      <h3 className="font-semibold text-xl sm:text-2xl mb-6 text-black">
        Order Summary
      </h3>

      {/* Scrollable Items */}
      <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex gap-4 items-center"
          >
            {/* Small Image */}
            <div className="w-14 h-14 relative">
              <Image
                src={item.product.image}
                alt={item.product.title}
                fill
                className="object-contain rounded"
              />
            </div>

            {/* Title + Qty */}
            <div className="flex-1">
              <p className="text-sm font-semibold line-clamp-1">
                {item.product.title}
              </p>
              <p className="text-xs text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            {/* Line Total */}
            <p className="font-semibold text-purple-600">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-6 space-y-3 border-t pt-4">

        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold">
            ₹{total.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-700">Shipping</span>
          <span className="font-semibold">
            ₹{shippingFee}
          </span>
        </div>

        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-700">Tax (18%)</span>
          <span className="font-semibold">
            ₹{tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-lg sm:text-xl font-bold mt-4">
          <span>Total</span>
          <span className="text-purple-600">
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
    </>
  );
}



"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function OrderSummary({
  deliveryMethod,
  isBuyNow,
  productId,
  quantity,
}) {
  const { cart, total } = useCart();

  const [buyNowItem, setBuyNowItem] = useState(null);

  //  Fetch product for Buy Now
  useEffect(() => {
    if (isBuyNow && productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${productId}`);
          const data = await res.json();

          setBuyNowItem({
            ...data,
            quantity: quantity,
          });
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      };

      fetchProduct();
    }
  }, [isBuyNow, productId, quantity]);

  const items = isBuyNow && buyNowItem ? [buyNowItem] : cart;

  const subtotal =
    isBuyNow && buyNowItem
      ? buyNowItem.price * buyNowItem.quantity
      : total;

  const shippingFee =
    deliveryMethod === "express" ? 199 : 99;

  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax + shippingFee;

  //  Loading state
  if (isBuyNow && !buyNowItem) {
    return <p>Loading order summary...</p>;
  }

  return (
    <div>
      <h3 className="font-semibold text-xl sm:text-2xl mb-6 text-black">
        Order Summary
      </h3>

      <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
        {items.map((item) => {
          const product = item.product || item;

          return (
            <div
              key={product._id}
              className="flex gap-4 items-center"
            >
              <div className="w-14 h-14 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain rounded"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold line-clamp-1">
                  {product.title}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-purple-600">
                ₹{(product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shippingFee}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-purple-600">
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
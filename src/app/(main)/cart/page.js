"use client";

import { LuPlus, LuMinus } from "react-icons/lu";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/heroComponents/breadCrum";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart();
  // console.log("cart data",cart)

  return (
    <>
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Part - Cart Items */}
          <section className="lg:col-span-2 border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black ">
                My Cart ({cart.length})
              </h2>
              <div className="border border-black/10 mt-4 mb-3 w-full">
              </div>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-200 pb-6 mb-6 last:border-b-0"
                  >
                    
                    <div className="relative sm:w-48 sm:h-48 bg-slate-200 rounded-2xl ">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain "
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-lg font-semibold text-black  line-clamp-1">
                        {item.product.title}
                      </h3>
                        <div className="mt-2 font-medium text-purple-700/70">
                         {item.product.shortDescription}</div>

                      <p className="text-lg sm:text-xl font-bold text-purple-600 mt-3 ">
                       <span className="text-black">Unit Price : </span> ₹{item.product.price}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-4 ">
                        <span className="text-sm sm:text-xl font-medium text-gray-700">
                          Quantity :
                        </span>

                        <div className="qltyContainer ">
                          <button
                            onClick={() => decreaseQty(item.product._id)}
                            className="hover:bg-gray-100 rounded transition"
                          >
                            <LuMinus className="QunatityButton" />
                          </button>

                          <span className="font-mono text-lg text-center w-8">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item.product._id)}
                            className="hover:bg-gray-100 rounded transition"
                          >
                            <LuPlus className="QunatityButton" />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        className=" font-semibold border-2 border-red-600 rounded-lg px-2 text-red-600 bg-white hover:bg-red-600 hover:text-white transition-colors"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        Remove
                      </button>

                     
                    </div>

                    {/* Total */}
                    <div className="text-left shrink-0">
                      <p className="text-xs sm:text-2xl text-gray-600 mb-2 font-semibold">
                        Total Price 
                      </p>
                      <p className="font-bold text-xl sm:text-2xl text-purple-600">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                  <div className="text-center py-12">

                       <p className="text-xl font-semibold text-gray-500 mb-4">
                Your cart is empty
              </p>

                     <div className="relative w-80 h-80  flex ml-auto mr-auto ">
                      <Image
                      fill
                      src="/emptyCart.png"
                      alt="empty Cart"
                      className="object-contain "/>
                     </div>

             

              <Link href="/productlist">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                  Browse Products
                </button>
              </Link>

            </div>
              )}
            </div>
          </section>

          {/* Right Part - Order Summary */}
          <section className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm sticky top-24">
              <h3 className="font-semibold text-xl sm:text-2xl mb-6 text-black">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-black">
                    ₹{cart.length > 0 ? total.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-700">Est. Shipping</span>
                  <span className="font-semibold text-black">
                    ₹{cart.length > 0 ? "99" : "0"}
                  </span>
                </div>

                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-700">Tax (18%)</span>
                  <span className="font-semibold text-black">
                    ₹{cart.length > 0 ? (total * 0.18).toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-xl sm:text-2xl font-bold mt-6 mb-6 text-black">
                <span className="font-semibold">Total</span>
                <span className="text-purple-600">
                  ₹
                  {cart.length > 0
                    ? (total + 99 + total * 0.18).toFixed(2)
                    : "0.00"}
                </span>
              </div>

              {
                <Link href={"/checkout"}>
                  {" "}
                  <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mb-3 hover:cursor-pointer">
                    Proceed to Checkout
                  </button>
                </Link>
              }

              <Link href={"/productlist"}>
                <button className="w-full border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

"use client";

import {LuPlus,LuMinus} from "react-icons/lu";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

export default function CartPage () {

    const {

        cart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        total,
    } = useCart();

    return (

        <>
        <main className="max-w-7xl mx-auto p-4 sm:p-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                {/* Left Part - Cart Items */}
                <section className="lg:col-span-2 border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm">

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">My Cart ({cart.length})</h2>

                        {cart.length > 0 ? (
                            cart.map((item)=> 
                        
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-200 pb-6 mb-6 last:border-b-0"
                                >

                                    {/* Product Image */}
                                    <div className="w-full sm:w-40 sm:h-32 shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={160}
                                            height={128}
                                            className="w-full h-auto sm:h-32 object-contain rounded-lg"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">{item.title}</h3>
                                        <p className="text-lg sm:text-xl font-bold text-purple-600 mb-4">₹{item.price}</p>

                                        {/* Product Quantity */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-sm sm:text-base font-medium text-gray-700">Quantity:</span>

                                            <div className="qltyContainer">
                                                <button onClick={() => decreaseQty(item.id)} className="hover:bg-gray-100 rounded transition">
                                                    <LuMinus className="QunatityButton"/>
                                                </button>
                                                <span className="font-mono text-lg text-center w-8">{item.quantity}</span>
                                                <button onClick={() => increaseQty(item.id)} className="hover:bg-gray-100 rounded transition"> 
                                                    <LuPlus className="QunatityButton"/> 
                                                </button>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button 
                                            className="mt-2 font-semibold border-2 border-purple-600 rounded-lg px-4 py-2 text-purple-600 bg-white hover:bg-purple-600 hover:text-white transition-colors" 
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Product Total Price */}
                                    <div className="text-right shrink-0">
                                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Total</p>
                                        <p className="font-bold text-xl sm:text-2xl text-purple-600">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-lg text-gray-500">Your cart is empty</p>
                            </div>
                        )}
                    </div>

                </section>
                

                {/* Right Part - Order Summary */}
                <section className="lg:col-span-1">
                    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm sticky top-24">
                        <h3 className="font-semibold text-xl sm:text-2xl mb-6 text-black">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="font-semibold text-black">₹{cart.length > 0 ? total.toFixed(2) : "0.00"}</span>
                            </div>

                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Est. Shipping</span>
                                <span className="font-semibold text-black">₹{cart.length > 0 ? "99" : "0"}</span>
                            </div>

                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Tax (18%)</span>
                                <span className="font-semibold text-black">₹{cart.length > 0 ? (total * 0.18).toFixed(2) : "0.00"}</span>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex justify-between text-xl sm:text-2xl font-bold mt-6 mb-6 text-black">
                            <span className="font-semibold">Total</span>
                            <span className="text-purple-600">₹{cart.length > 0 ? (total + 99 + (total * 0.18)).toFixed(2) : "0.00"}</span>
                        </div>

                        <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mb-3">
                            Proceed to Checkout
                        </button>

                        <button className="w-full border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                </section>


            </div>


        </main>
        
        </>
    )




}
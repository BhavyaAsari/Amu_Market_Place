"use client";

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
        <main className="max-w-6xl max-auto p-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Part */}
                <section className="lg:col-span-2 border p-4">

                    <div>
                        <h2 className="text-4xl text-black/70">My Cart({cart.length})</h2>

                        {cart.map((item)=> 
                        
                            <div
                                key={item.id}
                                className="flex gap-4 border-b pb-4"
                            >

                                {/* Product Image */}

                            <div>
                                <Image
                                src={item.image}
                                alt={item.title}
                                width={200}
                                height={112}
                                className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Product Details     */}

                            <div className="flex-1">

                                <h3 className="text-xl">{item.title}</h3>
                                <p className="text-xl">
                                     ₹{item.price}
                                </p>

                                {/* Product Qunatity */}

                                <div>
                                    <h2 className="font-bold mt-2 mb-1  text-2xl">Qunatity</h2>
                                    <button className=" items-center text-lg border rounded-xl w-17 h-5" onClick={() => decreaseQty(item.id)}>
                                        <Image
                                        alt="decrease qunatity"
                                        src="/minus.png"
                                        width={20}
                                        height={10}
                                        className="ml-6"/>
                                    </button>
                                    <span className="ml-1 font-bold text-2xl">{item.quantity}</span>
                                    <button className="ml-1   text-lg border rounded-xl w-17 h-5  " onClick={() => increaseQty(item.id)}>
                                        <Image
                                        alt="Increase"
                                        src="/plus.png"
                                        width={15}
                                        height={20}
                                        className="ml-5"/>

                                    </button>

                                </div>

                                {/* User Action */}
                                <div>
                                    <button className="mt-2 border rounded-xl px-4 py-2 text-[#7C3AED] hover:bg-purple-100 hover:cursor-pointer transition" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>

                            {/* Product Price */}
                            <div className="text-xl">
                                 ₹{item.price * item.quantity}
                            </div>
                           </div>
                        ) }
                    </div>

                </section>.
                

                {/* Right Part */}

                <section className="lg:col-span-1 border p-4">

                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold  text-lg mb-4">order Summary</h3>

                        <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-lg">Subtotal</span>
                                <span className="text-lg">₹{total}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg">
                            <span>
                                Est. Shipping
                            </span>
                            <span>
                                ₹99
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg">
                            <span>Total</span>
                            <span>{total+99}</span>
                        </div>
                    </div>

                </section>


            </div>


        </main>
        
        </>
    )




}
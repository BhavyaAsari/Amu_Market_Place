"use client";

export default function CheckOutPage() {
  return (
    <>
      <div className="checkoutWrapper">
        <main className="checkoutContainer checkoutLeft p-2">

          <section className="addressContainer">
          <h2 className="font-semibold text-2xl py-2 px-4">Shipping Address</h2>
        <div className="bg-black/10 h-0.5 w-full fullWidth mt-6 "></div>


            <form className="addressForm">
              <input placeholder=" First Name" className="addressInput" />

              <input placeholder=" Last Name" className="addressInput" />

              <input placeholder=" Email Address" className="addressInput" />

              <input placeholder=" Phone Number" className="addressInput" />

              <input
                placeholder=" Address"
                className="addressInput fullWidth"
              />

              
                <input className="addressInput"  placeholder="City  " />

                <input  className="addressInput" placeholder="Postal Code" />

                <select className="">
                  <option>Gujarat</option>
                </select>

                <select className="px-4">
                  <option>India</option>
                </select>
              

              <div className="bg-black/10 h-0.5 w-full fullWidth mt-6"></div>

              <section className="fullWidth py-4 flex flex-col gap-2">
                <h3>Delivery Method</h3>

                <label className="">
                  <input type="radio" className="mr-2" placeholder="" />
                  Standard Delivery -<span>99</span>
                  <span className="text-gray-600/40 px-2">(3-4 days)</span>
                </label>

                <label className="">
                  <input type="radio" className="mr-2" placeholder="" />
                  Express Delivery -<span>199</span>
                  <span className="text-gray-600/40 px-3">(1-2 days)</span>
                </label>
              </section>

              <div className="bg-black/10 h-0.5 w-full fullWidth mt-6"></div>

              <section className="fullWidth py-4 flex flex-col gap-2">
                <h3>Payment Method</h3>

                <label className="">
                  <input type="radio" className="mr-2" placeholder="" />
                  Cash on Delivery
                </label>

                <label className="">
                  <input type="radio" className="mr-2" placeholder="" />
                  Upi
                </label>

                <label className="">
                  <input type="radio" className="mr-2" placeholder="" />
                  Credit<span className="px-0.5 ml-0.5">/</span> Debit Card
                </label>
              </section>
            </form>
          </section>
        </main>
        <aside className="checkoutRight">

             <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm sticky top-24">
                        <h3 className="font-semibold text-xl sm:text-2xl mb-6 text-black">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Subtotal</span>
                                {/* <span className="font-semibold text-black">₹{cart.length > 0 ? total.toFixed(2) : "0.00"}</span> */}
                            </div>

                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Est. Shipping</span>
                                {/* <span className="font-semibold text-black">₹{cart.length > 0 ? "99" : "0"}</span> */}
                            </div>

                            <div className="flex justify-between text-base sm:text-lg">
                                <span className="text-gray-700">Tax (18%)</span>
                                {/* <span className="font-semibold text-black">₹{cart.length > 0 ? (total * 0.18).toFixed(2) : "0.00"}</span> */}
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex justify-between text-xl sm:text-2xl font-bold mt-6 mb-6 text-black">
                            <span className="font-semibold">Total</span>
                            {/* <span className="text-purple-600">₹{cart.length > 0 ? (total + 99 + (total * 0.18)).toFixed(2) : "0.00"}</span> */}
                        </div>

                        <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mb-3">
                            Place Order
                        </button>

                        <button className="w-full border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            Back to Shopping
                        </button>
                    </div>

        </aside>
      </div>
    </>
  );
}

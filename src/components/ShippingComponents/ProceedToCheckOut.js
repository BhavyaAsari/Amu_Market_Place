"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useState } from "react";
import OrderSummary from "./orderSummary";
import LocalDropDown from "../productComponents/localDropDown";

export default function CheckOutPage({ user }) {
 

  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    street: user.street || "",
    city: user.city || "",
    state: user.state || "",
    postalCode: user.postalCode || "",
    country: user.country || "",
    deliveryMethod: "standard",
    paymentMethod: "cod",
  });

   const countryOptions = [
    { label: "India", value: "india" },
    { label: "USA", value: "usa" },
  ];

  const stateOptions =
    formData.country === "india"
      ? [
          { label: "Gujarat", value: "gujarat" },
          { label: "Maharashtra", value: "maharashtra" },
        ]
      : [
          { label: "California", value: "california" },
          { label: "Texas", value: "texas" },
        ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handlePlaceOrder = async () => {

    try {

      const res = await fetch("/api/checkout",{

        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({

          shippingAddress:{

            fullName: formData.firstName + " " + formData.lastName,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          },
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await res.json();

      if(!res.ok) {

        alert(data.error || "something went wrong");

        return;
      }

      if(formData.paymentMethod === "cod") {

        router.push("/success")
      
      } else {

        window.location.href  = data.url;
      }

    } catch (error) {

      console.error("order error",error);
      alert("order failed")
    }
  }

  return (
    <>
      <div className="checkoutWrapper">
        <main className="checkoutContainer checkoutLeft p-2">
          <section className="addressContainer">
            <h2 className="font-semibold text-2xl py-2 px-4">
              Shipping Address
            </h2>
            <div className="bg-black/10 h-0.5 w-full fullWidth mt-6 "></div>

            <form className="addressForm">
              <input
                placeholder="First Name"
                className="addressInput"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />

              <input
                placeholder="Last Name"
                name="lastName"
                className="addressInput"
                onChange={handleChange}
                value={formData.lastName}
              />

              <input
                placeholder="Email Address"
                className="addressInput"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />

              <input
                placeholder="Phone Number"
                className="addressInput"
                onChange={handleChange}
                name="phone"
                value={formData.phone}
              />

              <input
                placeholder=" Address"
                className="addressInput fullWidth"
                name="street"
                onChange={handleChange}
                value={formData.street}
              />

              <input
                className="addressInput"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                className="addressInput"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                name="postalCode"
              />

              <LocalDropDown
                label="Country"
                options={countryOptions}
                value={formData.country}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: value,
                    state: "", // reset state when country changes
                  }))
                }
              />

              <LocalDropDown
                label="State"
                options={stateOptions}
                value={formData.state}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    state: value,
                  }))
                }
              />

              <div className="bg-black/10 h-0.5 w-full fullWidth mt-6"></div>

              <section className="fullWidth py-4 flex flex-col gap-2">
                <h3>Delivery Method</h3>

                <label className="">
                  <input
                    type="radio"
                    className="mr-2 radioButton"
                    onChange={handleChange}
                    name="deliveryMethod"
                    value="standard"
                    checked={formData.deliveryMethod === "standard"}
                  />
                  Standard Delivery -<span>99</span>
                  <span className="text-gray-600/40 px-2">(3-4 days)</span>
                </label>

                <label className="">
                  <input
                    type="radio"
                    onChange={handleChange}
                    checked={formData.deliveryMethod === "express"}
                    name="deliveryMethod"
                    value="express"
                    className="mr-2 radioButton"
                  />
                  Express Delivery -<span>199</span>
                  <span className="text-gray-600/40 px-3">(1-2 days)</span>
                </label>
              </section>

              <div className="bg-black/10 h-0.5 w-full fullWidth mt-6"></div>

              <section className="fullWidth py-4 flex flex-col gap-2">
                <h3>Payment Method</h3>

                <label className="">
                  <input
                    type="radio"
                    className="mr-2 radioButton"
                    name="paymentMethod"
                    onChange={handleChange}
                    checked={formData.paymentMethod === "cod"}
                    value="cod"
                  />
                  Cash on Delivery
                </label>

                <label className="">
                  <input
                    type="radio"
                    className="mr-2 radioButton"
                    onChange={handleChange}
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                  />
                  Upi
                </label>

                <label className="">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "card"}
                    className="mr-2 radioButton"
                    onChange={handleChange}
                    value="card"
                  />
                  Credit<span className="px-0.5 ml-0.5">/</span> Debit Card
                </label>
              </section>
            </form>
          </section>
        </main>
        <aside className="checkoutRight">
          <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm sticky top-24">

            <OrderSummary deliveryMethod={formData.deliveryMethod}/>
            <button onClick={handlePlaceOrder}
            className="w-full mt-10 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mb-3">
              Place Order
            </button>

            <Link href={"/productlist"}>
              <button className="w-full border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Back to Shopping
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

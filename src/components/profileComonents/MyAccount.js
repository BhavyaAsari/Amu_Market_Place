"use client";

import { useState } from "react";
import ProfileSec from "./profileSection";
import UpdatePasswordForm from "./updatePassword";
import AddressSection from "./AddressSection";
import Myorders from "./OrdersSection";

export default function MyAccountPage({user}) {

    const[active,setActive] = useState("profile");

    return (


        <main className="AccountContainer" >

            <h1 className="text-3xl mt-2 font-medium text-center font-serif">Manage Your Acccount {user.username} </h1>

            <section className="GridContainer">

                <aside 
                className=
                  "bg-white  p-6 rounded-xl shadow-2xl h-fit">

                    {[
                        ["profile","My Profile"],
                        ["security","Security"],
                        ["address","Saved Address"],
                        ["orders","My Orders"],
                        ].map(([key,label])=>  (

                            <button 
                            key={key} onClick={() => setActive(key)} 
                            className={`w-full text-left px-4 py-2 rounded-lg mb-1 transition
                            ${active===key
                                ? "bg-purple-600 text-white" : "hover:bg-gray-100"
                            }`}>

                                {label}
                            </button>

                        ))}


                </aside>

                {/* Content Card */}

                <section className="bg-white rounded-xl mb-4 shadow-2xl p-8 ">

                    {active === "profile" && <ProfileSec user={user}/>}
                    {active === "security" && <UpdatePasswordForm/>}
                    {active === "address" && <AddressSection/>}
                    {active === "orders" && <Myorders/>}

                </section>


            </section>



        </main>
    );


}


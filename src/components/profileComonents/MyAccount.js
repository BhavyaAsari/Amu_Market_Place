"use client";

import { useState } from "react";
import ProfileSec from "./profileSection";
import UpdatePasswordForm from "./updatePassword";
import AddressSection from "./AddressSection";
import Myorders from "./OrdersSection";
import {
  LuUser,
  LuShieldCheck,
  LuMapPin,
  LuPackage,
} from "react-icons/lu";

const menuItems = [
  {
    key: "profile",
    label: "My Profile",
    icon: LuUser,
  },
  {
    key: "security",
    label: "Security",
    icon: LuShieldCheck,
  },
  {
    key: "address",
    label: "Saved Address",
    icon: LuMapPin,
  },
  {
    key: "orders",
    label: "My Orders",
    icon: LuPackage,
  },
];


export default function MyAccountPage({user}) {

    const[active,setActive] = useState("profile");

      const safeUser = {
    ...user,
    addresses: Array.isArray(user?.addresses) ? user.addresses : [],
  };

//   console.log("Safe User Account", safeUser);

//     console.log("User Account",user);

    return (


        <main className="AccountContainer" >

            <h1 className="text-3xl mt-2 font-medium text-center font-serif">Manage Your Account {safeUser.username} </h1>

            <section className="GridContainer">

               <aside className="bg-slate-300/10 p-6 rounded-xl shadow-2xl h-fit border border-gray-400">
  {menuItems.map(({ key, label, icon: Icon }) => (
    <button
      key={key}
      onClick={() => setActive(key)}
      className={`
        flex items-center gap-3
        w-full text-left
        px-4 py-3
        rounded-lg mb-1
        transition hover:border
        ${
          active === key
            ? "bg-purple-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <Icon
        size={20}
        className={active === key ? "text-white" : "text-purple-600"}
      />
      <span className="font-medium">{label}</span>
    </button>
  ))}
</aside>


                {/* Content Card */}

                <section className="bg-white rounded-xl mb-4 shadow-2xl p-8 ">

                    {active === "profile" && <ProfileSec user={user}/>}
                    {active === "security" && <UpdatePasswordForm/>}
                    {active === "address" &&  <AddressSection addresses={safeUser.addresses} user={safeUser} />}
                    {active === "orders" && <Myorders/>}

                </section>


            </section>



        </main>
    );


}


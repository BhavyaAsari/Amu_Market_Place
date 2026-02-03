"use client";

import { useState } from "react";
import Link from "next/link";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useSession, signOut } from "next-auth/react";
import {
 
  LuShoppingCart,
  LuPhone,
  LuUser,
  LuLogOut,
  LuHouse,
  LuLaptop,
  LuPhoneCall,
  LuLogIn,
  LuX,
  LuAlignLeft
} from "react-icons/lu";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const toggleMenu = () => {
    setOpen((prev) => {
      const newValue = !prev;
      return newValue;
    });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
     <div className="flex md:hidden h-16 px-4 items-center justify-between bg-purple-900/90 fixed top-0 left-0 right-0 z-50">
  <IconButton
    variant="text"
    onClick={toggleMenu}
    aria-label="Toggle navigation menu"
    className="hover:bg-white/10 p-2"
  >
    <span className="relative w-6 h-6 block">
      <LuAlignLeft
        className={`absolute inset-0 text-2xl text-white transition-all duration-300
          ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
      />
      <LuX
        className={`absolute inset-0 text-2xl text-white transition-all duration-500 ease-in-out hover:rotate-180
          ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75 ease-in-out duration-300 "}`}
      />
    </span>
  </IconButton>

  <Link href="/" className="text-2xl font-bold text-white">
    AMU
  </Link>

  <div className="w-10"></div>
</div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:hidden"></div>

      {/* Drawer */}
      <Drawer
        open={open}
        onClose={closeMenu}
        placement="left"
        className="z-200 shadow-xl"
        overlayProps={{
          className: "fixed z-[150] ",
        }}
        size={280}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-purple-900 text-white shadow-md transition-transform duration-300 ease-in-out ">
          <span className="text-xl font-bold">AMU</span>

          <button
            onClick={closeMenu}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            aria-label="Close navigation menu"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="bg-white h-full overflow-y-auto text-xl">
          <ul className="p-6 space-y-2">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="flex  py-3 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors text-gray-800 font-medium"
              > 
               <LuHouse className="text-xl mt-1 "/>
                <span className="ml-1 ">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={closeMenu}
                className="flex py-3 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors text-gray-800 font-medium"
              > 
                <LuLaptop className="text-xl mt-1"/>
                <span className="ml-1">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex py-3 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors text-gray-800 font-medium"
              >

                <LuShoppingCart className="text-xl mt-1" />
                <span className="ml-1">Cart</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex py-3 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors text-gray-800 font-medium"
              > 

                <LuPhoneCall className="text-xl mt-1"/>
                 <span className="ml-1">Contact</span>
              </Link>
            </li>

            {status === "unauthenticated" && (
              <li className="pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex py-3 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium text-center"
                > 
                  <LuLogIn className="text-xl mt-1"/>
                   <span className="ml-1">Login</span>
                </Link>
              </li>
            )}

            {status === "authenticated" && (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex py-3 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition-colors text-gray-800 font-medium "
                  > 
                      <LuUser className="text-xl mt-1" />
                     <span className="ml-1">Profile</span>
                  </Link>
                </li>

                <li className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      closeMenu();
                      signOut({ callbackUrl: "/" });
                    }}
                    className=" flex w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-medium text-center"
                  > 

                      <LuLogOut className="text-2xl mt-1"/>
                     <span className="ml-1">Sign Out</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useSession, signOut } from "next-auth/react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex  md:hidden h-16 px-4  items-center justify-between bg-purple-900/90  ">
        <IconButton variant="text" color="white" onClick={() => setOpen(true)}>
          ☰
        </IconButton>

        <Link href="/" className="text-2xl font-bold text-white/80">
          AMU
        </Link>
      </div>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} size={280}>
        <div className="p-4 text-xl font-bold bg-purple-900 text-white">
          AMU
        </div>

        <ul className="p-4 space-y-4">
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/products" onClick={() => setOpen(false)}>Products</Link></li>
          <li><Link href="/cart" onClick={() => setOpen(false)}>Cart</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

          {status === "unauthenticated" && (
            <li>
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </li>
          )}

          {status === "authenticated" && (
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="text-red-600"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </Drawer>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DesktopNav() {
const pathname = usePathname();
const { status } = useSession();

const linkClass = (path) =>
`px-4 py-2 rounded-xl transition-all duration-200 ${
      pathname === path
        ? "text-white bg-white/10"
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

return ( <nav className="hidden md:grid grid-cols-3 h-16 w-full px-8 items-center
 bg-linear-to-r from-purple-500 via-violet-700 to-purple-500
 backdrop-blur-md border-b border-white/10">


  {/* LEFT : LOGO */}
  <div className="flex items-center gap-2">
    <Link href="/" className="text-3xl font-bold text-white/80">
      AMU
    </Link>
    <span className="text-xs text-white/40 hidden lg:block">
      AI Powered
    </span>
  </div>

  {/* CENTER : NAVIGATION */}
  <ul className="flex justify-center items-center gap-10">
    <li>
      <Link href="/" className={linkClass("/")}>Home</Link>
    </li>

    <li>
      <Link href="/productlist" className={linkClass("/productlist")}>
        Products
      </Link>
    </li>

    <li>
      <Link href="/cart" className={linkClass("/cart")}>Cart</Link>
    </li>

    <li>
      <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
    </li>
  </ul>

  {/* RIGHT : USER ACTIONS */}
  <div className="flex justify-end items-center gap-4">

    {status === "unauthenticated" && (
      <Link href="/login" className={linkClass("/login")}>
        Sign In
      </Link>
    )}

    {status === "authenticated" && (
      <>
        <Link href="/profile" className={linkClass("/profile")}>
          Profile
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-red-500/30 transition"
        >
          Sign Out
        </button>
      </>
    )}
  </div>

</nav>
)}
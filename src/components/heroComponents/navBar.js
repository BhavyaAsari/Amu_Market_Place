"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log("status",status)

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "text-black bg-violet-600/20"
        : "text-white/70 hover:text-black hover:bg-violet-600/20"
    }`;

  return (
    <nav className="h-16 w-full px-6 flex items-center justify-between bg-purple-900/90 hover:cursor-pointer">
      <Link href="/" className="text-3xl font-bold">
        <span className="text-white/50">AMU</span>
      </Link>

      <ul className="flex items-center gap-2 list-none">
        <li><Link href="/" className={linkClass("/")}>Home</Link></li>
        <li><Link href="/products" className={linkClass("/products")}>Products</Link></li>
        <li><Link href="/cart" className={linkClass("/cart")}>Cart</Link></li>
        <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>

        {/*  While session is loading */}
        {status === "loading" ? null : status === "unauthenticated" ? (
          //  NOT LOGGED IN
          <li>
            <Link href="/signup" className={linkClass("/signup")}>
              Signup
            </Link>
          </li>
        ) : (
          //  LOGGED IN (GOOGLE + CREDENTIALS)
          <>
            <li>
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 rounded-lg text-white/70 hover:text-black hover:bg-red-500/30 transition"
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

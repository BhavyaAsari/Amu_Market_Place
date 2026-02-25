"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DesktopNav() {
  const pathname = usePathname();
  const { status } = useSession();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "text-black "
        : "text-white    hover:rounded-2xl "
    }`;

  return (
    <nav className="hidden md:flex h-16 w-full px-6 items-center justify-between bg-linear-to-br from-purple-400 via-violet-800 to-purple-500">
      <Link href="/" className="text-3xl font-bold text-white/50">
        AMU
      </Link>

      <ul className="flex items-center gap-2">
        <li><Link href="/" className={linkClass("/")}>Home</Link></li>
        <li><Link href="/productlist" className={linkClass("/productlist")}>Products</Link></li>
        <li><Link href="/cart" className={linkClass("/cart")}>Cart</Link></li>
        <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>

        {status === "unauthenticated" && (
          <li><Link href="/login" className={linkClass("/login")}>SignIn</Link></li>
        )}

        {status === "authenticated" && (
          <>
            <li><Link href="/profile" className={linkClass("/profile")}>Profile</Link></li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 rounded-lg text-white/70 hover:text-black hover:bg-red-500/30"
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

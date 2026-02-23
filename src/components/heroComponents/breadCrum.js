"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LuHouse,
  LuShoppingBag,
  LuChevronRight,
  LuShoppingCart,
  LuUser,
  LuCreditCard,
} from "react-icons/lu";

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const segments = pathname.split("/").filter(Boolean);

  const iconMap = {
    productlist: LuShoppingBag,
    cart: LuShoppingCart,
    profile: LuUser,
    checkout: LuCreditCard,
  };

  return (
    <div className="flex items-center ml-2 gap-2 text-lg text-gray-500 mb-6">

      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-purple-600 transition"
      >
        <LuHouse size={18} />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const Icon = iconMap[segment.toLowerCase()];

        return (
          <div key={index} className="flex items-center gap-2">
            <LuChevronRight size={18} className="text-purple-600" />

            <Link
              href={path}
              className={`flex items-center gap-1 capitalize transition
                ${
                  isLast
                    ? "text-gray-800 font-medium"
                    : "hover:text-purple-600"
                }`}
            >
              {Icon && <Icon size={18} />}

              {segment.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
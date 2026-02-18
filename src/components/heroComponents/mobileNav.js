"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";
import { useSession, signOut } from "next-auth/react";
import {
  LuShoppingCart,
  LuUser,
  LuLogOut,
  LuHouse,
  LuLaptop,
  LuPhoneCall,
  LuLogIn,
  LuX,
  LuAlignLeft,
} from "react-icons/lu";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {/* Top Navbar */}
      <div className="flex md:hidden h-16 px-4 items-center justify-between bg-purple-900 fixed top-0 left-0 right-0 z-50">
        <Button
          isIconOnly
          variant="light"
          className="text-white"
          onPress={() => setOpen(true)}
        >
          <LuAlignLeft size={22} />
        </Button>

        <Link href="/" className="text-2xl font-bold text-white">
          AMU
        </Link>

        <div className="w-8" />
      </div>

      <div className="h-16 md:hidden" />

      {/* HeroUI Drawer */}
      <Drawer
        isOpen={open}
        onOpenChange={setOpen}
        placement="left"
        size="xs"
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              duration: 1,
            },
            exit: {
              x: 100,
              opacity: 0,
              duration: 1,
            },
          },
        }}
      >
        <DrawerContent className="bg-white rounded-2xl h-full transition-all duration-300">
          {(onClose) => (
            <>
              {/* Header */}
              <DrawerHeader className="flex items-center justify-between bg-purple-900 text-white">
                <span className="text-xl font-bold">AMU</span>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-white"
                  onPress={onClose}
                >
                  <LuX size={30} />
                </Button>
              </DrawerHeader>

              {/* Body */}
              <DrawerBody className="space-y-3 text-lg  ">

                <NavItem href="/" icon={<LuHouse />} label="Home" close={onClose} />
                <NavItem href="/productlist" icon={<LuLaptop />} label="Products" close={onClose} />
                <NavItem href="/cart" icon={<LuShoppingCart />} label="Cart" close={onClose} />
                <NavItem href="/contact" icon={<LuPhoneCall />} label="Contact" close={onClose} />

                {status === "unauthenticated" && (
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="block mt-4 bg-purple-600 text-white px-4 py-3 rounded-lg text-center"
                  >
                    <LuLogIn className="inline mr-2" />
                    Login
                  </Link>
                )}

                {status === "authenticated" && (
                  <>
                    <NavItem href="/profile" icon={<LuUser />} label="Profile" close={onClose} />

                    <button
                      onClick={() => {
                        onClose();
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full mt-4 bg-red-600 text-white px-4 py-3 rounded-lg"
                    >
                      <LuLogOut className="inline mr-2" />
                      Sign Out
                    </button>
                  </>
                )}

              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

/* Reusable Nav Item */
function NavItem({ href, icon, label, close }) {
  return (
    <Link
      href={href}
      onClick={close}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-100 transition"
    >
      {icon}
      {label}
    </Link>
  );
}

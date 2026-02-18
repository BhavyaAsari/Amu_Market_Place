"use client";

import AddButton from "@/components/productComponents/addToCartButton";
import ReviewCard from "@/components/reviewComponent/reviewCard";
import {
  LuCpu,
  LuMemoryStick,
  LuHardDrive,
  LuMonitor,
  LuPalette,
  LuBatteryFull,
  LuWeight,
  LuCircuitBoard,
  LuAppWindow,
} from "react-icons/lu";

const specIconMap = {
  processor: LuCpu,
  ram: LuMemoryStick,
  storage: LuHardDrive,
  graphics: LuCircuitBoard,
  display: LuMonitor,
  os: LuAppWindow,
  color: LuPalette,
  weight: LuWeight,
  battery: LuBatteryFull,
};

export default function ProductDetailsClient({ product, session, userEmail }) {
  const brand =
    product.brand.charAt(0).toUpperCase() +
    product.brand.slice(1).toLowerCase();

  const displayTitle = `${brand} ${product.series}`;

  return (
    <>
      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl font-semibold">
        {displayTitle}
      </h1>

      {/* PRICE */}
      <p className="text-lg sm:text-2xl font-bold mt-4">
        ₹{product.price}
      </p>

      <p className="text-lg text-black mt-1">
        Incl. shipping & taxes
      </p>

      <div className="mt-2 text-lg text-black/90 space-y-1">
        <p>• Exchange offer available</p>
        <p>• No cost EMI options</p>
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex gap-4">
        <AddButton product={product} />

        <button className="border rounded-xl px-4 py-2 bg-[#7C3AED] text-white hover:text-purple-600 hover:bg-white transition">
          Buy Now
        </button>
      </div>

      {/* SPECS */}
      <div className="specContainer mt-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3">
            System Specs
          </h2>
        </div>

        <div className="flex flex-col py-2 gap-3">
          {Object.entries(product.specs).map(([key, value]) => {
            const Icon = specIconMap[key];

            return (
              <div key={key} className="flex items-center gap-4 text-lg">
                {Icon && (
                  <Icon className="text-black text-3xl shrink-0" />
                )}

                <div>
                  <span className="font-semibold capitalize">
                    {key}:
                  </span>{" "}
                  <span className="text-purple-800 font-semibold">
                    {value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WRITE REVIEW CARD */}
      <section className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-2xl">
        <ReviewCard
          session={session}
          product={product}
          userEmail={userEmail}
        />
      </section>
    </>
  );
}

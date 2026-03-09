"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuBriefcase,
  LuGamepad2,
  LuWallet,
  LuLayoutGrid,
} from "react-icons/lu";

export default function BrandSection({ brands }) {

  const tabs = ["all", "business", "gaming", "budget"];
   const tabIcons = {
  all: LuLayoutGrid,
  business: LuBriefcase,
  gaming: LuGamepad2,
  budget: LuWallet,
};
  const [activeTab, setActiveTab] = useState("all");

 const filteredBrands = brands.filter((brand) => {
  if (activeTab === "all") return true;

  if (Array.isArray(brand.categories)) {
    return brand.categories.includes(activeTab);
  }

  return brand.categories === activeTab;
});
  return (
    <>
      <div className="ui-header mb-8">

        <h2 className="title-headerSec">
          Explore your choice of device
        </h2>

        <div className="ui-tab-group ">
{tabs.map((tab) => {
  const Icon = tabIcons[tab];
   const isActive = activeTab === tab;

  return (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`ui-tab flex items-center gap-2 text-lg ${
        activeTab === tab ? "ui-tab-active" : ""
      }`}
    >

   
      {isActive ? (
        <Icon  size={20} />
      ) : (
        tab.charAt(0).toUpperCase() + tab.slice(1)
      )}


    </button>
  );
})}

        </div>
      </div>

      <section className="productContainer">

        {filteredBrands.map((brand, index) => (

          <div key={index} className="brandContainer group relative"
          style={{ borderTop: `6px solid ${brand.color}` }}>

            <div className="CardMask"></div>

            <div className="BrandImageContainer">

              <Image
                src={brand.image}
                alt={brand.name}
                width={180}
                height={80}
                className="ImageCard"
              />

              <Link href={`productlist?brand=${brand.name.toLowerCase()}`}>
                <button className="BrandButton">
                  View
                </button>
              </Link>

            </div>

            {/* <div className="relative w-30 h-30 brandContainer group  overflow-hidden">
              <Image
              src={brand.logo} 
              alt={brand.name}
              fill
              className="object-contain"/>
            </div> */}

            <div className="mt-2 text-center">

              <p className="text-xl sm:text-2xl font-bold text-zinc-600">
                {brand.name}
              </p>

              <p className="sm:text-xl text-sm opacity-70">
                {brand.tagline}
              </p>

            </div>

          </div>

        ))}

      </section>
    </>
  );
}
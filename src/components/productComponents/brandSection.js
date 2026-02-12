"use client";

import Image from "next/image";

export default function BrandSection({ brands }) {
  return (
    <section className="productContainer ">
      {brands.map((brand, index) => (
        <div key={index} className="brandContainer group relative">
         <div className="CardMask"></div>

         <div className="BrandImageContainer ">

            <Image
            src={brand.image}
            alt={brand.name}
            width={180}
            height={80}
            className="ImageCard"
          />

          <button className="BrandButton">View</button>

         </div>
         <div className="mt-2 text-center  ">
             <p className="text-xl sm:text-2xl font-bold  text-zinc-600">
            {brand.name}
          </p>

          <p className="sm:text-xl text-sm opacity-70  ">
            {brand.tagline}
          </p>
         </div>
        </div>
      ))}
    </section>
  );
}

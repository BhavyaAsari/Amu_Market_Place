"use client";

import Image from "next/image";

export default function BrandSection({ brands }) {
  return (
    <section className="productContainer">
      {brands.map((brand, index) => (
        <div key={index} className="brandContainer ">
         <div className="h-36 sm:h-40  flex items-center justify-center">
             <Image
            src={brand.image}
            alt={brand.name}
            width={180}
            height={80}
            className="object-contain  p-2"
          />

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

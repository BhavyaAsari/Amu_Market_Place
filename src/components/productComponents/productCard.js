import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
}) {

  // console.log("product card props",id,title,description,price,image);
  return (
    <section className="bg-slate-100 rounded-lg p-2 shadow-lg hover:translate-y-1 hover:shadow-2xl">

      {/* IMAGE CONTAINER */}
<div className="relative h-48  rounded-lg overflow-hidden flex items-center justify-center group">
  <Image
    src={image}
    alt={title}
    fill
    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
    sizes="(max-width: 768px) 100vw, 200px"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                  flex items-center justify-center">
    <div className="flex flex-col gap-3">
      <Link
        href={`/products/${id}`}
        className="px-5 py-2 rounded-lg
                   bg-white text-black text-sm font-semibold
                   hover:bg-gray-200 transition"
      >
        View Details
      </Link>

      <button
        className="px-5 py-2 rounded-lg
                   bg-violet-600 text-white
                   hover:bg-violet-700 transition"
      >
        Buy
      </button>
    </div>
  </div>
</div>


       {/* 🔹 HORIZONTAL LINE */}
      <div className=" h-px w-full bg-black/20"></div>

      {/* 🔹 PRODUCT DETAILS (ALWAYS VISIBLE) */}
      <div className="mt-4 bg-white p-5 rounded-xl h-40 sm:h-44 lh:h-48 flex flex-col"  >
        <h3 className="text-black text-xl font-semibold leading-6 line-clamp-2 ">
          {title}inch
        </h3>

        {/* DESCRIPTION */}
        <p className="text-black/70 text-lg mt-1 line-clamp-2 ">
         {description}
        </p>

        <p className="text-black/80 font-extrabold mt-auto text-2xl">
          ₹{price}
        </p>
      </div>

    </section>
  );
}

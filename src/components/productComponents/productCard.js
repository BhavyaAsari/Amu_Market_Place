import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
}) {
  return (
    <section className="bg-stone-700/20 rounded-lg p-2 shadow-lg">

      {/* 🔹 IMAGE SECTION (HOVER ONLY HERE) */}
      <div
        className="relative group overflow-hidden rounded-lg
                   transition duration-300"
      >
        {/* IMAGE */}
        <Image
          src={image}
          width={300}
          height={300}
          alt={title}
          className="w-full h-62 object-cover
                     transition duration-300
                     group-hover:scale-105 p-2"
        />

        {/*  OVERLAY */}
        <div
          className="absolute inset-0 bg-black/60
                     opacity-0 group-hover:opacity-100
                     transition duration-300
                     flex items-center justify-center"
        >
          {/* VERTICAL BUTTONS */}
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
      <div className="mt-4 bg-white p-5 rounded-xl"  >
        <h3 className="text-black text-2xl font-semibold">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-black/70 text-lg mt-1 line-clamp-2 ">
         <span className="font-bold">Specs:     </span> 
         {description}
        </p>

        <p className="text-black/80 font-bold mt-2 text-lg">
          {price}
        </p>
      </div>

    </section>
  );
}

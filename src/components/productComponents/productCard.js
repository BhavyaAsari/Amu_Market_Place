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
    <section className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden HoveUnderline">

  {/* IMAGE */}
  <div className="relative h-52 bg-gray-50 flex items-center justify-center">
    <Image
      src={image}
      alt={title}
      fill
      className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 300px"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <Link
          href={`/products/${id}`}
          className="px-6 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
        >
          View Details
        </Link>

        <Link href={`/checkout?buyNow=true&productId=${id}&qty=1`}>
          <button className="px-6 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* DETAILS */}
  <div className="p-5 space-y-2">
    <h3 className="text-lg font-semibold line-clamp-2">
      {title}
    </h3>

    <p className="text-sm text-gray-500 line-clamp-2">
      {description}
    </p>

    <p className="text-xl font-bold text-gray-900">
      ₹{price}
    </p>
  </div>

</section>
  );
}

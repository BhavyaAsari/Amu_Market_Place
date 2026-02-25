import Image from "next/image";
import Link from "next/link";

export default function CardRecommend({ product }) {

  if (!product) return null;

//   console.log("products",product.image);

  return (
    <Link
      href={`/products/${product._id}`}
      scroll={true}
      className="reccomndCard min-w-xsm bg-white rounded-xl border border-gray-200 
                 shadow-sm hover:shadow-md  hide-scrollbar 
                 transition-all duration-300 hover:-translate-y-1 "
    >
      {/* Image */}
      <div className="ImageCardContainer h-36 bg-gray-50 rounded-t-xl flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.title}
          width={160}
          height={120}
          className="ImageCard object-contain"
        />
      </div>

      {/* Content */}
      <section className="contentContainer p-4 HoveUnderline">

        <h3 className="ProductName text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
          {product.title}
        </h3>

        <div className="detailsContainer mt-3 flex  items-center justify-between">

          <div className="productPrice text-purple-600 font-semibold text-base">
            ₹{product.price}
          </div>

          <div className="productRatings text-yellow-500 text-xs font-medium">
            ⭐ {product.rating?.toFixed(1) || "0.0"}
          </div>

        </div>

        {product.specs?.graphics && (
          <div className="productFeatures mt-3">
            <span className="features text-[11px] bg-purple-50 text-purple-600 px-2 py-1 rounded-md font-medium">
              {product.specs.graphics}
            </span>
          </div>
        )}

      </section>
    </Link>
  );
}
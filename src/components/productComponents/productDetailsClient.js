"use client";

import AddButton from "@/components/productComponents/addToCartButton";
import ReviewCard from "@/components/reviewComponent/reviewCard";
import { LuTruck, LuShoppingBag, LuRotateCcw } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { LuShieldCheck, LuRepeat, LuCreditCard } from "react-icons/lu";
export default function ProductDetailsClient({ product, session, userEmail }) {
  const brand =
    product.brand.charAt(0).toUpperCase() +
    product.brand.slice(1).toLowerCase();

  const displayTitle = `${brand} ${product.series}`;

  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/checkout?buyNow=true&productId=${product._id}&qty=1`);
  };

  console.log("product",product._id)


  return (
    <>
      <div className="  ">
        <div className="">
          {/* TITLE */}
          <h1 className="text-2xl sm:text-4xl font-semibold">{displayTitle}</h1>
          <div className="text-gray-500  mt-2">Power • Performance • Style</div>
        </div>

        <div className="flex items-center mt-3 ">
          {/* PRICE */}
          <p className="text-lg sm:text-2xl font-bold ">₹{product.price}</p>

          <p className="text-[13px] text-black mt-3 ml-2 rounded-2xl shadow-2xl bg-purple-200 w-35  text-center">
            Incl. shipping & Taxes
          </p>
        </div>

        <div className="mt-3 text-sm  text-black/90 space-y-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <LuShieldCheck size={20} className="text-purple-500" />
            <span className="font-bold">Warranty </span>Available
          </div>{" "}
          <div className="flex items-center gap-2">
            <LuRepeat size={18} className="text-purple-500" />
            <span className="font-bold">Exchange offer </span>available
          </div>
          <div className="flex items-center gap-2">
            <LuCreditCard size={18} className="text-purple-500" />
            <span>
              No cost EMI ~ upto <b>12 Months</b>
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4">
          <AddButton product={product} />

          <button
            className="border rounded-xl px-5   text-black hover:text-purple-600 hover:bg-white transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6 rounded-xl text-sm flex items-center gap-6 text-gray-600 bg-purple-100 h-10 px-1 py-2">
          <div className="flex items-center gap-1 ">
            <LuTruck size={18} />
            <span className="text-black">Free Delivery</span>
          </div>

          <div className="flex items-center gap-1">
            <LuShoppingBag size={18} />
            <span className="text-black">Secure Payment</span>
          </div>

          <div className="flex items-center gap-1">
            <LuRotateCcw size={18} />
            <span className="text-black">7-Day Returns</span>
          </div>
        </div>
      </div>

      {/* WRITE REVIEW CARD */}
     
    </>
  );
}

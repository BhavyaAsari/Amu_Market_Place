import Image from "next/image";
import { getProductById } from "@/app/actions/getProductById";
import AddButton from "@/components/productComponents/addToCartButton";
import CartCarousel from "@/components/productComponents/productCarousal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewCard from "@/components/reviewComponent/reviewCard";
import ProductRatings from "@/components/reviewComponent/productRatings";
import ReviewCommentsCard from "@/components/reviewComponent/ComponentsCard";
import SortDropDown from "@/components/productComponents/filterComponents/sortDropDown";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import {
  LuCpu, // Processor
  LuMemoryStick, // RAM
  LuHardDrive, // Storage
  LuMonitor, // Display
  LuPalette, // Color
  LuBatteryFull, // Battery
  LuWeight,
  LuCircuitBoard, // Weight
  LuAppWindow, // OS
  LuGpu, // Graphics (if available in your version)
} from "react-icons/lu";
import RatingsBar from "@/components/reviewComponent/ratingBar";

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

export default async function ProductPage({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const userEmail = session?.user?.email;

  console.log("user", userEmail);

  const product = await getProductById(id);

  const series = product.series;

  const rating = product.rating;
  console.log("rating", rating);

  const reivews = product.reviews;
  console.log("review", reivews);
  // console.log("series",series);
  const brand =
    product.brand.charAt(0).toUpperCase() +
    product.brand.slice(1).toLowerCase();

  const displayTitle = `${brand} ${series}`;
  // console.log("displayTitle",displayTitle);
  // console.log("product",product);

  if (!product) {
    return (
      <div className="p-8 text-center text-xl text-black">
        Product Not Found !!
      </div>
    );
  }

  const totalReviews = product.reviews?.length || 0;

  // Build rating breakdown dynamically
  const ratingBreakdown = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] =
      product.reviews?.filter((r) => Math.floor(r.rating) === star).length || 0;
    return acc;
  }, {});

  return (
    <main className="bg-stone-700/20  text-black min-h-screen px-6 py-10">
      {/* TOP SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* LEFT: IMAGE + THUMBNAILS */}
        <div>
          {/* MAIN IMAGE */}
          <div className=" bg-[#111111] rounded-xl p-6 h-100 ">
            <CartCarousel images={product.images} />
          </div>

          {/* THUMBNAILS */}
          {/* <div className="flex gap-4 mt-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className="w-40 h-35 p-4 bg-zinc-800 rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`${product.title} preview ${i + 1}`}
                  width={100}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              
            ))}
          </div> */}

          <section className="bg-white rounded-2xl p-6 mt-10 w-full  shadow-2xl">
            <ProductRatings
              rating={product.rating}
              reviewCount={product.reviews?.length || 0}
            />

            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star] || 0;

              const percent = totalReviews
                ? Math.round((count / totalReviews) * 100)
                : 0;

              return <RatingsBar key={star} star={star} percent={percent}    />;
            })}

            <ReviewCommentsCard reviews={product.reviews}/>
          </section>
        </div>

        {/* RIGHT COLUMN ~ Product Details  */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold">{displayTitle}</h1>

          <p className="text-lg sm:text-2xl font-bold mt-4">₹{product.price}</p>

          <p className="text-lg text-black mt-1">Incl. shipping & taxes</p>

          <div className="mt-2 text-lg text-black/90 space-y-1 ">
            <p>• Exchange offer available</p>
            <p>• No cost EMI options</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <AddButton product={product} />

            <button className="border rounded-xl px-4 py-2 bg-[#7C3AED] text-white hover:text-purple-600 hover:bg-white hover:cursor-pointer transition  ">
              Buy Now
            </button>
          </div>
          {/* <div className="bg-black/10 h-0.5 w-full fullWidth mt-6 "></div> */}

          <div className="specContainer">
            <div>
              <h2 className="text-2xl sm:text-3xl text-gray font-semibold mt-3 ">
                System Specs
              </h2>
            </div>

            <div className="flex flex-col py-2 gap-3">
              {Object.entries(product.specs).map(([key, value]) => {
                const Icon = specIconMap[key];

                return (
                  <div key={key} className="flex items-center gap-4 text-lg">
                    {/* Icon */}
                    {Icon && <Icon className="text-black text-3xl shrink-0" />}

                    {/* Text */}
                    <div>
                      <span className="font-semibold capitalize">{key}:</span>{" "}
                      <span className="text-purple-800 font-semibold">
                        {value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <section className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-2xl">
            
            <ReviewCard
              session={session}
              product={product}
              userEmail={userEmail}
            />
          </section>
        </div>
      </section>
    </main>
  );
}

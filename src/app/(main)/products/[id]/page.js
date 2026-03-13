import { getProductById } from "@/app/actions/productAction/getProductById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import CartCarousel from "@/components/productComponents/productCarousal";
import ProductDetailsClient from "@/components/productComponents/productDetailsClient";

import ProductRatings from "@/components/reviewComponent/productRatings";
import ReviewCommentsCard from "@/components/reviewComponent/ComponentsCard";
import RatingsBar from "@/components/reviewComponent/ratingBar";
import RecommendationPanel from "@/components/productComponents/recommendationPanel";
import { getRecommendations } from "@/app/actions/Services/recommendationServices";
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



export default async function ProductPage({ params }) {
  const { id } = await params;
  // console.log("productId",id)

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const product = await getProductById(id);
  const recommendations = await getRecommendations(id);
  // console.log("recc",recommendations)

  if (!product) {
    return (
      <div className="p-8 text-center text-xl text-black">
        Product Not Found !!
      </div>
    );
  }

  const plainProduct = JSON.parse(JSON.stringify(product));

  const totalReviews = plainProduct.reviews?.length || 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] =
      plainProduct.reviews?.filter(
        (r) => Math.floor(r.rating) === star
      ).length || 0;
    return acc;
  }, {});

  return (
   <main className="bg-white text-black  px-6 py-10">
  <section className="max-w-7xl mx-auto">

    {/* PRODUCT GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
      
      {/* LEFT COLUMN */}
      <div>
        <div className="bg-black/30 h-80 p-10 rounded-2xl lg:col-span-1">
          <CartCarousel images={plainProduct.images} />
        </div>

       
      </div>

      {/* RIGHT COLUMN */}
      <div className="">
        <ProductDetailsClient
          product={plainProduct}
          session={session}
          userEmail={userEmail}
        />
         <section className="max-w-7xl mx-auto mt-4 bg-white rounded-2xl p-8 shadow-2xl">
        <ReviewCard session={session} product={product} userEmail={userEmail} />
      </section>
      </div>
       {/* SPECS */}
      <div className="specContainer ">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3">
            System Specs
          </h2>
        </div>

        <div className="flex flex-col py-2 gap-3">
          {Object.entries(product.specs).map(([key, value]) => {
            const Icon = specIconMap[key];

            return (
              <div key={key} className="flex items-center gap-2 text-lg">
                {Icon && (
                  <Icon className="text-black text-xl shrink-0" />
                )}

                <div>
                  <span className="font-semibold capitalize text-sm">
                    {key}:
                  </span>{" "}
                  <span className="text-purple-800 font-semibold text-sm">
                    {value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

            <div className="flex  w-full gap-8 mt-10  ">

  {/* LEFT SIDE - Rating Summary */}
  <section className="bg-white rounded-2xl p-6 shadow-2xl sm:w-[35%] w-full ">
    <ProductRatings
      rating={plainProduct.rating}
      reviewCount={totalReviews}
    />

    {[5, 4, 3, 2, 1].map((star) => {
      const count = ratingBreakdown[star] || 0;
      const percent = totalReviews
        ? Math.round((count / totalReviews) * 100)
        : 0;

      return (
        <RatingsBar
          key={star}
          star={star}
          percent={percent}
        />
      );
    })}
  </section>

  {/* RIGHT SIDE - Reviews */}
  <section className="bg-white rounded-2xl  shadow-2xl flex-1">
    <ReviewCommentsCard reviews={plainProduct.reviews} />
  </section>

</div>
    {/* 🔥 RECOMMENDATION SECTION (Full Width) */}
    <RecommendationPanel products={recommendations} />

  </section>
</main>
  );
}

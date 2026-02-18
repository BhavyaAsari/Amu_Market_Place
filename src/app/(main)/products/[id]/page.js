import { getProductById } from "@/app/actions/productAction/getProductById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import CartCarousel from "@/components/productComponents/productCarousal";
import ProductDetailsClient from "@/components/productComponents/productDetailsClient";

import ProductRatings from "@/components/reviewComponent/productRatings";
import ReviewCommentsCard from "@/components/reviewComponent/ComponentsCard";
import RatingsBar from "@/components/reviewComponent/ratingBar";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const product = await getProductById(id);

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
    <main className="bg-stone-700/20 text-black min-h-screen px-6 py-10">
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT COLUMN */}
        <div>
          <div className="bg-[#111111] rounded-xl p-6 h-100">
            <CartCarousel images={plainProduct.images} />
          </div>

          {/* REVIEWS CARD (Same as old design) */}
          <section className="bg-white rounded-2xl p-6 mt-10 w-full shadow-2xl">
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

            <ReviewCommentsCard reviews={plainProduct.reviews} />
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <ProductDetailsClient
            product={plainProduct}
            session={session}
            userEmail={userEmail}
          />
        </div>

      </section>
    </main>
  );
}

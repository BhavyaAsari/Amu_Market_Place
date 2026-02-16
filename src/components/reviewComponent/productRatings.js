"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductRatings({ rating, reviewCount }) {

  const safeRating = Number(rating) || 0;
  const safeReviewCount = Number(reviewCount) || 0;

  const rounded = Math.round(safeRating * 2) / 2;

  return (
    <div className="ratingCardContainer">

      <div className="ratingsSection">

        {/*  Average Rating */}
        <span className="text-7xl font-semibold">
          {safeRating.toFixed(1)}
        </span>

        {/*  Stars */}
        <div className="flex mt-6">
          {[1, 2, 3, 4, 5].map((i) => {
            if (rounded >= i)
              return <FaStar key={i} className="text-yellow-500 text-2xl" />;
            if (rounded === i - 0.5)
              return <FaStarHalfAlt key={i} className="text-yellow-500 text-2xl" />;
            return <FaRegStar key={i} className="text-gray-300 text-2xl" />;
          })}
        </div>

        {/*  Review Count */}
        <span className="mt-6 ml-2 text-xl text-gray-500 font-semibold">
          ({safeReviewCount} reviews)
        </span>

      </div>

    </div>
  );
}

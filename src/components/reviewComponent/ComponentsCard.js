"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Image from "next/image";

export default function ReviewCommentsCard({ reviews = [] }) {

  return (
    <div className="mt-12 bg-white rounded-2xl p-8">

      <h3 className="text-2xl font-semibold mb-6">
        Customer Reviews
      </h3>

      <div className="max-h-100 overflow-y-auto pr-4 space-y-8">

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((review) => {
          const roundedReview = Math.round(review.rating * 2) / 2;
          const username = review.user?.username || "User";
          const userImage = review.user?.image;

          return (

            
            
            
  

            <div
              key={review._id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >

                 {/* 👤 User Info */}
              <div className="mt-4 flex items-center gap-1">

                {/* Profile Image */}
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={username}
                    width={40}
                    height={40}
                    className="rounded-full object-cover h-10"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}


                {/* Username */}
                <span className="text-gray-600 text-xl font-medium">
                  {username}
                </span>

              </div>


              {/* ⭐ Stars */}
              <div className="flex items-center ml-10 gap-2 mb-1">
                {[1,2,3,4,5].map((i) => {
                  if (roundedReview >= i)
                    return <FaStar key={i} className="text-yellow-500" />;
                  if (roundedReview === i - 0.5)
                    return <FaStarHalfAlt key={i} className="text-yellow-500" />;
                  return <FaRegStar key={i} className="text-gray-300" />;
                })}

              
                  <span className="ml-2 text-gray-600 text-sm">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              
              
              {/* 📝 Comment */}
              <p className="text-gray-800 text-lg  ml-10 leading-relaxed">
                {review.comment}
              </p>

              

            </div>
            
            
          );
        })}

      </div>
    </div>
  );
}

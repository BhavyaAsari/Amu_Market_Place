"use client";

import { useState } from "react";
import ReviewForm from "./reviewForm";
import { LuUserCheck } from "react-icons/lu";

export default function ReviewCard({ session, product, userEmail }) {

  const [showForm, setShowForm] = useState(false);

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="">

  <div className="flex"><span className="font-semibold text-2xl">Customer Feeback </span><LuUserCheck size={30} className="ml-5"/></div>
      {/* If user is logged in */}
      {session ? (
        <>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-4 py-2 mt-4 rounded-md"
            >
              Write a Review
            </button>
          )}

          {showForm && (
            <div className="mt-6">
              <ReviewForm
                productId={product._id.toString()}
                email={userEmail}
                onSubmitSuccess={handleFormClose}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">
          Please login to write a review.
        </p>
      )}

    </div>
  );
}
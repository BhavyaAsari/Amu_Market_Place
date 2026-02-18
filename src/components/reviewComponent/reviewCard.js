"use client";

import { useState } from "react";
import ReviewForm from "./reviewForm";

export default function ReviewCard({ session, product, userEmail }) {

  const [showForm, setShowForm] = useState(false);

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="mt-8">

      {/* If user is logged in */}
      {session ? (
        <>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-4 py-2 rounded-md"
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
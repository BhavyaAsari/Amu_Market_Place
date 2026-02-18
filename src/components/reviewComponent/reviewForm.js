"use client";

import { useState } from "react";
import { addReview } from "@/app/actions/productAction/addReview";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId, email, onSubmitSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addReview(productId, email, rating, comment);

    console.log("result", result);

    if (result.success) {
      toast.success("Review Added");
      setRating(5);
      setComment("");
      router.refresh();
      
      // Close the form after successful submission
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } else {
      toast.error(result.message || "something went wrong");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-4 items-center justify-center">
          <span className="text-3xl font-semibold">Share your expirence</span>

          <div className="flex gap-2 text-3xl cursor-pointer ">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <FaStar
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                className={
                  starValue <= (hover || rating)
                    ? "text-yellow-500 transition-all duration-200"
                    : "text-gray-300 transition-all duration-200"
                }
              />
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded resize  focus:outline-0   "
            required
          />

          <button type="submit" className="btnGlobal">
            Submit Review
          </button>
        </div>
      </form>
    </>
  );
}
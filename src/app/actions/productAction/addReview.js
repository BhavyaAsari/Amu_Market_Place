"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";
import User from "@/models/Users";

export async function addReview(productId, email, rating, comment) {

  await connectDB();

 const product = await Product.findById(productId);

  const user = await User.findOne({email});

  if(!user) {

    return {success:true,message:"User not found"}
  }

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  // 🔥 Ensure reviews array exists (for old products)
  if (!product.reviews) {
    product.reviews = [];
  }

  const alreadyReviewed = product.reviews.some(
    (r) => r.user && r.user.equals(user._id)
  );

  if (alreadyReviewed) {
    return { success: false, message: "You already reviewed this product." };
  }

  //  Now push review
  const review = {
    user: user._id,
    rating,
    comment,
  };

  product.reviews.push(review);

  // Update reviewCount
  product.reviewCount = product.reviews.length;

  // Update average rating
  product.rating =product.reviews.reduce((acc, r) => acc + r.rating, 0) /product.reviewCount;

    console.log("reviews of product",product.reviews)

  await product.save();

  return { success: true };
}

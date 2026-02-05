import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

const CLOUD_NAME = "dhbaix8fc";

const BASE  = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/products/laptops`;

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to MongoDB");

const products = await Product.find({});
// console.log(`Found ${products.length} products`);

for(const product of products ) {

    const brand = product.brand?.toLowerCase();

    if(!brand) continue;

    const brandImage = `${BASE}/${brand}/${brand}`;

    product.image = brandImage;
    product.images = [brandImage];

    await product.save();

    // console.log(`Updated product ${product._id}`);
}

console.log("Brand image migration completed");
process.exit();

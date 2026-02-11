"use server";

import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

const ABSOLUTE_MIN = 0;
const ABSOLUTE_MAX = 200000;

export default async function getAllLaptops(filters = {}) {
  try {
    await connectDB();

    const query = {};

    // Brand filter
    if (filters.brand) {
      query.brand = {
        $in: filters.brand.split(",").map((b) => b.toLowerCase()),
      };
    }

    // RAM filter
    if (filters.ram) {
      query["specs.ram"] = {
        $in: filters.ram
          .split(",")
          .map(
            (ram) =>
              new RegExp(`\\b${ram.replace("GB", "\\s*GB")}\\b`, "i")
          ),
      };
    }

    // Storage filter
    if (filters.storage) {
      query["specs.storage"] = {
        $in: filters.storage
          .split(",")
          .map((s) =>
            new RegExp(
              s.replace("GB", "\\s*GB").replace("TB", "\\s*TB"),
              "i"
            )
          ),
      };
    }

    // Processor filter
    if (filters.processor) {
      query["specs.processor"] = {
        $in: filters.processor
          .split(",")
          .map((cpu) => new RegExp(cpu, "i")),
      };
    }

    //  Fix #1 — Validate price params before querying
    if (filters.minPrice || filters.maxPrice) {
      const min = Number(filters.minPrice);
      const max = Number(filters.maxPrice);

      const minValid = !isNaN(min) && min >= ABSOLUTE_MIN;
      const maxValid = !isNaN(max) && max <= ABSOLUTE_MAX;
      const rangeValid = minValid && maxValid && min < max;

      if (rangeValid) {
        query.price = {};

        // Only apply gte if above absolute floor (skip default 0)
        if (min > ABSOLUTE_MIN) query.price.$gte = min;

        // Only apply lte if below absolute ceiling (skip default 200000)
        if (max < ABSOLUTE_MAX) query.price.$lte = max;

        // Clean up empty price object if both were defaults
        if (Object.keys(query.price).length === 0) {
          delete query.price;
        }
      } else {
        // Log bad input for debugging without crashing
        console.warn("Invalid price filter received:", {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      }
    }


    let sort = {createdAt:-1};

    switch(filters.sort) {

      case "price-asc":
        sort={price:1,createdAt:-1};
        break;

      case "price-desc":
        sort={price:-1,createdAt:1};
        break;

      case "rating":
       sort={rating:-1,price:1};
       break;


      case "newest":
        sort={createdAt:-1};
        break;

      default :
      break;


    }

    const laptops = await Product.find(query)
      .select("id brand series title price image rating specs")
      .sort(sort)
      .limit(100)
      .lean();
     
      const safeLaptops = laptops.map((p) => ({
  ...p,
  _id: p._id.toString(),
  image: typeof p.image === "string" ? p.image : "",
}));

    return safeLaptops;
  } catch (error) {
    console.error("Error fetching Laptops", error);
    throw new Error("Failed to fetch Laptops");
  }
}
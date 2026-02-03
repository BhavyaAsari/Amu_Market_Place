import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";
import crypto from "crypto";
import { connectDB } from "../libs/db.js";
import Product from "../models/Product.js";

/* ----------------------------------
   Helpers
---------------------------------- */
function generateProductId(model) {
  const base = model
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base}-${crypto.randomBytes(3).toString("hex")}`;
}

function parsePrice(value) {
  if (!value) return null;
  const cleaned = value.toString().replace(/[₹?,]/g, "").trim();
  const price = Number(cleaned);
  return Number.isNaN(price) ? null : price;
}

/* ----------------------------------
   Main
---------------------------------- */
await connectDB();

const products = [];

fs.createReadStream("./src/scripts/laptopData.csv")
  .pipe(csv())
  .on("data", (row) => {
  const model = row["Model Name"]?.trim();
  const title = row["name"]?.trim();
  const price = parsePrice(row["Price"]);

  if (!model || !title || price === null) return;

  const brand = title
    .split(" ")[0]
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();

  products.push({
    id: generateProductId(model),
    brand, // ✅ laptop brand now

    title,
    shortDescription: `${row["Processor Name"] || ""} • ${
      row["RAM"] || ""
    } RAM • ${row["SSD Capacity"] || ""} SSD`,
    price,
    rating: row["user rating"]
      ? Number(row["user rating"])
      : 4.2,
    image: "/products/default.png",
    images: [],
      specs: {
        processor: row["Processor Name"] || "",
        ram: row["RAM"] || "",
        storage: row["SSD Capacity"] || "",
        graphics: row["Graphic Processor"] || "",
        display: `${row["Screen Size"] || ""} ${row["Screen Resolution"] || ""}`,
        os: row["Operating System"] || "",
        color: row["Color"] || "",
        weight: row["Weight"] || "",
        battery: row["Battery Backup"] || "",
      },
  });
}).on("end", async () => {
    try {
      // DEV ONLY
      await Product.deleteMany();
      await Product.insertMany(products, { ordered: false });

      process.exit(0);
    } catch (err) {
      console.error(" Import error:", err.message);
      process.exit(1);
    }
  });

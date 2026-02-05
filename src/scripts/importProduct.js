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
  const price = parsePrice(row["Price"]);
  const title = row["name"]?.trim();


  if (!model || !title || price === null) return;

  const brand = title
    .split(" ")[0]
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();

    
const series = row["Series"]?.trim();

if (!series) return; // skip bad rows


 products.push({
  id: generateProductId(model),
  brand,
  series,

  title,
  shortDescription: `${row["Processor Name"] || ""} • ${
    row["RAM"] || ""
  } RAM • ${
    row["SSD Capacity"] || row["HDD Capacity"] || ""
  } Storage`,

  price,
  rating: row["user rating"]
    ? Number(row["user rating"])
    : 4.2,

  image: "/products/default.png",
  images: [],

  specs: {
    processor: `${row["Processor Brand"] || ""} ${
      row["Processor Name"] || ""
    } ${row["Processor Generation"] || ""}`.trim(),

    ram: `${row["RAM"] || ""} ${row["RAM Type"] || ""}`,
    storage:
      row["SSD"] === "Yes"
        ? `${row["SSD Capacity"] || ""} SSD`
        : `${row["HDD Capacity"] || ""} HDD`,

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

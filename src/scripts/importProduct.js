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


//Random Generators 
function getRandomSold() {
  const rand = Math.random();

  if (rand > 0.8) return Math.floor(Math.random() * 100); // top products
  if (rand > 0.5) return Math.floor(Math.random() * 60);
  return Math.floor(Math.random() * 30);
}

function getStockFromSold(sold) {

  const baseStock = 10 - Math.floor(sold/5);
  return Math.max(0,baseStock);
}

function getDiscount(sold) {

  if(sold > 30) return Math.floor(Math.random() * 15);
  return Math.random() > 0.5
  ? Math.floor(Math.random() * 30) : 0;
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

      //  Generate realistic values
    const sold = getRandomSold();
    const stock = getStockFromSold(sold);
    const discount = getDiscount(sold);


    
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

  stock,
  soldCount:sold,
  discount,

  status:"active",
  category:"Laptop",

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

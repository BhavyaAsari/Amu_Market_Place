import mongoose from "mongoose";

const specSchema = new mongoose.Schema ({

    processor: String,
    ram: String,
    storage: String,
    graphics: String,
    display: String,
    os: String,
    color: String,
    weight: String,
    battery: String,
    audio: String,
    security: String,
    connectivity: String,
},

{_id:false}
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    brand: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    series: {
      type: String,
      required: true,
      index: true,
    },

    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },

    image: { type: String, required: true },
    images: { type: [String], default: [] },

    specs: specSchema,
  },
  { timestamps: true }
);

// 🔥 ADD INDEXES HERE (NOT INSIDE schema fields)
productSchema.index({ brand: 1, series: 1 });
productSchema.index({ price: 1 });


export default mongoose.models.Product || mongoose.model("Product",productSchema);
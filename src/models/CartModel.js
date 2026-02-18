import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      
    },
    guestId: {
      type: String,
      default: null,
      
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Only one cart per user
cartSchema.index({ userId: 1 }, { unique: true, sparse: true });

// Only one cart per guest
cartSchema.index({ guestId: 1 }, { unique: true, sparse: true });

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

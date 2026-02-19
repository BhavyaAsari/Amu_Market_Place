import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Snapshot fields
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },

    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    deliveryMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    stripeSessionId: {
      type: String,
      default: null,
    },

    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  label: { type: String }, // Home, Office
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  // OPTIONAL overrides
  fullName: String,
  phone: String,
  postalCode: String,
  country: String,

  isDefault: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false, // Google users won't have it
    },

    image: {
      type: String, // profile picture URL
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    postalCode: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    addresses :{

      type:[AddressSchema],
      default:[],
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

"use server";

import { connectDB } from "@/libs/db";
import User from "@/models/Users";
import { getServerSession } from "next-auth";

export async function saveAddress(prevState, formData) {
  const session = await getServerSession();
  if (!session) return { success: false, message: "Unauthorized" };

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return { success: false, message: "User not found" };

  const addressId = formData.get("addressId");

  const data = {
    label: formData.get("label") || "Home",
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    postalCode: formData.get("postalCode"),
    isDefault: formData.get("isDefault") === "on",
  };

  if (data.isDefault) {
    user.addresses.forEach(a => (a.isDefault = false));
  }

  if (addressId) {
    // UPDATE
    const address = user.addresses.id(addressId);
    if (!address) {
      return { success: false, message: "Address not found" };
    }
    Object.assign(address, data);
  } else {
    // CREATE
    user.addresses.push(data);
  }

  await user.save();

  return {
    success: true,
    message: addressId ? "Address updated" : "Address added",
  };
}

export async function deleteAddress(addressId) {
  const session = await getServerSession();
  if (!session) return { success: false };

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return { success: false };

  user.addresses = user.addresses.filter(
    addr => addr._id.toString() !== addressId
  );

  await user.save();
  return { success: true };
}

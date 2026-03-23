"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/adminActions/productActions/createProduct";
import { toast } from "react-toastify";
import LocalDropDown from "@/components/productComponents/localDropDown";

export default function AddProductFormAdmin() {
  const router = useRouter();

  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "InActive", value: "inactive" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const rawImages = formData.get("images");

    const data = {
      title: formData.get("title"),
      shortDescription: formData.get("shortDescription"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      discount: Number(formData.get("discount")),
      category: formData.get("category"),
      image: formData.get("image"),
      images: rawImages
        ? rawImages
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : [],
      status,
    };

    const result = await createProduct(data);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message || "Failed to create product");
    } else {
      toast.success("Product created successfully");
      router.push("/admin/adminProduct");
    }
  }

  return (
    <section className="editAdminContainer">
      <div className="editAdminWrapper">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/*  BASIC INFO */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="editInputLabel">Product Title</label>
              <input
                name="title"
                placeholder="Product Title"
                required
                className="editInput"
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Short Description</label>
              <input
                name="shortDescription"
                placeholder="Short Description"
                className="editInput"
              />
            </div>
          </div>

          {/* 💰 PRICING */}
          <div className="grid grid-cols-2  gap-6">
            <div className="relative">
              <label className="editInputLabel">Price</label>
              <input
                name="price"
                placeholder="Price"
                required
                className="editInput"
              />
            </div>

            <div className="relative ">
              <label className="editInputLabel">Stock</label>
              <input
                name="stock"
                placeholder="Stock"
                required
                className="editInput"
              />
            </div>

            <div className="relative col-span-2">
              <label className="editInputLabel">Discount (%)</label>
              <input
                name="discount"
                placeholder="Discount"
                className="editInput"
              />
            </div>
          </div>

          {/*  IMAGES */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="editInputLabel">Main Image URL</label>
              <input
                name="image"
                placeholder="Main Image URL"
                className="editInput"
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Sub Images</label>
              <input
                name="images"
                placeholder="img1,img2,img3"
                className="editInput"
              />
            </div>
          </div>

          {/*  STATUS */}
          <div className="w-44 mt-4">
            <h2 className="text-white font-semibold mb-2">
              Product Status
            </h2>

            <LocalDropDown
              options={statusOptions}
              rounded="lg"
              value={status}
              onChange={(val) => setStatus(val)}
            />
          </div>

          {/*  SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 py-3 rounded-lg text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
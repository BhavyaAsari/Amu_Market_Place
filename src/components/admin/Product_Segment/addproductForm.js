"use client";

import { useState } from "react";
import {
  LuInfo,
  LuCpu,
  LuBadgeIndianRupee,
  LuCloudUpload,
  LuActivity,
} from "react-icons/lu";
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

    //get file
    const file = formData.get("image");

    if (!file || file.size === 0) {
      toast.error("Main image is required");
      setLoading(false);
      return;
    }

    //Upload to cloudinary
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("brand", formData.get("brand"));
    uploadData.append("series", formData.get("series"));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const { url } = await res.json();

    const data = {
      title: formData.get("title"),
      series: formData.get("series"),
      brand: formData.get("brand"),
      shortDescription: formData.get("shortDescription"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      discount: Number(formData.get("discount")),
      category: formData.get("category"),
      image: url,
      images: [],
      status,
      specs: {
  processor: formData.get("processor"),
  ram: formData.get("ram"),
  storage: formData.get("storage"),
  graphics: formData.get("graphics"),
  display: formData.get("display"),
  os: formData.get("os"),
  color: formData.get("color"),
  weight: formData.get("weight"),
  battery: formData.get("battery"),
},
    };

    //Create product
    const result = await createProduct(data);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message || "Failed to create product");
    } else {
      toast.success("Product created successfully");
      router.push("/admin/dashboard");
    }
  }

  return (
    <section className="editAdminContainer">
      <div className="editAdminWrapper">
        <h2 className="HeaderTitleAddForm textDropShadow text-glow text-3xl text-center mb-6">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/*  BASIC INFO */}

          <div className="editTitleWrapper">
            <LuInfo className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h1 className="HeaderTitleAddForm textDropShadow text-glow">
              Product Basic Info
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative col-span-2">
              <label className="editInputLabel">Product Title</label>
              <input
                name="title"
                placeholder="Product Title"
                required
                className="editInput"
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Product Brand</label>
              <input
                required
                placeholder="Product Brand"
                className="editInput"
                name="brand"
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Series</label>
              <input
                required
                name="series"
                placeholder="Product Series"
                className="editInput"
              />
            </div>

            <div className="relative col-span-2 ">
              <label className="editInputLabel">Short Description</label>
              <input
                name="shortDescription"
                placeholder="Short Description"
                className="editInput"
                required
              />
            </div>
          </div>

          <div className="editTitleWrapper">
            <LuCpu className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h1 className="HeaderTitleAddForm textDropShadow text-glow">Product Specs</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative col-span-2">
              <label className="editInputLabel">Display</label>
              <input
                placeholder="Display"
                className="editInput"
                name="display"
                required
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Processor</label>
              <input
                placeholder="Processor"
                className="editInput"
                name="processor"
                required
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Ram</label>
              <input
                className="editInput"
                placeholder="Ram"
                name="ram"
                required
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Storage</label>
              <input
                className="editInput"
                placeholder="Storage"
                name="storage"
                required
              />
            </div>

            <div className="relative ">
              <label className="editInputLabel">Graphics</label>
              <input
                className="editInput"
                placeholder="graphics"
                name="graphics"
                required
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Operating System</label>
              <input
                className="editInput"
                placeholder="os"
                name="os"
                required
              />
            </div>

            <div className="relative">
              <label className="editInputLabel">Color</label>
              <input
                className="editInput"
                placeholder="Color"
                name="color"
                required
              />
            </div>

            <div className="relative col-span-2">
              <label className="editInputLabel">Weight</label>
              <input
                className="editInput"
                placeholder="Weight"
                name="weight"
                required
              />
            </div>

            <div className="relative col-span-2">
              <label className="editInputLabel">Battery</label>
              <input
                className="editInput"
                placeholder="Battery"
                name="battery"
                required
              />
            </div>
          </div>

          <div className="editTitleWrapper">
            <LuBadgeIndianRupee className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h1 className="HeaderTitleAddForm textDropShadow text-glow">
              Prdouct Economics
            </h1>
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

          <div className="editTitleWrapper">
            <LuCloudUpload className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h1 className="HeaderTitleAddForm textDropShadow text-glow">
              Product Images
            </h1>{" "}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="editInputLabel">Main Image </label>
              <input
                name="image"
                required
                type="file"
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

          <div className="editTitleWrapper">
            <LuActivity className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h1 className="HeaderTitleAddForm textDropShadow text-glow">
              Product Status
            </h1>{" "}
          </div>

          <div className="w-44">
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

"use client";
import { updateProductAdmin } from "@/app/actions/adminActions/productActions/updatePrdouctDetails";
import LocalDropDown from "@/components/productComponents/localDropDown";
import { useState } from "react";
import { LuLaptop } from "react-icons/lu";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }) {
  const [status, setStatus] = useState(product.status);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "InActive", value: "inactive" },
  ];

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      price: formData.get("price"),
      stock: formData.get("stock"),
      discount: formData.get("discount"),
      image: formData.get("image"),
      images: formData.get("images")?.split(","),
      status,
    };

    const result = await updateProductAdmin(product._id, data);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Product updated successfully");
    }
  }

  return (
    <>
      <section className="editAdminContainer">
        <div className="editAdminWrapper">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="editTitleWrapper">
              <LuLaptop className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
              <h2 className="text-2xl font-semibold text-white">
                product Details
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <label className=" editInputLabel">Product Name</label>
                <input
                  name="title"
                  className="editInput"
                  disabled
                  defaultValue={
                    product.title.length > 17
                      ? product.title.slice(0, 17) + "..."
                      : product.title
                  }
                  required
                  placeholder="Title"
                />
              </div>

              <div className="relative">
                <label className=" editInputLabel">Price</label>
                <input
                  name="price"
                  className="editInput "
                  defaultValue={product.price}
                  required
                  placeholder="Price"
                />
              </div>

              <div className="relative">
                <label className=" editInputLabel">Stocks</label>
                <input
                  name="stock"
                  className="editInput "
                  defaultValue={product.stock}
                  required
                  placeholder="Stocks"
                />
              </div>

              <div className="relative">
                <label className=" editInputLabel">Discount</label>
                <input
                  name="discount"
                  className="editInput "
                  defaultValue={product.discount}
                  required
                  placeholder="Discount"
                />
              </div>

              <div>
                <label>Main Image</label>
                <input
                  name="image"
                  defaultValue={product.image}
                  placeholder="Tumbnail image "
                />
              </div>

              <div>
                <label>Sub Images</label>
                <input
                  name="images"
                  defaultValue={product.images?.join(",")}
                  placeholder="img1,img2,img3"
                />
              </div>
            </div>
            <div className=" w-44 grid  grid-cols-1  mt-10">
              <h2 className="mt-4 text-white font-bold text-2xl ">
                Product Status
              </h2>
              <LocalDropDown
                options={statusOptions}
                rounded="lg"
                value={status}
                onChange={(val) => setStatus(val)}
              />
            </div>

            <button
              type="submit"
              onClick={() => router.back()}
              className=" w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

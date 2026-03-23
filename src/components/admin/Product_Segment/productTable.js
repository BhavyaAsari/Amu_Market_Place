import Image from "next/image";
import { useRouter } from "next/navigation";
import Table from "../Reusable_Components/Table";
import { LuBan, LuPencil } from "react-icons/lu";

export default function ProductTable({ productsDetails, totalPages }) {

    
  const formttedRows = productsDetails.map((product, index) => ({
    id: product._id,
    title: product.title.split(" ").slice(0,3).join(" "),
    brand: product.brand,
    price: product.price,
    number: index + 1,
    stock: product.stock,
    image: product.image || "/products/default.png",
    status: product.status || "active",
  }));

//   console.log("Images",formttedRows)
// console.log("Product Pages",totalPages);

const router = useRouter();

  const columns = [
    {
      key: "image",
      label: "#",
      render: (_, row) => (
<div className="relative w-20 h-20 bg-slate-50 rounded-md overflow-hidden">          <Image
            fill
            priority
            src={row.image || "/products/default.png"}
            alt="Loading..."
            className="    object-cover p-3 "
          />
        </div>
      ),
    },

    {
      key: "title",
      label: "Title",
      render: (value) => (
        <span className="font-bold text-sm text-gray-800 capitalize">{value}</span>
      ),
    },

    {
      key: "brand",
      label: "Brand",
      render: (value) => (
        <span className="font-bold text-sm capitalize text-gray-800">{value}</span>
      ),
    },

    {

        key:"price",
        label:"Price",
        render:(value) => (

                <span className="font-bold text-sm text-gray-800">${value}</span>
            )
    },

    {

        key:"status",
        label:"Status",
        render:(value) => (

                <span className={`px-2 py-1 rounded text-xs ${
            value === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}>{value}</span>
            )
    },

    {

        key:"stock",
        label:"Stock",
        render:(value) => (

                <span className="font-bold text-sm text-gray-800">{value}</span>
            )
    },

    {

      key:"actions",
      label:"Actions",
      render:(_,row) => (

        <div className="adminActionButtonCntainer">


          <button 
          className="BtnAction text-purple-500 hover:text-purple-800"
          onClick={() => router.push(`/admin/adminProduct/edit/${row.id}`)}>
            <LuPencil size={18} />
          </button>

          <button
          className="BtnAction text-red-600 hover:text-red-800">


            <LuBan size={18} />
          </button>


        </div>


      )


    }


  ];

  return (
    <>
      <Table columns={columns} rows={formttedRows} totalPages={totalPages}/>
    </>
  );
}

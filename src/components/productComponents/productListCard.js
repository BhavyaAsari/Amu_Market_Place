import Image from "next/image";
import Link from "next/link";
import {LuCpu,LuHardDrive,LuLaptop,LuCircuitBoard } from "react-icons/lu";
import AddToCartButton from "./addToCartButton";
import Compare_Button from "../AI_Components/CompareButton";
import Compare_checkBox from "../AI_Components/compare_checkBox";



export default function ProductListCard ({product,selectedProducts,
  toggleProduct}) {

// Extracting brand name and capitalizing first letter
const brand =
  product.brand.charAt(0).toUpperCase() +
  product.brand.slice(1).toLowerCase();

// Extracting series name (use DB value directly)
const series = product.series;

// Extracting screen size (ONLY like "15.6 Inch")
const display = product.specs.display || "";
const screenMatch = display.match(/(\d{2}\.\d)\s*inch/i);
const screenSize = screenMatch ? screenMatch[1] : "";

// Extract RAM only (ignore DDR4/DDR5)
const ramMatch = product.specs.ram.match(/(\d+\s*GB)/i);
const ram = ramMatch ? ramMatch[1].replace(" ", "") : "";

// Extract storage (normalize spacing)
const storage = product.specs.storage.replace(/\s+/g, " ").replace(" ", "");

// Final display title
const displayTitle = `${brand} ${series} ${screenSize}inch`;
const isSelected = selectedProducts.includes(product._id);
// console.log("product",product._id)

// console.log(displayTitle);

// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }, []);


return (

    <>
    <div className="productlistCard relative group mt-4 ">

        <div className={`ml-auto flex  transition-opacity duration-200
          ${isSelected ? "opacity-100": "opacity-0 group-hover:opacity-100"}`}>
  <p className="font-semibold text-purple-400">select products for comparision</p>
  <Compare_checkBox
    isSelected={isSelected}
    onToggle={() => toggleProduct(product._id)}
  />


</div>


    <div className="imageContainer bg-slate-200 ">
    
      <Image
        src={product.image || "/products/default.png"}
        alt="Product Image"
        width={200}
        height={200}
        className="object-contain w-66 h-56 p-4"
      />
      </div>
    <div className="detailsContainerProduct HoveUnderline">
        <p className="font-semibold text-2xl">{displayTitle}</p>
        <p className="text-gray-800 font-bold text-2xl">₹{product.price}</p>
        <hr className="text-gray-700"></hr>
        <ul className="flex flex-col gap-1 font-mono text-xl">
            <li><LuCircuitBoard size={22} className="inline mr-2"/>{product.specs.graphics}</li>
            <li><LuHardDrive size={22} className="inline mr-2"/>{ram},{storage}</li>
            <li><LuCpu size={22} className="inline mr-2"/>{product.specs.processor}</li>
            <li><LuLaptop size={22} className="inline "/> {product.specs.os}</li>
        </ul>
      <div className="flex flex-col justify-between sm:flex-row mt-5 ">
          
<Link
  href={`/products/${product._id}`}
  className="border rounded-xl px-4 py-2 text-center
             hover:cursor-pointer bg-black/50 text-white
             hover:text-black hover:bg-white/10 transition font-semibold  hover:no-underline"
>
  <p className="hover:no-underline">View Specs</p>
</Link>
        <AddToCartButton product={product} />
      </div>
    </div>
        

    </div>
    
    
    </>
)



}
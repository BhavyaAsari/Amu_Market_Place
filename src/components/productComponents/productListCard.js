import Image from "next/image";
import Link from "next/link";
import {LuCpu,LuHardDrive,LuLaptop,LuCircuitBoard } from "react-icons/lu";

export default function ProductListCard ({product}) {

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

console.log("product",product._id)

// console.log(displayTitle);


return (

    <>
    <div className="productlistCard">

    <div className="imageContainer bg-black/80">
      <Image
        src={product.image}
        alt={displayTitle}
        width={200}
        height={200}
        className="object-contain w-64 h-56 p-4"
      />
      </div>
    <div className="detailsContainer">
        <p className="font-semibold text-2xl">{displayTitle}</p>
        <p className="text-gray-800 font-semibold text-xl">₹{product.price}</p>
        <hr className="text-gray-700"></hr>
        <ul className="flex flex-col gap-1 font-mono text-xl">
            <li><LuCircuitBoard size={22} className="inline mr-2"/>{product.specs.graphics}</li>
            <li><LuHardDrive size={22} className="inline mr-2"/>{ram},{storage}</li>
            <li><LuCpu size={22} className="inline mr-2"/>{product.specs.processor}</li>
            <li><LuLaptop size={22} className="inline "/> {product.specs.os}</li>
        </ul>
      <div className="flex flex-col gap-3 sm:flex-row mt-5 ">
          
<Link
  href={`/products/${product._id}`}
  className="border rounded-xl px-4 py-2 text-center
             hover:cursor-pointer bg-black/50 text-white
             hover:text-black hover:bg-white/10 transition font-semibold"
>
  View Specs
</Link>
        <button className="cartBtn">
          Add to cart
          </button>
      </div>
    </div>
        

    </div>
    
    
    </>
)



}
import {LuRam} from "react-icons/lu";

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
const displayTitle = `${brand} ${series} ${screenSize} (${ram}, ${storage})`;

console.log(displayTitle);


return (

    <>
    <div className="productlistCard">

    <div className="imageContainer">Image</div>
    <div className="detailsContainer">
        <p>{displayTitle}</p>
        <p>₹{product.price}</p>
        <hr className="text-gray-700"></hr>
        <ul className="flex flex-col gap-1">
            <li>{product.specs.graphics}</li>
            <li>{ram}</li>
            <li>{product.specs.processor}</li>
            <li>{product.specs.os}</li>
        </ul>
      <div className="flex flex-col gap-3 sm:flex-row mt-5 ">
          <button className="border rounded-xl px-4 py-2 hover:cursor-pointer bg-black/50 text-white  hover:text-black hover:bg-white/10 transition font-semibold ">view specs</button>
        <button className="btnGlobal">Add to cart</button>
      </div>
    </div>
        

    </div>
    
    
    </>
)



}
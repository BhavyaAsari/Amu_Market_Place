import Image from "next/image";
import { products } from "@/app/data/products";
import AddButton from "@/components/productComponents/addToCartButton";
import CartCarousel from "@/components/productComponents/productCarousal";
export default async function ProductPage({ params }) {

  const { id } = await params;
// console.log("id",id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center text-xl text-black">
        Product Not Found !!
      </div>
    );
  }

  return (
    <main className="bg-stone-700/20  text-black min-h-screen px-6 py-10">

      {/* TOP SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols1 lg:grid-cols-2 gap-14">

        {/* LEFT: IMAGE + THUMBNAILS */}
        <div>
          {/* MAIN IMAGE */}
          <div className=" bg-[#111111] rounded-xl p-6 h-100 ">
           <CartCarousel
           images={product.images}
           />
          </div>

          {/* THUMBNAILS */}
          {/* <div className="flex gap-4 mt-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className="w-40 h-35 p-4 bg-zinc-800 rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`${product.title} preview ${i + 1}`}
                  width={100}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              
            ))}
          </div> */}
        </div>

        {/* RIGHT COLUMN ~ Product Details  */}
        <div>
          <h1 className="text-4xl font-semibold">
            {product.title}
          </h1>

           <p className="text-3xl font-bold mt-4">
            {product.price}
          </p>

           <p className="text-lg text-black mt-1">
            Incl. shipping & taxes
          </p>

          <div className="mt-4 text-lg text-black/90 space-y-1 ">
            <p>• Exchange offer available</p>
            <p>• No cost EMI options</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
           
            <AddButton product={product}/>

            <button className="border rounded-xl px-4 py-2 text-[#7C3AED] hover:bg-purple-100 hover:cursor-pointer transition  ">
                Buy Now
            </button>
          </div>

           <div>
            <h2 className="text-3xl text-gray font-bold mt-3 ">System Specs</h2>
        </div>

        <div className="flex  flex-col">
            {Object.entries(product.specs).map(([key,value]) => (

                <div 
                className="m-1 text-lg"
                key={key}
                >
                     <span className="text-zinc-800 capitalize  "><label>{key}</label></span>
              <span className="m-1">{value}</span>
            </div>
            ))}
            
        </div>
        </div>
        
      </section>

    </main>
  );
}

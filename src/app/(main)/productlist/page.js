import ProductListCard from "@/components/productComponents/productListCard";
import getAllLaptops from "@/app/actions/getAllLaptops";
import { getMetaDataFilter } from "@/config/FilterMetaProducts";
import SideBarFilter from "@/components/productComponents/filterComponents/SideBarFilter";
import SortDropDown from "@/components/productComponents/filterComponents/sortDropDown";
import Image from "next/image";

export default async function ProductListPage({ searchParams }) {
  const params = await searchParams;
  const laptops = await getAllLaptops(params);
  const metaData = await getMetaDataFilter();

  return (
    <>
      {/* <h1 className="text-center text-3xl font-bold">Grab Laptops of your choice</h1> */}

      {/* <div className="flex justify-end mr-6 rounded-lg py-4"><SortDropDown/></div> */}
      <div className=" py-4 ">
        <section className="flex w-full ">
          <SideBarFilter meta={metaData} />

          <div className="flex-1 px-6">
            {laptops.length === 0 &&

           <div className="min-h-screen flex  flex-col items-center justify-center px-4  bg-center bg-fill bg-no-repeat"
           style={{backgroundImage:"url('/Empty.gif')"}}> 
            
           <section className=" ">
            <h1 className="text-5xl font-bold">No Products found</h1>
            {/* <p className="text-2xl text-slate-900/80 font-semibold">Sorry we could not find any items matching your criteria.  </p> */}
            {/* <p className="text-2xl text-black/70 font-semibold">Try adjusting your filters </p> */}
           </section>
           </div>
          }
            <div className="grid grid-cols-1 sm:grid-cols-3  gap-6 ">
              {laptops.map((laptop) => (
                <ProductListCard key={laptop.id} product={laptop} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

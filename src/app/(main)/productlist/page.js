import ProductListCard from "@/components/productComponents/productListCard";
import getAllLaptops from "@/app/actions/getAllLaptops";
import { getMetaDataFilter } from "@/config/FilterMetaProducts";
import SideBarFilter from "@/components/productComponents/filterComponents/SideBarFilter";

export default async function ProductListPage({ searchParams }) {
  const params = await searchParams;
  const laptops = await getAllLaptops(params);
  const metaData = await getMetaDataFilter();

  return (
    <>
      <h1>This is the product page</h1>

      <div className=" py-8 ">
        <section className="ProductListPageContainer">
          <SideBarFilter meta={metaData} />

          <div className="flex-1">
            {laptops.length === 0 && <p>No laptops found.</p>}

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

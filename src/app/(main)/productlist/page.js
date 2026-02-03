import ProductListCard from "@/components/productComponents/productListCard";
import getAllLaptops from "@/app/actions/getAllLaptops";

export default async function ProductListPage() {
  const laptops = await getAllLaptops();

  return (
    <>
      <h1>This is the product page</h1>

      <div className="layout-container py-8">
        {laptops.length === 0 && (
          <p>No laptops found.</p>
        )}

        <div className="flex flex-col gap-6">
          {laptops.map((laptop) => (
            <ProductListCard
              key={laptop.id}
              product={laptop}
            />
          ))}
        </div>
      </div>
    </>
  );
}

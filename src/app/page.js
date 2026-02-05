import NavBar from "@/components/heroComponents/navBar";
import Footer from "@/components/heroComponents/footer";
import ProductCarousal from "@/components/productComponents/carousal";
import SearchBar from "@/components/heroComponents/searchBar";
import HeroBanner from "@/components/heroComponents/heroBanner";
import HeroProduct from "@/components/heroComponents/heroProduct";
import getBrands from "./actions/productBrand";
import { brandMeta } from "@/config/brandMeta";
import getAllLaptops from "./actions/getAllLaptops";
import getFeaturedProducts from "./actions/getFeaturedProducts";

export default async function Home() {
  const dbBrands = await getBrands();
  const brands = dbBrands.map((brand) => {
    const meta = brandMeta[brand.toLowerCase()];
    return {
      name: meta?.name || brand.toUpperCase(),
      tagline: meta?.tagline || "Quality Laptops & Devices",
      image: meta?.image || "/products/default.png",
    };
  });

  const products = await getAllLaptops();
  const featuredProducts = await getFeaturedProducts(5);

  // console.log("featuredProducts",featuredProducts);
  
//   console.log("Final Brands Array:", brands);
//   console.log("Home Page Rendered with Brands",dbBrands);
  return (
    <>
      <NavBar />

      <main className="min-h-screen flex flex-col">
        <section className="flex mt-4 justify-center">
          <SearchBar />
        </section>

        <section className="flex justify-center mt-8 mb-8">
          <HeroBanner />
        </section>

        <h1 className="font-bold text-3xl text-black/70 mb-2">
          Featured Products
        </h1>

       <section className=" ">
         <ProductCarousal products={featuredProducts} />
       </section>

        <section>
          <HeroProduct brands={brands} />
        </section>
      </main>

      <Footer />
    </>
  );
}

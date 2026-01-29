import NavBar from "@/components/heroComponents/navBar";
import Footer from "@/components/heroComponents/footer";
import ProductCarousal from "@/components/productComponents/carousal";
import SearchBar from "@/components/heroComponents/searchBar";
import HeroBanner from "@/components/heroComponents/heroBanner";

export default function Home() {

    return (

        <>
        <NavBar/>
        <main>
            <div className="flex flex-col w-full  h-full">

               

              <section className="flex mt-4 flex-col justify-center w-full  items-center">
                                <SearchBar/>
              </section>

               <section className="flex flex-col justify-center items-center mt-8 mb-8">
                    <HeroBanner/>
                </section>
                <h1 className="font-bold  text-3xl text-black/70 mb-2">Featured Products</h1>  
                <ProductCarousal/>

            </div>
        </main>
        <Footer/>
        </>
    );
}
import BrandSection from "../productComponents/brandSection";

export default function HeroProduct ({brands}) {

    return (
        <section className="  sm:ml-10 ml-5 ">

            <p className="font-bold p-4 text-3xl text-start">Major brands and deals</p>

            <BrandSection brands={brands}/>
            
        </section>
    )
}
"use client";

import useFilters from "@/libs/useFilter";
import Closebutton from "../closeButton";
import FilterSection from "../filterSection";

// const BRANDS = ["msi", "vaio", "asus", "dell"];





export default function  BrandFilter({brands=[]}) {


const {filters,toggleFilter} = useFilters();

const activeBrands = filters.brand?.split(",") || [];

// console.log("brands",brands)


    return (
        <>


        <div className=" ">



            {/* <FilterSection title="Brand">
                <p>Asus</p>
                <p>Dell</p>
            </FilterSection> */}

            <div className="filterSection" >


                            

                

                {brands.map((brand) => (

                    <label key={brand} className="flex ">
                        <input
                        type="checkbox"
                        className="checkBox"
                        checked={activeBrands.includes(brand)}
                        onChange={() => toggleFilter("brand",brand)}/>

                        <span className="capitalize ml-1">{brand}</span>
                    </label>
                ))}
            </div>
        </div>
        </>
    )
}
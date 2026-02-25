"use client";

import useFilters from "@/libs/useFilter";
import { Checkbox } from "@heroui/react";
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

            <div className="filterSection p-2 shadow-xl rounded-2xl" >


                            

                

                {brands.map((brand) => (

                    <label key={brand} className="flex ">
                        <input
                        type="checkbox"
                        className="checkBox hover:border "
                        checked={activeBrands.includes(brand)}
                        onChange={() => toggleFilter("brand",brand)}/>

                        <span className="capitalize ml-1 hoverText">{brand}</span>
                    </label>
                ))}
            </div>
        </div>
        </>
    )
}
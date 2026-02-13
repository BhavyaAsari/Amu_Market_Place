"use client";

import useFilters from "@/libs/useFilter";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";



export default function CustomDropDown() {

    const {filters,setFilter} = useFilters();
    const[isOpen,setIsOpen] = useState(false);

    const options = [

        {label:"Relavance",value:""},
        {label:"Newest",value:"newest"},
        {label:"Price:Low to High",value:"price-asc"},
        {label:"Price:High to Low",value:"price-desc"},
        {label:"Top Rated",value:"rating"}

    ];


    return (

        <>
        <section className="customDropDown">

            <label className="font-semibold text-lg  mr-2">Sort By :</label>
            <div onClick={() =>setIsOpen(!isOpen)} className="dropMenu">
                {options.find(o => o.value === (filters.sort || ""))?.label}
                <LuChevronDown
                className={`transition-transform duration-300 mt-1 ml-4 ${isOpen
                    ?"rotate-180":""}`}/>
            </div>

            {isOpen && 
            
            <div className="optnMenu" >
                {options.map((option) => (

                     <div
                     className="optnLabel"
                     key={option.value}
                     onClick={() => {

                        setFilter({sort:option.value});
                        setIsOpen(false);
                     }}>{option.label || ""}</div>
                ))}
            </div>}
        </section>

        
        </>
    )
}
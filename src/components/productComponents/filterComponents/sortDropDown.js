"use client";

import useFilters from "@/libs/useFilter";



export default function SortDropDown() {

    const {filters,setFilter} = useFilters();


    

    return (

        <>
        <section className="border py-3 px-4 ">

            <label className="text-xl mr-2 font-semibold">Sort By:</label>

            <select
            value={filters.sort || ""}
            onChange={(e) => setFilter({sort:e.target.value})}
            className="text-lg border-0 hover:cursor-pointer">
                
                <option>Relevance</option>
                <option value="price-asc" className="" >Price:Low to High</option>
                <option value="price-desc" className="">Price:High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
                
            </select>



        </section>
        </>
    )
}
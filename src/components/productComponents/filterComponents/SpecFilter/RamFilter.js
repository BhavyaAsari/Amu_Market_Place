"use client";

import useFilters from "@/libs/useFilter";

// const Ram_Options = ['8GB','16GB','32GB']


export default function RamFilter({rams=[]}) {

    const {filters,toggleFilter} = useFilters();

    const activeRam = filters.ram?.split(",") || [];



    return (

        <>

        <div>


           {rams.map((ram) => (

                <label key={ram} className="flex">

                    <input

                    type="checkbox"
                    checked={activeRam.includes(ram)}
                    onChange={() => toggleFilter("ram",ram)}
                    />

                    <span className="capitalize">{ram}</span>


                </label>


           ))}

        </div>

        </>
    )

}
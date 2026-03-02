"use client";

import { useState } from "react";

export  default function SpecsComparisionSection({data}) {

    const [expanded,setExpanded] = useState(true);

    if(!data?.specsComparison) return null;

    const specs = Object.entries(data.specsComparison);

    function extractNumbers(value) {

        if(!value) return null;

        const match = value.match(/\d+(\.\d+)?/);

        return match? parseFloat(match[0]) : null;
    }


    function getBestIndex(values,specName) {

        const numbers = values.map( v => extractNumbers(v));

        if(numbers.some(n => n === null)) return null;

        if(specName === "weight") {

            return numbers.indexOf(Math.min(...numbers));
        }


        return numbers.indexOf(Math.max(...numbers));
    }

    return (

        <>

        <section>
            <div>
                <h2>specs Comparision</h2>
                <button></button>
            </div>

            {expanded && (

                <div className="">

                    {specs.map(([specName,values]) => {

                        const bestIndex = getBestIndex(values,specName);

                        return (

                             <div key={specName}>

                                 <div>{specName}</div>

                                 {values.map((value,index) => (

                                     <div key={index}>

                                        {value || "-"}

                                     </div>
                                 ))}
                             </div>
                        )})
                   }

                </div>
            )}

        </section>








        </>
    )
}
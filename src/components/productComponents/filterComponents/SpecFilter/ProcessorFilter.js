"use client";

import useFilters from "@/libs/useFilter";
import { useState } from "react";

// const PROCESSOR_OPTIONS = [
//   "i3",
//   "i5",
//   "i7",
//   "ryzen5",
//   "ryzen7",
//   "m1",
//   "m2",
//   "m3",
// ];

export default function ProcessorFilter({processors=[]}) {




  // console.log("processors",processors)
  const { filters, toggleFilter } = useFilters();
  const activeProcessors = filters.processor?.split(",") || [];

  const [expanded,setExpanded] = useState(false);

  const visible_COUNT = 6;

  const visibleProcessors = expanded ? processors : processors.slice(0,visible_COUNT);

  return (


    <div className="flex flex-col gap-2">

{visibleProcessors.map((cpu) => (

<label
          key={cpu}
          className=" flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={activeProcessors.includes(cpu)}
            onChange={() => toggleFilter("processor", cpu)}
          />
          <span className="uppercase">{cpu}</span>
        </label>
))}

     {processors.length > visible_COUNT  && (

         <button
          onClick={() => setExpanded(!expanded)}
          className="text-lg  text-purple-600 mt-2 hover:underline  text-left"
        >
          {expanded ? "See Less" : "See More"}
        </button>
     )}
    </div>
  );
}

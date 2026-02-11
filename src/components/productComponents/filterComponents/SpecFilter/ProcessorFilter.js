"use client";

import useFilters from "@/libs/useFilter";

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

  return (
    <div className="flex flex-col gap-2">
      {processors.map((cpu) => (
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
    </div>
  );
}

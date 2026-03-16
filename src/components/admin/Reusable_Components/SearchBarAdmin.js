"use client";

import { LuSearch, LuX } from "react-icons/lu";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBarAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get("search") || "";

  console.log("value",initialValue);

  const [value, setValue] = useState(initialValue);

  const handleSearch = (e) => {
    const newvalue = e.target.value;
    setValue(newvalue);

    const params = new URLSearchParams(searchParams);

    if (newvalue) {
      params.set("search", newvalue);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    setValue("");

    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
 <div className="flex items-center border w-full sm:w-72 rounded-lg overflow-hidden shadow-2xl transition-all duration-200  focus-within:ring-2 focus-within:ring-purple-400">

  <div className="flex justify-center items-center bg-linear-to-br from-purple-700  via-purple-400 to-purple-500  w-12 h-10  border-r border-black shadow-md hover:shadow-[0_0_10px_rgba(168,85,247,0.6)]">
    <LuSearch size={20} className="text-white" />
  </div>

  <input
    type="text"
    placeholder="Search here"
    value={value}
    onChange={handleSearch}
    className="flex-1 px-3 py-2 outline-none border-none font-extralight text-gray-700 placeholder:font-normal placeholder:text-gray-500"
  />

  {value && (
    <LuX
      size={18}
      onClick={clearSearch}
      className="mr-3 cursor-pointer text-gray-500"
    />
  )}

  
</div>
  );
}

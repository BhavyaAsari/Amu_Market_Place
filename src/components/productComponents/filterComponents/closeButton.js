"use client";

import useFilters from "@/libs/useFilter"
import { HiOutlineXMark } from "react-icons/hi2";



export default function Closebutton() {

const {clearAll,filters} = useFilters();

if(Object.keys(filters).length===0) return null;

    return (

        <>
        
            <button onClick={clearAll} className="cartBtn text-white bg-purple-600  mt-3 py-1 flex rounded-full transition-all duration-300 ease-in-out">ClearAll</button>

        </>
    )
}
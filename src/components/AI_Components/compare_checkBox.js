"use client";
import { Checkbox } from "@heroui/react";

export default function Compare_checkBox({isSelected,onToggle}) {

    return (

        <>


        <Checkbox
        isSelected={isSelected} 
        onChange={onToggle}
        className="accent-purple-600"/>



        
        
        
        </>
    );
}
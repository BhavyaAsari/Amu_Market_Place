"use client";

import { useRouter } from "next/navigation";


export default function Compare_Button({selectedProducts}) {
    
    const router = useRouter();

    console.log("Selected Products:", selectedProducts);

    function handleCompare() {

        if(!selectedProducts?.length) return;

        if(selectedProducts.length >3) {

            alert("You can compare maximum 3 laptops");
            return;
        }

        const ids = selectedProducts.map(p => p.id).join(" ,");
        console.log("products being sent",ids)

        router.push(`/comparision_ai?ids=${ids}`);
    }

    return (

        <button onClick={handleCompare} className="ui-btn-primary">
            Compare
        </button>
    )




}
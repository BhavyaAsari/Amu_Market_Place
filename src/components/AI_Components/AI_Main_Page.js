"use client";

import AI_Reccomendation from "./AI_Reccomendation";
import HeaderSection from "./HeaderSection";
import HighLightSection from "./HighlightSection";
import ProductComparisonGrid from "./ProductComparisionGrid";
import SpecsComparisionSection from "./specsComparision";

export default function AI_Page({data}) {

    return (

        <>

        <HeaderSection data={data}/>
        <HighLightSection data={data}/>
        <ProductComparisonGrid data={data}/>
        <AI_Reccomendation data={data} />
        <SpecsComparisionSection data={data} />
        </>
    )
}
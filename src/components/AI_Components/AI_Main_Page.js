"use client";

import AI_Reccomendation from "./AI_Reccomendation";
import HeaderSection from "./HeaderSection";
import HighLightSection from "./HighlightSection";
import ProductComparisonGrid from "./ProductComparisionGrid";
import SpecsComparisionSection from "./specsComparision";

export default function AI_Page({
  data,
  selectedPurpose,
  setSelectedPurpose,
  selectedMode,
  setSelectedMode
}) {

  if (!data) return null;

  const isCompare = data.mode === "compare";

  return (
    <>
      <HeaderSection
        selectedPurpose={selectedPurpose}
        setSelectedPurpose={setSelectedPurpose}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />

      <HighLightSection data={data} />

      {isCompare && (
        <>
          <ProductComparisonGrid data={data} />
          <SpecsComparisionSection data={data} />
        </>
      )}

      <AI_Reccomendation data={data} />
    </>
  );
}
"use client";

import { useRouter } from "next/navigation";

export default function CompareTextButton({ selectedProducts }) {
  const router = useRouter();

  const count = selectedProducts?.length || 0;

  console.log("selectedProducts:", selectedProducts);
console.log("Type:", typeof selectedProducts[0]);

  function handleCompare() {
    if (!count) {
      alert("Select at least one laptop");
      return;
    }

    // FIXED HERE
    const ids = selectedProducts.join(",");

    router.push(`/comparision_ai?ids=${ids}`);
  }

  return (
    <span
      onClick={handleCompare}
      className={`cursor-pointer text-2xl p font-semibold transition ${
        count > 0
          ? "text-purple-600 hover:underline"
          : "text-gray-400 cursor-not-allowed"
      }`}
    >
      Compare {count > 0 && `(${count})`}
    </span>
  );
}
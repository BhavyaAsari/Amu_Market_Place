"use client";

import { useRouter } from "next/navigation";
import { LuScale } from "react-icons/lu";

export default function CompareTextButton({ selectedProducts }) {
  const router = useRouter();
  const count = selectedProducts?.length || 0;

  function handleCompare() {
    if (!count) {
      alert("Select at least one laptop");
      return;
    }

    const ids = selectedProducts.join(",");
    router.push(`/comparision_ai?ids=${ids}`);
  }

  return (
    <button
      onClick={handleCompare}
      disabled={!count}
      className={`sticky top-4 z-40 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition
      ${
        count > 0
          ? "bg-white text-purple-600 hover:bg-purple-100 shadow-sm cursor-pointer"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      Compare {count > 0 && `(${count})`}
            <LuScale size={18} />

    </button>
  );
}
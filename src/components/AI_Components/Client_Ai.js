"use client";

import { useEffect, useState } from "react";
import AI_Page from "@/components/AI_Components/AI_Main_Page";

export default function Comparision_AI_Client({ ids }) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPurpose, setSelectedPurpose] = useState("programming");
  const [selectedMode, setSelectedMode] = useState("balanced");

  // -------------------------------
  // 1️⃣ COMPARE API
  // -------------------------------
  useEffect(() => {
    if (!ids?.length) return;

    async function fetchComparison() {
      try {
        setLoading(true);

        const res = await fetch("/api/compareAI", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productIds: ids,
            purpose: selectedPurpose,
            mode: selectedMode,
          }),
        });

        const result = await res.json();

        // Reset explanation to prevent stale content
        setData({
          ...result,
          explanation: null,
        });

      } catch (err) {
        console.error("Compare error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComparison();

  }, [ids, selectedPurpose, selectedMode]);



  // -------------------------------
  // 2️⃣ EXPLANATION API
  // -------------------------------
  useEffect(() => {
    if (!data) return;
    if (data.explanation) return;

    async function fetchExplanation() {
      try {

        let payload;

        if (data.mode === "insight") {
          payload = {
            purpose: data.bestPurpose,
            mode: "insight",
            products: [
              {
                name: data.product.title,
                price: data.product.price,
                finalScore: data.bestScore,
                cpuScore: data.breakdown?.cpuPerformanceScore ?? 0,
                ramScore: data.breakdown?.memoryScore ?? 0,
                storageScore: data.breakdown?.storageScore ?? 0,
                batteryScore: data.breakdown?.batteryScore ?? 0,
                portabilityScore: data.breakdown?.portabilityScore ?? 0,
              },
            ],
          };
        } else {
          payload = {
            purpose: selectedPurpose,
            mode: selectedMode,
            products: data.products,
          };
        }

        const res = await fetch("/api/compareAI/explanation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        setData((prev) => ({
          ...prev,
          explanation: result.explanation,
        }));

      } catch (err) {
        console.error("Explanation error:", err);
      }
    }

    fetchExplanation();

  }, [data,selectedPurpose]); // only depend on data



  // -------------------------------
  // UI STATES
  // -------------------------------
  if (!ids?.length)
    return <p>No laptops selected.</p>;

  if (loading)
    return <p>Generating comparison...</p>;

  if (!data)
    return <p>Something went wrong.</p>;

  return (
    <AI_Page
      data={data}
      selectedPurpose={selectedPurpose}
      setSelectedPurpose={setSelectedPurpose}
      selectedMode={selectedMode}
      setSelectedMode={setSelectedMode}
    />
  );
}
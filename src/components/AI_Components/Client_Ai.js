"use client";

import { useEffect, useState } from "react";
import AI_Page from "@/components/AI_Components/AI_Main_Page";

export default function Comparision_AI_Client({ ids }) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ FAST COMPARE API
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
            purpose: "programming",
            mode: "balanced"
          })
        });

        const result = await res.json();
        setData(result);

      } catch (err) {
        console.error("Compare error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComparison();

  }, [ids]);



  // 2️⃣ EXPLANATION CALL (AFTER DATA LOADS)
  useEffect(() => {

    if (!data || data.mode !== "compare") return;
    if (data.explanation) return; // already exists

    async function fetchExplanation() {
      try {

        const res = await fetch("/api/compareAI/explanation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            purpose: "programming",
            mode: "balanced",
            products: data.products
          })
        });

        const result = await res.json();

        // merge explanation into existing state
        setData(prev => ({
          ...prev,
          explanation: result.explanation
        }));

      } catch (err) {
        console.error("Explanation error:", err);
      }
    }

    fetchExplanation();

  }, [data]);



  if (!ids?.length)
    return <p>No laptops selected.</p>;

  if (loading)
    return <p>Generating comparison...</p>;

  if (!data)
    return <p>Something went wrong.</p>;

  return <AI_Page data={data} />;
}
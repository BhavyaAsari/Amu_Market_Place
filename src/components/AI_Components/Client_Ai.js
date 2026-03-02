"use client";

import { useEffect, useState } from "react";
import AI_Page from "@/components/AI_Components/AI_Main_Page";

export default function Comparision_AI_Client({ ids }) {

  console.log("Client received ids:", ids); //  Check this

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!ids?.length) return;

    async function fetchComparison() {
      try {
        const res = await fetch("/api/compareAI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
  productIds: ids,
  purpose: "programming",  // required for compare mode
  mode: "balanced"         // optional but recommended
})
        });

        const result = await res.json();
        // console.log("API Result:", result);

        setData(result);

      } catch (err) {
        console.error("Compare error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComparison();

  }, [ids]);

  if (!ids?.length) return <p>No laptops selected.</p>;
  if (loading) return <p>Generating AI comparison...</p>;
  if (!data) return <p>Something went wrong.</p>;

  return <AI_Page data={data} />;
}
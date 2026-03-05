import { unstable_cache } from "next/cache";
import generateExplanation from "@/utils/AiExplanation";
export async function POST(req) {

  const body = await req.json();

  const { purpose, mode, products } = body;

  // 🛑 SAFETY CHECK
  if (!products || !Array.isArray(products) || products.length === 0) {
    return Response.json(
      { explanation: "No valid product data provided." },
      { status: 400 }
    );
  }

  const signature = [
    purpose,
    mode,
    ...products
      .map(p => `${p.name}-${p.price}-${p.finalScore}`)
      .sort()
  ].join("|");

  const getCachedExplanation = unstable_cache(
    async () => {
      console.log("Calling LLM...");
      return await generateExplanation({ products, mode, purpose });
    },
    ["compare-explanation", signature],
    { revalidate: 60 * 60 }
  );

  const explanation = await getCachedExplanation();

  return Response.json({ explanation });
}
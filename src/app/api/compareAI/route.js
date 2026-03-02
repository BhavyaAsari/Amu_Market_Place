import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

import { normalizedProduct } from "@/libs/normalizationProductData/normalizedData";
import { deriveMetrics } from "@/libs/ScoringMetrics/deriveMetric";
import { calculatePriceScore } from "@/libs/ScoringMetrics/priceScore";
import { calculatePurposeScore } from "@/libs/ScoringMetrics/purposeScore";
import { purposeWeights } from "@/libs/ScoringMetrics/purposeWeights";
import { calculateFinalScore } from "@/libs/ScoringMetrics/FinalScore";
import { generateExplanation } from "@/utils/AiExplanation";

import { buildSummary } from "@/libs/presentation/buildSummary";
import { formatProducts } from "@/libs/presentation/formatProduct";
import { buildSpecsComparison } from "@/libs/presentation/buildSpecsComparision";

export async function POST(req) {
  try {
    await connectDB();

    const { productIds, purpose, mode } = await req.json();

    //Validations
    if (!productIds || productIds.length < 1) {
      return NextResponse.json(
        { error: "At least one prouct is required" },
        { status: 400 },
      );
    }

    if (productIds.length > 3) {
      return NextResponse.json(
        { error: "Maximun 3 products allowed" },
        { status: 400 },
      );
    }

    //Fetching Products
    const products = await Product.find({
      id: { $in: productIds },
    }).lean();

    console.log("id", productIds);

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Products Not Found" },
        { status: 404 },
      );
    }

    //Normalization of products
    const processed = products.map((product) => {
      const normalized = normalizedProduct(product);
      const derived = deriveMetrics(normalized);
      return derived;
    });

    //Product -> Insight Mode

    if (processed.length === 1) {
      const { metrics, product } = processed[0];

      const breakdown = {};

      Object.keys(purposeWeights).forEach((p) => {
        breakdown[p] = calculatePurposeScore(metrics, p);
      });

      //Best purpose Extraction
      const bestPurpose = Object.entries(breakdown).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      return NextResponse.json({
        mode: "insight",
        product,
        breakdown,
        bestPurpose,
        bestScore: breakdown[bestPurpose],
      });
    }
    

    //Compare Mode of 2-3 products

    if (!purpose) {
      return NextResponse.json(
        { error: "Purpose required for comparison mode" },
        { status: 400 },
      );
    }

    if (!purposeWeights[purpose]) {
      return NextResponse.json({ error: "Invalid purpose" }, { status: 400 });
    }

    const decisionMode = mode || "performance";

    const scored = processed.map(({ product, metrics }) => {
      const purposeScore = calculatePurposeScore(metrics, purpose);

      const finalScore = calculateFinalScore({
        purposeScore,
        price: product.price,
        mode: decisionMode,
      });

      return {
        product,
        metrics,
        purposeScore,
        finalScore,
      };
    });

    scored.sort((a, b) => b.finalScore - a.finalScore);

    const winner = scored[0];

    console.log("Winner object:", winner);

    const summary = buildSummary(winner);
const formattedProducts = formatProducts(scored);
const specsComparison = buildSpecsComparison(scored);

    const explanation = await generateExplanation({
      purpose,
      mode: decisionMode,
      products: scored.map((p) => ({
        name: p.product.title,
        cpuScore: p.metrics.cpuPerformanceScore,
        ramScore: p.metrics.memoryScore,
        storageScore: p.metrics.storageScore,
        batteryScore: p.metrics.batteryScore,
        portabilityScore: p.metrics.portabilityScore,
        finalScore: p.finalScore,
        price: p.product.price,
      })),
    });

    return NextResponse.json({
  mode: "compare",
  summary,
  products: formattedProducts,
  specsComparison,
  explanation
});

  } catch (error) {
    console.error("Compare api error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

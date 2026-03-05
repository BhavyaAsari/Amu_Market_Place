import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

import { normalizedProduct } from "@/libs/normalizationProductData/normalizedData";
import { deriveMetrics } from "@/libs/ScoringMetrics/deriveMetric";
import { calculatePurposeScore } from "@/libs/ScoringMetrics/purposeScore";
import { purposeWeights } from "@/libs/ScoringMetrics/purposeWeights";
import { calculateFinalScore } from "@/libs/ScoringMetrics/FinalScore";

import { buildSummary } from "@/libs/presentation/buildSummary";
import { formatProducts } from "@/libs/presentation/formatProduct";
import { buildSpecsComparison } from "@/libs/presentation/buildSpecsComparision";

export async function POST(req) {
  try {
    await connectDB();

    const { productIds, purpose, mode } = await req.json();

    if (!productIds || productIds.length < 1) {
      return NextResponse.json(
        { error: "At least one product is required" },
        { status: 400 }
      );
    }

    if (productIds.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 products allowed" },
        { status: 400 }
      );
    }

    const products = await Product.find({
      _id: {
        $in: productIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    }).lean();

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 }
      );
    }

    const processed = products.map((product) => {
      const normalized = normalizedProduct(product);
      return deriveMetrics(normalized);
    });

    // =========================
    // INSIGHT MODE (Single Product)
    // =========================
    if (processed.length === 1) {
      const { metrics, product } = processed[0];

      const breakdown = {};

      Object.keys(purposeWeights).forEach((p) => {
        breakdown[p] = calculatePurposeScore(metrics, p);
      });

      const bestPurpose = Object.entries(breakdown)
        .sort((a, b) => b[1] - a[1])[0][0];

      return NextResponse.json({
        mode: "insight",
        product,
        breakdown,
        bestPurpose,
        bestScore: breakdown[bestPurpose],
        explanation: null, // explanation handled in separate API
      });
    }

    // =========================
    // COMPARE MODE (2–3 Products)
    // =========================
    if (!purpose) {
      return NextResponse.json(
        { error: "Purpose required for comparison mode" },
        { status: 400 }
      );
    }

    if (!purposeWeights[purpose]) {
      return NextResponse.json(
        { error: "Invalid purpose" },
        { status: 400 }
      );
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

    const summary = buildSummary(scored[0]);
    const formattedProducts = formatProducts(scored);
    const specsComparison = buildSpecsComparison(scored);

    return NextResponse.json({
      mode: "compare",
      summary,
      products: formattedProducts,
      specsComparison,
      explanation: null, // handled separately
    });

  } catch (error) {
    console.error("Compare API error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
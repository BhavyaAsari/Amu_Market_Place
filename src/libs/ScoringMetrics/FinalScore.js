// lib/scoring/calculateFinalScore.js

import { calculatePriceScore } from "./priceScore";
export function calculateFinalScore({
  purposeScore,
  price,
  mode
}) {
  const priceScore = calculatePriceScore(price);

  if (mode === "performance") {
    return purposeScore;
  }

  if (mode === "value") {
    return (purposeScore * 0.5) + (priceScore * 0.5);
  }

  if (mode === "balanced") {
    return (purposeScore * 0.7) + (priceScore * 0.3);
  }

  return purposeScore; // fallback
}
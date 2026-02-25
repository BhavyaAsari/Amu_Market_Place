import { calculatePriceScore } from "../ScoringMetrics/priceScore";

export function buildSummary(winner) {
  const machScore = Math.round(winner.finalScore * 10);

  const priceScore = calculatePriceScore(winner.product.price);

  const highlights = [];

  if (winner.metrics.batteryScore > 7)
    highlights.push("Great Battery");

  if (winner.metrics.portabilityScore > 7)
    highlights.push("Highly Portable");

  if (winner.metrics.storageScore > 6)
    highlights.push("Large Storage");

  if (priceScore > 7)
    highlights.push("Value for Money");

  if (winner.metrics.cpuPerformanceScore > 8)
    highlights.push("Strong Performance");

  return {
    winnerId: winner.product.id,
    winnerName: winner.product.title,
    machScore,
    highlights
  };
}
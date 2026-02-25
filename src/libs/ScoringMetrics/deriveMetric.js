// lib/scoring/deriveMetrics.js

export function deriveMetrics(product) {
  const normalized = product.normalized || {};

  const {
    ramGB = 0,
    totalStorageGB = 0,
    batteryHours = null,
    weightKg = null
  } = normalized;

  const {
    cpuTier = 0,
    cpuGeneration = 0,
    gpuTier = 0
  } = normalized;

  // ---------------------------
  // CPU Performance (0–10)
  // ---------------------------
  const rawCpu = (cpuTier * 2) + cpuGeneration;
  const cpuPerformanceScore = Math.min(rawCpu, 10);

  // ---------------------------
  // GPU Performance (0–10)
  // ---------------------------
  const gpuPerformanceScore = Math.min(gpuTier * 2, 10);

  // ---------------------------
  // Memory Score (Assume 32GB max useful)
  // ---------------------------
  const memoryScore = Math.min((ramGB / 32) * 10, 10);

  // ---------------------------
  // Storage Score (Assume 2048GB max useful)
  // ---------------------------
  const storageScore = Math.min((totalStorageGB / 2048) * 10, 10);

  // ---------------------------
  // Battery Score (Assume 12hr strong)
  // ---------------------------
  const batteryScore = batteryHours
    ? Math.min((batteryHours / 12) * 10, 10)
    : null;

  // ---------------------------
  // Portability Score (1kg best, 3kg worst)
  // ---------------------------
  let portabilityScore = null;

  if (weightKg !== null) {
    const minWeight = 1.0;
    const maxWeight = 3.0;

    portabilityScore =
      ((maxWeight - weightKg) / (maxWeight - minWeight)) * 10;

    portabilityScore = Math.max(0, Math.min(portabilityScore, 10));
  }

  return {
    product,
    metrics: {
      cpuPerformanceScore,
      gpuPerformanceScore,
      memoryScore,
      storageScore,
      batteryScore,
      portabilityScore
    }
  };
}
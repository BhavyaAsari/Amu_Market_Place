export function normalizedProduct(rawProduct) {
  const specs = rawProduct?.specs || {};

  const ramMatch = specs.ram?.match(/(\d+)\s*GB/i);
  const ramGB = ramMatch ? parseInt(ramMatch[1], 10) : 0;

  const storageString = specs.storage || "";
  const storageMatches = [
    ...storageString.matchAll(/(\d+)\s*(GB|TB)\s*(SSD|HDD)?/gi),
  ];

  let totalStorageGB = 0;
  let ssdStorageGB = 0;
  let hddStorageGB = 0;

  storageMatches.forEach((match) => {
    const value = parseInt(match[1], 10);
    const unit = match[2].toUpperCase();
    const type = match[3]?.toUpperCase() || "";

    const valueInGB = unit === "TB" ? value * 1024 : value;

    totalStorageGB += valueInGB;

    if (type === "SSD") ssdStorageGB += valueInGB;
    if (type === "HDD") hddStorageGB += valueInGB;
  });

  const batteryMatch = specs.battery?.match(/(\d+)/);
  const batteryHours = batteryMatch ? parseInt(batteryMatch[1], 10) : null;

  const weightMatch = specs.weight?.match(/([\d.]+)/);
  const weightKg = weightMatch ? parseFloat(weightMatch[1]) : null;

  // CPU Extraction
  const processor = specs.processor || "";

  let cpuTier = 0;
  let cpuGeneration = 0;

  if (/i3/i.test(processor)) cpuTier = 1;
  if (/i5/i.test(processor)) cpuTier = 2;
  if (/i7/i.test(processor)) cpuTier = 3;
  if (/i9/i.test(processor)) cpuTier = 4;

  // Extract generation (11th Gen, 12th Gen etc.)
  const genMatch = processor.match(/(\d+)(?:th)?\s*Gen/i);
  cpuGeneration = genMatch ? parseInt(genMatch[1], 10) : 0;

  // GPU Extraction (Basic Tiering)
  const graphics = specs.graphics || "";

  let gpuTier = 0;

  if (/RTX/i.test(graphics)) gpuTier = 4;
  else if (/GTX/i.test(graphics)) gpuTier = 3;
  else if (/Iris/i.test(graphics)) gpuTier = 2;
  else if (/UHD|Integrated/i.test(graphics)) gpuTier = 1;

  return {
    ...rawProduct,
    normalized: {
      ramGB,
      totalStorageGB,
      ssdStorageGB,
      hddStorageGB,
      batteryHours,
      weightKg,
      cpuGeneration,
      cpuTier,
      gpuTier,
    },
  };
}

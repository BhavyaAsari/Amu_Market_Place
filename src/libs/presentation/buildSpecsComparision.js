export function buildSpecsComparison(scored) {
  return {
    ram: scored.map(p => p.product.specs.ram),
    processor: scored.map(p => p.product.specs.processor),
    storage: scored.map(p => p.product.specs.storage),
    graphics: scored.map(p => p.product.specs.graphics),
    battery: scored.map(p => p.product.specs.battery),
    weight: scored.map(p => p.product.specs.weight)
  };
}
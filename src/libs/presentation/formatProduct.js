export function formatProducts(scored) {
  return scored.map(item => ({
    id: item.product.id,
    name: item.product.title,
    rating: item.product.rating,
    price: item.product.price,
    image: item.product.image,
    finalScore: item.finalScore,
    purposeScore: item.purposeScore,
    keySpecs: [
      item.product.specs.processor,
      item.product.specs.ram,
      item.product.specs.storage
    ],
    metrics: item.metrics
  }));
}
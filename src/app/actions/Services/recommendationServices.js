import Product from "@/models/Product";

/* ===============================
   Cache Configuration
================================ */
let cachedStats = null;
let lastFetched = null;

const TTL = 30 * 60 * 1000; // 30 minutes

/* ===============================
   Scoring Configuration
================================ */
const SCORING_WEIGHTS = {
  graphics: 4,
  processor: 3,
  brand: 2,
  ram: 1,
  priceCloseness: 2,
  rating: 0.5
};

/* ===============================
   Module 1: Fetch Current Product
================================ */
export async function fetchCurrentProduct(productId) {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const product = await Product.findById(productId).lean();

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

/* ===============================
   Module 2: Get Store Price Stats (TTL Cached)
================================ */
export async function getStorePriceStats() {
  const now = Date.now();

  if (cachedStats && lastFetched && (now - lastFetched < TTL)) {
    return cachedStats;
  }

  const stats = await Product.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    }
  ]);

  const minPrice = stats[0]?.minPrice ?? 0;
  const maxPrice = stats[0]?.maxPrice ?? 0;

  cachedStats = { minPrice, maxPrice };
  lastFetched = now;

  return cachedStats;
}

/* ===============================
   Module 3: Dynamic Price Window
================================ */
export function getDynamicPriceWindow(currentPrice, stats) {
  const { minPrice, maxPrice } = stats;
  const totalRange = maxPrice - minPrice;

  // Use 30% of store range
  const windowSize = totalRange * 0.3;

  let lowerBound = currentPrice - windowSize / 2;
  let upperBound = currentPrice + windowSize / 2;

  // Clamp inside store limits
  lowerBound = Math.max(lowerBound, minPrice);
  upperBound = Math.min(upperBound, maxPrice);

  return { lowerBound, upperBound };
}

/* ===============================
   Module 4: Score Candidates
================================ */
export function scoreCandidates(currentProduct, candidates, bounds) {
  const { lowerBound, upperBound } = bounds;
  const segmentRange = upperBound - lowerBound;

  return candidates.map(product => {
    let score = 0;

    // Graphics
    if (product.specs?.graphics === currentProduct.specs?.graphics) {
      score += SCORING_WEIGHTS.graphics;
    }

    // Processor
    if (product.specs?.processor === currentProduct.specs?.processor) {
      score += SCORING_WEIGHTS.processor;
    }

    // Brand
    if (product.brand === currentProduct.brand) {
      score += SCORING_WEIGHTS.brand;
    }

    // RAM
    if (product.specs?.ram === currentProduct.specs?.ram) {
      score += SCORING_WEIGHTS.ram;
    }

    // Price closeness (continuous scoring)
    if (segmentRange > 0) {
      const priceDiff = Math.abs(product.price - currentProduct.price);
      const closenessRatio = 1 - (priceDiff / segmentRange);
      const normalized = Math.max(closenessRatio, 0);
      score += normalized * SCORING_WEIGHTS.priceCloseness;
    }

    // Rating boost
    score += product.rating * SCORING_WEIGHTS.rating;

    return { product, score };
  });
}

/* ===============================
   Module 5: Finalize Recommendations
================================ */
export function finalizeRecommendations(scoredProducts, limit = 10) {
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}

/* ===============================
   Main Orchestrator
================================ */
export async function getRecommendations(productId, limit = 10) {
  // 1️ Fetch current product
  const currentProduct = await fetchCurrentProduct(productId);

  // 2️ Get store price stats
  const stats = await getStorePriceStats();

  // 3️ Compute dynamic price window
  const bounds = getDynamicPriceWindow(currentProduct.price, stats);

  // 4️ Fetch candidates (limit for scaling safety)
  const candidates = await Product.find({
    _id: { $ne: currentProduct._id },
    price: {
      $gte: bounds.lowerBound,
      $lte: bounds.upperBound
    }
  })
    .limit(100) // prevents huge memory usage
    .lean();

  // 5️ Score candidates
  const scored = scoreCandidates(currentProduct, candidates, bounds);

  // 6️ Return top N
  return finalizeRecommendations(scored, limit);
}
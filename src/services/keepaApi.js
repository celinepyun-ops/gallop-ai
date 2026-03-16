/**
 * Keepa API Service
 *
 * Connects to Keepa's Amazon product tracking API to fetch
 * product data, sales rank history, and growth metrics.
 *
 * API Docs: https://keepa.com/#!api
 * Domain IDs: 1=US, 2=UK, 3=DE, 4=FR, 5=JP, 6=CA, 8=IT, 9=ES, 10=IN, 11=MX
 */

const KEEPA_BASE = 'https://api.keepa.com';

// Domain mapping for user-friendly country selection
export const DOMAINS = {
  US: 1,
  UK: 2,
  DE: 3,
  FR: 4,
  JP: 5,
  CA: 6,
  IT: 8,
  ES: 9,
  IN: 10,
  MX: 11,
};

export const DOMAIN_LABELS = {
  US: '🇺🇸 United States',
  UK: '🇬🇧 United Kingdom',
  DE: '🇩🇪 Germany',
  FR: '🇫🇷 France',
  JP: '🇯🇵 Japan',
  CA: '🇨🇦 Canada',
  IT: '🇮🇹 Italy',
  ES: '🇪🇸 Spain',
  IN: '🇮🇳 India',
  MX: '🇲🇽 Mexico',
};

// Top-level product categories with subcategories
export const PRODUCT_CATEGORIES = {
  'Cosmetics & Beauty': {
    subcategories: ['Sun Protection', 'Skin Care', 'Hair Care', 'Makeup', 'Beauty Tools', 'Fragrance', 'Nail Care', 'Body Lotions'],
  },
  'Electronics': {
    subcategories: ['Smart Home', 'Audio & Headphones', 'Phone Accessories', 'Wearables', 'Cameras', 'Computer Accessories', 'Portable Chargers'],
  },
  'Supplements & Health': {
    subcategories: ['Vitamins', 'Protein & Fitness', 'Probiotics', 'Herbal Supplements', 'Collagen', 'Sleep & Relaxation', 'Immune Support'],
  },
  'Home & Kitchen': {
    subcategories: ['Kitchen Gadgets', 'Home Organization', 'Bedding', 'Cleaning Supplies', 'Candles & Fragrances', 'Small Appliances'],
  },
  'Sports & Outdoors': {
    subcategories: ['Fitness Equipment', 'Yoga & Pilates', 'Camping & Hiking', 'Water Sports', 'Cycling', 'Running'],
  },
  'Baby & Kids': {
    subcategories: ['Baby Care', 'Feeding', 'Toys & Games', 'Kids Clothing', 'Safety', 'Nursery'],
  },
  'Pet Supplies': {
    subcategories: ['Dog Supplies', 'Cat Supplies', 'Pet Grooming', 'Pet Health', 'Fish & Aquarium', 'Pet Toys'],
  },
};

// Legacy alias for backward compatibility
export const BEAUTY_CATEGORIES = {
  US: {
    'Beauty & Personal Care': 3760911,
    'Skin Care': 11060451,
    'Sun Protection': 11062031,
    'Face Moisturizers': 11062091,
    'Body Lotions': 11056591,
  },
};

/**
 * Core Keepa API fetch wrapper
 */
async function keepaFetch(endpoint, params = {}) {
  const apiKey = import.meta.env.VITE_KEEPA_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_KEEPA_API_KEY is not set. Add it to your .env file.');
  }

  const url = new URL(`${KEEPA_BASE}/${endpoint}`);
  url.searchParams.set('key', apiKey);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, v);
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Keepa API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(`Keepa API: ${data.error.message || data.error}`);
  }

  return data;
}

/**
 * Search for products by keyword
 * Token cost: 10 per result page (up to 10 results per page)
 *
 * @param {string} term - Search keyword (e.g. "sunscreen")
 * @param {string} domain - Country code (e.g. "US")
 * @param {object} options - { page, stats, rating }
 * @returns {Promise<object>} - { products, asinList }
 */
export async function searchProducts(term, domain = 'US', options = {}) {
  const { page = 0, stats = 90, rating = 1 } = options;

  const data = await keepaFetch('search', {
    domain: DOMAINS[domain],
    type: 'product',
    term: encodeURIComponent(term),
    page,
    stats,
    rating,
  });

  return data.products || [];
}

/**
 * Get detailed product data for specific ASINs
 * Token cost: 1 per product + extras for offers/rating/stock
 *
 * @param {string[]} asins - Array of ASINs (max 100)
 * @param {string} domain - Country code
 * @param {object} options - { stats, rating, stock, offers }
 * @returns {Promise<object[]>} - Array of product objects
 */
export async function getProducts(asins, domain = 'US', options = {}) {
  const { stats = 90, rating = 1, stock = 0, offers = 0 } = options;

  const data = await keepaFetch('product', {
    domain: DOMAINS[domain],
    asin: asins.join(','),
    stats,
    rating,
    stock: stock ? 1 : undefined,
    offers: offers || undefined,
  });

  return data.products || [];
}

/**
 * Search categories by name
 * Token cost: 1
 *
 * @param {string} term - Category name to search
 * @param {string} domain - Country code
 * @returns {Promise<object>} - Map of categoryId -> categoryObject
 */
export async function searchCategories(term, domain = 'US') {
  const data = await keepaFetch('search', {
    domain: DOMAINS[domain],
    type: 'category',
    term: encodeURIComponent(term),
  });

  return data.categories || {};
}

/**
 * Find products matching specific criteria (Product Finder / Deals)
 * Token cost: 5 per request
 *
 * @param {object} filters - Query filters
 * @param {string} domain - Country code
 * @returns {Promise<string[]>} - Array of matching ASINs
 */
export async function findProducts(filters, domain = 'US') {
  const queryJSON = {
    ...filters,
  };

  const data = await keepaFetch('search', {
    domain: DOMAINS[domain],
    type: 'product',
    ...queryJSON,
  });

  return data.asinList || data.products || [];
}

/**
 * Get best sellers for a category
 * Token cost: Varies
 *
 * @param {number} categoryId - Category node ID
 * @param {string} domain - Country code
 * @param {object} options - { rankAvgRange }
 * @returns {Promise<string[]>} - Array of ASINs
 */
export async function getBestSellers(categoryId, domain = 'US', options = {}) {
  const { rankAvgRange = 0 } = options;

  const data = await keepaFetch('bestsellers', {
    domain: DOMAINS[domain],
    category: categoryId,
    range: rankAvgRange,
  });

  return data.bestSellersList?.asinList || [];
}

// ─── Growth Analysis (Claude-powered layer) ────────────────────────

/**
 * Estimate BSR-to-monthly-sales using known approximation curves.
 * These are rough estimates — real values depend on category depth.
 *
 * Based on industry-standard BSR-to-sales conversion for Beauty category.
 */
function estimateMonthlySales(salesRank) {
  if (!salesRank || salesRank <= 0) return 0;
  // Approximate formula for Beauty & Personal Care (US)
  // Top 1 ≈ 30,000 units/mo, rank 100K ≈ 30 units/mo
  return Math.round(30000 * Math.pow(salesRank, -0.65));
}

/**
 * Calculate growth metrics from Keepa product stats
 *
 * @param {object} product - Keepa product object with stats
 * @returns {object} - Growth metrics
 */
export function calculateGrowthMetrics(product) {
  const stats = product.stats;
  if (!stats) {
    return {
      revenueGrowth: null,
      salesRankTrend: null,
      reviewVelocity: null,
      priceStability: null,
      partnershipScore: null,
      brandStage: 'unknown',
    };
  }

  // Sales rank: current vs 90-day avg (lower rank = more sales)
  const currentRank = stats.current?.[3]; // SALES rank index
  const avg90Rank = stats.avg90?.[3];
  const avg30Rank = stats.avg30?.[3];

  // Revenue growth: compare estimated sales from rank changes
  let revenueGrowth = null;
  if (avg90Rank && avg30Rank && avg90Rank > 0) {
    const sales90 = estimateMonthlySales(avg90Rank);
    const sales30 = estimateMonthlySales(avg30Rank);
    if (sales90 > 0) {
      revenueGrowth = Math.round(((sales30 - sales90) / sales90) * 100);
    }
  }

  // Sales rank trend (negative = improving = good)
  let salesRankTrend = null;
  if (avg90Rank && currentRank) {
    salesRankTrend = Math.round(((currentRank - avg90Rank) / avg90Rank) * 100);
  }

  // Review velocity: reviews gained recently
  const reviewCount = stats.current?.[16]; // COUNT_REVIEWS index
  const reviewCount90 = stats.avg90?.[16];
  let reviewVelocity = null;
  if (reviewCount && reviewCount90 && reviewCount90 > 0) {
    reviewVelocity = Math.round(((reviewCount - reviewCount90) / reviewCount90) * 100);
  }

  // Price stability: low variance = stable pricing
  const priceMin = stats.min?.[0]; // AMAZON price
  const priceMax = stats.max?.[0];
  const priceCurrent = stats.current?.[0];
  let priceStability = 'stable';
  if (priceMin && priceMax && priceCurrent) {
    const variance = (priceMax - priceMin) / priceCurrent;
    priceStability = variance < 0.15 ? 'stable' : variance < 0.3 ? 'moderate' : 'volatile';
  }

  // Partnership readiness score (0-100)
  let score = 50; // baseline
  if (revenueGrowth !== null) {
    if (revenueGrowth > 30) score += 20;
    else if (revenueGrowth > 10) score += 10;
    else if (revenueGrowth < -10) score -= 15;
  }
  if (currentRank) {
    if (currentRank >= 5000 && currentRank <= 50000) score += 15; // sweet spot
    else if (currentRank > 50000) score -= 10; // too small
    else if (currentRank < 1000) score -= 10; // too big
  }
  if (priceStability === 'stable') score += 5;
  if (reviewVelocity !== null && reviewVelocity > 10) score += 10;
  const partnershipScore = Math.max(0, Math.min(100, score));

  // Brand stage
  let brandStage = 'unknown';
  if (currentRank) {
    if (currentRank > 50000) brandStage = 'early';
    else if (currentRank > 5000) brandStage = 'sweet-spot';
    else if (currentRank > 1000) brandStage = 'established';
    else brandStage = 'enterprise';
  }

  return {
    revenueGrowth,
    salesRankTrend,
    reviewVelocity,
    priceStability,
    partnershipScore,
    brandStage,
    estimatedMonthlySales: currentRank ? estimateMonthlySales(currentRank) : null,
  };
}

/**
 * Full search pipeline: search → enrich → score → rank
 *
 * @param {string} keyword - Search term
 * @param {string} domain - Country code
 * @param {object} filters - { minRating, category, rankRange, limit }
 * @returns {Promise<object[]>} - Enriched product results
 */
export async function searchAndAnalyze(keyword, domain = 'US', filters = {}) {
  const { limit = 20 } = filters;

  // Step 1: Search products via Keepa
  const products = await searchProducts(keyword, domain, {
    stats: 90,
    rating: 1,
  });

  // Step 2: Enrich each product with growth metrics
  const enriched = products.slice(0, limit).map((product) => {
    const growth = calculateGrowthMetrics(product);

    return {
      asin: product.asin,
      title: product.title,
      brand: product.brand || 'Unknown',
      price: product.stats?.current?.[0]
        ? `$${(product.stats.current[0] / 100).toFixed(2)}`
        : 'N/A',
      rating: product.stats?.current?.[17]
        ? (product.stats.current[17] / 10).toFixed(1)
        : null,
      reviews: product.stats?.current?.[16] || 0,
      salesRank: product.stats?.current?.[3] || null,
      imageUrl: product.imagesCSV
        ? `https://images-na.ssl-images-amazon.com/images/I/${product.imagesCSV.split(',')[0]}`
        : null,
      ...growth,
    };
  });

  // Step 3: Rank by partnership score (descending)
  enriched.sort((a, b) => (b.partnershipScore || 0) - (a.partnershipScore || 0));

  return enriched;
}

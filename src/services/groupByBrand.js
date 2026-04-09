/**
 * Group Keepa product data by brand name.
 *
 * @param {Array<Object>} products — Array of Keepa product entities
 *   Expected fields: brand, salesRank, monthlySold, monthlyRevenue,
 *   title, asin, price, rating, reviews
 *
 * @returns {Array<BrandGroup>} sorted by totalRevenue descending
 *
 * BrandGroup = {
 *   brandName: string,
 *   productCount: number,
 *   avgSalesRank: number,
 *   totalRevenue: number,
 *   avgGrowth: number,
 *   channel: 'Wholesale' | 'Retail',
 *   topProduct: Object,       // highest revenue product
 *   products: Object[],
 * }
 */
export function groupProductsByBrand(products) {
  if (!products || products.length === 0) return [];

  const map = {};

  for (const p of products) {
    const brand = p.brand || 'Unknown';
    if (!map[brand]) {
      map[brand] = {
        brandName: brand,
        productCount: 0,
        avgSalesRank: 0,
        totalRevenue: 0,
        avgGrowth: 0,
        channel: 'Retail',
        topProduct: null,
        products: [],
      };
    }

    const group = map[brand];
    group.products.push(p);
    group.productCount += 1;
    group.totalRevenue += (p.monthlyRevenue || 0);

    // Track top product by revenue
    if (!group.topProduct || (p.monthlyRevenue || 0) > (group.topProduct.monthlyRevenue || 0)) {
      group.topProduct = p;
    }
  }

  // Compute averages
  for (const group of Object.values(map)) {
    const { products: prods, productCount } = group;

    // Average sales rank
    const rankSum = prods.reduce((s, p) => s + (p.salesRank || 0), 0);
    group.avgSalesRank = Math.round(rankSum / productCount);

    // Average growth (revenueGrowth or growthValue field)
    const growthSum = prods.reduce((s, p) => s + (p.revenueGrowth || p.growthValue || 0), 0);
    group.avgGrowth = +(growthSum / productCount).toFixed(1);

    // Channel heuristic: avg rank > 10K = likely wholesale-ready
    group.channel = group.avgSalesRank > 10000 ? 'Wholesale' : 'Retail';
  }

  return Object.values(map).sort((a, b) => b.totalRevenue - a.totalRevenue);
}

/**
 * Filter brand groups by criteria.
 *
 * @param {Array<BrandGroup>} brandGroups
 * @param {Object} filters
 * @param {number} [filters.minProducts] — minimum product count
 * @param {number} [filters.minRevenue] — minimum total revenue
 * @param {number} [filters.maxAvgRank] — maximum average sales rank
 * @param {number} [filters.minGrowth] — minimum average growth %
 * @param {'Wholesale'|'Retail'} [filters.channel] — filter by channel
 * @returns {Array<BrandGroup>}
 */
export function filterBrandGroups(brandGroups, filters = {}) {
  return brandGroups.filter((g) => {
    if (filters.minProducts && g.productCount < filters.minProducts) return false;
    if (filters.minRevenue && g.totalRevenue < filters.minRevenue) return false;
    if (filters.maxAvgRank && g.avgSalesRank > filters.maxAvgRank) return false;
    if (filters.minGrowth && g.avgGrowth < filters.minGrowth) return false;
    if (filters.channel && g.channel !== filters.channel) return false;
    return true;
  });
}

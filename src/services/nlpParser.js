/**
 * NLP Search Query Parser
 * Converts natural language search queries into structured filter parameters.
 * Rule-based parser using regex pattern matching.
 */

/**
 * Parse a natural language search query into structured parameters.
 * @param {string} text - Raw search input
 * @returns {{ keyword: string, filters: { salesRankMax?: number, salesRankMin?: number, revenueMin?: number, revenueMax?: number, growthMin?: number }, type: 'product' | 'brand' }}
 */
export function parseSearchQuery(text) {
  if (!text || !text.trim()) {
    return { keyword: '', filters: {}, type: 'product' };
  }

  let remaining = text.trim();
  const filters = {};

  // ── Sales Rank patterns ────────────────────────────────────
  // "under rank 5000", "rank below 5000", "rank < 5000"
  const rankUnder = remaining.match(/(?:under|below|less than|<)\s*rank\s*(\d[\d,]*)/i)
    || remaining.match(/rank\s*(?:under|below|less than|<)\s*(\d[\d,]*)/i);
  if (rankUnder) {
    filters.salesRankMax = parseNum(rankUnder[1]);
    remaining = remaining.replace(rankUnder[0], '');
  }

  // "above rank 1000", "rank over 1000", "rank > 1000"
  const rankOver = remaining.match(/(?:above|over|more than|>)\s*rank\s*(\d[\d,]*)/i)
    || remaining.match(/rank\s*(?:above|over|more than|>)\s*(\d[\d,]*)/i);
  if (rankOver) {
    filters.salesRankMin = parseNum(rankOver[1]);
    remaining = remaining.replace(rankOver[0], '');
  }

  // ── Revenue patterns ───────────────────────────────────────
  // "above $10K revenue", "revenue over $50000"
  const revOver = remaining.match(/(?:above|over|more than|>)\s*\$?([\d,]+[kK]?)\s*(?:revenue|rev)?/i)
    || remaining.match(/(?:revenue|rev)\s*(?:above|over|more than|>)\s*\$?([\d,]+[kK]?)/i);
  if (revOver && !rankOver) {
    filters.revenueMin = parseMoney(revOver[1]);
    remaining = remaining.replace(revOver[0], '');
  }

  // "under $5K revenue"
  const revUnder = remaining.match(/(?:under|below|less than|<)\s*\$?([\d,]+[kK]?)\s*(?:revenue|rev)/i)
    || remaining.match(/(?:revenue|rev)\s*(?:under|below|less than|<)\s*\$?([\d,]+[kK]?)/i);
  if (revUnder) {
    filters.revenueMax = parseMoney(revUnder[1]);
    remaining = remaining.replace(revUnder[0], '');
  }

  // ── Growth patterns ────────────────────────────────────────
  // "30% growth", "growing over 20%", "growth above 50%"
  const growth = remaining.match(/(?:growing|growth)\s*(?:over|above|>|of)?\s*(\d+)%/i)
    || remaining.match(/(\d+)%\s*growth/i)
    || remaining.match(/(?:over|above|>)\s*(\d+)%/i);
  if (growth) {
    filters.growthMin = Number(growth[1]);
    remaining = remaining.replace(growth[0], '');
  }

  // ── Clean up keyword ───────────────────────────────────────
  const keyword = remaining
    .replace(/\s+/g, ' ')
    .replace(/^\s*(and|with|that|have|has)\s+/i, '')
    .replace(/\s+(and|with|that|have|has)\s*$/i, '')
    .trim();

  // ── Detect brand vs product ────────────────────────────────
  const type = detectQueryType(keyword);

  return { keyword, filters, type };
}

/**
 * Detect if a query is likely a brand name or product keyword.
 * Heuristic: capitalized proper nouns → brand, generic nouns → product.
 */
function detectQueryType(keyword) {
  if (!keyword) return 'product';

  const words = keyword.split(/\s+/);

  // Single capitalized word that doesn't look like a common noun → brand
  if (words.length <= 2) {
    const allCapitalized = words.every((w) => /^[A-Z]/.test(w));
    const isCommonNoun = /^(sunscreen|serum|vitamin|shampoo|cream|lotion|soap|gel|mask|oil|cleanser|moisturizer|toner|conditioner|supplement)s?$/i.test(keyword);
    if (allCapitalized && !isCommonNoun) return 'brand';
  }

  return 'product';
}

function parseNum(str) {
  return Number(str.replace(/,/g, ''));
}

function parseMoney(str) {
  const cleaned = str.replace(/,/g, '');
  if (/[kK]$/.test(cleaned)) {
    return Number(cleaned.replace(/[kK]$/, '')) * 1000;
  }
  return Number(cleaned);
}

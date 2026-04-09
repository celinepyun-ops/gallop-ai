import { SearchPage } from './SearchPage';

export default {
  title: 'Pages/SearchPage',
  component: SearchPage,
  parameters: {
    layout: 'padded',
  },
};

/* ── Default — full product list, no filters applied ─────────── */
export const Default = {};

/* ── With Filters Applied — Sweet Spot products only ─────────── */
export const WithFiltersApplied = {
  args: {
    products: [
      { id: '2', name: 'TruSkin Vitamin C Serum', brand: 'TruSkin', salesRank: 8200, monthlyRevenue: 67000, growthValue: 34.2, partnershipScore: 87, brandStage: 'Sweet Spot' },
      { id: '4', name: 'Beauty of Joseon Sunscreen SPF 50', brand: 'Beauty of Joseon', salesRank: 15400, monthlyRevenue: 42000, growthValue: 52.7, partnershipScore: 92, brandStage: 'Sweet Spot' },
      { id: '6', name: 'Anua Heartleaf Toner', brand: 'Anua', salesRank: 22000, monthlyRevenue: 31000, growthValue: 68.3, partnershipScore: 95, brandStage: 'Sweet Spot' },
      { id: '7', name: 'Missha Time Revolution Essence', brand: 'Missha', salesRank: 38000, monthlyRevenue: 18000, growthValue: 41.2, partnershipScore: 78, brandStage: 'Sweet Spot' },
      { id: '10', name: 'Skin1004 Centella Ampoule', brand: 'Skin1004', salesRank: 11500, monthlyRevenue: 53000, growthValue: 45.9, partnershipScore: 89, brandStage: 'Sweet Spot' },
    ],
  },
};

/* ── Empty State — no results ────────────────────────────────── */
export const EmptyResults = {
  args: {
    products: [],
  },
};

/* ── Single Brand — all products from one brand ──────────────── */
export const SingleBrand = {
  args: {
    products: [
      { id: '1', name: 'Cosrx Snail Mucin Essence', brand: 'Cosrx', salesRank: 3200, monthlyRevenue: 88000, growthValue: 18.5, partnershipScore: 61, brandStage: 'Established' },
      { id: '2', name: 'Cosrx AHA/BHA Clarifying Toner', brand: 'Cosrx', salesRank: 5800, monthlyRevenue: 45000, growthValue: 12.1, partnershipScore: 55, brandStage: 'Sweet Spot' },
      { id: '3', name: 'Cosrx Low pH Cleanser', brand: 'Cosrx', salesRank: 7200, monthlyRevenue: 38000, growthValue: 9.8, partnershipScore: 48, brandStage: 'Sweet Spot' },
    ],
  },
};

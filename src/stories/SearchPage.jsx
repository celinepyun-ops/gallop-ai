import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from './Table';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { Tabs } from './Tabs';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { EmptyState } from './EmptyState';
import { Icons } from './icons';
import './searchpage.css';

/* ══════════════════════════════════════════════════════════════════
   Mock Data — 10 products with enriched brand data
   ══════════════════════════════════════════════════════════════════ */
const MOCK_PRODUCTS = [
  { id: '1', name: 'CeraVe Hydrating Facial Cleanser', brand: 'CeraVe', salesRank: 342, monthlyRevenue: 285000, growthValue: 12.4, partnershipScore: 38, brandStage: 'Enterprise' },
  { id: '2', name: 'TruSkin Vitamin C Serum', brand: 'TruSkin', salesRank: 8200, monthlyRevenue: 67000, growthValue: 34.2, partnershipScore: 87, brandStage: 'Sweet Spot' },
  { id: '3', name: 'Neutrogena Hydro Boost Gel Cream', brand: 'Neutrogena', salesRank: 890, monthlyRevenue: 195000, growthValue: 8.1, partnershipScore: 32, brandStage: 'Enterprise' },
  { id: '4', name: 'Beauty of Joseon Sunscreen SPF 50', brand: 'Beauty of Joseon', salesRank: 15400, monthlyRevenue: 42000, growthValue: 52.7, partnershipScore: 92, brandStage: 'Sweet Spot' },
  { id: '5', name: 'Cosrx Snail Mucin Essence', brand: 'Cosrx', salesRank: 3200, monthlyRevenue: 88000, growthValue: 18.5, partnershipScore: 61, brandStage: 'Established' },
  { id: '6', name: 'Anua Heartleaf Toner', brand: 'Anua', salesRank: 22000, monthlyRevenue: 31000, growthValue: 68.3, partnershipScore: 95, brandStage: 'Sweet Spot' },
  { id: '7', name: 'Missha Time Revolution Essence', brand: 'Missha', salesRank: 38000, monthlyRevenue: 18000, growthValue: 41.2, partnershipScore: 78, brandStage: 'Sweet Spot' },
  { id: '8', name: 'Rohto Skin Aqua UV Gel SPF 50', brand: 'Rohto', salesRank: 4800, monthlyRevenue: 72000, growthValue: 22.8, partnershipScore: 65, brandStage: 'Established' },
  { id: '9', name: 'Derma E Vitamin C Moisturizer', brand: 'Derma E', salesRank: 62000, monthlyRevenue: 9500, growthValue: 15.6, partnershipScore: 42, brandStage: 'Early' },
  { id: '10', name: 'Skin1004 Centella Ampoule', brand: 'Skin1004', salesRank: 11500, monthlyRevenue: 53000, growthValue: 45.9, partnershipScore: 89, brandStage: 'Sweet Spot' },
];

/* ── Helpers ──────────────────────────────────────────────────── */
const BRAND_STAGE_VARIANT = {
  'Early': 'warning',
  'Sweet Spot': 'success',
  'Established': 'info',
  'Enterprise': 'error',
};

const scoreVariant = (score) => {
  if (score >= 70) return 'success';
  if (score >= 40) return 'warning';
  return 'error';
};

const formatRevenue = (val) => {
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toLocaleString()}`;
};

const formatRank = (val) => `#${val.toLocaleString()}`;

/** Group products by brand for the Brands tab */
export const groupProductsByBrand = (products) => {
  const map = {};
  for (const p of products) {
    if (!map[p.brand]) {
      map[p.brand] = { brandName: p.brand, productCount: 0, avgSalesRank: 0, totalRevenue: 0, products: [] };
    }
    map[p.brand].products.push(p);
    map[p.brand].productCount += 1;
    map[p.brand].totalRevenue += p.monthlyRevenue;
  }
  for (const g of Object.values(map)) {
    g.avgSalesRank = Math.round(g.products.reduce((s, p) => s + p.salesRank, 0) / g.productCount);
  }
  return Object.values(map).sort((a, b) => b.totalRevenue - a.totalRevenue);
};

/* ══════════════════════════════════════════════════════════════════
   Table column definitions
   ══════════════════════════════════════════════════════════════════ */
const productColumns = [
  { key: 'name', label: 'Product Name' },
  { key: 'brand', label: 'Brand' },
  {
    key: 'salesRank',
    label: 'Sales Rank',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatRank(val)}</span>,
  },
  {
    key: 'monthlyRevenue',
    label: 'Monthly Revenue',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatRevenue(val)}</span>,
  },
  {
    key: 'growthValue',
    label: 'Growth',
    render: (val) => (
      <span style={{ color: val >= 30 ? 'var(--color-success-600)' : 'var(--color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        +{val}%
      </span>
    ),
  },
  {
    key: 'partnershipScore',
    label: 'Partnership Score',
    render: (val) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 120 }}>
        <ProgressBar value={val} max={100} variant={scoreVariant(val)} size="sm" />
        <span style={{ fontSize: 'var(--font-size-sm)', fontVariantNumeric: 'tabular-nums', minWidth: 28 }}>{val}</span>
      </div>
    ),
  },
  {
    key: 'brandStage',
    label: 'Brand Stage',
    render: (val) => <Badge label={val} variant={BRAND_STAGE_VARIANT[val] || 'info'} size="small" />,
  },
];

/* ══════════════════════════════════════════════════════════════════
   Default filter state
   ══════════════════════════════════════════════════════════════════ */
const DEFAULT_FILTERS = {
  salesRankMin: '',
  salesRankMax: '',
  revenueMin: '',
  revenueMax: '',
  growthMin: '',
  growthPeriod: '90',
};

/* ══════════════════════════════════════════════════════════════════
   SearchPage Component
   ══════════════════════════════════════════════════════════════════ */
export const SearchPage = ({ products = MOCK_PRODUCTS }) => {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [expandedBrand, setExpandedBrand] = useState(null);

  /* ── Filter logic (AND) ────────────────────────────────────── */
  const filteredProducts = useMemo(() => {
    let result = products;

    // Keyword filter
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw)
      );
    }

    // Sales Rank range
    if (filters.salesRankMin) result = result.filter((p) => p.salesRank >= Number(filters.salesRankMin));
    if (filters.salesRankMax) result = result.filter((p) => p.salesRank <= Number(filters.salesRankMax));

    // Revenue range
    if (filters.revenueMin) result = result.filter((p) => p.monthlyRevenue >= Number(filters.revenueMin));
    if (filters.revenueMax) result = result.filter((p) => p.monthlyRevenue <= Number(filters.revenueMax));

    // Growth minimum
    if (filters.growthMin) result = result.filter((p) => p.growthValue >= Number(filters.growthMin));

    return result;
  }, [products, keyword, filters]);

  const brandGroups = useMemo(() => groupProductsByBrand(filteredProducts), [filteredProducts]);

  const activeFilterCount = Object.entries(filters).filter(
    ([key, val]) => val !== '' && key !== 'growthPeriod'
  ).length;

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  /* ── Category tabs ─────────────────────────────────────────── */
  const categoryTabs = [
    { id: 'all', label: 'All' },
    { id: 'products', label: 'Products' },
    { id: 'brands', label: 'Brands' },
    { id: 'people', label: 'People' },
    { id: 'companies', label: 'Companies' },
  ];

  /* ── Tab content renderers ─────────────────────────────────── */
  const renderProductTable = () => (
    <Table columns={productColumns} data={filteredProducts} sortable striped />
  );

  const renderBrandsView = () => (
    <div className="oai-search-brands">
      {brandGroups.length === 0 ? (
        <EmptyState icon="🏷️" title="No brands found" description="Try adjusting your filters." />
      ) : (
        brandGroups.map((group) => (
          <div key={group.brandName} className="oai-search-brands__card">
            <button
              className="oai-search-brands__header"
              onClick={() => setExpandedBrand(expandedBrand === group.brandName ? null : group.brandName)}
              aria-expanded={expandedBrand === group.brandName}
            >
              <div className="oai-search-brands__info">
                <span className="oai-search-brands__name">{group.brandName}</span>
                <Badge label={`${group.productCount} product${group.productCount > 1 ? 's' : ''}`} variant="info" size="small" />
              </div>
              <div className="oai-search-brands__stats">
                <span className="oai-search-brands__stat">
                  Avg Rank: <strong>{formatRank(group.avgSalesRank)}</strong>
                </span>
                <span className="oai-search-brands__stat">
                  Revenue: <strong>{formatRevenue(group.totalRevenue)}</strong>
                </span>
                <svg
                  className={`oai-search-brands__chevron ${expandedBrand === group.brandName ? 'oai-search-brands__chevron--open' : ''}`}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>
            {expandedBrand === group.brandName && (
              <div className="oai-search-brands__products">
                <Table columns={productColumns} data={group.products} sortable striped />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderComingSoon = (label) => (
    <EmptyState
      icon="🚧"
      title={`${label} — Coming Soon`}
      description="This tab will be available after Apollo API integration."
    />
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
      case 'products':
        return renderProductTable();
      case 'brands':
        return renderBrandsView();
      case 'people':
        return renderComingSoon('People');
      case 'companies':
        return renderComingSoon('Companies');
      default:
        return renderProductTable();
    }
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="oai-search-page__header">
        <h1 className="oai-search-page__title">Find Growing Products</h1>
        <p className="oai-search-page__subtitle">
          Discover growing Amazon products and identify real brands ready for manufacturing partnerships.
        </p>
      </div>

      {/* ── Search Card ────────────────────────────────────── */}
      <div className="oai-search-card">
        {/* Keyword row */}
        <div className="oai-search-card__row">
          <div className="oai-search-card__input-wrapper">
            <span className="oai-search-card__input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="oai-search-card__input"
              type="text"
              placeholder="Enter a keyword (ex. sunscreen, serum, vitamins)..."
              aria-label="Search keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <Button variant="primary" size="large" label="Search" onClick={() => {}} />
        </div>

        {/* Filter toggle */}
        <div className="oai-search-card__filter-toggle-row">
          <button
            className="oai-search-card__filter-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Advanced Filters
            {activeFilterCount > 0 && (
              <Badge label={String(activeFilterCount)} variant="info" size="small" />
            )}
          </button>
        </div>

        {/* Collapsible filters */}
        {filtersOpen && (
          <div className="oai-search-card__advanced-filters">
            <div className="oai-search-card__filter-grid">
              <div className="oai-search-card__filter-group">
                <span className="oai-search-card__filter-label">Sales Rank Range</span>
                <div className="oai-search-card__filter-range">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.salesRankMin}
                    onChange={(e) => updateFilter('salesRankMin', e.target.value)}
                  />
                  <span className="oai-search-card__filter-separator">–</span>
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.salesRankMax}
                    onChange={(e) => updateFilter('salesRankMax', e.target.value)}
                  />
                </div>
              </div>

              <div className="oai-search-card__filter-group">
                <span className="oai-search-card__filter-label">Monthly Revenue Range</span>
                <div className="oai-search-card__filter-range">
                  <Input
                    placeholder="Min ($)"
                    type="number"
                    value={filters.revenueMin}
                    onChange={(e) => updateFilter('revenueMin', e.target.value)}
                  />
                  <span className="oai-search-card__filter-separator">–</span>
                  <Input
                    placeholder="Max ($)"
                    type="number"
                    value={filters.revenueMax}
                    onChange={(e) => updateFilter('revenueMax', e.target.value)}
                  />
                </div>
              </div>

              <div className="oai-search-card__filter-group">
                <span className="oai-search-card__filter-label">Growth Value</span>
                <div className="oai-search-card__filter-range">
                  <Input
                    placeholder="Min %"
                    type="number"
                    value={filters.growthMin}
                    onChange={(e) => updateFilter('growthMin', e.target.value)}
                  />
                  <Select
                    options={[
                      { value: '30', label: '30 days' },
                      { value: '60', label: '60 days' },
                      { value: '90', label: '90 days' },
                    ]}
                    value={filters.growthPeriod}
                    onChange={(e) => updateFilter('growthPeriod', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="oai-search-card__filter-actions">
              <Button variant="ghost" size="small" label="Reset Filters" onClick={resetFilters} />
            </div>
          </div>
        )}
      </div>

      {/* ── Category Tabs ──────────────────────────────────── */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <Tabs
          tabs={categoryTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* ── Results ────────────────────────────────────────── */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <div className="oai-search-results__count">
          {(activeTab === 'all' || activeTab === 'products') &&
            `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
          }
          {activeTab === 'brands' &&
            `${brandGroups.length} brand${brandGroups.length !== 1 ? 's' : ''} found`
          }
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  /** Product data array (defaults to mock data) */
  products: PropTypes.arrayOf(PropTypes.object),
};

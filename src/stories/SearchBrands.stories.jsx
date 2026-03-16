import { useState, useCallback } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import { DOMAIN_LABELS, BEAUTY_CATEGORIES } from '../services/keepaApi';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
    ],
  },
];

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <nav aria-label="Settings and account">
    <ul className="oai-sidebar__list">
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.contacts}</span>
          <span className="oai-sidebar__label">Support</span>
        </button>
      </li>
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.settings}</span>
          <span className="oai-sidebar__label">Settings</span>
        </button>
      </li>
      <li>
        <button
          className="oai-sidebar__item oai-sidebar__item--toggle"
          role="switch"
          aria-checked={darkMode}
          aria-label="Dark Mode"
          onClick={() => onToggleDark(!darkMode)}
        >
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.moon}</span>
          <span className="oai-sidebar__label">Dark Mode</span>
          <span className={`oai-sidebar__toggle ${darkMode ? 'oai-sidebar__toggle--checked' : ''}`}>
            <span className="oai-sidebar__toggle-knob" />
          </span>
        </button>
      </li>
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon"><Avatar initials="MT" size="small" /></span>
          <span className="oai-sidebar__label">Mike Torres</span>
        </button>
      </li>
    </ul>
  </nav>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

/* ── Mock data with Keepa-powered growth metrics ────────────────── */
const mockResults = [
  {
    title: 'EcoGlow Naturals Vitamin C Brightening Moisturizer with Hyaluronic Acid',
    asin: 'B0CK9X2M1P', brand: 'EcoGlow Naturals', price: '$24.97', rating: 4.6, reviews: 1243,
    salesRank: 8420, revenueGrowth: 46, salesRankTrend: -38, reviewVelocity: 32,
    priceStability: 'stable', partnershipScore: 92, brandStage: 'sweet-spot',
    estimatedMonthlySales: 890,
  },
  {
    title: 'SunShield Pro SPF 50 Mineral Sunscreen, Reef-Safe, Lightweight',
    asin: 'B0DJ7M3KN2', brand: 'SunShield Pro', price: '$18.49', rating: 4.5, reviews: 876,
    salesRank: 12300, revenueGrowth: 38, salesRankTrend: -31, reviewVelocity: 28,
    priceStability: 'stable', partnershipScore: 88, brandStage: 'sweet-spot',
    estimatedMonthlySales: 640,
  },
  {
    title: 'PureRadiance Retinol Night Cream Anti-Aging Face Moisturizer',
    asin: 'B0BN4L8FQ3', brand: 'PureRadiance', price: '$21.99', rating: 4.4, reviews: 2108,
    salesRank: 15600, revenueGrowth: 29, salesRankTrend: -24, reviewVelocity: 18,
    priceStability: 'stable', partnershipScore: 82, brandStage: 'sweet-spot',
    estimatedMonthlySales: 510,
  },
  {
    title: 'GlowUp Skin Niacinamide Serum 10% + Zinc for Pore Minimizer',
    asin: 'B0CRK8V1N4', brand: 'GlowUp Skin', price: '$15.99', rating: 4.3, reviews: 645,
    salesRank: 21400, revenueGrowth: 22, salesRankTrend: -19, reviewVelocity: 41,
    priceStability: 'moderate', partnershipScore: 78, brandStage: 'sweet-spot',
    estimatedMonthlySales: 380,
  },
  {
    title: 'Derma Botanics Collagen Peptide Face Cream with Vitamin E',
    asin: 'B0DM6P2KR5', brand: 'Derma Botanics', price: '$28.50', rating: 4.7, reviews: 3456,
    salesRank: 6800, revenueGrowth: 18, salesRankTrend: -14, reviewVelocity: 12,
    priceStability: 'stable', partnershipScore: 75, brandStage: 'sweet-spot',
    estimatedMonthlySales: 1050,
  },
  {
    title: 'AquaVeil Hydrating Sunscreen SPF 30 for Sensitive Skin',
    asin: 'B0CJ3N7MP6', brand: 'AquaVeil', price: '$16.99', rating: 4.5, reviews: 412,
    salesRank: 34200, revenueGrowth: 55, salesRankTrend: -42, reviewVelocity: 52,
    priceStability: 'stable', partnershipScore: 85, brandStage: 'sweet-spot',
    estimatedMonthlySales: 250,
  },
  {
    title: 'BotaniShield Zinc Oxide Sunscreen SPF 50+ Broad Spectrum',
    asin: 'B0BK2M9LN7', brand: 'BotaniShield', price: '$22.00', rating: 4.2, reviews: 289,
    salesRank: 42100, revenueGrowth: 61, salesRankTrend: -48, reviewVelocity: 67,
    priceStability: 'moderate', partnershipScore: 80, brandStage: 'sweet-spot',
    estimatedMonthlySales: 190,
  },
  {
    title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin',
    asin: 'B00TTD9BRC', brand: 'CeraVe', price: '$18.96', rating: 4.7, reviews: 138412,
    salesRank: 42, revenueGrowth: 3, salesRankTrend: -2, reviewVelocity: 4,
    priceStability: 'stable', partnershipScore: 25, brandStage: 'enterprise',
    estimatedMonthlySales: 28500,
  },
  {
    title: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
    asin: 'B01N95PQHQ', brand: 'La Roche-Posay', price: '$24.99', rating: 4.6, reviews: 46666,
    salesRank: 156, revenueGrowth: 5, salesRankTrend: -3, reviewVelocity: 6,
    priceStability: 'stable', partnershipScore: 28, brandStage: 'enterprise',
    estimatedMonthlySales: 12400,
  },
  {
    title: 'FreshFace Co Aloe Vera Gel Moisturizer, Lightweight Daily Hydrator',
    asin: 'B0DN8K4QM8', brand: 'FreshFace Co', price: '$12.99', rating: 4.1, reviews: 87,
    salesRank: 78400, revenueGrowth: 12, salesRankTrend: -8, reviewVelocity: 24,
    priceStability: 'volatile', partnershipScore: 42, brandStage: 'early',
    estimatedMonthlySales: 110,
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const TrendArrow = ({ value, suffix = '%' }) => {
  if (value === null || value === undefined) return <span className="oai-results__trend oai-results__trend--neutral">—</span>;
  const isPositive = value > 0;
  return (
    <span className={`oai-results__trend oai-results__trend--${isPositive ? 'up' : 'down'}`}>
      {isPositive ? '▲' : '▼'} {Math.abs(value)}{suffix}
    </span>
  );
};

const InfoTooltip = ({ children }) => (
  <span className="oai-info-tooltip">
    <span className="oai-info-tooltip__icon" aria-label="More info">ℹ</span>
    <span className="oai-info-tooltip__content">{children}</span>
  </span>
);

const ScoreBadge = ({ score, product }) => {
  if (score === null || score === undefined) return null;
  let variant = 'low';
  if (score >= 80) variant = 'high';
  else if (score >= 60) variant = 'medium';

  const breakdown = product ? (
    <span className="oai-info-tooltip">
      <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>
      <span className="oai-info-tooltip__content oai-info-tooltip__content--wide">
        <strong>Score Breakdown</strong>
        <span className="oai-info-tooltip__row">Revenue Growth {product.revenueGrowth > 30 ? '+20' : product.revenueGrowth > 10 ? '+10' : product.revenueGrowth < -10 ? '−15' : '0'}</span>
        <span className="oai-info-tooltip__row">Sales Rank Fit {product.salesRank >= 5000 && product.salesRank <= 50000 ? '+15' : '−10'}</span>
        <span className="oai-info-tooltip__row">Price Stability {product.priceStability === 'stable' ? '+5' : '0'}</span>
        <span className="oai-info-tooltip__row">Review Velocity {product.reviewVelocity > 10 ? '+10' : '0'}</span>
        <span className="oai-info-tooltip__row oai-info-tooltip__row--total">Base 50 → Total {score}</span>
      </span>
    </span>
  ) : (
    <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>
  );

  return breakdown;
};

const StageBadge = ({ stage }) => {
  const labels = { 'sweet-spot': 'Sweet Spot', early: 'Early', established: 'Established', enterprise: 'Enterprise', unknown: '—' };
  const variants = { 'sweet-spot': 'success', early: 'warning', established: 'info', enterprise: 'muted', unknown: 'muted' };
  return <span className={`oai-results__stage oai-results__stage--${variants[stage] || 'muted'}`}>{labels[stage] || stage}</span>;
};

const countryOptions = Object.entries(DOMAIN_LABELS);
const categoryOptions = Object.entries(BEAUTY_CATEGORIES.US);

/* ── Main Component ─────────────────────────────────────────────── */
const SearchBrandsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search filters
  const [keyword, setKeyword] = useState('sunscreen');
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Sun Protection');
  const [minRating, setMinRating] = useState('3.5');
  const [rankMin, setRankMin] = useState('1000');
  const [rankMax, setRankMax] = useState('50000');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('partnershipScore');
  const [sortDir, setSortDir] = useState('desc');

  const handleSearch = useCallback(() => {
    setLoading(true);
    setHasSearched(true);
    // Simulate API call — in production, replace with:
    // searchAndAnalyze(keyword, country, { minRating, category })
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1200);
  }, [keyword, country, category]);

  const toggleSelect = (asin) => {
    setSelected((prev) => prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin]);
  };

  const toggleAll = () => {
    if (selected.length === sortedResults.length) {
      setSelected([]);
    } else {
      setSelected(sortedResults.map((r) => r.asin));
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const aVal = a[sortBy] ?? 0;
    const bVal = b[sortBy] ?? 0;
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const SortHeader = ({ label, field, className }) => (
    <th
      className={`oai-results__th oai-results__th--sortable ${className || ''}`}
      onClick={() => handleSort(field)}
      role="columnheader"
      aria-sort={sortBy === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(field); } }}
    >
      {label}
      {sortBy === field && <span className="oai-results__sort-icon" aria-hidden="true">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="search-brands"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar>
          <Search placeholder="Search brands..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        <div className="oai-search-page__header">
          <h1 className="oai-search-page__title">Find Growing Brands</h1>
          <p className="oai-search-page__subtitle">Discover fast-growing Amazon brands ready for manufacturing partnerships.</p>
        </div>

        {/* ── Search Card ──────────────────────────────────────── */}
        <div className="oai-search-card">
          <div className="oai-search-card__form-grid">
            <div className="oai-search-card__field oai-search-card__field--keyword">
              <label className="oai-search-card__label" htmlFor="search-keyword">Keyword</label>
              <input id="search-keyword" className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. sunscreen, facial cream, serum" />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="search-country">Country</label>
              <select id="search-country" className="oai-search-card__text-input" value={country} onChange={(e) => setCountry(e.target.value)}>
                {countryOptions.map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="search-category">Category</label>
              <select id="search-category" className="oai-search-card__text-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categoryOptions.map(([name]) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <button
            className="oai-search-card__advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
            type="button"
            aria-expanded={showAdvanced}
          >
            <span aria-hidden="true">{showAdvanced ? '▾' : '▸'}</span> {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </button>

          {showAdvanced && (
            <div className="oai-search-card__form-grid oai-search-card__form-grid--advanced">
              <div className="oai-search-card__field">
                <label className="oai-search-card__label" htmlFor="search-min-rating">Min Rating</label>
                <select id="search-min-rating" className="oai-search-card__text-input" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                  <option value="">Any</option>
                  <option value="3.0">3.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="4.5">4.5+</option>
                </select>
              </div>
              <div className="oai-search-card__field">
                <label className="oai-search-card__label" htmlFor="search-rank-min">Sales Rank Min</label>
                <input id="search-rank-min" className="oai-search-card__text-input" type="number" value={rankMin} onChange={(e) => setRankMin(e.target.value)} placeholder="1,000" />
              </div>
              <div className="oai-search-card__field">
                <label className="oai-search-card__label" htmlFor="search-rank-max">Sales Rank Max</label>
                <input id="search-rank-max" className="oai-search-card__text-input" type="number" value={rankMax} onChange={(e) => setRankMax(e.target.value)} placeholder="50,000" />
              </div>
            </div>
          )}

          <div className="oai-search-card__form-row">
            <div className="oai-search-card__feature-callout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              Powered by Keepa + AI — results ranked by growth potential
            </div>
            <button className="oai-search-card__search-btn" onClick={handleSearch} disabled={loading}>
              {loading ? (
                <>
                  <span className="oai-search-card__spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────── */}
        {hasSearched && (
          <div className="oai-results">
            <div className="oai-results__header">
              <h2 className="oai-results__title">
                {loading ? 'Searching...' : `${sortedResults.length} Brands Found`}
              </h2>
              {!loading && sortedResults.length > 0 && (
                <span className="oai-results__subtitle">Sorted by {sortBy === 'partnershipScore' ? 'Partnership Score' : sortBy === 'revenueGrowth' ? 'Revenue Growth' : sortBy}</span>
              )}
            </div>

            {loading ? (
              <div className="oai-results__loading">
                <div className="oai-results__loading-bar" />
                <p className="oai-results__loading-text">Fetching products from Amazon via Keepa API...</p>
                <p className="oai-results__loading-subtext">Analyzing growth metrics with AI</p>
              </div>
            ) : (
              <div className="oai-results__table-wrap">
                <table className="oai-results__table">
                  <thead>
                    <tr>
                      <th className="oai-results__th oai-results__th--check">
                        <input type="checkbox" aria-label="Select all products" checked={selected.length === sortedResults.length && sortedResults.length > 0} onChange={toggleAll} />
                      </th>
                      <th className="oai-results__th oai-results__th--title">Brand / Product</th>
                      <SortHeader label={<>Score <InfoTooltip><strong>Partnership Score (0–100)</strong><br/>Weighted from: revenue growth, sales rank fit, price stability, and review velocity. Higher = better manufacturing partner fit.</InfoTooltip></>} field="partnershipScore" />
                      <SortHeader label="Rev. Growth" field="revenueGrowth" />
                      <SortHeader label="Est. Sales/mo" field="estimatedMonthlySales" />
                      <SortHeader label="Rating" field="rating" />
                      <SortHeader label="Reviews" field="reviews" />
                      <th className="oai-results__th">Stage <InfoTooltip><strong>Brand Stage</strong><br/>Early: rank &gt;50K<br/>Sweet Spot: 5K–50K (ideal)<br/>Established: 1K–5K<br/>Enterprise: &lt;1K (too big)</InfoTooltip></th>
                      <th className="oai-results__th">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.map((product) => (
                      <tr key={product.asin} className={`oai-results__row ${selected.includes(product.asin) ? 'oai-results__row--selected' : ''}`}>
                        <td className="oai-results__td oai-results__td--check">
                          <input type="checkbox" aria-label={`Select ${product.brand}`} checked={selected.includes(product.asin)} onChange={() => toggleSelect(product.asin)} />
                        </td>
                        <td className="oai-results__td oai-results__td--title">
                          <div className="oai-results__product-title">{product.brand}</div>
                          <div className="oai-results__product-asin">{product.title}</div>
                        </td>
                        <td className="oai-results__td oai-results__td--score">
                          <ScoreBadge score={product.partnershipScore} product={product} />
                        </td>
                        <td className="oai-results__td">
                          <TrendArrow value={product.revenueGrowth} />
                        </td>
                        <td className="oai-results__td">
                          {product.estimatedMonthlySales ? product.estimatedMonthlySales.toLocaleString() : '—'}
                        </td>
                        <td className="oai-results__td">
                          <span className="oai-results__rating">★ {product.rating}</span>
                        </td>
                        <td className="oai-results__td">{product.reviews.toLocaleString()}</td>
                        <td className="oai-results__td">
                          <StageBadge stage={product.brandStage} />
                        </td>
                        <td className="oai-results__td">
                          <button className="oai-results__action-btn" onClick={fn()} title="Find decision maker">
                            View Lead →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Selected brands panel */}
            {selected.length > 0 && (
              <div className="oai-results__list-section">
                <h3 className="oai-results__list-title">
                  Selected Brands
                  <span className="oai-results__list-count">{selected.length}</span>
                </h3>
                <div className="oai-results__list-items">
                  {sortedResults.filter((r) => selected.includes(r.asin)).map((product) => (
                    <div key={product.asin} className="oai-results__list-item">
                      <div className="oai-results__list-item-info">
                        <span className="oai-results__list-item-name">{product.brand}</span>
                        <span className="oai-results__list-item-brand">Score: {product.partnershipScore} · Rev. Growth: +{product.revenueGrowth}%</span>
                      </div>
                      <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)} aria-label={`Remove ${product.brand}`}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="oai-results__list-actions">
                  <button className="oai-results__bulk-btn oai-results__bulk-btn--primary" onClick={fn()}>
                    Find Decision Makers ({selected.length})
                  </button>
                  <button className="oai-results__bulk-btn" onClick={fn()}>
                    Export CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export default {
  title: 'Pages/Search Brands',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  render: () => <SearchBrandsPage />,
};

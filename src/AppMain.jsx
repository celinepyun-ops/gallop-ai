import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './stories/tokens.css';
import './stories/fonts.css';
import { PageLayout } from './stories/PageLayout';
import { Sidebar } from './stories/Sidebar';
import { Navbar } from './stories/Navbar';
import { Search } from './stories/Search';
import { Avatar } from './stories/Avatar';
import { HelpButton } from './stories/HelpButton';
import { StatsCard } from './stories/StatsCard';
import { Table } from './stories/Table';
import { Badge } from './stories/Badge';
import { Tabs } from './stories/Tabs';
import { Breadcrumbs } from './stories/Breadcrumbs';
import { Button } from './stories/Button';
import { Select } from './stories/Select';
import { NotFound } from './stories/NotFound';
import { Login } from './stories/Login';
import { SignUp } from './stories/SignUp';
import { Settings } from './stories/Settings';
import { LandingPage } from './stories/LandingPage';
import { PricingPage } from './stories/PricingPage';
import { ProductPage } from './stories/ProductPage';
import { Icons } from './stories/icons';
import './stories/searchpage.css';
const noop = () => {};

/* ── Sidebar footer ──────────────────────────────────────────────── */
const SidebarFooter = ({ darkMode, onToggleDark, onProfileClick, onSettingsClick }) => (
  <ul className="oai-sidebar__list">
    <li>
      <button className="oai-sidebar__item" onClick={noop}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={onSettingsClick}>
        <span className="oai-sidebar__icon">{Icons.settings}</span>
        <span className="oai-sidebar__label">Settings</span>
      </button>
    </li>
    <li>
      <button
        className="oai-sidebar__item oai-sidebar__item--toggle"
        role="switch"
        aria-checked={darkMode}
        onClick={() => onToggleDark(!darkMode)}
      >
        <span className="oai-sidebar__icon">{Icons.moon}</span>
        <span className="oai-sidebar__label">Dark Mode</span>
        <span className={`oai-sidebar__toggle ${darkMode ? 'oai-sidebar__toggle--checked' : ''}`}>
          <span className="oai-sidebar__toggle-knob" />
        </span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={onProfileClick}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

/* ── Sidebar header ──────────────────────────────────────────────── */
const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

/* ── Dashboard data ──────────────────────────────────────────────── */
const tableColumns = [
  { key: 'brand', label: 'Brand' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (val) => <Badge label={val} variant={val === 'Active' ? 'success' : val === 'Pending' ? 'warning' : val === 'Paused' ? 'error' : 'info'} size="small" /> },
  { key: 'sent', label: 'Sent' },
  { key: 'rate', label: 'Response Rate' },
];

const tableData = [
  { brand: 'EcoGlow Naturals', contact: 'Sarah Chen', status: 'Active', sent: 145, rate: '32%' },
  { brand: 'TechVibe Audio', contact: 'Marcus Johnson', status: 'Pending', sent: 89, rate: '18%' },
  { brand: 'PureHome Essentials', contact: 'Emily Davis', status: 'Active', sent: 234, rate: '28%' },
  { brand: 'FitPro Gear', contact: 'Alex Rivera', status: 'Paused', sent: 56, rate: '22%' },
  { brand: 'CloudNine Bedding', contact: 'Jordan Lee', status: 'Active', sent: 178, rate: '35%' },
  { brand: 'ZenBrew Coffee', contact: 'Taylor Kim', status: 'Active', sent: 112, rate: '41%' },
];

/* ── Page: Dashboard ─────────────────────────────────────────────── */
const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('all');
  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]} />
      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Welcome back, Jane. Here's your outreach overview.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon={Icons.campaigns} />
        <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon={Icons.analytics} />
        <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon={Icons.dashboard} />
        <StatsCard title="Brands Contacted" value="456" change="-2.1% from last month" trend="down" icon={Icons.brands} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Tabs tabs={[{ id: 'all', label: 'All Brands' }, { id: 'active', label: 'Active' }, { id: 'pending', label: 'Pending' }, { id: 'archived', label: 'Archived' }]} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Table columns={tableColumns} data={tableData} sortable striped />
    </div>
  );
};

/* ── Search Results mock data ─────────────────────────────────────── */
const searchResults = [
  { title: 'EcoGlow Naturals Vitamin C Brightening Moisturizer with Hyaluronic Acid', asin: 'B0CK9X2M1P', brand: 'EcoGlow Naturals', price: '$24.97', rating: 4.6, reviews: 1243, salesRank: 8420, revenueGrowth: 46, salesRankTrend: -38, reviewVelocity: 32, priceStability: 'stable', partnershipScore: 92, brandStage: 'sweet-spot', estimatedMonthlySales: 890 },
  { title: 'SunShield Pro SPF 50 Mineral Sunscreen, Reef-Safe, Lightweight', asin: 'B0DJ7M3KN2', brand: 'SunShield Pro', price: '$18.49', rating: 4.5, reviews: 876, salesRank: 12300, revenueGrowth: 38, salesRankTrend: -31, reviewVelocity: 28, priceStability: 'stable', partnershipScore: 88, brandStage: 'sweet-spot', estimatedMonthlySales: 640 },
  { title: 'PureRadiance Retinol Night Cream Anti-Aging Face Moisturizer', asin: 'B0BN4L8FQ3', brand: 'PureRadiance', price: '$21.99', rating: 4.4, reviews: 2108, salesRank: 15600, revenueGrowth: 29, salesRankTrend: -24, reviewVelocity: 18, priceStability: 'stable', partnershipScore: 82, brandStage: 'sweet-spot', estimatedMonthlySales: 510 },
  { title: 'GlowUp Skin Niacinamide Serum 10% + Zinc for Pore Minimizer', asin: 'B0CRK8V1N4', brand: 'GlowUp Skin', price: '$15.99', rating: 4.3, reviews: 645, salesRank: 21400, revenueGrowth: 22, salesRankTrend: -19, reviewVelocity: 41, priceStability: 'moderate', partnershipScore: 78, brandStage: 'sweet-spot', estimatedMonthlySales: 380 },
  { title: 'Derma Botanics Collagen Peptide Face Cream with Vitamin E', asin: 'B0DM6P2KR5', brand: 'Derma Botanics', price: '$28.50', rating: 4.7, reviews: 3456, salesRank: 6800, revenueGrowth: 18, salesRankTrend: -14, reviewVelocity: 12, priceStability: 'stable', partnershipScore: 75, brandStage: 'sweet-spot', estimatedMonthlySales: 1050 },
  { title: 'AquaVeil Hydrating Sunscreen SPF 30 for Sensitive Skin', asin: 'B0CJ3N7MP6', brand: 'AquaVeil', price: '$16.99', rating: 4.5, reviews: 412, salesRank: 34200, revenueGrowth: 55, salesRankTrend: -42, reviewVelocity: 52, priceStability: 'stable', partnershipScore: 85, brandStage: 'sweet-spot', estimatedMonthlySales: 250 },
  { title: 'BotaniShield Zinc Oxide Sunscreen SPF 50+ Broad Spectrum', asin: 'B0BK2M9LN7', brand: 'BotaniShield', price: '$22.00', rating: 4.2, reviews: 289, salesRank: 42100, revenueGrowth: 61, salesRankTrend: -48, reviewVelocity: 67, priceStability: 'moderate', partnershipScore: 80, brandStage: 'sweet-spot', estimatedMonthlySales: 190 },
  { title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin', asin: 'B00TTD9BRC', brand: 'CeraVe', price: '$18.96', rating: 4.7, reviews: 138412, salesRank: 42, revenueGrowth: 3, salesRankTrend: -2, reviewVelocity: 4, priceStability: 'stable', partnershipScore: 25, brandStage: 'enterprise', estimatedMonthlySales: 28500 },
  { title: 'La Roche-Posay Toleriane Double Repair Face Moisturizer', asin: 'B01N95PQHQ', brand: 'La Roche-Posay', price: '$24.99', rating: 4.6, reviews: 46666, salesRank: 156, revenueGrowth: 5, salesRankTrend: -3, reviewVelocity: 6, priceStability: 'stable', partnershipScore: 28, brandStage: 'enterprise', estimatedMonthlySales: 12400 },
  { title: 'FreshFace Co Aloe Vera Gel Moisturizer, Lightweight Daily Hydrator', asin: 'B0DN8K4QM8', brand: 'FreshFace Co', price: '$12.99', rating: 4.1, reviews: 87, salesRank: 78400, revenueGrowth: 12, salesRankTrend: -8, reviewVelocity: 24, priceStability: 'volatile', partnershipScore: 42, brandStage: 'early', estimatedMonthlySales: 110 },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const TrendArrow = ({ value, suffix = '%' }) => {
  if (value === null || value === undefined) return <span className="oai-results__trend oai-results__trend--neutral">—</span>;
  const isPositive = value > 0;
  return <span className={`oai-results__trend oai-results__trend--${isPositive ? 'up' : 'down'}`}>{isPositive ? '▲' : '▼'} {Math.abs(value)}{suffix}</span>;
};

const ScoreBadge = ({ score }) => {
  if (score === null || score === undefined) return null;
  let variant = 'low';
  if (score >= 80) variant = 'high';
  else if (score >= 60) variant = 'medium';
  return <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>;
};

const StageBadge = ({ stage }) => {
  const labels = { 'sweet-spot': 'Sweet Spot', early: 'Early', established: 'Established', enterprise: 'Enterprise', unknown: '—' };
  const variants = { 'sweet-spot': 'success', early: 'warning', established: 'info', enterprise: 'muted', unknown: 'muted' };
  return <span className={`oai-results__stage oai-results__stage--${variants[stage] || 'muted'}`}>{labels[stage] || stage}</span>;
};

const countryOptions = [['US', '🇺🇸 United States'], ['UK', '🇬🇧 United Kingdom'], ['DE', '🇩🇪 Germany'], ['JP', '🇯🇵 Japan'], ['CA', '🇨🇦 Canada']];
const categoryOptions = [['Beauty & Personal Care', 'Beauty & Personal Care'], ['Skin Care', 'Skin Care'], ['Sun Protection', 'Sun Protection'], ['Face Moisturizers', 'Face Moisturizers']];

/* ── Page: Search Brands ─────────────────────────────────────────── */
const SearchBrandsContent = ({ onNavigate }) => {
  const [keyword, setKeyword] = useState('sunscreen');
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Sun Protection');
  const [minRating, setMinRating] = useState('3.5');
  const [rankMin, setRankMin] = useState('1000');
  const [rankMax, setRankMax] = useState('50000');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('partnershipScore');
  const [sortDir, setSortDir] = useState('desc');

  const handleSearch = useCallback(() => {
    setLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      setResults(searchResults);
      setLoading(false);
    }, 1200);
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    const aVal = a[sortBy] ?? 0;
    const bVal = b[sortBy] ?? 0;
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const toggleSelect = (asin) => {
    setSelected((prev) => prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin]);
  };

  const toggleAll = () => {
    setSelected(selected.length === sortedResults.length ? [] : sortedResults.map((r) => r.asin));
  };

  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('desc'); }
  };

  const SortHeader = ({ label, field, className }) => (
    <th className={`oai-results__th oai-results__th--sortable ${className || ''}`} onClick={() => handleSort(field)}>
      {label}{sortBy === field && <span className="oai-results__sort-icon">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div className="oai-search-page__header">
        <h1 className="oai-search-page__title">Find Growing Brands</h1>
        <p className="oai-search-page__subtitle">Discover fast-growing Amazon brands ready for manufacturing partnerships.</p>
      </div>

      <div className="oai-search-card">
        <div className="oai-search-card__form-grid">
          <div className="oai-search-card__field oai-search-card__field--keyword">
            <label className="oai-search-card__label" htmlFor="search-keyword">Keyword</label>
            <input id="search-keyword" className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. sunscreen, facial cream, serum" />
          </div>
          <div className="oai-search-card__field">
            <label className="oai-search-card__label" htmlFor="search-country">Country</label>
            <select id="search-country" className="oai-search-card__text-input" value={country} onChange={(e) => setCountry(e.target.value)}>
              {countryOptions.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </div>
          <div className="oai-search-card__field">
            <label className="oai-search-card__label" htmlFor="search-category">Category</label>
            <select id="search-category" className="oai-search-card__text-input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoryOptions.map(([name]) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        </div>

        <button className="oai-search-card__advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)} type="button">
          {showAdvanced ? '▾ Hide' : '▸ Show'} Advanced Filters
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
              <input id="search-rank-min" className="oai-search-card__text-input" type="number" value={rankMin} onChange={(e) => setRankMin(e.target.value)} />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="search-rank-max">Sales Rank Max</label>
              <input id="search-rank-max" className="oai-search-card__text-input" type="number" value={rankMax} onChange={(e) => setRankMax(e.target.value)} />
            </div>
          </div>
        )}

        <div className="oai-search-card__form-row">
          <div className="oai-search-card__feature-callout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            Powered by Keepa + AI — results ranked by growth potential
          </div>
          <button className="oai-search-card__search-btn" onClick={handleSearch} disabled={loading}>
            {loading ? <><span className="oai-search-card__spinner" /> Analyzing...</> : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> Search</>}
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="oai-results">
          <div className="oai-results__header">
            <h2 className="oai-results__title">{loading ? 'Searching...' : `${sortedResults.length} Brands Found`}</h2>
            {!loading && sortedResults.length > 0 && <span className="oai-results__subtitle">Sorted by {sortBy === 'partnershipScore' ? 'Partnership Score' : sortBy}</span>}
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
                    <SortHeader label="Score" field="partnershipScore" />
                    <SortHeader label="Rev. Growth" field="revenueGrowth" />
                    <SortHeader label="Est. Sales/mo" field="estimatedMonthlySales" />
                    <SortHeader label="Rating" field="rating" />
                    <SortHeader label="Reviews" field="reviews" />
                    <th className="oai-results__th">Stage</th>
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
                      <td className="oai-results__td oai-results__td--score"><ScoreBadge score={product.partnershipScore} /></td>
                      <td className="oai-results__td"><TrendArrow value={product.revenueGrowth} /></td>
                      <td className="oai-results__td">{product.estimatedMonthlySales ? product.estimatedMonthlySales.toLocaleString() : '—'}</td>
                      <td className="oai-results__td"><span className="oai-results__rating">★ {product.rating}</span></td>
                      <td className="oai-results__td">{product.reviews.toLocaleString()}</td>
                      <td className="oai-results__td"><StageBadge stage={product.brandStage} /></td>
                      <td className="oai-results__td">
                        <button className="oai-results__action-btn" onClick={() => onNavigate?.('people')} title="Find decision maker">View Lead →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selected.length > 0 && (
            <div className="oai-results__list-section">
              <h3 className="oai-results__list-title">Selected Brands <span className="oai-results__list-count">{selected.length}</span></h3>
              <div className="oai-results__list-items">
                {sortedResults.filter((r) => selected.includes(r.asin)).map((product) => (
                  <div key={product.asin} className="oai-results__list-item">
                    <div className="oai-results__list-item-info">
                      <span className="oai-results__list-item-name">{product.brand}</span>
                      <span className="oai-results__list-item-brand">Score: {product.partnershipScore} · Rev. Growth: +{product.revenueGrowth}%</span>
                    </div>
                    <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)}>✕</button>
                  </div>
                ))}
              </div>
              <div className="oai-results__list-actions">
                <button className="oai-results__bulk-btn oai-results__bulk-btn--primary" onClick={() => onNavigate?.('people')}>Find Decision Makers ({selected.length})</button>
                <button className="oai-results__bulk-btn">Export CSV</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Page: Email Templates ───────────────────────────────────────── */
const TemplatesContent = () => (
  <div style={{ maxWidth: '1100px' }}>
    <div className="oai-templates__header">
      <div>
        <h1 className="oai-templates__title">Email Templates</h1>
        <p className="oai-templates__subtitle">Create and manage reusable email templates</p>
      </div>
      <button className="oai-templates__new-btn" onClick={noop}>
        + New Template
      </button>
    </div>
    <div className="oai-templates__empty">
      <div className="oai-templates__empty-icon">
        {Icons.templates}
      </div>
      <h2 className="oai-templates__empty-title">No templates yet</h2>
      <p className="oai-templates__empty-desc">Create your first email template to speed up your outreach</p>
      <button className="oai-templates__create-btn" onClick={noop}>
        + Create Template
      </button>
    </div>
  </div>
);

/* ── Emails mock data ────────────────────────────────────────────── */
const emailQueue = [
  {
    id: 1,
    to: { name: 'Sarah Chen', email: 'sarah.chen@ecoglow.com', title: 'Head of Partnerships, EcoGlow Naturals', company: 'EcoGlow Naturals', location: 'San Francisco, CA, United States' },
    subject: 'Partnership opportunity for EcoGlow Naturals',
    body: `Hey Sarah,\n\nI saw you are leading partnerships at EcoGlow Naturals and driving the brand's expansion on Amazon. Given how fast the clean beauty category is growing, I imagine scaling your seller network is a big priority right now.\n\nWe specialize in helping top-tier beauty brands like EcoGlow connect with high-performing Amazon sellers. We can help your products reach new audiences and increase sales velocity, eliminating the overhead of managing individual seller relationships.\n\nCurious if expanding your Amazon seller network is on your radar this quarter?\n\nBest,\n\nJane Doe\nGallop AI`,
    signals: [
      { label: 'Head of Partnerships — EcoGlow Naturals', expandable: true },
      { label: 'Recent Hire — Mar 2025', expandable: true, detail: 'She started the Head of Partnerships position in March 2025, so she is newly responsible for shaping the partnership strategy and may be actively building new vendor pipelines.' },
      { label: 'Clean Beauty Category Growth', expandable: true, detail: 'EcoGlow Naturals is rapidly growing in clean beauty on Amazon; as Head of Partnerships she likely prioritizes expanding distribution channels.' },
    ],
  },
  {
    id: 2,
    to: { name: 'Marcus Johnson', email: 'marcus@techvibe.com', title: 'Brand Manager, TechVibe Audio', company: 'TechVibe Audio', location: 'Austin, TX, United States' },
    subject: 'Amazon growth strategy for TechVibe Audio',
    body: `Hey Marcus,\n\nI noticed TechVibe Audio has been gaining serious traction in the wireless earbuds category on Amazon. Your latest product launch looks impressive.\n\nWe help audio brands optimize their Amazon presence — from listing optimization to review management and advertising strategy. Our clients typically see a 40% increase in organic ranking within 90 days.\n\nWould you be open to a quick chat about how we could help TechVibe scale even faster?\n\nBest,\n\nJane Doe\nGallop AI`,
    signals: [
      { label: 'Brand Manager — TechVibe Audio', expandable: true },
      { label: 'Product Launch — Feb 2025', expandable: true, detail: 'TechVibe recently launched new wireless earbuds, suggesting active investment in Amazon growth.' },
    ],
  },
];

/* ── Page: Emails ────────────────────────────────────────────────── */
const EmailsContent = () => {
  const [activeEmailTab, setActiveEmailTab] = useState('review');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSignal, setExpandedSignal] = useState(1);

  const emailTabs = [
    { id: 'review', label: 'For Review', count: emailQueue.length },
    { id: 'queue', label: 'Queue', count: 0 },
    { id: 'drafting', label: 'Drafting', count: 0 },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'failed', label: 'Failed', count: 0 },
  ];

  const currentEmail = emailQueue[currentIndex];

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Connect email banner */}
      <div className="oai-emails__banner">
        <span className="oai-emails__banner-icon">{Icons.campaigns}</span>
        <span className="oai-emails__banner-text">Connect your email to start sending outreach</span>
        <button className="oai-emails__banner-btn" onClick={noop}>Connect Email</button>
      </div>

      {/* Header */}
      <div className="oai-emails__header">
        <div className="oai-emails__header-left">
          <h1 className="oai-emails__title">{Icons.campaigns} Emails</h1>
        </div>
        <div className="oai-emails__header-right">
          <span className="oai-emails__count">0 / 35 today</span>
          <Badge label="Active" variant="success" size="small" />
          <button className="oai-emails__action-btn" onClick={noop}>❚❚ Pause</button>
          <button className="oai-emails__action-btn oai-emails__action-btn--danger" onClick={noop}>■ Stop All</button>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="oai-emails__toolbar">
        <div className="oai-emails__tabs">
          {emailTabs.map((tab) => (
            <button
              key={tab.id}
              className={`oai-emails__tab ${activeEmailTab === tab.id ? 'oai-emails__tab--active' : ''}`}
              onClick={() => setActiveEmailTab(tab.id)}
            >
              {tab.label}
              <span className={`oai-emails__tab-count ${activeEmailTab === tab.id && tab.count > 0 ? 'oai-emails__tab-count--active' : ''}`}>{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="oai-emails__search-wrap">
          <Search placeholder="Search by name, email, or subject..." onChange={noop} />
        </div>
      </div>

      {/* Email content */}
      {activeEmailTab === 'review' && currentEmail ? (
        <div className="oai-emails__content">
          {/* Email preview */}
          <div className="oai-emails__preview">
            {/* To line + navigation */}
            <div className="oai-emails__to-row">
              <span className="oai-emails__to-label">To:</span>
              <span className="oai-emails__to-name">{currentEmail.to.name}</span>
              <span className="oai-emails__to-email">&lt;{currentEmail.to.email}&gt;</span>
              <div className="oai-emails__nav">
                <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>&lt;</button>
                <span className="oai-emails__nav-count">{currentIndex + 1}/{emailQueue.length}</span>
                <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.min(emailQueue.length - 1, currentIndex + 1))} disabled={currentIndex === emailQueue.length - 1}>&gt;</button>
              </div>
            </div>

            {/* Subject */}
            <div className="oai-emails__subject">{currentEmail.subject}</div>

            {/* Body */}
            <div className="oai-emails__body">
              {currentEmail.body.split('\n').map((line, i) => (
                <p key={i} className="oai-emails__body-line">{line || '\u00A0'}</p>
              ))}
            </div>

            {/* Actions */}
            <div className="oai-emails__actions">
              <button className="oai-emails__delete-btn" onClick={noop}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
              <div className="oai-emails__actions-right">
                <button className="oai-emails__asap-btn" onClick={noop}>{Icons.sparkle} ASAP</button>
                <button className="oai-emails__approve-btn" onClick={noop}>✓ Approve to Send</button>
              </div>
            </div>
          </div>

          {/* Contact sidebar */}
          <div className="oai-emails__contact">
            <div className="oai-emails__contact-header">
              <Avatar initials={currentEmail.to.name.split(' ').map(n => n[0]).join('')} size="medium" />
              <div>
                <div className="oai-emails__contact-name">{currentEmail.to.name}</div>
                <div className="oai-emails__contact-title">{currentEmail.to.title}</div>
                <div className="oai-emails__contact-company">{currentEmail.to.company}</div>
              </div>
            </div>
            <div className="oai-emails__contact-details">
              <div className="oai-emails__contact-row">{Icons.campaigns} {currentEmail.to.email}</div>
              <div className="oai-emails__contact-row">📍 {currentEmail.to.location}</div>
            </div>
            <div className="oai-emails__signals">
              <div className="oai-emails__signals-label">KEY SIGNALS</div>
              {currentEmail.signals.map((signal, i) => (
                <div key={i} className="oai-emails__signal">
                  <button className="oai-emails__signal-header" onClick={() => setExpandedSignal(expandedSignal === i ? -1 : i)}>
                    <span>{signal.label}</span>
                    <span className="oai-emails__signal-chevron">{expandedSignal === i ? '∧' : '∨'}</span>
                  </button>
                  {expandedSignal === i && signal.detail && (
                    <div className="oai-emails__signal-detail">{signal.detail}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="oai-emails__empty">
          <div className="oai-emails__empty-icon">{Icons.campaigns}</div>
          <h3 className="oai-emails__empty-title">No emails {activeEmailTab === 'drafting' ? 'drafting' : activeEmailTab === 'sent' ? 'sent' : activeEmailTab === 'failed' ? 'failed' : 'in queue'}</h3>
          <p className="oai-emails__empty-desc">Emails {activeEmailTab === 'drafting' ? 'being drafted' : activeEmailTab === 'sent' ? 'that have been sent' : activeEmailTab === 'failed' ? 'that failed to send' : 'queued for sending'} will appear here</p>
        </div>
      )}

      {/* Keyboard hint */}
      <div className="oai-emails__keyboard-hint">
        <span>⌘ + Enter to approve</span>
        <span>← → to navigate</span>
        <button className="oai-emails__approve-all" onClick={noop}>✓ Approve all</button>
      </div>
    </div>
  );
};

/* ── People mock data ────────────────────────────────────────────── */
const brandsInList = [
  { brand: 'Arbonne', company: 'Arbonne International, LLC', domain: 'arbonne.com', country: 'United States', state: 'California', city: 'Irvine' },
  { brand: 'The Ordinary', company: 'Deciem Beauty Group Inc.', domain: 'theordinary.com', country: 'Canada', state: 'Ontario', city: 'Toronto' },
  { brand: 'Dr.Althea', company: 'Dr.Althea Co., Ltd.', domain: 'dralthea.com', country: 'South Korea', state: '—', city: 'Seoul' },
  { brand: 'SimplyVital', company: 'SimplyVital Health, Inc.', domain: 'simplyvitalhealth.com', country: 'United States', state: 'Connecticut', city: 'New Haven' },
  { brand: 'Vanicream', company: 'Vanicream, LLC', domain: 'vanicream.com', country: 'United States', state: 'Illinois', city: 'Chicago' },
  { brand: 'OUPEICHARM', company: 'OUPEICHARM', domain: 'oupeicharm.com', country: 'China', state: '—', city: '—' },
];

const peopleData = [
  { name: 'Hannah Weaver', title: 'Senior Vendor Manager, Premium Beauty', company: 'Amazon', location: 'New York, New York', initials: 'HW', match: 'BULLSEYE', tags: ['Category Decision-Maker', 'Amazon Investing in Beauty'] },
  { name: 'David Lee', title: 'Category Leader, Mass Beauty & Groomi...', company: 'Amazon', location: 'Seattle, Washington', initials: 'DL', match: 'BULLSEYE', tags: ['Mass Beauty Category Leader', 'Amazon Vendor Management Experience'] },
  { name: 'Brynn Kemper', title: 'Senior Manager Business Development a...', company: 'Amazon', location: 'Seattle, Washington', initials: 'BK', match: 'BULLSEYE', tags: ['Senior Manager, Premium Beauty', 'Premium Beauty & Luxury Focus'] },
  { name: 'Molly Ayers', title: 'TikTok Shop Category Manager - Beauty', company: 'TikTok', location: 'Seattle, Washington', initials: 'MA', match: 'BULLSEYE', tags: ['Beauty Category Owner', 'Experienced Buyer & Vendor Lead'] },
  { name: 'Asia Jenkins', title: 'Category Manager, Beauty @ TikTok Shop', company: 'TikTok', location: 'New York, New York', initials: 'AJ', match: 'BULLSEYE', tags: ['Category Manager — Decision-Maker', 'Buying/Purchasing Background'] },
  { name: 'Nikki Hardison', title: 'Senior Business Development Manager -...', company: 'Amazon', location: 'New York, New York', initials: 'NH', match: 'BULLSEYE', tags: ['Premium Beauty BD Lead', 'Recent LinkedIn Engagement'] },
  { name: 'Daniela Kretschmar', title: 'Sr. Vendor Manager, Beauty, Skin Care', company: 'Amazon', location: 'Miami, Florida', initials: 'DK', match: 'BULLSEYE', tags: ['Senior Vendor Manager — Mass Beauty', 'Category & Assortment Owner'] },
];

/* ── Page: People / Contacts ─────────────────────────────────────── */
const PeopleContent = () => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTitles, setJobTitles] = useState(['ceo']);
  const [titleInput, setTitleInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const addTitle = () => {
    if (titleInput.trim() && !jobTitles.includes(titleInput.trim().toLowerCase())) {
      setJobTitles([...jobTitles, titleInput.trim().toLowerCase()]);
      setTitleInput('');
    }
  };

  const removeTitle = (t) => setJobTitles(jobTitles.filter((j) => j !== t));

  const toggleSelect = (name) => {
    setSelected((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  const toggleAll = () => {
    selected.length === peopleData.length ? setSelected([]) : setSelected(peopleData.map((p) => p.name));
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Campaigns', href: '#' }, { label: 'People' }]} />

      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>People</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Find the right contact person at the brands you've selected.</p>
      </div>

      {/* Find Decision Makers card */}
      <div className="oai-people__finder">
        <h2 className="oai-people__finder-title">{Icons.contacts} Find Decision Makers</h2>
        <div className="oai-people__finder-input-row">
          <input
            className="oai-people__finder-input"
            type="text"
            placeholder="Enter job title (e.g., CEO, Director of Purchasing)"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTitle()}
          />
        </div>
        <div className="oai-people__finder-tags">
          {jobTitles.map((t) => (
            <span key={t} className="oai-people__finder-tag">
              {t}
              <button className="oai-people__finder-tag-remove" onClick={() => removeTitle(t)}>✕</button>
            </span>
          ))}
        </div>
        <button className="oai-people__finder-search-btn" onClick={() => setHasSearched(true)}>
          Find Contacts for All {brandsInList.length} Brands
        </button>
      </div>

      {/* Brands in This List table */}
      <div className="oai-people__brands">
        <h2 className="oai-people__brands-title">
          Brands in This List
          <span className="oai-people__brands-count">{brandsInList.length}</span>
        </h2>
        <div className="oai-people__brands-table-wrap">
          <table className="oai-people__brands-table">
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Company Name</th>
                <th>Domain</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {brandsInList.map((b) => (
                <tr key={b.brand}>
                  <td className="oai-people__brands-td--bold">{b.brand}</td>
                  <td>{b.company}</td>
                  <td>{b.domain}</td>
                  <td>{b.country}</td>
                  <td>{b.state}</td>
                  <td>{b.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results section — shown after search */}
      {hasSearched && (
        <>
          {/* Results header */}
          <div className="oai-people__header">
            <div className="oai-people__header-left" />
            <div className="oai-people__header-actions">
              <div className="oai-people__stat-box">
                <div className="oai-people__stat-num">{selected.length}</div>
                <div className="oai-people__stat-lbl">SAVED</div>
              </div>
              <div className="oai-people__stat-box">
                <div className="oai-people__stat-num">0</div>
                <div className="oai-people__stat-lbl">EMAILS</div>
              </div>
              <button className="oai-people__find-btn" onClick={noop}>{Icons.contacts} Find More</button>
              <button className="oai-people__export-btn" onClick={noop}>Export ▾</button>
              <button className="oai-people__outbound-btn" onClick={noop}>{Icons.campaigns} Outbound</button>
            </div>
          </div>

          {/* Filters toolbar */}
          <div className="oai-people__toolbar">
            <div className="oai-people__filters">
              <div className="oai-people__search-input">
                <Search placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <button className="oai-people__filter-btn">Company ▾</button>
              <button className="oai-people__filter-btn">Location ▾</button>
              <button className="oai-people__filter-btn">Title ▾</button>
            </div>
            <div className="oai-people__filters-right">
              <button className="oai-people__filter-btn">Sort: Intent ▾</button>
              <label className="oai-people__select-all">
                <input type="checkbox" checked={selected.length === peopleData.length} onChange={toggleAll} />
                Select all
              </label>
            </div>
          </div>

          {/* Date + count */}
          <div className="oai-people__date-row">
            <span className="oai-people__date">Mar 5</span>
            <span className="oai-people__lead-count">{peopleData.length} leads</span>
          </div>

          {/* People list */}
          <div className="oai-people__list">
            {peopleData.map((person) => (
              <div key={person.name} className={`oai-people__row ${selected.includes(person.name) ? 'oai-people__row--selected' : ''}`}>
                <div className="oai-people__row-check">
                  <input type="checkbox" checked={selected.includes(person.name)} onChange={() => toggleSelect(person.name)} />
                </div>
                <div className="oai-people__row-avatar">
                  <Avatar initials={person.initials} size="medium" />
                </div>
                <div className="oai-people__row-info">
                  <div className="oai-people__row-name">{person.name}</div>
                  <div className="oai-people__row-title">{person.title}</div>
                  <div className="oai-people__row-company">{person.company} · {person.location}</div>
                </div>
                <div className="oai-people__row-tags">
                  <Badge label={person.match} variant="success" size="small" />
                  {person.tags.map((tag) => (
                    <span key={tag} className="oai-people__tag">{tag}</span>
                  ))}
                </div>
                <div className="oai-people__row-actions">
                  <button className="oai-people__icon-btn" title="LinkedIn" onClick={noop}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                  </button>
                  <button className="oai-people__icon-btn" title="Email" onClick={noop}>{Icons.campaigns}</button>
                  <button className="oai-people__icon-btn" title="View" onClick={noop}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button className="oai-people__icon-btn" title="Save" onClick={noop}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Selection action bar */}
          {selected.length > 0 && (
            <div className="oai-people__action-bar">
              <span className="oai-people__action-bar-count">
                {selected.length} {selected.length === 1 ? 'lead' : 'leads'} selected
              </span>
              <div className="oai-people__action-bar-btns">
                <button className="oai-people__action-bar-btn oai-people__action-bar-btn--primary" onClick={noop}>
                  <span aria-hidden="true">{Icons.campaigns}</span> Add to Email Queue
                </button>
                <button className="oai-people__action-bar-btn" onClick={noop}>
                  Export CSV
                </button>
                <button className="oai-people__action-bar-btn oai-people__action-bar-btn--danger" onClick={() => setSelected([])}>
                  Deselect All
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ── App with simple path-based routing ──────────────────────────── */
function AppMain() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'landing';
    return path;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.history.pushState({}, '', p === 'landing' ? '/' : `/${p}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'landing';
      setPage(path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleDark = (val) => {
    setDarkMode(val);
    document.documentElement.dataset.theme = val ? 'dark' : '';
  };

  /* ── Marketing pages — full-screen, no app chrome ──────────────── */
  if (page === 'landing') {
    return (
      <LandingPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  if (page === 'product') {
    return (
      <ProductPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  if (page === 'pricing') {
    return (
      <PricingPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  /* ── Auth pages ──────────────────────────────────────────────────── */
  if (page === 'login') {
    return (
      <Login
        onLogin={() => navigate('dashboard')}
        onSignUpClick={() => navigate('signup')}
        onForgotPassword={noop}
      />
    );
  }

  if (page === 'signup') {
    return (
      <SignUp
        onSignUp={() => navigate('dashboard')}
        onLoginClick={() => navigate('login')}
      />
    );
  }

  /* ── Sidebar items ───────────────────────────────────────────────── */
  const sidebarItems = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: () => navigate('dashboard') },
        { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: () => navigate('search-brands') },
        { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: () => navigate('brands') },
        { id: 'people', label: 'People', icon: Icons.contacts, onClick: () => navigate('people') },
        { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: () => navigate('emails') },
        { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: () => navigate('templates') },
        { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: () => navigate('campaigns') },
        { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: () => navigate('analytics') },
      ],
    },
  ];

  if (page === '404') {
    return <NotFound onBackClick={() => navigate('dashboard')} />;
  }

  const renderContent = () => {
    switch (page) {
      case 'dashboard': return <DashboardContent />;
      case 'search-brands': return <SearchBrandsContent onNavigate={navigate} />;
      case 'people': return <PeopleContent />;
      case 'emails': return <EmailsContent />;
      case 'templates': return <TemplatesContent />;
      default: return <NotFound onBackClick={() => navigate('dashboard')} />;
    }
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem={page}
          header={sidebarHeader}
          footer={
            <SidebarFooter
              darkMode={darkMode}
              onToggleDark={toggleDark}
              onProfileClick={() => setSettingsOpen(true)}
              onSettingsClick={() => setSettingsOpen(true)}
            />
          }
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar>
          <Search placeholder="Search brands..." onChange={noop} />
        </Navbar>
      }
    >
      {renderContent()}
      <HelpButton onSubmit={noop} />
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          onLogout={() => { setSettingsOpen(false); navigate('landing'); }}
          onSave={noop}
        />
      )}
    </PageLayout>
  );
}

export default AppMain;

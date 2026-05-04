import { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Select } from './Select';
import { Avatar } from './Avatar';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import { LeadContactCard } from './TokenReveal';
import { DOMAIN_LABELS, PRODUCT_CATEGORIES } from '../services/keepaApi';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search', label: 'Search', icon: Icons.search, onClick: fn() },
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

/* ── Mock data — product-first with AI brand enrichment ─────────── */
const mockResults = [
  {
    title: 'EcoGlow Naturals Vitamin C Brightening Moisturizer with Hyaluronic Acid',
    asin: 'B0CK9X2M1P', brand: 'EcoGlow Naturals', seller: 'EcoGlow Naturals LLC',
    isBrand: true, price: '$24.97', rating: 4.6, reviews: 1243,
    salesRank: 8420, monthlyRevenue: 22223, revenueGrowth: 46, salesRankTrend: -38,
    reviewVelocity: 32, priceStability: 'stable', partnershipScore: 92,
    brandStage: 'sweet-spot', estimatedMonthlySales: 890,
  },
  {
    title: 'SunShield Pro SPF 50 Mineral Sunscreen, Reef-Safe, Lightweight',
    asin: 'B0DJ7M3KN2', brand: 'SunShield Pro', seller: 'SunShield Pro Inc.',
    isBrand: true, price: '$18.49', rating: 4.5, reviews: 876,
    salesRank: 12300, monthlyRevenue: 11834, revenueGrowth: 38, salesRankTrend: -31,
    reviewVelocity: 28, priceStability: 'stable', partnershipScore: 88,
    brandStage: 'sweet-spot', estimatedMonthlySales: 640,
  },
  {
    title: 'PureRadiance Retinol Night Cream Anti-Aging Face Moisturizer',
    asin: 'B0BN4L8FQ3', brand: 'PureRadiance', seller: 'PureRadiance Beauty Co.',
    isBrand: true, price: '$21.99', rating: 4.4, reviews: 2108,
    salesRank: 15600, monthlyRevenue: 11215, revenueGrowth: 29, salesRankTrend: -24,
    reviewVelocity: 18, priceStability: 'stable', partnershipScore: 82,
    brandStage: 'sweet-spot', estimatedMonthlySales: 510,
  },
  {
    title: 'GlowUp Skin Niacinamide Serum 10% + Zinc for Pore Minimizer',
    asin: 'B0CRK8V1N4', brand: 'GlowUp Skin', seller: 'GlowUp Skin Care',
    isBrand: true, price: '$15.99', rating: 4.3, reviews: 645,
    salesRank: 21400, monthlyRevenue: 6076, revenueGrowth: 22, salesRankTrend: -19,
    reviewVelocity: 41, priceStability: 'moderate', partnershipScore: 78,
    brandStage: 'sweet-spot', estimatedMonthlySales: 380,
  },
  {
    title: 'Derma Botanics Collagen Peptide Face Cream with Vitamin E',
    asin: 'B0DM6P2KR5', brand: 'Derma Botanics', seller: 'Derma Botanics Ltd.',
    isBrand: true, price: '$28.50', rating: 4.7, reviews: 3456,
    salesRank: 6800, monthlyRevenue: 29925, revenueGrowth: 18, salesRankTrend: -14,
    reviewVelocity: 12, priceStability: 'stable', partnershipScore: 75,
    brandStage: 'sweet-spot', estimatedMonthlySales: 1050,
  },
  {
    title: 'AquaVeil Hydrating Sunscreen SPF 30 for Sensitive Skin',
    asin: 'B0CJ3N7MP6', brand: 'AquaVeil', seller: 'AquaVeil Skincare',
    isBrand: true, price: '$16.99', rating: 4.5, reviews: 412,
    salesRank: 34200, monthlyRevenue: 4248, revenueGrowth: 55, salesRankTrend: -42,
    reviewVelocity: 52, priceStability: 'stable', partnershipScore: 85,
    brandStage: 'sweet-spot', estimatedMonthlySales: 250,
  },
  {
    title: 'BotaniShield Zinc Oxide Sunscreen SPF 50+ Broad Spectrum',
    asin: 'B0BK2M9LN7', brand: 'BotaniShield', seller: 'BotaniShield Naturals',
    isBrand: true, price: '$22.00', rating: 4.2, reviews: 289,
    salesRank: 42100, monthlyRevenue: 4180, revenueGrowth: 61, salesRankTrend: -48,
    reviewVelocity: 67, priceStability: 'moderate', partnershipScore: 80,
    brandStage: 'sweet-spot', estimatedMonthlySales: 190,
  },
  {
    title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin',
    asin: 'B00TTD9BRC', brand: 'CeraVe', seller: "L'Oreal USA",
    isBrand: false, price: '$18.96', rating: 4.7, reviews: 138412,
    salesRank: 42, monthlyRevenue: 540360, revenueGrowth: 3, salesRankTrend: -2,
    reviewVelocity: 4, priceStability: 'stable', partnershipScore: 25,
    brandStage: 'enterprise', estimatedMonthlySales: 28500,
  },
  {
    title: 'Neutrogena Hydro Boost Gel Moisturizer for Dry Skin',
    asin: 'B00NR1YQHQ', brand: 'Neutrogena', seller: 'DiscountBeautyMart',
    isBrand: false, price: '$19.97', rating: 4.5, reviews: 62300,
    salesRank: 210, monthlyRevenue: 239640, revenueGrowth: 4, salesRankTrend: -1,
    reviewVelocity: 5, priceStability: 'stable', partnershipScore: 22,
    brandStage: 'enterprise', estimatedMonthlySales: 12000,
  },
  {
    title: 'FreshFace Co Aloe Vera Gel Moisturizer, Lightweight Daily Hydrator',
    asin: 'B0DN8K4QM8', brand: 'FreshFace Co', seller: 'FreshFace Co',
    isBrand: true, price: '$12.99', rating: 4.1, reviews: 87,
    salesRank: 78400, monthlyRevenue: 1429, revenueGrowth: 12, salesRankTrend: -8,
    reviewVelocity: 24, priceStability: 'volatile', partnershipScore: 42,
    brandStage: 'early', estimatedMonthlySales: 110,
  },
];

/* ── Mock leads per brand (with hasEmail/hasLinkedin for gated reveal) ── */
const mockLeads = {
  'EcoGlow Naturals': [
    { id: 'l1', name: 'Sarah Chen', role: 'Founder & CEO', hasEmail: true, email: 'sarah@ecoglownaturals.com', hasLinkedin: true, linkedin: 'linkedin.com/in/sarahchen', confidence: 'high' },
    { id: 'l2', name: 'David Park', role: 'Head of Supply Chain', hasEmail: true, email: 'david@ecoglownaturals.com', hasLinkedin: true, linkedin: 'linkedin.com/in/davidpark', confidence: 'high' },
    { id: 'l3', name: 'Lisa Nguyen', role: 'Product Manager', hasEmail: true, email: 'lisa@ecoglownaturals.com', hasLinkedin: false, linkedin: '', confidence: 'medium' },
  ],
  'SunShield Pro': [
    { id: 'l4', name: 'Maria Santos', role: 'Co-Founder', hasEmail: true, email: 'maria@sunshieldpro.com', hasLinkedin: true, linkedin: 'linkedin.com/in/mariasantos', confidence: 'high' },
    { id: 'l5', name: 'James Liu', role: 'Operations Director', hasEmail: true, email: 'james@sunshieldpro.com', hasLinkedin: true, linkedin: 'linkedin.com/in/jamesliu', confidence: 'medium' },
  ],
  'AquaVeil': [
    { id: 'l6', name: 'Priya Sharma', role: 'Founder', hasEmail: true, email: 'priya@aquaveil.com', hasLinkedin: true, linkedin: 'linkedin.com/in/priyasharma', confidence: 'high' },
    { id: 'l7', name: 'Tom Bradley', role: 'VP of Manufacturing', hasEmail: true, email: 'tom@aquaveil.com', hasLinkedin: false, linkedin: '', confidence: 'medium' },
  ],
  'PureRadiance': [
    { id: 'l8', name: 'Kevin Wright', role: 'CEO', hasEmail: true, email: 'kevin@pureradiance.com', hasLinkedin: true, linkedin: 'linkedin.com/in/kevinwright', confidence: 'high' },
    { id: 'l9', name: 'Nina Patel', role: 'Procurement Lead', hasEmail: true, email: 'nina@pureradiance.com', hasLinkedin: true, linkedin: 'linkedin.com/in/ninapatel', confidence: 'high' },
  ],
  'BotaniShield': [
    { id: 'l10', name: 'Rachel Kim', role: 'Founder', hasEmail: true, email: 'rachel@botanishield.com', hasLinkedin: true, linkedin: 'linkedin.com/in/rachelkim', confidence: 'high' },
  ],
  'GlowUp Skin': [
    { id: 'l11', name: 'Alex Rivera', role: 'Co-Founder & COO', hasEmail: true, email: 'alex@glowupskin.com', hasLinkedin: true, linkedin: 'linkedin.com/in/alexrivera', confidence: 'high' },
    { id: 'l12', name: 'Jenny Zhao', role: 'Brand Manager', hasEmail: true, email: 'jenny@glowupskin.com', hasLinkedin: false, linkedin: '', confidence: 'medium' },
  ],
  'Derma Botanics': [
    { id: 'l13', name: 'Emma Liu', role: 'Head of Product', hasEmail: true, email: 'emma@dermabotanics.com', hasLinkedin: true, linkedin: 'linkedin.com/in/emmaliu', confidence: 'high' },
    { id: 'l14', name: 'Carlos Mendez', role: 'Supply Chain Manager', hasEmail: true, email: 'carlos@dermabotanics.com', hasLinkedin: true, linkedin: 'linkedin.com/in/carlosmendez', confidence: 'medium' },
  ],
  'FreshFace Co': [
    { id: 'l15', name: 'Amanda Brooks', role: 'Founder', hasEmail: true, email: 'amanda@freshfaceco.com', hasLinkedin: true, linkedin: 'linkedin.com/in/amandabrooks', confidence: 'medium' },
  ],
  'Neutrogena': [
    { id: 'l16', name: 'Corporate Partnerships', role: 'Johnson & Johnson', hasEmail: true, email: 'partnerships@jnj.com', hasLinkedin: false, linkedin: '', confidence: 'medium' },
  ],
  'CeraVe': [
    { id: 'l17', name: 'Corporate Partnerships', role: 'L\'Oréal Group', hasEmail: true, email: 'partnerships@loreal.com', hasLinkedin: false, linkedin: '', confidence: 'medium' },
  ],
};

/* ── Lead Drawer Component (with progressive reveal) ─────────── */
const LeadDrawer = ({ brand, product, onClose, onAddToContacts }) => {
  const leads = mockLeads[brand] || [];
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(48);

  const toggleLead = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const toggleAllLeads = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((l) => l.id));
    }
  };

  const handleTokenSpend = (cost) => {
    setTokenBalance((prev) => Math.max(0, prev - cost));
  };

  return (
    <>
      <div className="oai-lead-drawer__overlay" onClick={onClose} />
      <aside className="oai-lead-drawer" role="dialog" aria-label={`Leads for ${brand}`}>
        <div className="oai-lead-drawer__header">
          <h2 className="oai-lead-drawer__title">Product Leads</h2>
          <TokenBalancePill balance={tokenBalance} />
          <button className="oai-lead-drawer__close" onClick={onClose} aria-label="Close panel">✕</button>
        </div>

        <div className="oai-lead-drawer__body">
          {/* Brand summary card */}
          <div className="oai-lead-drawer__brand-summary">
            <div className="oai-lead-drawer__brand-info">
              <div className="oai-lead-drawer__brand-name">{brand}</div>
              <div className="oai-lead-drawer__brand-meta">
                Score: {product.partnershipScore} · {product.brandStage === 'sweet-spot' ? 'Sweet Spot' : product.brandStage} · ▲ {product.revenueGrowth}% growth
              </div>
            </div>
            <ScoreBadge score={product.partnershipScore} product={product} />
          </div>

          {/* Contact list */}
          <div className="oai-lead-drawer__section-label">
            Decision Makers ({leads.length})
            {leads.length > 0 && (
              <span style={{ float: 'right', cursor: 'pointer', color: 'var(--color-primary-600)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 'var(--font-weight-normal)' }} onClick={toggleAllLeads}>
                {selectedLeads.length === leads.length ? 'Deselect All' : 'Select All'}
              </span>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="oai-lead-drawer__empty">
              No leads found for this product yet.
            </div>
          ) : (
            leads.map((lead) => (
              <LeadContactCard
                key={lead.id}
                lead={lead}
                tokenBalance={tokenBalance}
                onTokenSpend={handleTokenSpend}
                selected={selectedLeads.includes(lead.id)}
                onSelect={toggleLead}
              />
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="oai-lead-drawer__footer">
          <span className="oai-lead-drawer__selected-count">
            {selectedLeads.length > 0 ? `${selectedLeads.length} selected` : 'Select contacts to add'}
          </span>
          <button
            className="oai-lead-drawer__btn oai-lead-drawer__btn--primary"
            disabled={selectedLeads.length === 0}
            onClick={() => {
              const selectedContacts = leads.filter((l) => selectedLeads.includes(l.id));
              onAddToContacts(selectedContacts);
            }}
          >
            Add to People ({selectedLeads.length})
          </button>
        </div>
      </aside>
    </>
  );
};

/* ── Token balance pill for header ─────────────────────────────── */
const TokenBalancePill = ({ balance }) => (
  <span className="oai-credits-badge">
    <span className="oai-credits-badge__icon">{Icons.credits}</span>
    <span className="oai-credits-badge__count">{balance}</span> tokens
  </span>
);

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

const InfoTooltip = ({ children, wide }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const handleEnter = () => {
    const rect = iconRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setShow(true);
  };

  return (
    <span className="oai-info-tooltip" onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)}>
      <span className="oai-info-tooltip__icon" ref={iconRef} aria-label="More info">ℹ</span>
      {show && createPortal(
        <div className={`oai-info-tooltip__portal ${wide ? 'oai-info-tooltip__portal--wide' : ''}`} style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}>
          {children}
        </div>,
        document.body
      )}
    </span>
  );
};

const ScoreBadge = ({ score, product }) => {
  if (score === null || score === undefined) return null;
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  let variant = 'low';
  if (score >= 80) variant = 'high';
  else if (score >= 60) variant = 'medium';

  if (!product) return <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>;

  const handleEnter = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setShow(true);
  };

  return (
    <span className="oai-info-tooltip" onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)} ref={ref}>
      <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>
      {show && createPortal(
        <div className="oai-info-tooltip__portal oai-info-tooltip__portal--wide" style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}>
          <strong>Score Breakdown</strong>
          <span className="oai-info-tooltip__row">Revenue Growth {product.revenueGrowth > 30 ? '+20' : product.revenueGrowth > 10 ? '+10' : product.revenueGrowth < -10 ? '−15' : '0'}</span>
          <span className="oai-info-tooltip__row">Sales Rank Fit {product.salesRank >= 5000 && product.salesRank <= 50000 ? '+15' : '−10'}</span>
          <span className="oai-info-tooltip__row">Price Stability {product.priceStability === 'stable' ? '+5' : '0'}</span>
          <span className="oai-info-tooltip__row">Review Velocity {product.reviewVelocity > 10 ? '+10' : '0'}</span>
          <span className="oai-info-tooltip__row oai-info-tooltip__row--total">Base 50 → Total {score}</span>
        </div>,
        document.body
      )}
    </span>
  );
};

const StageBadge = ({ stage }) => {
  const labels = { 'sweet-spot': 'Sweet Spot', early: 'Early', established: 'Established', enterprise: 'Enterprise', unknown: '—' };
  const variants = { 'sweet-spot': 'success', early: 'warning', established: 'info', enterprise: 'muted', unknown: 'muted' };
  return <span className={`oai-results__stage oai-results__stage--${variants[stage] || 'muted'}`}>{labels[stage] || stage}</span>;
};

const countryOptions = Object.entries(DOMAIN_LABELS).map(([code, label]) => ({ value: code, label }));
const categoryOptions = Object.keys(PRODUCT_CATEGORIES).map((name) => ({ value: name, label: name }));
const getSubcategoryOptions = (cat) =>
  (PRODUCT_CATEGORIES[cat]?.subcategories || []).map((s) => ({ value: s, label: s }));

/* ── AI Brand Badge ─────────────────────────────────────────────── */
const AIBrandBadge = ({ isBrand }) => (
  <span className={`oai-results__ai-badge oai-results__ai-badge--${isBrand ? 'brand' : 'reseller'}`}>
    {isBrand ? 'Brand \u2713' : 'Reseller'}
  </span>
);

/* ── Main Component ─────────────────────────────────────────────── */
const SearchPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search filters
  const [keyword, setKeyword] = useState('sunscreen');
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Cosmetics & Beauty');
  const [subcategory, setSubcategory] = useState('Sun Protection');
  const [minRating, setMinRating] = useState('3.5');
  const [rankMin, setRankMin] = useState('1000');
  const [rankMax, setRankMax] = useState('50000');
  const [revenueMin, setRevenueMin] = useState('');
  const [revenueMax, setRevenueMax] = useState('');
  const [growthMin, setGrowthMin] = useState('');
  const [growthMax, setGrowthMax] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('partnershipScore');
  const [sortDir, setSortDir] = useState('desc');

  // Lead drawer state
  const [drawerProduct, setDrawerProduct] = useState(null);

  const handleSearch = useCallback(() => {
    setLoading(true);
    setHasSearched(true);
    // Simulate API call — in production, replace with:
    // searchAndAnalyze(keyword, country, { minRating, category })
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1200);
  }, [keyword, country, category, revenueMin, revenueMax, growthMin, growthMax]);

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
          activeItem="search"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar />
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        <div className="oai-search-page__header">
          <h1 className="oai-search-page__title">Find Growing Products</h1>
          <p className="oai-search-page__subtitle">Discover fast-growing Amazon products ready for manufacturing partnerships.</p>
        </div>

        {/* ── Search Card ──────────────────────────────────────── */}
        <div className="oai-search-card">
          <div className="oai-search-card__form-grid oai-search-card__form-grid--4col">
            <div className="oai-search-card__field oai-search-card__field--keyword">
              <label className="oai-search-card__label" htmlFor="search-keyword">Keyword</label>
              <input id="search-keyword" className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. sunscreen, facial cream, serum" />
            </div>
            <div className="oai-search-card__field">
              <Select
                label="Country"
                options={countryOptions}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                id="search-country"
              />
            </div>
            <div className="oai-search-card__field">
              <Select
                label="Category"
                options={categoryOptions}
                value={category}
                onChange={(e) => { setCategory(e.target.value); setSubcategory(''); }}
                id="search-category"
              />
            </div>
            <div className="oai-search-card__field">
              <Select
                label="Sub-Category"
                placeholder="All sub-categories"
                options={getSubcategoryOptions(category)}
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                id="search-subcategory"
              />
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
                <Select
                  label="Min Rating"
                  options={[
                    { value: '', label: 'Any' },
                    { value: '3.0', label: '3.0+' },
                    { value: '3.5', label: '3.5+' },
                    { value: '4.0', label: '4.0+' },
                    { value: '4.5', label: '4.5+' },
                  ]}
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  id="search-min-rating"
                />
              </div>
              <div className="oai-search-card__field">
                <label className="oai-search-card__label">Sales Rank</label>
                <div className="oai-search-card__range-group">
                  <input className="oai-search-card__text-input" type="number" value={rankMin} onChange={(e) => setRankMin(e.target.value)} placeholder="Min" aria-label="Sales rank minimum" />
                  <span className="oai-search-card__range-sep">to</span>
                  <input className="oai-search-card__text-input" type="number" value={rankMax} onChange={(e) => setRankMax(e.target.value)} placeholder="Max" aria-label="Sales rank maximum" />
                </div>
              </div>
              <div className="oai-search-card__field">
                <label className="oai-search-card__label">Monthly Revenue ($)</label>
                <div className="oai-search-card__range-group">
                  <input className="oai-search-card__text-input" type="number" value={revenueMin} onChange={(e) => setRevenueMin(e.target.value)} placeholder="Min" aria-label="Monthly revenue minimum" />
                  <span className="oai-search-card__range-sep">to</span>
                  <input className="oai-search-card__text-input" type="number" value={revenueMax} onChange={(e) => setRevenueMax(e.target.value)} placeholder="Max" aria-label="Monthly revenue maximum" />
                </div>
              </div>
              <div className="oai-search-card__field">
                <label className="oai-search-card__label">Growth Value (%)</label>
                <div className="oai-search-card__range-group">
                  <input className="oai-search-card__text-input" type="number" value={growthMin} onChange={(e) => setGrowthMin(e.target.value)} placeholder="Min" aria-label="Growth value minimum" />
                  <span className="oai-search-card__range-sep">to</span>
                  <input className="oai-search-card__text-input" type="number" value={growthMax} onChange={(e) => setGrowthMax(e.target.value)} placeholder="Max" aria-label="Growth value maximum" />
                </div>
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
                {loading ? 'Searching...' : `${sortedResults.length} Products Found`}
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
                      <th className="oai-results__th oai-results__th--title">Product</th>
                      <th className="oai-results__th">Brand <InfoTooltip wide><strong>AI Seller Analysis</strong><br/>AI analyzes the seller to determine if they are the actual brand owner or a third-party reseller. &quot;Brand &#x2713;&quot; = verified brand seller.</InfoTooltip></th>
                      <SortHeader label="Price" field="price" />
                      <SortHeader label={<>Score <InfoTooltip><strong>Partnership Score (0–100)</strong><br/>Weighted from: revenue growth, sales rank fit, price stability, and review velocity. Higher = better manufacturing partner fit.</InfoTooltip></>} field="partnershipScore" />
                      <SortHeader label="Sales Rank" field="salesRank" />
                      <SortHeader label="Rev. Growth" field="revenueGrowth" />
                      <SortHeader label="Rating" field="rating" />
                      <SortHeader label="Reviews" field="reviews" />
                      <th className="oai-results__th">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.map((product) => (
                      <tr key={product.asin} className={`oai-results__row ${selected.includes(product.asin) ? 'oai-results__row--selected' : ''}`}>
                        <td className="oai-results__td oai-results__td--check">
                          <input type="checkbox" aria-label={`Select ${product.title}`} checked={selected.includes(product.asin)} onChange={() => toggleSelect(product.asin)} />
                        </td>
                        <td className="oai-results__td oai-results__td--title">
                          <div className="oai-results__product-title">{product.title}</div>
                          <div className="oai-results__product-asin">ASIN: {product.asin}</div>
                        </td>
                        <td className="oai-results__td">
                          <div className="oai-results__brand-cell">
                            <span className="oai-results__brand-name">{product.brand}</span>
                            <AIBrandBadge isBrand={product.isBrand} />
                          </div>
                        </td>
                        <td className="oai-results__td">{product.price}</td>
                        <td className="oai-results__td oai-results__td--score">
                          <ScoreBadge score={product.partnershipScore} product={product} />
                        </td>
                        <td className="oai-results__td">{product.salesRank.toLocaleString()}</td>
                        <td className="oai-results__td">
                          <TrendArrow value={product.revenueGrowth} />
                        </td>
                        <td className="oai-results__td">
                          <span className="oai-results__rating">{product.rating}</span>
                        </td>
                        <td className="oai-results__td">{product.reviews.toLocaleString()}</td>
                        <td className="oai-results__td">
                          <button className="oai-results__action-btn" onClick={() => setDrawerProduct(product)} title="View product leads">
                            View Lead →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Selected products panel */}
            {selected.length > 0 && (
              <div className="oai-results__list-section">
                <h3 className="oai-results__list-title">
                  Selected Products
                  <span className="oai-results__list-count">{selected.length}</span>
                </h3>
                <div className="oai-results__list-items">
                  {sortedResults.filter((r) => selected.includes(r.asin)).map((product) => (
                    <div key={product.asin} className="oai-results__list-item">
                      <div className="oai-results__list-item-info">
                        <span className="oai-results__list-item-name">{product.title}</span>
                        <span className="oai-results__list-item-brand">{product.brand} · Score: {product.partnershipScore} · Rev. Growth: +{product.revenueGrowth}%</span>
                      </div>
                      <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)} aria-label={`Remove ${product.title}`}>✕</button>
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

      {/* Lead Drawer */}
      {drawerProduct && (
        <LeadDrawer
          brand={drawerProduct.brand}
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onAddToContacts={(contacts) => {
            // In production, this would add to People page
            setDrawerProduct(null);
          }}
        />
      )}
    </PageLayout>
  );
};

export default {
  title: 'Pages/Search Brands',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  render: () => <SearchPage />,
};

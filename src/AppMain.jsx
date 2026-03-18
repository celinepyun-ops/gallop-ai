import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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
import { TokenBadge, TokenBalance, LeadContactCard } from './stories/TokenReveal';
import './stories/searchpage.css';
import './stories/TokenBadge.css';
const noop = () => {};

/* ── Sidebar footer ──────────────────────────────────────────────── */
const SidebarFooter = ({ darkMode, onToggleDark, onProfileClick, onSettingsClick }) => (
  <ul className="oai-sidebar__list">
    <li>
      <TokenBalance balance={48} />
    </li>
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
        <span className="oai-sidebar__icon"><Avatar initials="MT" size="small" /></span>
        <span className="oai-sidebar__label">Mike Torres</span>
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
  { key: 'brand', label: 'Product' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (val) => <Badge label={val} variant={val === 'Active' ? 'success' : val === 'Pending' ? 'warning' : val === 'Paused' ? 'error' : 'info'} size="small" /> },
  { key: 'sent', label: 'Sent' },
  { key: 'rate', label: 'Response Rate' },
];

const tableData = [
  { brand: 'EcoGlow Naturals', contact: 'Sarah Chen', status: 'Active', sent: 3, rate: '—' },
  { brand: 'SunShield Pro', contact: 'Maria Santos', status: 'Active', sent: 2, rate: '—' },
  { brand: 'AquaVeil', contact: 'Priya Sharma', status: 'Pending', sent: 1, rate: '—' },
  { brand: 'PureRadiance', contact: 'Kevin Wright', status: 'Pending', sent: 0, rate: '—' },
  { brand: 'GlowUp Skin', contact: 'Alex Rivera', status: 'Active', sent: 1, rate: '—' },
  { brand: 'Derma Botanics', contact: 'Emma Liu', status: 'Paused', sent: 0, rate: '—' },
];

/* ── Page: Dashboard ─────────────────────────────────────────────── */
const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('all');
  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]} />
      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Welcome back, Mike. Here's your outreach overview.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon={Icons.campaigns} />
        <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon={Icons.analytics} />
        <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon={Icons.dashboard} />
        <StatsCard title="Products Contacted" value="456" change="-2.1% from last month" trend="down" icon={Icons.brands} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Tabs tabs={[{ id: 'all', label: 'All Products' }, { id: 'active', label: 'Active' }, { id: 'pending', label: 'Pending' }, { id: 'archived', label: 'Archived' }]} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Table columns={tableColumns} data={tableData} sortable striped />
    </div>
  );
};

/* ── Search Results mock data ─────────────────────────────────────── */
const searchResults = [
  { title: 'EcoGlow Naturals Vitamin C Brightening Moisturizer with Hyaluronic Acid', asin: 'B0CK9X2M1P', brand: 'EcoGlow Naturals', seller: 'EcoGlow Naturals LLC', isBrand: true, price: '$24.97', rating: 4.6, reviews: 1243, salesRank: 8420, monthlyRevenue: 22223, revenueGrowth: 46, salesRankTrend: -38, reviewVelocity: 32, priceStability: 'stable', partnershipScore: 92, brandStage: 'sweet-spot', estimatedMonthlySales: 890 },
  { title: 'SunShield Pro SPF 50 Mineral Sunscreen, Reef-Safe, Lightweight', asin: 'B0DJ7M3KN2', brand: 'SunShield Pro', seller: 'SunShield Pro Inc.', isBrand: true, price: '$18.49', rating: 4.5, reviews: 876, salesRank: 12300, monthlyRevenue: 11834, revenueGrowth: 38, salesRankTrend: -31, reviewVelocity: 28, priceStability: 'stable', partnershipScore: 88, brandStage: 'sweet-spot', estimatedMonthlySales: 640 },
  { title: 'PureRadiance Retinol Night Cream Anti-Aging Face Moisturizer', asin: 'B0BN4L8FQ3', brand: 'PureRadiance', seller: 'PureRadiance Beauty Co.', isBrand: true, price: '$21.99', rating: 4.4, reviews: 2108, salesRank: 15600, monthlyRevenue: 11215, revenueGrowth: 29, salesRankTrend: -24, reviewVelocity: 18, priceStability: 'stable', partnershipScore: 82, brandStage: 'sweet-spot', estimatedMonthlySales: 510 },
  { title: 'GlowUp Skin Niacinamide Serum 10% + Zinc for Pore Minimizer', asin: 'B0CRK8V1N4', brand: 'GlowUp Skin', seller: 'GlowUp Skin Care', isBrand: true, price: '$15.99', rating: 4.3, reviews: 645, salesRank: 21400, monthlyRevenue: 6076, revenueGrowth: 22, salesRankTrend: -19, reviewVelocity: 41, priceStability: 'moderate', partnershipScore: 78, brandStage: 'sweet-spot', estimatedMonthlySales: 380 },
  { title: 'Derma Botanics Collagen Peptide Face Cream with Vitamin E', asin: 'B0DM6P2KR5', brand: 'Derma Botanics', seller: 'Derma Botanics Ltd.', isBrand: true, price: '$28.50', rating: 4.7, reviews: 3456, salesRank: 6800, monthlyRevenue: 29925, revenueGrowth: 18, salesRankTrend: -14, reviewVelocity: 12, priceStability: 'stable', partnershipScore: 75, brandStage: 'sweet-spot', estimatedMonthlySales: 1050 },
  { title: 'AquaVeil Hydrating Sunscreen SPF 30 for Sensitive Skin', asin: 'B0CJ3N7MP6', brand: 'AquaVeil', seller: 'AquaVeil Skincare', isBrand: true, price: '$16.99', rating: 4.5, reviews: 412, salesRank: 34200, monthlyRevenue: 4248, revenueGrowth: 55, salesRankTrend: -42, reviewVelocity: 52, priceStability: 'stable', partnershipScore: 85, brandStage: 'sweet-spot', estimatedMonthlySales: 250 },
  { title: 'BotaniShield Zinc Oxide Sunscreen SPF 50+ Broad Spectrum', asin: 'B0BK2M9LN7', brand: 'BotaniShield', seller: 'BotaniShield Naturals', isBrand: true, price: '$22.00', rating: 4.2, reviews: 289, salesRank: 42100, monthlyRevenue: 4180, revenueGrowth: 61, salesRankTrend: -48, reviewVelocity: 67, priceStability: 'moderate', partnershipScore: 80, brandStage: 'sweet-spot', estimatedMonthlySales: 190 },
  { title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin', asin: 'B00TTD9BRC', brand: 'CeraVe', seller: "L'Oreal USA", isBrand: false, price: '$18.96', rating: 4.7, reviews: 138412, salesRank: 42, monthlyRevenue: 540360, revenueGrowth: 3, salesRankTrend: -2, reviewVelocity: 4, priceStability: 'stable', partnershipScore: 25, brandStage: 'enterprise', estimatedMonthlySales: 28500 },
  { title: 'Neutrogena Hydro Boost Gel Moisturizer for Dry Skin', asin: 'B00NR1YQHQ', brand: 'Neutrogena', seller: 'DiscountBeautyMart', isBrand: false, price: '$19.97', rating: 4.5, reviews: 62300, salesRank: 210, monthlyRevenue: 239640, revenueGrowth: 4, salesRankTrend: -1, reviewVelocity: 5, priceStability: 'stable', partnershipScore: 22, brandStage: 'enterprise', estimatedMonthlySales: 12000 },
  { title: 'FreshFace Co Aloe Vera Gel Moisturizer, Lightweight Daily Hydrator', asin: 'B0DN8K4QM8', brand: 'FreshFace Co', seller: 'FreshFace Co', isBrand: true, price: '$12.99', rating: 4.1, reviews: 87, salesRank: 78400, monthlyRevenue: 1429, revenueGrowth: 12, salesRankTrend: -8, reviewVelocity: 24, priceStability: 'volatile', partnershipScore: 42, brandStage: 'early', estimatedMonthlySales: 110 },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const TrendArrow = ({ value, suffix = '%' }) => {
  if (value === null || value === undefined) return <span className="oai-results__trend oai-results__trend--neutral">—</span>;
  const isPositive = value > 0;
  return <span className={`oai-results__trend oai-results__trend--${isPositive ? 'up' : 'down'}`}>{isPositive ? '▲' : '▼'} {Math.abs(value)}{suffix}</span>;
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

const countryOptions = [
  { value: 'US', label: '🇺🇸 United States' }, { value: 'UK', label: '🇬🇧 United Kingdom' },
  { value: 'DE', label: '🇩🇪 Germany' }, { value: 'JP', label: '🇯🇵 Japan' },
  { value: 'CA', label: '🇨🇦 Canada' }, { value: 'FR', label: '🇫🇷 France' },
];
const appCategories = {
  'Cosmetics & Beauty': ['Sun Protection', 'Skin Care', 'Hair Care', 'Makeup', 'Beauty Tools', 'Fragrance', 'Nail Care', 'Body Lotions'],
  'Electronics': ['Smart Home', 'Audio & Headphones', 'Phone Accessories', 'Wearables', 'Cameras', 'Computer Accessories', 'Portable Chargers'],
  'Supplements & Health': ['Vitamins', 'Protein & Fitness', 'Probiotics', 'Herbal Supplements', 'Collagen', 'Sleep & Relaxation', 'Immune Support'],
  'Home & Kitchen': ['Kitchen Gadgets', 'Home Organization', 'Bedding', 'Cleaning Supplies', 'Candles & Fragrances', 'Small Appliances'],
  'Sports & Outdoors': ['Fitness Equipment', 'Yoga & Pilates', 'Camping & Hiking', 'Water Sports', 'Cycling', 'Running'],
  'Baby & Kids': ['Baby Care', 'Feeding', 'Toys & Games', 'Kids Clothing', 'Safety', 'Nursery'],
  'Pet Supplies': ['Dog Supplies', 'Cat Supplies', 'Pet Grooming', 'Pet Health', 'Fish & Aquarium', 'Pet Toys'],
};
const categoryOptions = Object.keys(appCategories).map((n) => ({ value: n, label: n }));
const getSubcategoryOptions = (cat) => (appCategories[cat] || []).map((s) => ({ value: s, label: s }));

/* ── Mock leads per product (token-gated contact reveal) ────────── */
const mockLeads = {
  'EcoGlow Naturals': [
    { id: 'l1', name: 'Sarah Chen', role: 'Founder & CEO', email: 'sarah@ecoglownaturals.com', linkedin: 'linkedin.com/in/sarahchen', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l2', name: 'David Park', role: 'Head of Supply Chain', email: 'david@ecoglownaturals.com', linkedin: 'linkedin.com/in/davidpark', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l3', name: 'Lisa Nguyen', role: 'Product Manager', email: 'lisa@ecoglownaturals.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'SunShield Pro': [
    { id: 'l4', name: 'Maria Santos', role: 'Co-Founder', email: 'maria@sunshieldpro.com', linkedin: 'linkedin.com/in/mariasantos', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l5', name: 'James Liu', role: 'Operations Director', email: 'james@sunshieldpro.com', linkedin: 'linkedin.com/in/jamesliu', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'AquaVeil': [
    { id: 'l6', name: 'Priya Sharma', role: 'Founder', email: 'priya@aquaveil.com', linkedin: 'linkedin.com/in/priyasharma', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l7', name: 'Tom Bradley', role: 'VP of Manufacturing', email: 'tom@aquaveil.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'PureRadiance': [
    { id: 'l8', name: 'Kevin Wright', role: 'CEO', email: 'kevin@pureradiance.com', linkedin: 'linkedin.com/in/kevinwright', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l9', name: 'Nina Patel', role: 'Procurement Lead', email: 'nina@pureradiance.com', linkedin: 'linkedin.com/in/ninapatel', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
  ],
  'BotaniShield': [
    { id: 'l10', name: 'Rachel Kim', role: 'Founder', email: 'rachel@botanishield.com', linkedin: 'linkedin.com/in/rachelkim', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
  ],
  'GlowUp Skin': [
    { id: 'l11', name: 'Alex Rivera', role: 'Co-Founder & COO', email: 'alex@glowupskin.com', linkedin: 'linkedin.com/in/alexrivera', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l12', name: 'Jenny Zhao', role: 'Brand Manager', email: 'jenny@glowupskin.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'Derma Botanics': [
    { id: 'l13', name: 'Emma Liu', role: 'Head of Product', email: 'emma@dermabotanics.com', linkedin: 'linkedin.com/in/emmaliu', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l14', name: 'Carlos Mendez', role: 'Supply Chain Manager', email: 'carlos@dermabotanics.com', linkedin: 'linkedin.com/in/carlosmendez', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'FreshFace Co': [
    { id: 'l15', name: 'Amanda Brooks', role: 'Founder', email: 'amanda@freshfaceco.com', linkedin: 'linkedin.com/in/amandabrooks', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'Neutrogena': [
    { id: 'l16', name: 'Corporate Partnerships', role: 'Johnson & Johnson', email: 'partnerships@jnj.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'CeraVe': [
    { id: 'l17', name: 'Corporate Partnerships', role: "L'Oréal Group", email: 'partnerships@loreal.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
};

const LeadDrawer = ({ brand, product, onClose, onAddToContacts, tokenBalance: externalBalance, onTokenSpend: externalTokenSpend }) => {
  const leads = mockLeads[brand] || [];
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [localTokenBalance, setLocalTokenBalance] = useState(externalBalance ?? 48);
  const toggleLead = (id) => setSelectedLeads((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);
  const toggleAllLeads = () => setSelectedLeads(selectedLeads.length === leads.length ? [] : leads.map((l) => l.id));

  const handleTokenSpend = (cost, field, leadId) => {
    setLocalTokenBalance((prev) => Math.max(0, prev - cost));
    externalTokenSpend?.(cost, field, leadId);
  };

  return (
    <>
      <div className="oai-lead-drawer__overlay" onClick={onClose} />
      <aside className="oai-lead-drawer" role="dialog" aria-label={`Leads for ${brand}`}>
        <div className="oai-lead-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <h2 className="oai-lead-drawer__title">Product Leads</h2>
            <TokenBadge cost={localTokenBalance} variant={localTokenBalance < 10 ? 'balance-low' : 'balance'} />
          </div>
          <button className="oai-lead-drawer__close" onClick={onClose} aria-label="Close panel">✕</button>
        </div>
        <div className="oai-lead-drawer__body">
          <div className="oai-lead-drawer__brand-summary">
            <div className="oai-lead-drawer__brand-info">
              <div className="oai-lead-drawer__brand-name">{brand}</div>
              <div className="oai-lead-drawer__brand-meta">
                Score: {product.partnershipScore} · {product.brandStage === 'sweet-spot' ? 'Sweet Spot' : product.brandStage} · ▲ {product.revenueGrowth}% growth
              </div>
            </div>
            <ScoreBadge score={product.partnershipScore} product={product} />
          </div>
          <div className="oai-lead-drawer__section-label">
            Decision Makers ({leads.length})
            {leads.length > 0 && (
              <span style={{ float: 'right', cursor: 'pointer', color: 'var(--color-primary-600)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 'var(--font-weight-normal)' }} onClick={toggleAllLeads}>
                {selectedLeads.length === leads.length ? 'Deselect All' : 'Select All'}
              </span>
            )}
          </div>
          {leads.length === 0 ? (
            <div className="oai-lead-drawer__empty">No leads found for this product yet.</div>
          ) : (
            leads.map((lead) => (
              <LeadContactCard
                key={lead.id}
                lead={lead}
                tokenBalance={localTokenBalance}
                onTokenSpend={handleTokenSpend}
                selected={selectedLeads.includes(lead.id)}
                onSelect={toggleLead}
              />
            ))
          )}
        </div>
        <div className="oai-lead-drawer__footer">
          <span className="oai-lead-drawer__selected-count">{selectedLeads.length > 0 ? `${selectedLeads.length} selected` : 'Select contacts to add'}</span>
          <button className="oai-lead-drawer__btn oai-lead-drawer__btn--primary" disabled={selectedLeads.length === 0} onClick={() => { onAddToContacts(leads.filter((l) => selectedLeads.includes(l.id))); }}>
            Add to People ({selectedLeads.length})
          </button>
        </div>
      </aside>
    </>
  );
};

/* ── AI Brand Badge (stays as "Brand" — this is AI seller analysis) ── */
const AIBrandBadge = ({ isBrand }) => (
  <span className={`oai-results__ai-badge oai-results__ai-badge--${isBrand ? 'brand' : 'reseller'}`}>
    {isBrand ? 'Brand \u2713' : 'Reseller'}
  </span>
);

/* ── Page: Search ───────────────────────────────────────────────── */
const SearchContent = ({ onNavigate }) => {
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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('partnershipScore');
  const [sortDir, setSortDir] = useState('desc');
  const [drawerProduct, setDrawerProduct] = useState(null);

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
        <h1 className="oai-search-page__title">Search Products</h1>
        <p className="oai-search-page__subtitle">Discover growing Amazon products and identify real brands ready for manufacturing partnerships.</p>
      </div>

      <div className="oai-search-card">
        <div className="oai-search-card__form-grid oai-search-card__form-grid--4col">
          <div className="oai-search-card__field oai-search-card__field--keyword">
            <label className="oai-search-card__label" htmlFor="search-keyword">Keyword</label>
            <input id="search-keyword" className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. sunscreen, facial cream, serum" />
          </div>
          <div className="oai-search-card__field">
            <Select label="Country" options={countryOptions} value={country} onChange={(e) => setCountry(e.target.value)} id="search-country" />
          </div>
          <div className="oai-search-card__field">
            <Select label="Category" options={categoryOptions} value={category} onChange={(e) => { setCategory(e.target.value); setSubcategory(''); }} id="search-category" />
          </div>
          <div className="oai-search-card__field">
            <Select label="Sub-Category" placeholder="All sub-categories" options={getSubcategoryOptions(category)} value={subcategory} onChange={(e) => setSubcategory(e.target.value)} id="search-subcategory" />
          </div>
        </div>

        <button className="oai-search-card__advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)} type="button">
          {showAdvanced ? '▾ Hide' : '▸ Show'} Advanced Filters
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
            <h2 className="oai-results__title">{loading ? 'Searching...' : `${sortedResults.length} Products Found`}</h2>
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
                    <th className="oai-results__th oai-results__th--title">Product</th>
                    <th className="oai-results__th">Brand <InfoTooltip wide><strong>AI Seller Analysis</strong><br/>AI analyzes the seller to determine if they are the actual brand owner or a third-party reseller.</InfoTooltip></th>
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
                      <td className="oai-results__td oai-results__td--score"><ScoreBadge score={product.partnershipScore} product={product} /></td>
                      <td className="oai-results__td">{product.salesRank.toLocaleString()}</td>
                      <td className="oai-results__td"><TrendArrow value={product.revenueGrowth} /></td>
                      <td className="oai-results__td"><span className="oai-results__rating">{product.rating}</span></td>
                      <td className="oai-results__td">{product.reviews.toLocaleString()}</td>
                      <td className="oai-results__td">
                        <button className="oai-results__action-btn" onClick={() => setDrawerProduct(product)} title="View product leads">View Lead →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selected.length > 0 && (
            <div className="oai-results__list-section">
              <h3 className="oai-results__list-title">Selected Products <span className="oai-results__list-count">{selected.length}</span></h3>
              <div className="oai-results__list-items">
                {sortedResults.filter((r) => selected.includes(r.asin)).map((product) => (
                  <div key={product.asin} className="oai-results__list-item">
                    <div className="oai-results__list-item-info">
                      <span className="oai-results__list-item-name">{product.title}</span>
                      <span className="oai-results__list-item-brand">{product.brand} · Score: {product.partnershipScore} · Rev. Growth: +{product.revenueGrowth}%</span>
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

      {drawerProduct && (
        <LeadDrawer
          brand={drawerProduct.brand}
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onAddToContacts={(contacts) => {
            setDrawerProduct(null);
            onNavigate?.('people');
          }}
        />
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
    subject: 'Manufacturing partnership for EcoGlow Naturals',
    body: `Hey Sarah,\n\nI noticed EcoGlow Naturals' Vitamin C Brightening Moisturizer has seen 46% revenue growth this quarter on Amazon — that's incredible traction in the clean beauty category.\n\nI'm Mike Torres at Pacific Beauty Labs. We're a contract manufacturer specializing in sunscreen and skincare formulations, and we've helped brands at your growth stage scale production without compromising quality.\n\nGiven how fast EcoGlow is growing, I imagine keeping up with demand and maintaining your formulation standards is becoming a bigger challenge. We could help you:\n\n• Scale production 3-5x with FDA-compliant facilities\n• Reduce per-unit cost by 15-20% at your current volume\n• Launch new SKUs faster with our R&D team\n\nWould you be open to a 15-minute call this week to explore if there's a fit?\n\nBest,\n\nMike Torres\nBusiness Development Manager\nPacific Beauty Labs`,
    signals: [
      { label: 'Head of Partnerships — Decision-Maker', expandable: true },
      { label: 'Revenue Growth +46% (90-day)', expandable: true, detail: 'EcoGlow Naturals\' Vitamin C Moisturizer has seen 46% revenue growth over 90 days based on Amazon sales rank trend, indicating rapidly scaling demand that may exceed current manufacturing capacity.' },
      { label: 'Recent Hire — Mar 2025', expandable: true, detail: 'Sarah started as Head of Partnerships in March 2025. She is building new vendor relationships and likely evaluating manufacturing partners.' },
      { label: 'Supply Signal — Frequently Out of Stock', expandable: true, detail: 'Keepa data shows this product has had 3 out-of-stock events in the last 60 days, suggesting demand is outpacing current supply — strong indicator they need manufacturing help.' },
    ],
  },
  {
    id: 2,
    to: { name: 'Priya Sharma', email: 'priya@aquaveil.com', title: 'Head of Supply Chain, AquaVeil', company: 'AquaVeil', location: 'New York, NY, United States' },
    subject: 'Scaling production for AquaVeil\'s growth',
    body: `Hey Priya,\n\nI came across AquaVeil's SPF 30 Hydrating Sunscreen — 55% revenue growth and a 52% increase in review velocity is seriously impressive for a brand at your stage.\n\nI'm Mike Torres at Pacific Beauty Labs. We manufacture sunscreen and skincare for growing DTC brands, and we specialize in reef-safe mineral formulations exactly like yours.\n\nI noticed AquaVeil has had some inventory challenges recently. We could help stabilize your supply chain while scaling:\n\n• Mineral sunscreen expertise (zinc oxide, titanium dioxide)\n• MOQ flexibility for brands doing 250-1,000 units/month\n• 4-week lead times vs. the industry standard 8-12 weeks\n\nWorth a quick chat?\n\nBest,\n\nMike Torres\nBusiness Development Manager\nPacific Beauty Labs`,
    signals: [
      { label: 'Head of Supply Chain — Direct Authority', expandable: true },
      { label: 'Revenue Growth +55% (90-day)', expandable: true, detail: 'AquaVeil\'s sunscreen has 55% revenue growth with rapidly accelerating review velocity (+52%), indicating viral growth that will stress current supply chain.' },
      { label: 'Actively Hiring — Scaling Operations', expandable: true, detail: 'LinkedIn shows AquaVeil is hiring for operations roles, confirming they are scaling and likely need manufacturing support.' },
    ],
  },
];

/* ── Page: Emails ────────────────────────────────────────────────── */
const EmailsContent = () => {
  const [activeEmailTab, setActiveEmailTab] = useState('review');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSignal, setExpandedSignal] = useState(1);
  const [reviewQueue, setReviewQueue] = useState([...emailQueue]);
  const [approvedCount, setApprovedCount] = useState(0);

  const handleApprove = () => {
    const remaining = reviewQueue.filter((_, i) => i !== currentIndex);
    setApprovedCount((c) => c + 1);
    setReviewQueue(remaining);
    if (currentIndex >= remaining.length) setCurrentIndex(Math.max(0, remaining.length - 1));
  };

  const handleDelete = () => {
    const remaining = reviewQueue.filter((_, i) => i !== currentIndex);
    setReviewQueue(remaining);
    if (currentIndex >= remaining.length) setCurrentIndex(Math.max(0, remaining.length - 1));
  };

  const handleApproveAll = () => {
    setApprovedCount((c) => c + reviewQueue.length);
    setReviewQueue([]);
    setCurrentIndex(0);
  };

  const emailTabs = [
    { id: 'review', label: 'For Review', count: reviewQueue.length },
    { id: 'queue', label: 'Queue', count: approvedCount },
    { id: 'drafting', label: 'Drafting', count: 0 },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'failed', label: 'Failed', count: 0 },
  ];

  const currentEmail = reviewQueue[currentIndex];

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
          <span className="oai-emails__count">{approvedCount} / 35 today</span>
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
                <span className="oai-emails__nav-count">{currentIndex + 1}/{reviewQueue.length}</span>
                <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.min(reviewQueue.length - 1, currentIndex + 1))} disabled={currentIndex === reviewQueue.length - 1}>&gt;</button>
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
              <button className="oai-emails__delete-btn" onClick={handleDelete} aria-label="Delete email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
              <div className="oai-emails__actions-right">
                <button className="oai-emails__asap-btn" onClick={handleApprove}>{Icons.sparkle} ASAP</button>
                <button className="oai-emails__approve-btn" onClick={handleApprove}>✓ Approve to Send</button>
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
        <button className="oai-emails__approve-all" onClick={handleApproveAll}>✓ Approve all</button>
      </div>
    </div>
  );
};

/* ── People mock data ────────────────────────────────────────────── */
const brandsInList = [
  { brand: 'EcoGlow Naturals', company: 'EcoGlow Inc.', domain: 'ecoglownaturals.com', state: 'CA', city: 'San Francisco', growth: '+46%' },
  { brand: 'SunShield Pro', company: 'SunShield Beauty LLC', domain: 'sunshieldpro.com', state: 'FL', city: 'Miami', growth: '+38%' },
  { brand: 'AquaVeil', company: 'AquaVeil Skincare Inc.', domain: 'aquaveil.com', state: 'NY', city: 'New York', growth: '+55%' },
];

const peopleData = [
  { name: 'Sarah Chen', title: 'Head of Partnerships', company: 'EcoGlow Naturals', location: 'San Francisco, CA', initials: 'SC', match: 'BULLSEYE', tags: ['Decision-Maker', 'Recent Hire — Mar 2025'] },
  { name: 'Jason Park', title: 'VP Operations', company: 'EcoGlow Naturals', location: 'San Francisco, CA', initials: 'JP', match: 'BULLSEYE', tags: ['Operations Leader', 'Supply Chain Authority'] },
  { name: 'Maria Santos', title: 'Director of Product Development', company: 'SunShield Pro', location: 'Miami, FL', initials: 'MS', match: 'BULLSEYE', tags: ['Product Development Lead', 'Formulation Expert'] },
  { name: 'Kevin Wright', title: 'CEO & Founder', company: 'SunShield Pro', location: 'Miami, FL', initials: 'KW', match: 'BULLSEYE', tags: ['Founder', 'Final Decision-Maker'] },
  { name: 'Priya Sharma', title: 'Head of Supply Chain', company: 'AquaVeil', location: 'New York, NY', initials: 'PS', match: 'BULLSEYE', tags: ['Supply Chain Lead', 'Actively Hiring'] },
  { name: 'Alex Rivera', title: 'Brand Manager', company: 'AquaVeil', location: 'New York, NY', initials: 'AR', match: 'BULLSEYE', tags: ['Brand Strategy', 'Amazon Growth Focus'] },
  { name: 'Emma Liu', title: 'COO', company: 'AquaVeil', location: 'New York, NY', initials: 'EL', match: 'BULLSEYE', tags: ['C-Suite', 'Operations Authority'] },
];

/* ── Page: People / Contacts ─────────────────────────────────────── */
const peopleSuggestedRoles = [
  { label: 'CEO / Founder', category: 'Leadership' },
  { label: 'COO', category: 'Leadership' },
  { label: 'VP of Operations', category: 'Leadership' },
  { label: 'Head of Partnerships', category: 'Partnerships' },
  { label: 'Director of Business Development', category: 'Partnerships' },
  { label: 'Vendor Manager', category: 'Partnerships' },
  { label: 'Head of Supply Chain', category: 'Operations' },
  { label: 'Director of Purchasing', category: 'Operations' },
  { label: 'Procurement Manager', category: 'Operations' },
  { label: 'Category Manager', category: 'Operations' },
  { label: 'Director of Product Development', category: 'Product' },
  { label: 'Brand Manager', category: 'Product' },
  { label: 'Product Manager', category: 'Product' },
  { label: 'Head of Marketing', category: 'Marketing' },
  { label: 'Buyer', category: 'Retail' },
  { label: 'Retail Account Manager', category: 'Retail' },
];

const PeopleContent = ({ onNavigate }) => {
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTitles, setJobTitles] = useState(['ceo']);
  const [titleInput, setTitleInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const inputWrapRef = useRef(null);

  const filteredSuggestions = peopleSuggestedRoles.filter(
    (r) => !jobTitles.includes(r.label.toLowerCase()) && (titleInput === '' || r.label.toLowerCase().includes(titleInput.toLowerCase()))
  );
  const groupedSuggestions = filteredSuggestions.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  const addTitle = (label) => {
    const val = (label || titleInput).trim().toLowerCase();
    if (val && !jobTitles.includes(val)) {
      setJobTitles([...jobTitles, val]);
    }
    setTitleInput('');
    setShowSuggestions(false);
    setFocusedSuggestion(-1);
  };

  const removeTitle = (t) => setJobTitles(jobTitles.filter((j) => j !== t));

  useEffect(() => {
    const handleClick = (e) => {
      if (inputWrapRef.current && !inputWrapRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Find the right contact person at the products you've selected.</p>
      </div>

      {/* Find Decision Makers card */}
      <div className="oai-people__finder">
        <h2 className="oai-people__finder-title">{Icons.contacts} Find Decision Makers</h2>
        <div className="oai-people__finder-input-row">
          <div className="oai-people__finder-input-wrap" ref={inputWrapRef}>
            <input
              className="oai-people__finder-input"
              type="text"
              placeholder="Type a job title or select from suggestions..."
              aria-label="Job title filter"
              aria-autocomplete="list"
              value={titleInput}
              onChange={(e) => { setTitleInput(e.target.value); setShowSuggestions(true); setFocusedSuggestion(-1); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (focusedSuggestion >= 0 && filteredSuggestions[focusedSuggestion]) {
                    addTitle(filteredSuggestions[focusedSuggestion].label);
                  } else {
                    addTitle();
                  }
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setShowSuggestions(true);
                  setFocusedSuggestion((i) => (i + 1) % filteredSuggestions.length);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setFocusedSuggestion((i) => (i - 1 + filteredSuggestions.length) % filteredSuggestions.length);
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="oai-people__autocomplete" role="listbox">
                {Object.entries(groupedSuggestions).map(([cat, roles]) => (
                  <li key={cat} role="presentation">
                    <div className="oai-people__autocomplete-section">{cat}</div>
                    {roles.map((r) => {
                      const idx = filteredSuggestions.indexOf(r);
                      return (
                        <div
                          key={r.label}
                          className={`oai-people__autocomplete-item ${idx === focusedSuggestion ? 'oai-people__autocomplete-item--focused' : ''}`}
                          role="option"
                          aria-selected={idx === focusedSuggestion}
                          onClick={() => addTitle(r.label)}
                          onMouseEnter={() => setFocusedSuggestion(idx)}
                        >
                          {r.label}
                        </div>
                      );
                    })}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          Find Contacts for All {brandsInList.length} Products
        </button>
      </div>

      {/* Products in This List table */}
      <div className="oai-people__brands">
        <h2 className="oai-people__brands-title">
          Products in This List
          <span className="oai-people__brands-count">{brandsInList.length}</span>
        </h2>
        <div className="oai-people__brands-table-wrap">
          <table className="oai-people__brands-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Company Name</th>
                <th>Domain</th>
                <th>Location</th>
                <th>Rev. Growth</th>
              </tr>
            </thead>
            <tbody>
              {brandsInList.map((b) => (
                <tr key={b.brand}>
                  <td className="oai-people__brands-td--bold">{b.brand}</td>
                  <td>{b.company}</td>
                  <td>{b.domain}</td>
                  <td>{b.city}, {b.state}</td>
                  <td><span className="oai-results__trend oai-results__trend--up">{b.growth}</span></td>
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
            <button className="oai-people__outbound-btn" onClick={() => onNavigate?.('emails')}>{Icons.campaigns} Outbound</button>
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
                <button className="oai-people__action-bar-btn oai-people__action-bar-btn--primary" onClick={() => onNavigate?.('emails')}>
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
        { id: 'search', label: 'Search', icon: Icons.search, onClick: () => navigate('search') },
        { id: 'people', label: 'People', icon: Icons.contacts, onClick: () => navigate('people') },
        { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: () => navigate('emails') },
        { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: () => navigate('templates') },
      ],
    },
  ];

  if (page === '404') {
    return <NotFound onBackClick={() => navigate('dashboard')} />;
  }

  const renderContent = () => {
    switch (page) {
      case 'dashboard': return <DashboardContent />;
      case 'search': return <SearchContent onNavigate={navigate} />;
      case 'people': return <PeopleContent onNavigate={navigate} />;
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
          <Search placeholder="Search products..." onChange={noop} />
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

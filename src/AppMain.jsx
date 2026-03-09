import { useState, useEffect } from 'react';
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
import { Icons } from './stories/icons';
import './stories/searchpage.css';

const MARKETING_URL = 'http://localhost:5173';
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
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
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

/* ── Page: Search Brands ─────────────────────────────────────────── */
const SearchBrandsContent = () => (
  <div style={{ maxWidth: '1100px' }}>
    <div className="oai-search-page__header">
      <h1 className="oai-search-page__title">Search Amazon Brands</h1>
      <p className="oai-search-page__subtitle">Find top-selling and fast-growing brands to target for outreach.</p>
    </div>
    <div className="oai-search-card">
      <div className="oai-search-card__row">
        <div className="oai-search-card__input-wrapper">
          <span className="oai-search-card__input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input className="oai-search-card__input" type="text" placeholder="Enter a keyword (ex. sunscreen, serum, vitamins)..." aria-label="Search keywords" />
        </div>
        <Button variant="primary" size="large" label="Search" onClick={noop} />
      </div>
      <div className="oai-search-card__feature">
        <div className="oai-search-card__feature-content">
          <div className="oai-search-card__feature-title">{Icons.sparkle} AI-Powered Recommendations <Badge label="PRD Feature" variant="info" size="small" /></div>
          <div className="oai-search-card__feature-desc">Let AI analyze 50 brands and recommend the top 20 most likely to need your services (uses your company profile)</div>
        </div>
        <label className="oai-search-card__feature-toggle"><input type="checkbox" /> Disabled</label>
      </div>
      <div className="oai-search-card__field">
        <Select label="Search Provider" options={[{ value: 'auto', label: 'Auto (Default)' }, { value: 'us', label: 'Amazon US' }, { value: 'uk', label: 'Amazon UK' }, { value: 'de', label: 'Amazon DE' }, { value: 'jp', label: 'Amazon JP' }]} value="auto" onChange={noop} />
      </div>
      <div className="oai-search-card__filters">
        <div className="oai-search-card__field">
          <Select label="Category (Filter Results)" options={[{ value: 'all', label: 'All Categories' }, { value: 'beauty', label: 'Beauty & Personal Care' }, { value: 'health', label: 'Health & Household' }, { value: 'home', label: 'Home & Kitchen' }, { value: 'sports', label: 'Sports & Outdoors' }, { value: 'electronics', label: 'Electronics' }, { value: 'grocery', label: 'Grocery & Gourmet Food' }]} value="all" onChange={noop} />
        </div>
        <div className="oai-search-card__field">
          <Select label="Min Rating (Filter Results)" options={[{ value: 'any', label: 'Any Rating' }, { value: '4.5', label: '4.5+ Stars' }, { value: '4.0', label: '4.0+ Stars' }, { value: '3.5', label: '3.5+ Stars' }, { value: '3.0', label: '3.0+ Stars' }]} value="any" onChange={noop} />
        </div>
      </div>
    </div>
  </div>
);

/* ── App with simple path-based routing ──────────────────────────── */
function AppMain() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'login';
    return path;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.history.pushState({}, '', `/${p}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'login';
      setPage(path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleDark = (val) => {
    setDarkMode(val);
    document.documentElement.dataset.theme = val ? 'dark' : '';
  };

  const goToMarketing = () => { window.location.href = MARKETING_URL; };

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
      case 'search-brands': return <SearchBrandsContent />;
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
          onLogout={() => { setSettingsOpen(false); goToMarketing(); }}
          onSave={noop}
        />
      )}
    </PageLayout>
  );
}

export default AppMain;

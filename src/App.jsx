import { useState } from 'react';
import './App.css';

/* ── Design tokens & component styles ────────────────────────────── */
import './stories/tokens.css';
import './stories/fonts.css';

/* ── Components ──────────────────────────────────────────────────── */
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
import { SearchPage } from './stories/SearchPage';
import { Icons } from './stories/icons';

/* ── Page-specific CSS ───────────────────────────────────────────── */
import './stories/searchpage.css';

/* ── Noop for event handlers ─────────────────────────────────────── */
const noop = () => {};

/* ══════════════════════════════════════════════════════════════════
   Sidebar footer — shared across pages
   ══════════════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════════════
   Sidebar header — logo lockup
   ══════════════════════════════════════════════════════════════════ */
const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   Dashboard data
   ══════════════════════════════════════════════════════════════════ */
const tableColumns = [
  { key: 'brand', label: 'Product' },
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

/* ══════════════════════════════════════════════════════════════════
   Page: Dashboard
   ══════════════════════════════════════════════════════════════════ */
const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]} />

      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Welcome back, Jane. Here's your outreach overview.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon={Icons.campaigns} />
        <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon={Icons.analytics} />
        <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon={Icons.dashboard} />
        <StatsCard title="Products Contacted" value="456" change="-2.1% from last month" trend="down" icon={Icons.brands} />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Tabs
          tabs={[
            { id: 'all', label: 'All Products' },
            { id: 'active', label: 'Active' },
            { id: 'pending', label: 'Pending' },
            { id: 'archived', label: 'Archived' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <Table columns={tableColumns} data={tableData} sortable striped />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   Page: Search — now uses the standalone SearchPage component
   ══════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════
   App — root with page routing
   ══════════════════════════════════════════════════════════════════ */
function App() {
  const [page, setPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDark = (val) => {
    setDarkMode(val);
    document.documentElement.dataset.theme = val ? 'dark' : '';
  };

  /* ── Marketing navigation helpers ──────────────────────────────── */
  const marketingNav = (targetPage) => setPage(targetPage);
  const goToSignIn = () => setPage('login');
  const goToSignUp = () => setPage('signup');

  /* ── Marketing pages — full-screen, no app chrome ──────────────── */
  if (page === 'landing') {
    return (
      <LandingPage
        onNavigate={marketingNav}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  if (page === 'product') {
    return (
      <ProductPage
        onNavigate={marketingNav}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  if (page === 'pricing') {
    return (
      <PricingPage
        onNavigate={marketingNav}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  /* ── Auth pages — full-screen, no layout chrome ────────────── */
  if (page === 'login') {
    return (
      <Login
        onLogin={() => setPage('dashboard')}
        onSignUpClick={() => setPage('signup')}
        onForgotPassword={noop}
      />
    );
  }

  if (page === 'signup') {
    return (
      <SignUp
        onSignUp={() => setPage('dashboard')}
        onLoginClick={() => setPage('login')}
      />
    );
  }

  /* ── Sidebar nav items with page routing ─────────────────────── */
  const sidebarItems = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: () => setPage('dashboard') },
        { id: 'search', label: 'Search', icon: Icons.search, onClick: () => setPage('search') },
        { id: 'brands', label: 'Products', icon: Icons.brands, onClick: () => setPage('brands') },
        { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: () => setPage('campaigns') },
        { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: () => setPage('analytics') },
      ],
    },
  ];

  /* ── 404 page is full-screen, no layout chrome ─────────────── */
  if (page === '404') {
    return <NotFound onBackClick={() => setPage('dashboard')} />;
  }

  /* ── Render page content based on route ────────────────────── */
  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardContent />;
      case 'search':
        return <SearchPage />;
      default:
        return <NotFound onBackClick={() => setPage('dashboard')} />;
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
          onLogout={() => { setSettingsOpen(false); setPage('login'); }}
          onSave={noop}
        />
      )}
    </PageLayout>
  );
}

export default App;

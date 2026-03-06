import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Dropdown } from './Dropdown';
import { StatsCard } from './StatsCard';
import { Table } from './Table';
import { Badge } from './Badge';
import { Tabs } from './Tabs';
import { Breadcrumbs } from './Breadcrumbs';
import { Icons } from './icons';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <ul className="oai-sidebar__list">
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
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
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(30)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '16px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
  </div>
);

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

export default {
  title: 'Pages/Dashboard',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="dashboard"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar
          actions={
            <Dropdown
              trigger={<Avatar initials="JD" size="small" />}
              items={[
                { label: 'Profile', icon: Icons.profile, onClick: fn() },
                { label: 'Settings', icon: Icons.settings, onClick: fn() },
                { divider: true },
                { label: 'Dark Mode', icon: Icons.moon, toggle: true, checked: darkMode, onToggle: (val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; } },
                { divider: true },
                { label: 'Sign out', icon: Icons.signout, onClick: fn() },
              ]}
              align="right"
            />
          }
        >
          <Search placeholder="Search brands..." onChange={fn()} />
        </Navbar>
      }
    >
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon={Icons.campaigns} />
          <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon={Icons.analytics} />
          <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon={Icons.dashboard} />
          <StatsCard title="Brands Contacted" value="456" change="-2.1% from last month" trend="down" icon={Icons.brands} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Tabs
            tabs={[
              { id: 'all', label: 'All Brands' },
              { id: 'active', label: 'Active' },
              { id: 'pending', label: 'Pending' },
              { id: 'archived', label: 'Archived' },
            ]}
            activeTab="all"
            onTabChange={fn()}
          />
        </div>

        <Table columns={tableColumns} data={tableData} sortable striped />
      </div>
    </PageLayout>
  );
};

export const Default = {
  render: () => <DashboardPage />,
};

import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Dropdown } from './Dropdown';
import { Badge } from './Badge';
import { Button } from './Button';
import { Select } from './Select';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'contacts', label: 'Contacts', icon: Icons.contacts, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const sidebarFooter = (
  <div className="oai-sidebar-credits">
    <div className="oai-sidebar-credits__row">
      <span className="oai-sidebar-credits__label">
        {Icons.credits}
        Credits
      </span>
      <span className="oai-sidebar-credits__count">10</span>
    </div>
    <span className="oai-sidebar-credits__hint">1 Enrich = 1 Credit</span>
  </div>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{
      width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-600)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13
    }}>O</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '16px', color: 'var(--color-text-primary)' }}>
      Outreach AI
    </span>
  </div>
);

const CreditsBadge = () => (
  <span className="oai-credits-badge">
    <span className="oai-credits-badge__icon">{Icons.credits}</span>
    <span className="oai-credits-badge__count">10</span>
    <span>credits</span>
  </span>
);

export default {
  title: 'Pages/Search Brands',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  render: () => (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="search-brands"
          header={sidebarHeader}
          footer={sidebarFooter}
        />
      }
      navbar={
        <Navbar
          actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <CreditsBadge />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 0 }} aria-label="Notifications">
                {Icons.bell}
              </button>
              <Dropdown
                trigger={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <Avatar initials="C" size="small" />
                    <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>Celine</span>
                  </div>
                }
                items={[
                  { label: 'Profile', icon: Icons.profile, onClick: fn() },
                  { label: 'Settings', icon: Icons.settings, onClick: fn() },
                  { divider: true },
                  { label: 'Sign out', icon: Icons.signout, onClick: fn() },
                ]}
                align="right"
              />
            </div>
          }
        >
          <Search placeholder="Global search..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1100px' }}>
        {/* Page Header */}
        <div className="oai-search-page__header">
          <h1 className="oai-search-page__title">Search Amazon Brands</h1>
          <p className="oai-search-page__subtitle">
            Find top-selling and fast-growing brands to target for outreach.
          </p>
        </div>

        {/* Search Card */}
        <div className="oai-search-card">
          {/* Keyword Search */}
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
              />
            </div>
            <Button variant="primary" size="large" label="Search" onClick={fn()} />
          </div>

          {/* AI Feature Callout */}
          <div className="oai-search-card__feature">
            <div className="oai-search-card__feature-content">
              <div className="oai-search-card__feature-title">
                {Icons.sparkle}
                AI-Powered Recommendations
                <Badge label="PRD Feature" variant="info" size="small" />
              </div>
              <div className="oai-search-card__feature-desc">
                Let AI analyze 50 brands and recommend the top 20 most likely to need your services (uses your company profile)
              </div>
            </div>
            <label className="oai-search-card__feature-toggle">
              <input type="checkbox" />
              Disabled
            </label>
          </div>

          {/* Search Provider */}
          <div className="oai-search-card__field">
            <Select
              label="Search Provider"
              options={[
                { value: 'auto', label: 'Auto (Default)' },
                { value: 'us', label: 'Amazon US' },
                { value: 'uk', label: 'Amazon UK' },
                { value: 'de', label: 'Amazon DE' },
                { value: 'jp', label: 'Amazon JP' },
              ]}
              value="auto"
              onChange={fn()}
            />
          </div>

          {/* Filters Row */}
          <div className="oai-search-card__filters">
            <div className="oai-search-card__field">
              <Select
                label="Category (Filter Results)"
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'beauty', label: 'Beauty & Personal Care' },
                  { value: 'health', label: 'Health & Household' },
                  { value: 'home', label: 'Home & Kitchen' },
                  { value: 'sports', label: 'Sports & Outdoors' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'grocery', label: 'Grocery & Gourmet Food' },
                ]}
                value="all"
                onChange={fn()}
              />
            </div>
            <div className="oai-search-card__field">
              <Select
                label="Min Rating (Filter Results)"
                options={[
                  { value: 'any', label: 'Any Rating' },
                  { value: '4.5', label: '4.5+ Stars' },
                  { value: '4.0', label: '4.0+ Stars' },
                  { value: '3.5', label: '3.5+ Stars' },
                  { value: '3.0', label: '3.0+ Stars' },
                ]}
                value="any"
                onChange={fn()}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  ),
};

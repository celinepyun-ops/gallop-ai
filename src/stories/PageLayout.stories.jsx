import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
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

export default {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    sidebar: (
      <Sidebar
        items={sidebarItems}
        activeItem="dashboard"
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(28)}</span>
            <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '16px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
          </div>
        }
      />
    ),
    navbar: (
      <Navbar
        actions={<Avatar initials="JD" size="small" />}
      >
        <Search placeholder="Search..." onChange={fn()} />
      </Navbar>
    ),
    children: (
      <div style={{ padding: '8px' }}>
        <h1 style={{ margin: '0 0 8px', fontFamily: 'var(--font-family-sans)' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)' }}>
          Welcome to Outreach AI. Select a section from the sidebar to get started.
        </p>
      </div>
    ),
  },
};

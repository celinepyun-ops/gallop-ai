import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';
import { Icons } from './icons';
import { Avatar } from './Avatar';

const sampleItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const footerNav = (
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
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    items: sampleItems,
    activeItem: 'dashboard',
    header: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
        <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
      </div>
    ),
    footer: footerNav,
  },
};

export const Collapsed = {
  args: {
    items: sampleItems,
    activeItem: 'campaigns',
    collapsed: true,
  },
};

export const WithSections = {
  args: {
    items: [
      {
        title: 'Workspace',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
          { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
          { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
        ],
      },
      {
        title: 'Manage',
        items: [
          { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
          { id: 'contacts', label: 'Contacts', icon: Icons.contacts, onClick: fn() },
          { id: 'settings', label: 'Settings', icon: Icons.settings, onClick: fn() },
        ],
      },
    ],
    activeItem: 'dashboard',
    footer: footerNav,
  },
};

import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { HelpButton } from './HelpButton';
import { Table } from './Table';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { Icons } from './icons';
import './Lists.css';

/* ── Shared sidebar setup ─────────────────────────────────────────────── */
const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search', label: 'Search', icon: Icons.search, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'lists', label: 'Lists', icon: Icons.brands, onClick: fn() },
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

/* ── Icons for menus ──────────────────────────────────────────────────── */
const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

const BackArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* ── Mock Data ────────────────────────────────────────────────────────── */
const mockLists = [
  {
    id: '1',
    name: 'Sunscreen Brands',
    description: 'SPF and sun protection product brands for summer outreach',
    itemCount: 8,
    createdAt: 'Jan 15, 2026',
    updatedAt: 'Mar 12, 2026',
  },
  {
    id: '2',
    name: 'Hair Care Prospects',
    description: 'Shampoo, conditioner, and hair treatment brands',
    itemCount: 12,
    createdAt: 'Feb 3, 2026',
    updatedAt: 'Mar 16, 2026',
  },
  {
    id: '3',
    name: 'Q2 Outreach',
    description: 'Priority brands for Q2 campaign launch',
    itemCount: 5,
    createdAt: 'Mar 1, 2026',
    updatedAt: 'Mar 18, 2026',
  },
];

const mockListItems = [
  { brand: 'SunShield Pro', category: 'Sunscreen', asin: 'B09XYZ1234', price: '$24.99', status: 'Active', added: 'Mar 10, 2026' },
  { brand: 'EcoGlow Naturals', category: 'Sunscreen', asin: 'B09ABC5678', price: '$18.99', status: 'Active', added: 'Mar 8, 2026' },
  { brand: 'AquaVeil SPF', category: 'Sunscreen', asin: 'B09DEF9012', price: '$29.99', status: 'Contacted', added: 'Mar 5, 2026' },
  { brand: 'PureRadiance Sun', category: 'Sun Care', asin: 'B09GHI3456', price: '$15.49', status: 'Active', added: 'Feb 28, 2026' },
  { brand: 'SolarGuard', category: 'Sunscreen', asin: 'B09JKL7890', price: '$21.99', status: 'Replied', added: 'Feb 20, 2026' },
  { brand: 'DermaSafe UV', category: 'Sun Protection', asin: 'B09MNO1234', price: '$32.00', status: 'Active', added: 'Feb 15, 2026' },
  { brand: 'TropicShield', category: 'Sunscreen', asin: 'B09PQR5678', price: '$27.50', status: 'Contacted', added: 'Jan 30, 2026' },
  { brand: 'GlowDefense', category: 'Sun Care', asin: 'B09STU9012', price: '$19.99', status: 'Active', added: 'Jan 22, 2026' },
];

const listDetailColumns = [
  { key: 'brand', label: 'Brand' },
  { key: 'category', label: 'Category' },
  { key: 'asin', label: 'ASIN' },
  { key: 'price', label: 'Price' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => (
      <Badge
        label={val}
        variant={val === 'Active' ? 'success' : val === 'Replied' ? 'info' : 'warning'}
        size="small"
      />
    ),
  },
  { key: 'added', label: 'Added' },
];

/* ── Three-dot Menu Component ─────────────────────────────────────────── */
const ListCardMenu = ({ onRename, onDelete, onExport }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="oai-lists__menu-wrapper">
      <button
        className="oai-lists__menu-btn"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        aria-label="List actions"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MoreIcon />
      </button>
      {open && (
        <ul className="oai-lists__menu-dropdown" role="menu">
          <li role="none">
            <button className="oai-lists__menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); onRename?.(); setOpen(false); }}>
              Rename
            </button>
          </li>
          <li role="none">
            <button className="oai-lists__menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); onExport?.(); setOpen(false); }}>
              Export CSV
            </button>
          </li>
          <li role="none">
            <button className="oai-lists__menu-item oai-lists__menu-item--danger" role="menuitem" onClick={(e) => { e.stopPropagation(); onDelete?.(); setOpen(false); }}>
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

/* ── Create List Modal ────────────────────────────────────────────────── */
const CreateListModal = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Create New List"
    size="sm"
    footer={
      <div className="oai-lists__modal-actions">
        <button className="oai-lists__cancel-btn" onClick={onClose}>Cancel</button>
        <button className="oai-lists__save-btn" onClick={onClose}>Create List</button>
      </div>
    }
  >
    <div className="oai-lists__form-group">
      <label className="oai-lists__form-label" htmlFor="list-name">List Name</label>
      <input
        id="list-name"
        className="oai-lists__form-input"
        type="text"
        placeholder="e.g. Summer Skincare Brands"
        autoFocus
      />
    </div>
    <div className="oai-lists__form-group">
      <label className="oai-lists__form-label" htmlFor="list-desc">Description (optional)</label>
      <textarea
        id="list-desc"
        className="oai-lists__form-textarea"
        placeholder="Add a description to help organize your lists..."
      />
    </div>
  </Modal>
);

/* ── Page Shell ───────────────────────────────────────────────────────── */
const PageShell = ({ children, darkMode, setDarkMode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="lists"
          header={sidebarHeader}
          footer={
            <SidebarFooter
              darkMode={darkMode}
              onToggleDark={(val) => {
                setDarkMode(val);
                document.documentElement.dataset.theme = val ? 'dark' : '';
              }}
            />
          }
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar>
          <Search placeholder="Search products..." onChange={fn()} />
        </Navbar>
      }
    >
      {children}
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

/* ── Story: Empty ─────────────────────────────────────────────────────── */
const EmptyListsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageShell darkMode={darkMode} setDarkMode={setDarkMode}>
      <div style={{ maxWidth: '1100px' }}>
        <div className="oai-lists__header">
          <div>
            <h1 className="oai-lists__title">Lists</h1>
            <p className="oai-lists__subtitle">Organize your saved products and brands into custom lists</p>
          </div>
          <button className="oai-lists__new-btn" onClick={() => setModalOpen(true)}>
            + New List
          </button>
        </div>

        <div className="oai-lists__empty">
          <div className="oai-lists__empty-icon">
            {Icons.brands}
          </div>
          <h2 className="oai-lists__empty-title">No lists yet</h2>
          <p className="oai-lists__empty-desc">
            Create your first list to start organizing brands and products for your outreach campaigns.
          </p>
          <button className="oai-lists__create-btn" onClick={() => setModalOpen(true)}>
            + Create Your First List
          </button>
        </div>
      </div>
      <CreateListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageShell>
  );
};

/* ── Story: WithLists ─────────────────────────────────────────────────── */
const WithListsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageShell darkMode={darkMode} setDarkMode={setDarkMode}>
      <div style={{ maxWidth: '1100px' }}>
        <div className="oai-lists__header">
          <div>
            <h1 className="oai-lists__title">Lists</h1>
            <p className="oai-lists__subtitle">Organize your saved products and brands into custom lists</p>
          </div>
          <button className="oai-lists__new-btn" onClick={() => setModalOpen(true)}>
            + New List
          </button>
        </div>

        <div className="oai-lists__grid">
          {mockLists.map((list) => (
            <div key={list.id} className="oai-lists__card" tabIndex={0} role="button" aria-label={`Open ${list.name}`}>
              <div className="oai-lists__card-top">
                <h3 className="oai-lists__card-name">{list.name}</h3>
                <ListCardMenu
                  onRename={fn()}
                  onDelete={fn()}
                  onExport={fn()}
                />
              </div>
              {list.description && (
                <p className="oai-lists__card-desc">{list.description}</p>
              )}
              <div className="oai-lists__card-meta">
                <span>
                  <Badge label={`${list.itemCount} items`} variant="info" size="small" />
                </span>
                <span>Created {list.createdAt}</span>
                <span>Updated {list.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageShell>
  );
};

/* ── Story: ListView (detail) ─────────────────────────────────────────── */
const ListViewPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const list = mockLists[0]; // Sunscreen Brands

  return (
    <PageShell darkMode={darkMode} setDarkMode={setDarkMode}>
      <div style={{ maxWidth: '1100px' }}>
        <div className="oai-lists__detail-header">
          <button className="oai-lists__back-btn" onClick={fn()} aria-label="Back to lists">
            <BackArrow />
          </button>
          <div className="oai-lists__detail-info">
            <h1 className="oai-lists__detail-name">{list.name}</h1>
            <p className="oai-lists__detail-meta">
              {list.itemCount} items &middot; Created {list.createdAt} &middot; Last updated {list.updatedAt}
            </p>
          </div>
          <ListCardMenu
            onRename={fn()}
            onDelete={fn()}
            onExport={fn()}
          />
        </div>

        <Table
          columns={listDetailColumns}
          data={mockListItems}
          sortable
          selectable
          striped
        />
      </div>
    </PageShell>
  );
};

/* ── Storybook Exports ────────────────────────────────────────────────── */
export default {
  title: 'Pages/Lists (Legacy)',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Empty = {
  render: () => <EmptyListsPage />,
};

export const WithLists = {
  render: () => <WithListsPage />,
};

export const ListView = {
  render: () => <ListViewPage />,
};

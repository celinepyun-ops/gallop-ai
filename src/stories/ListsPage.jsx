import { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from './Table';
import { Badge } from './Badge';
import { Tabs } from './Tabs';
import { Button } from './Button';
import { Modal } from './Modal';
import { Toast } from './Toast';
import { EmptyState } from './EmptyState';
import { Icons } from './icons';
import './Lists.css';

/* ══════════════════════════════════════════════════════════════════
   Data Model types (reference — implemented as plain objects)
   List     { id, name, tabs: Tab[] }
   Tab      { id, name, items: ListItem[] }
   ListItem { id, productId, brandName, salesRank, monthlyRevenue, addedAt }
   ══════════════════════════════════════════════════════════════════ */

/* ── Mock Data: 3 lists, each with 2 tabs, 5 items per tab ──── */
const MOCK_LISTS = [
  {
    id: 'list-1',
    name: 'Sunscreen Brands',
    tabs: [
      {
        id: 'tab-1a',
        name: 'SPF Products',
        items: [
          { id: 'i1', productId: 'B09XYZ1234', brandName: 'SunShield Pro', salesRank: 8200, monthlyRevenue: 67000, addedAt: '2026-03-10' },
          { id: 'i2', productId: 'B09ABC5678', brandName: 'EcoGlow Naturals', salesRank: 15400, monthlyRevenue: 42000, addedAt: '2026-03-08' },
          { id: 'i3', productId: 'B09DEF9012', brandName: 'AquaVeil SPF', salesRank: 3200, monthlyRevenue: 88000, addedAt: '2026-03-05' },
          { id: 'i4', productId: 'B09GHI3456', brandName: 'PureRadiance Sun', salesRank: 22000, monthlyRevenue: 31000, addedAt: '2026-02-28' },
          { id: 'i5', productId: 'B09JKL7890', brandName: 'SolarGuard', salesRank: 11500, monthlyRevenue: 53000, addedAt: '2026-02-20' },
        ],
      },
      {
        id: 'tab-1b',
        name: 'After-Sun Care',
        items: [
          { id: 'i6', productId: 'B09MNO1234', brandName: 'CoolAloe Gel', salesRank: 18000, monthlyRevenue: 28000, addedAt: '2026-03-12' },
          { id: 'i7', productId: 'B09PQR5678', brandName: 'SunRecover', salesRank: 35000, monthlyRevenue: 15000, addedAt: '2026-03-06' },
          { id: 'i8', productId: 'B09STU9012', brandName: 'DermaSoothe', salesRank: 9800, monthlyRevenue: 61000, addedAt: '2026-02-25' },
          { id: 'i9', productId: 'B09VWX3456', brandName: 'HydraFix', salesRank: 42000, monthlyRevenue: 12000, addedAt: '2026-02-18' },
          { id: 'i10', productId: 'B09YZA7890', brandName: 'AfterGlow', salesRank: 27000, monthlyRevenue: 22000, addedAt: '2026-02-10' },
        ],
      },
    ],
  },
  {
    id: 'list-2',
    name: 'Hair Care Prospects',
    tabs: [
      {
        id: 'tab-2a',
        name: 'Shampoo',
        items: [
          { id: 'i11', productId: 'B10ABC1234', brandName: 'SilkRoot', salesRank: 5600, monthlyRevenue: 78000, addedAt: '2026-03-14' },
          { id: 'i12', productId: 'B10DEF5678', brandName: 'PureScalp', salesRank: 19000, monthlyRevenue: 35000, addedAt: '2026-03-11' },
          { id: 'i13', productId: 'B10GHI9012', brandName: 'BotaniWash', salesRank: 8900, monthlyRevenue: 62000, addedAt: '2026-03-07' },
          { id: 'i14', productId: 'B10JKL3456', brandName: 'AquaLocks', salesRank: 31000, monthlyRevenue: 19000, addedAt: '2026-02-22' },
          { id: 'i15', productId: 'B10MNO7890', brandName: 'CleanCurl', salesRank: 14000, monthlyRevenue: 47000, addedAt: '2026-02-15' },
        ],
      },
      {
        id: 'tab-2b',
        name: 'Conditioner',
        items: [
          { id: 'i16', productId: 'B10PQR1234', brandName: 'DeepMoist', salesRank: 7200, monthlyRevenue: 71000, addedAt: '2026-03-13' },
          { id: 'i17', productId: 'B10STU5678', brandName: 'SilkEnd', salesRank: 25000, monthlyRevenue: 24000, addedAt: '2026-03-09' },
          { id: 'i18', productId: 'B10VWX9012', brandName: 'NutriLock', salesRank: 16000, monthlyRevenue: 39000, addedAt: '2026-03-02' },
          { id: 'i19', productId: 'B10YZA3456', brandName: 'HydraCoat', salesRank: 48000, monthlyRevenue: 11000, addedAt: '2026-02-19' },
          { id: 'i20', productId: 'B10BCD7890', brandName: 'GlossRepair', salesRank: 12000, monthlyRevenue: 55000, addedAt: '2026-02-12' },
        ],
      },
    ],
  },
  {
    id: 'list-3',
    name: 'Q2 Outreach',
    tabs: [
      {
        id: 'tab-3a',
        name: 'Priority',
        items: [
          { id: 'i21', productId: 'B11ABC1234', brandName: 'GlowUp Co', salesRank: 6800, monthlyRevenue: 74000, addedAt: '2026-03-16' },
          { id: 'i22', productId: 'B11DEF5678', brandName: 'VitaSkin', salesRank: 21000, monthlyRevenue: 33000, addedAt: '2026-03-15' },
          { id: 'i23', productId: 'B11GHI9012', brandName: 'FreshDerm', salesRank: 10500, monthlyRevenue: 58000, addedAt: '2026-03-14' },
          { id: 'i24', productId: 'B11JKL3456', brandName: 'NaturaBright', salesRank: 38000, monthlyRevenue: 16000, addedAt: '2026-03-12' },
          { id: 'i25', productId: 'B11MNO7890', brandName: 'ZenSkin', salesRank: 4500, monthlyRevenue: 82000, addedAt: '2026-03-10' },
        ],
      },
      {
        id: 'tab-3b',
        name: 'Backlog',
        items: [
          { id: 'i26', productId: 'B11PQR1234', brandName: 'LeafPure', salesRank: 52000, monthlyRevenue: 8500, addedAt: '2026-03-08' },
          { id: 'i27', productId: 'B11STU5678', brandName: 'OceanDew', salesRank: 29000, monthlyRevenue: 21000, addedAt: '2026-03-05' },
          { id: 'i28', productId: 'B11VWX9012', brandName: 'SkinFirst', salesRank: 17000, monthlyRevenue: 37000, addedAt: '2026-03-01' },
          { id: 'i29', productId: 'B11YZA3456', brandName: 'BloomCare', salesRank: 44000, monthlyRevenue: 13000, addedAt: '2026-02-26' },
          { id: 'i30', productId: 'B11BCD7890', brandName: 'PetalSoft', salesRank: 8100, monthlyRevenue: 65000, addedAt: '2026-02-20' },
        ],
      },
    ],
  },
];

/* ── Table columns for list items ────────────────────────────── */
const listItemColumns = [
  { key: 'brandName', label: 'Brand' },
  { key: 'productId', label: 'ASIN' },
  {
    key: 'salesRank',
    label: 'Sales Rank',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>#{val.toLocaleString()}</span>,
  },
  {
    key: 'monthlyRevenue',
    label: 'Monthly Revenue',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>${(val / 1000).toFixed(0)}K</span>,
  },
  { key: 'addedAt', label: 'Added' },
];

/* ── Icons ────────────────────────────────────────────────────── */
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

/* ── Three-dot context menu ──────────────────────────────────── */
const ListMenu = ({ onRename, onDelete, onExport }) => {
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
              Export Excel
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

/* ══════════════════════════════════════════════════════════════════
   ListsPage Component
   ══════════════════════════════════════════════════════════════════ */
export const ListsPage = ({ initialLists = MOCK_LISTS }) => {
  const [lists, setLists] = useState(initialLists);
  const [selectedListId, setSelectedListId] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [toast, setToast] = useState(null);

  const selectedList = lists.find((l) => l.id === selectedListId);

  // Auto-select first tab when selecting a list
  const selectList = (listId) => {
    setSelectedListId(listId);
    const list = lists.find((l) => l.id === listId);
    setActiveTabId(list?.tabs[0]?.id || null);
  };

  const activeTab = selectedList?.tabs.find((t) => t.id === activeTabId);

  /* ── List CRUD ─────────────────────────────────────────────── */
  const createList = () => {
    if (!newListName.trim()) return;
    const newList = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      tabs: [{ id: `tab-${Date.now()}`, name: 'Default', items: [] }],
    };
    setLists((prev) => [...prev, newList]);
    setNewListName('');
    setCreateModalOpen(false);
    selectList(newList.id);
    showToast(`"${newList.name}" created`, 'success');
  };

  const deleteList = (listId) => {
    const list = lists.find((l) => l.id === listId);
    setLists((prev) => prev.filter((l) => l.id !== listId));
    if (selectedListId === listId) {
      setSelectedListId(null);
      setActiveTabId(null);
    }
    showToast(`"${list?.name}" deleted`, 'info');
  };

  const handleExport = (list) => {
    showToast(`Export started for "${list.name}" — each tab maps to a separate Excel sheet`, 'success');
  };

  const showToast = (message, variant) => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const totalItems = (list) => list.tabs.reduce((sum, tab) => sum + tab.items.length, 0);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* ── Header ───────────────────────────────────────── */}
      <div className="oai-lists__header">
        <div>
          <h1 className="oai-lists__title">Lists</h1>
          <p className="oai-lists__subtitle">Organize your saved products and brands into custom lists</p>
        </div>
        <button className="oai-lists__new-btn" onClick={() => setCreateModalOpen(true)}>
          + New List
        </button>
      </div>

      {lists.length === 0 ? (
        /* ── Empty state ──────────────────────────────────── */
        <div className="oai-lists__empty">
          <div className="oai-lists__empty-icon">{Icons.brands}</div>
          <h2 className="oai-lists__empty-title">No lists yet</h2>
          <p className="oai-lists__empty-desc">
            Create your first list to start organizing brands and products for your outreach campaigns.
          </p>
          <button className="oai-lists__create-btn" onClick={() => setCreateModalOpen(true)}>
            + Create Your First List
          </button>
        </div>
      ) : (
        /* ── Split layout: sidebar + content ──────────────── */
        <div className="oai-lists__split">
          {/* Left: list sidebar */}
          <div className="oai-lists__sidebar">
            {lists.map((list) => (
              <button
                key={list.id}
                className={`oai-lists__sidebar-item ${selectedListId === list.id ? 'oai-lists__sidebar-item--active' : ''}`}
                onClick={() => selectList(list.id)}
              >
                <div className="oai-lists__sidebar-item-info">
                  <span className="oai-lists__sidebar-item-name">{list.name}</span>
                  <Badge label={`${totalItems(list)}`} variant="info" size="small" />
                </div>
                <ListMenu
                  onRename={() => showToast('Rename coming soon', 'info')}
                  onDelete={() => deleteList(list.id)}
                  onExport={() => handleExport(list)}
                />
              </button>
            ))}
          </div>

          {/* Right: list content */}
          <div className="oai-lists__content">
            {!selectedList ? (
              <EmptyState
                icon="👈"
                title="Select a list"
                description="Choose a list from the sidebar to view its contents."
              />
            ) : (
              <>
                <div className="oai-lists__content-header">
                  <h2 className="oai-lists__content-title">{selectedList.name}</h2>
                  <Button
                    variant="outline"
                    size="small"
                    label="Export Excel"
                    onClick={() => handleExport(selectedList)}
                  />
                </div>

                {/* Tab navigation */}
                <Tabs
                  tabs={selectedList.tabs.map((t) => ({ id: t.id, label: `${t.name} (${t.items.length})` }))}
                  activeTab={activeTabId}
                  onTabChange={setActiveTabId}
                />

                {/* Tab content */}
                <div style={{ marginTop: 'var(--space-4)' }}>
                  {activeTab && activeTab.items.length > 0 ? (
                    <Table columns={listItemColumns} data={activeTab.items} sortable selectable striped />
                  ) : (
                    <EmptyState
                      icon="📋"
                      title="No items in this tab"
                      description="Add products from the Search page using the 'Add to List' button."
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Create List Modal ────────────────────────────── */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => { setCreateModalOpen(false); setNewListName(''); }}
        title="Create New List"
        size="sm"
        footer={
          <div className="oai-lists__modal-actions">
            <button className="oai-lists__cancel-btn" onClick={() => { setCreateModalOpen(false); setNewListName(''); }}>Cancel</button>
            <button className="oai-lists__save-btn" onClick={createList} disabled={!newListName.trim()}>Create List</button>
          </div>
        }
      >
        <div className="oai-lists__form-group">
          <label className="oai-lists__form-label" htmlFor="new-list-name">List Name</label>
          <input
            id="new-list-name"
            className="oai-lists__form-input"
            type="text"
            placeholder="e.g. Summer Skincare Brands"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createList()}
            autoFocus
          />
        </div>
      </Modal>

      {/* ── Toast ────────────────────────────────────────── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

ListsPage.propTypes = {
  /** Initial lists data (defaults to mock data) */
  initialLists: PropTypes.arrayOf(PropTypes.object),
};

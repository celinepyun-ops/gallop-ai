import { useState } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Icons } from './icons';
import './searchpage.css';

/* ══════════════════════════════════════════════════════════════════
   Pipeline Stages (Salesforce-style)
   ══════════════════════════════════════════════════════════════════ */
const PIPELINE_STAGES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'replied', label: 'Replied' },
  { id: 'negotiating', label: 'Negotiating' },
  { id: 'closed', label: 'Closed Won' },
];

/* ══════════════════════════════════════════════════════════════════
   Mock Data — contacts across lists with pipeline status
   ══════════════════════════════════════════════════════════════════ */
const MOCK_CONTACTS = [
  { id: '1', name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', brand: 'CeraVe', list: 'Sunscreen', stage: 'replied', priority: 'High', addedDate: '2026-04-05', initials: 'SC', color: '#6B8E23', email: 'sarah.chen@cerave.com', lastActivity: 'Replied 3 hours ago', notes: 'Interested in manufacturing partnership. Wants to schedule a call Thursday 2pm PT.' },
  { id: '3', name: 'Tom Rinks', title: 'Director of Sales', company: 'Sun Bum', brand: 'Sun Bum', list: 'Sunscreen', stage: 'new', priority: 'Medium', addedDate: '2026-04-06', initials: 'TR', color: '#B8860B', email: 'tom.r@sunbum.com', lastActivity: 'Added to list', notes: '' },
  { id: '4', name: 'Marcus Johnson', title: 'Global Partnerships Manager', company: 'CeraVe', brand: 'CeraVe', list: 'Neck Cream', stage: 'new', priority: 'Medium', addedDate: '2026-04-06', initials: 'MJ', color: '#6B8E23', email: 'mjohnson@cerave.com', lastActivity: 'Added to list', notes: '' },
  { id: '5', name: 'Rachel Kim', title: 'Head of Partnerships', company: 'EltaMD', brand: 'EltaMD', list: 'Sunscreen', stage: 'contacted', priority: 'High', addedDate: '2026-04-07', initials: 'RK', color: '#4682B4', email: 'rachel.kim@eltamd.com', lastActivity: 'Email sent Apr 12', notes: 'Sent intro email. Follow up if no reply by Apr 19.' },
  { id: '7', name: 'Lisa Wang', title: 'Business Development Manager', company: 'StriVectin', brand: 'StriVectin', list: 'Neck Cream', stage: 'negotiating', priority: 'High', addedDate: '2026-04-08', initials: 'LW', color: '#8B008B', email: 'lwang@strivectin.com', lastActivity: 'Call scheduled Apr 18', notes: 'Discussing MOQ and pricing. Very interested in private label.' },
  { id: '8', name: 'James Miller', title: 'Director of Retail', company: 'Olay', brand: 'Olay', list: 'Neck Cream', stage: 'replied', priority: 'Medium', addedDate: '2026-04-08', initials: 'JM', color: '#DC143C', email: 'j.miller@olay.com', lastActivity: 'Replied 1 day ago', notes: 'Looping in procurement team. Expect email from Lisa Park by end of week.' },
  { id: '9', name: 'Amy Foster', title: 'Co-Founder', company: 'TruSkin', brand: 'TruSkin', list: 'Vitamin C Serum (Prospect)', stage: 'new', priority: 'Medium', addedDate: '2026-04-09', initials: 'AF', color: '#FF8C00', email: 'amy@truskin.com', lastActivity: 'Added to list', notes: '' },
];

const LISTS = ['All', 'Sunscreen', 'Neck Cream', 'Vitamin C Serum (Prospect)'];

/* ══════════════════════════════════════════════════════════════════
   Inline SVG Icons
   ══════════════════════════════════════════════════════════════════ */
const ListIcons = {
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  table: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /></svg>,
  kanban: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="3" width="5" height="12" rx="1" /><rect x="17" y="3" width="5" height="15" rx="1" /></svg>,
  download: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  filter: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
  refresh: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
  chevron: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
  sortAsc: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>,
  sortDesc: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 12 9 17 20 6" /></svg>,
};

/* ══════════════════════════════════════════════════════════════════
   Stage Badge
   ══════════════════════════════════════════════════════════════════ */
const stageBadgeConfig = {
  new: { label: 'New', variant: 'default' },
  contacted: { label: 'Contacted', variant: 'warning' },
  replied: { label: 'Replied', variant: 'success' },
  negotiating: { label: 'Negotiating', variant: 'info' },
  closed: { label: 'Closed Won', variant: 'success' },
};

const priorityConfig = {
  High: 'warning',
  Medium: 'info',
  Low: 'default',
};

/* ══════════════════════════════════════════════════════════════════
   SavedListsPage Component — Salesforce-style CRM Table
   ══════════════════════════════════════════════════════════════════ */
export const SavedListsPage = ({ savedLists: propLists, onAddNewList, activeCampaign, setActiveCampaign, onCreateCampaign }) => {
  const [contacts] = useState(MOCK_CONTACTS);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  // Sync selectedList with activeCampaign from parent if provided
  const [selectedListLocal, setSelectedListLocal] = useState('All');
  const selectedList = activeCampaign !== undefined ? activeCampaign : selectedListLocal;
  const setSelectedList = setActiveCampaign || setSelectedListLocal;
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [filterStage, setFilterStage] = useState(null); // null = all stages
  const [drawerContact, setDrawerContact] = useState(null);

  /* ── Filter + Sort logic ───────────────────────────────────── */
  const filteredContacts = contacts.filter((c) => {
    if (selectedList !== 'All' && c.list !== selectedList) return false;
    if (filterStage && c.stage !== filterStage) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    }
    return true;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    const valA = a[sortColumn] || '';
    const valB = b[sortColumn] || '';
    return valA.localeCompare(valB) * dir;
  });

  const handleSort = (col) => {
    if (sortColumn === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDir('asc');
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === sortedContacts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedContacts.map((c) => c.id)));
    }
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    onAddNewList?.(newListName.trim());
    setNewListName('');
    setShowNewListInput(false);
  };

  /* ── Pipeline stage counts ─────────────────────────────────── */
  /* Stage counts should reflect list + search filters but NOT the stage filter itself */
  const contactsBeforeStageFilter = contacts.filter((c) => {
    if (selectedList !== 'All' && c.list !== selectedList) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    }
    return true;
  });
  const stageCounts = {};
  PIPELINE_STAGES.forEach((s) => { stageCounts[s.id] = contactsBeforeStageFilter.filter((c) => c.stage === s.id).length; });

  /* ── CSV Download ──────────────────────────────────────────── */
  const handleDownloadCSV = () => {
    const headers = ['Name', 'Title', 'Company', 'Brand', 'List', 'Stage', 'Priority', 'Date Added'];
    const rows = sortedContacts.map((c) => [c.name, c.title, c.company, c.brand, c.list, c.stage, c.priority, c.addedDate]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedList.replace(/\s+/g, '_')}_contacts.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── Table column header ───────────────────────────────────── */
  const ColHeader = ({ id, label, width }) => (
    <th className="oai-crm__th" style={{ width }} onClick={() => handleSort(id)}>
      <span className="oai-crm__th-inner">
        {label}
        {sortColumn === id && (
          <span className="oai-crm__th-sort">{sortDir === 'asc' ? ListIcons.sortAsc : ListIcons.sortDesc}</span>
        )}
        {sortColumn !== id && ListIcons.chevron}
      </span>
    </th>
  );

  return (
    <div className="oai-sp">
      {/* ── LEFT: Sidebar — List Selector ──────────────────── */}
      <aside className="oai-sp-filters">
        <div className="oai-sp-filters__header">
          <span className="oai-sp-filters__title">Lists</span>
        </div>

        <div className="oai-sp-progress__context" style={{ borderBottom: 'none', paddingTop: 'var(--space-2)' }}>
          {LISTS.map((listName) => {
            const count = listName === 'All' ? contacts.length : contacts.filter((c) => c.list === listName).length;
            return (
              <button
                key={listName}
                className={`oai-sp-progress__context-item ${selectedList === listName ? 'oai-sp-progress__context-item--active' : ''}`}
                onClick={() => { setSelectedList(listName); setSelectedRows(new Set()); }}
              >
                <span className="oai-sp-progress__context-name">{listName}</span>
                <span className="oai-sp-progress__context-meta">{count}</span>
              </button>
            );
          })}
        </div>

        {/* People */}
        <div className="oai-sp-progress__context" style={{ borderBottom: 'none', paddingTop: 0 }}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', padding: 'var(--space-3) var(--space-3) var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--color-border-default)' }}>People</div>
          {[
            { name: 'May - Beauty Products', count: 4 },
            { name: 'Sunscreen BD Targets', count: 3 },
            { name: 'Neck Cream Prospects', count: 2 },
          ].map((pl) => (
            <button
              key={pl.name}
              className="oai-sp-progress__context-item"
              onClick={() => {}}
            >
              <span className="oai-sp-progress__context-name">{pl.name}</span>
              <span className="oai-sp-progress__context-meta">{pl.count}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ── RIGHT: Main Content ──────────────────────────────── */}
      <main className="oai-sp-main">
        {/* Header */}
        <div className="oai-sp-main__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <h1 className="oai-sp-main__title">{selectedList}</h1>
            </div>
            <p className="oai-sp-main__subtitle">
              {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
              {filterStage && <> &middot; Filtered by <strong>{PIPELINE_STAGES.find((s) => s.id === filterStage)?.label}</strong> <button onClick={() => setFilterStage(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary-600)', cursor: 'pointer', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', padding: 0, textDecoration: 'underline' }}>Clear</button></>}
              {!filterStage && <> &middot; Sorted by {sortColumn}</>}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            {showNewListInput ? (
              <>
                <input type="text" placeholder="List name..." value={newListName} onChange={(e) => setNewListName(e.target.value)} autoFocus onKeyDown={(e) => e.key === 'Enter' && handleCreateList()} className="oai-crm__input" />
                <Button variant="primary" size="small" label="Create" onClick={handleCreateList} />
                <Button variant="ghost" size="small" label="Cancel" onClick={() => { setShowNewListInput(false); setNewListName(''); }} />
              </>
            ) : (
              <>
                {selectedList !== 'All' && onCreateCampaign && (
                  <Button variant="ghost" size="medium" label={`+ Campaign from ${selectedList}`} onClick={() => onCreateCampaign(selectedList)} />
                )}
                <Button variant="primary" size="medium" label="+ New List" onClick={() => setShowNewListInput(true)} />
              </>
            )}
          </div>
        </div>

        {/* Pipeline Stages Bar (Salesforce-style chevrons) */}
        {viewMode === 'table' && (
          <div className="oai-crm__pipeline">
            {PIPELINE_STAGES.map((stage) => (
              <div
                key={stage.id}
                className={`oai-crm__pipeline-stage ${filterStage === stage.id ? 'oai-crm__pipeline-stage--active' : ''}`}
                onClick={() => setFilterStage(filterStage === stage.id ? null : stage.id)}
              >
                <span className="oai-crm__pipeline-label">{stage.label}</span>
                <span className="oai-crm__pipeline-count">({stageCounts[stage.id]})</span>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar — Search + View Toggle + Actions */}
        <div className="oai-crm__toolbar">
          <div className="oai-crm__toolbar-left">
            <div className="oai-crm__search">
              {ListIcons.search}
              <input type="text" placeholder="Search this list..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="oai-crm__search-input" />
            </div>
          </div>
          <div className="oai-crm__toolbar-right">
            <button className={`oai-crm__view-btn ${viewMode === 'table' ? 'oai-crm__view-btn--active' : ''}`} onClick={() => setViewMode('table')} title="Table view">
              {ListIcons.table}
            </button>
            <button className={`oai-crm__view-btn ${viewMode === 'kanban' ? 'oai-crm__view-btn--active' : ''}`} onClick={() => setViewMode('kanban')} title="Kanban view">
              {ListIcons.kanban}
            </button>
            <div className="oai-crm__toolbar-divider" />
            <button className="oai-crm__view-btn" onClick={() => {}} title="Refresh">
              {ListIcons.refresh}
            </button>
            <button className="oai-crm__view-btn" onClick={handleDownloadCSV} title="Download CSV">
              {ListIcons.download}
            </button>
            <button className="oai-crm__view-btn" title="Filter">
              {ListIcons.filter}
            </button>
          </div>
        </div>

        {/* ── TABLE VIEW ─────────────────────────────────────── */}
        {viewMode === 'table' && (
          <div className="oai-crm__table-wrap">
            <table className="oai-crm__table">
              <thead>
                <tr>
                  <th className="oai-crm__th oai-crm__th--check" style={{ width: 40 }}>
                    <input type="checkbox" checked={selectedRows.size === sortedContacts.length && sortedContacts.length > 0} onChange={toggleAll} />
                  </th>
                  <ColHeader id="name" label="Contact Name" width="22%" />
                  <ColHeader id="company" label="Company" width="14%" />
                  <ColHeader id="title" label="Title" width="18%" />
                  <ColHeader id="stage" label="Stage" width="12%" />
                  <ColHeader id="priority" label="Priority" width="10%" />
                  <ColHeader id="list" label="List" width="14%" />
                  <ColHeader id="addedDate" label="Date Added" width="10%" />
                </tr>
              </thead>
              <tbody>
                {sortedContacts.map((contact) => (
                  <tr key={contact.id} className={`oai-crm__tr ${selectedRows.has(contact.id) ? 'oai-crm__tr--selected' : ''}`}>
                    <td className="oai-crm__td oai-crm__td--check">
                      <input type="checkbox" checked={selectedRows.has(contact.id)} onChange={() => toggleRow(contact.id)} />
                    </td>
                    <td className="oai-crm__td oai-crm__td--name">
                      <span className="oai-sp-product-cell__avatar" style={{ background: contact.color, width: 28, height: 28, fontSize: 10, flexShrink: 0 }}>{contact.initials}</span>
                      <span className="oai-crm__name-link" onClick={() => setDrawerContact(contact)}>{contact.name}</span>
                    </td>
                    <td className="oai-crm__td">{contact.company}</td>
                    <td className="oai-crm__td oai-crm__td--meta">{contact.title}</td>
                    <td className="oai-crm__td">
                      <Badge label={stageBadgeConfig[contact.stage]?.label || contact.stage} variant={stageBadgeConfig[contact.stage]?.variant || 'default'} size="small" />
                    </td>
                    <td className="oai-crm__td">
                      <Badge label={contact.priority} variant={priorityConfig[contact.priority] || 'default'} size="small" />
                    </td>
                    <td className="oai-crm__td oai-crm__td--meta">{contact.list}</td>
                    <td className="oai-crm__td oai-crm__td--meta">{contact.addedDate}</td>
                  </tr>
                ))}
                {sortedContacts.length === 0 && (
                  <tr>
                    <td colSpan={8} className="oai-crm__empty">No contacts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── KANBAN VIEW ────────────────────────────────────── */}
        {viewMode === 'kanban' && (
          <div className="oai-crm__kanban">
            {PIPELINE_STAGES.map((stage) => {
              const stageContacts = filteredContacts.filter((c) => c.stage === stage.id);
              return (
                <div key={stage.id} className="oai-crm__kanban-col">
                  <div className="oai-crm__kanban-header">
                    <span className="oai-crm__kanban-title">{stage.label}</span>
                    <span className="oai-crm__kanban-count">{stageContacts.length}</span>
                  </div>
                  <div className="oai-crm__kanban-cards">
                    {stageContacts.map((contact) => (
                      <div key={contact.id} className="oai-crm__kanban-card" onClick={() => setDrawerContact(contact)}>
                        <div className="oai-crm__kanban-card-header">
                          <span className="oai-sp-product-cell__avatar" style={{ background: contact.color, width: 24, height: 24, fontSize: 9 }}>{contact.initials}</span>
                          <span className="oai-crm__kanban-card-name">{contact.name}</span>
                        </div>
                        <div className="oai-crm__kanban-card-company">{contact.company}</div>
                        <div className="oai-crm__kanban-card-title">{contact.title}</div>
                        <div className="oai-crm__kanban-card-footer">
                          <Badge label={contact.priority} variant={priorityConfig[contact.priority] || 'default'} size="small" />
                        </div>
                      </div>
                    ))}
                    {stageContacts.length === 0 && (
                      <div className="oai-crm__kanban-empty">No contacts</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Selection Action Bar ───────────────────────────── */}
        {selectedRows.size > 0 && (
          <div className="oai-search-action-bar">
            <span className="oai-search-action-bar__count">{selectedRows.size} selected</span>
            <Button variant="ghost" size="small" label="Change Stage" onClick={() => {}} />
            <Button variant="ghost" size="small" label="Change Priority" onClick={() => {}} />
            <Button variant="ghost" size="small" label="Move to List" onClick={() => {}} />
            <Button variant="ghost" size="small" label="Download CSV" onClick={handleDownloadCSV} />
          </div>
        )}
      </main>

      {/* ── Contact Detail Drawer ────────────────────────── */}
      {drawerContact && (
        <div className="oai-crm-drawer-backdrop" onClick={() => setDrawerContact(null)}>
          <aside className="oai-crm-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="oai-crm-drawer__header">
              <button className="oai-crm-drawer__close" onClick={() => setDrawerContact(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Profile */}
            <div className="oai-crm-drawer__profile">
              <span className="oai-sp-product-cell__avatar" style={{ background: drawerContact.color, width: 48, height: 48, fontSize: 16 }}>{drawerContact.initials}</span>
              <h2 className="oai-crm-drawer__name">{drawerContact.name}</h2>
              <p className="oai-crm-drawer__title">{drawerContact.title}</p>
              <p className="oai-crm-drawer__company">{drawerContact.company}</p>
            </div>

            {/* Stage + Priority */}
            <div className="oai-crm-drawer__badges">
              <Badge label={stageBadgeConfig[drawerContact.stage]?.label || drawerContact.stage} variant={stageBadgeConfig[drawerContact.stage]?.variant || 'default'} size="small" />
              <Badge label={drawerContact.priority} variant={priorityConfig[drawerContact.priority] || 'default'} size="small" />
              <Badge label={drawerContact.list} variant="default" size="small" />
            </div>

            {/* Details */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Details</div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>{drawerContact.email}</span>
              </div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span>Added {drawerContact.addedDate}</span>
              </div>
            </div>

            {/* Last Activity */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Last Activity</div>
              <p className="oai-crm-drawer__activity">{drawerContact.lastActivity}</p>
            </div>

            {/* Notes */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Notes</div>
              <p className="oai-crm-drawer__notes">{drawerContact.notes || 'No notes yet.'}</p>
            </div>

            {/* Actions */}
            <div className="oai-crm-drawer__actions">
              <Button variant="primary" size="medium" label="Send Email" onClick={() => {}} />
              <Button variant="ghost" size="medium" label="Change Stage" onClick={() => {}} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

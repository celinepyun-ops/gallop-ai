import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Tabs } from './Tabs';
import { StatsCard } from './StatsCard';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'search', label: 'Search', icon: Icons.search, onClick: fn() },
      { id: 'pipeline', label: 'Pipeline', icon: Icons.dashboard, onClick: fn() },
      { id: 'lists', label: 'Lists', icon: Icons.list, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'tasks', label: 'Tasks', icon: Icons.templates, onClick: fn() },
    ],
  },
];

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ color: 'var(--color-primary-600)' }}>{Icons.logo(24)}</span>
    <span style={{ fontWeight: 600, fontSize: '16px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <nav><ul className="oai-sidebar__list">
    <li className="oai-sidebar__item"><button className="oai-sidebar__link"><span className="oai-sidebar__icon">{Icons.settings}</span><span className="oai-sidebar__label">Settings</span></button></li>
    <li className="oai-sidebar__item"><button className="oai-sidebar__link" onClick={() => onToggleDark(!darkMode)}><span className="oai-sidebar__icon">{Icons.moon}</span><span className="oai-sidebar__label">Dark Mode</span></button></li>
    <li className="oai-sidebar__item"><button className="oai-sidebar__link"><Avatar initials="RT" size="small" /><span className="oai-sidebar__label">Ryan Torres</span></button></li>
  </ul></nav>
);

const REVEALED = [
  { id: 'r1', name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', email: 'sarah.chen@cerave.com', list: 'Sunscreen', revealedAt: '2026-04-05', initials: 'SC', color: '#6B8E23', stage: 'Replied' },
  { id: 'r2', name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', email: 'holly@supergoop.com', list: 'Sunscreen', revealedAt: '2026-04-05', initials: 'HT', color: '#2E8B57', stage: 'Contacted' },
  { id: 'r3', name: 'Rachel Kim', title: 'Head of Partnerships', company: 'EltaMD', email: 'rachel.kim@eltamd.com', list: 'Sunscreen', revealedAt: '2026-04-07', initials: 'RK', color: '#4682B4', stage: 'Contacted' },
  { id: 'r4', name: 'Lisa Wang', title: 'BD Manager', company: 'StriVectin', email: 'lwang@strivectin.com', list: 'Neck Cream', revealedAt: '2026-04-08', initials: 'LW', color: '#8B008B', stage: 'Negotiating' },
  { id: 'r5', name: 'James Miller', title: 'Director of Retail', company: 'Olay', email: 'j.miller@olay.com', list: 'Neck Cream', revealedAt: '2026-04-08', initials: 'JM', color: '#DC143C', stage: 'Replied' },
  { id: 'r6', name: 'Diana Voss', title: 'VP of Global Sales', company: 'StriVectin', email: 'dvoss@crownlabs.com', list: null, revealedAt: '2026-04-10', initials: 'DV', color: '#8B008B', stage: null },
  { id: 'r7', name: 'Mia Tanaka', title: 'Head of Partnerships', company: 'Drunk Elephant', email: 'mia.tanaka@shiseido.com', list: null, revealedAt: '2026-04-12', initials: 'MT', color: '#FF6B6B', stage: null },
];

export default {
  title: 'Pages/People',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const PeoplePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tab, setTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());

  const assigned = REVEALED.filter((c) => c.list);
  const unassigned = REVEALED.filter((c) => !c.list);
  const display = tab === 'all' ? REVEALED : tab === 'assigned' ? assigned : unassigned;
  const filtered = searchQuery ? display.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())) : display;

  const toggleRow = (id) => setSelectedRows((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <PageLayout
      sidebar={
        <Sidebar items={sidebarItems} activeItem="lists" header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      }
      navbar={<Navbar><Search placeholder="Search..." onChange={fn()} /></Navbar>}
    >
      <div style={{ maxWidth: '1200px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>People</h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>All contacts you've revealed. {REVEALED.length} contacts &middot; {REVEALED.length} tokens used.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <StatsCard title="Total Revealed" value={String(REVEALED.length)} change={`${REVEALED.length} tokens`} trend="neutral" icon={Icons.contacts} />
          <StatsCard title="Assigned" value={String(assigned.length)} change="In lists" trend="up" icon={Icons.list} />
          <StatsCard title="Unassigned" value={String(unassigned.length)} change="Add to list" trend="neutral" icon={Icons.profile} />
          <StatsCard title="Replied" value={String(REVEALED.filter((c) => c.stage === 'Replied').length)} change="Action needed" trend="up" icon={Icons.campaigns} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Tabs tabs={[{ id: 'all', label: `All (${REVEALED.length})` }, { id: 'assigned', label: `Assigned (${assigned.length})` }, { id: 'unassigned', label: `Unassigned (${unassigned.length})` }]} activeTab={tab} onTabChange={setTab} />
        </div>

        <div style={{ marginBottom: '16px', maxWidth: '320px' }}>
          <Search placeholder="Search by name or company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="oai-crm__table-wrap">
          <table className="oai-crm__table">
            <thead>
              <tr>
                <th className="oai-crm__th" style={{ width: 40 }}><input type="checkbox" /></th>
                <th className="oai-crm__th">Name</th>
                <th className="oai-crm__th">Company</th>
                <th className="oai-crm__th">Title</th>
                <th className="oai-crm__th">Email</th>
                <th className="oai-crm__th">List</th>
                <th className="oai-crm__th">Stage</th>
                <th className="oai-crm__th">Revealed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className={`oai-crm__tr ${selectedRows.has(c.id) ? 'oai-crm__tr--selected' : ''}`}>
                  <td className="oai-crm__td"><input type="checkbox" checked={selectedRows.has(c.id)} onChange={() => toggleRow(c.id)} /></td>
                  <td className="oai-crm__td oai-crm__td--name">
                    <span className="oai-sp-product-cell__avatar" style={{ background: c.color, width: 28, height: 28, fontSize: 10, flexShrink: 0 }}>{c.initials}</span>
                    <span className="oai-crm__name-link">{c.name}</span>
                  </td>
                  <td className="oai-crm__td">{c.company}</td>
                  <td className="oai-crm__td oai-crm__td--meta">{c.title}</td>
                  <td className="oai-crm__td" style={{ fontSize: 'var(--font-size-xs)' }}>{c.email}</td>
                  <td className="oai-crm__td">{c.list ? <Badge label={c.list} variant="default" size="small" /> : <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>Unassigned</span>}</td>
                  <td className="oai-crm__td">{c.stage ? <Badge label={c.stage} variant={c.stage === 'Replied' ? 'success' : c.stage === 'Negotiating' ? 'info' : 'warning'} size="small" /> : <span style={{ color: 'var(--color-text-muted)' }}>--</span>}</td>
                  <td className="oai-crm__td oai-crm__td--meta">{c.revealedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRows.size > 0 && (
          <div className="oai-search-action-bar">
            <span className="oai-search-action-bar__count">{selectedRows.size} selected</span>
            <Button variant="primary" size="small" label="Add to List" onClick={fn()} />
            <Button variant="ghost" size="small" label="Send Email" onClick={fn()} />
            <Button variant="ghost" size="small" label="Export CSV" onClick={fn()} />
          </div>
        )}
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <PeoplePage />,
};

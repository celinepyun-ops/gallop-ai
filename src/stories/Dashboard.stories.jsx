import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { HelpButton } from './HelpButton';
import { Badge } from './Badge';
import { Button } from './Button';
import { Icons } from './icons';
import './searchpage.css';

const PIPELINE_STAGES = [
  { id: 'sent', label: 'Email Sent' },
  { id: 'replied', label: 'Replied' },
  { id: 'negotiating', label: 'In Negotiation' },
  { id: 'closed', label: 'Closed' },
];

const PIPELINE_CONTACTS = [
  { id: 'pc1', name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', list: 'Sunscreen', stage: 'replied', priority: 'High', lastActivity: 'Replied 3 hours ago', initials: 'SC', color: '#6B8E23' },
  { id: 'pc2', name: 'James Miller', title: 'Director of Retail', company: 'Olay', list: 'Neck Cream', stage: 'replied', priority: 'Medium', lastActivity: 'Replied 1 day ago', initials: 'JM', color: '#DC143C' },
  { id: 'pc3', name: 'Rachel Kim', title: 'Head of Partnerships', company: 'EltaMD', list: 'Sunscreen', stage: 'sent', priority: 'High', lastActivity: 'Email sent Apr 12', initials: 'RK', color: '#4682B4' },
  { id: 'pc4', name: 'Lisa Wang', title: 'Business Development Manager', company: 'StriVectin', list: 'Neck Cream', stage: 'negotiating', priority: 'High', lastActivity: 'Call scheduled Apr 18', initials: 'LW', color: '#8B008B' },
  { id: 'pc5', name: 'Tom Rinks', title: 'Director of Sales', company: 'Sun Bum', list: 'Sunscreen', stage: 'sent', priority: 'Medium', lastActivity: 'Email sent Apr 14', initials: 'TR', color: '#B8860B' },
  { id: 'pc6', name: 'Amy Foster', title: 'Co-Founder', company: 'TruSkin', list: 'Vitamin C Serum', stage: 'sent', priority: 'Medium', lastActivity: 'Email sent Apr 16', initials: 'AF', color: '#FF8C00' },
  { id: 'pc7', name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', list: 'Sunscreen', stage: 'closed', priority: 'Low', lastActivity: 'Declined Apr 14', initials: 'HT', color: '#2E8B57' },
];

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
  <nav aria-label="Settings and account">
    <ul className="oai-sidebar__list">
      <li className="oai-sidebar__item"><button className="oai-sidebar__link"><span className="oai-sidebar__icon">{Icons.settings}</span><span className="oai-sidebar__label">Settings</span></button></li>
      <li className="oai-sidebar__item">
        <button className="oai-sidebar__link" onClick={() => onToggleDark(!darkMode)}>
          <span className="oai-sidebar__icon">{Icons.moon}</span>
          <span className="oai-sidebar__label">Dark Mode</span>
        </button>
      </li>
      <li className="oai-sidebar__item">
        <button className="oai-sidebar__link">
          <Avatar initials="RT" size="small" />
          <span className="oai-sidebar__label">Ryan Torres</span>
        </button>
      </li>
    </ul>
  </nav>
);

export default {
  title: 'Pages/Pipeline',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const PipelinePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [listFilter, setListFilter] = useState('All');

  const filtered = listFilter === 'All' ? PIPELINE_CONTACTS : PIPELINE_CONTACTS.filter((c) => c.list === listFilter);

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="pipeline"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={<Navbar><Search placeholder="Search..." onChange={fn()} /></Navbar>}
    >
      <div style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Pipeline</h1>
            <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{filtered.length} contacts &middot; {filtered.filter((c) => c.stage === 'replied').length} replied &middot; {filtered.filter((c) => c.stage === 'negotiating').length} in negotiation</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            {['All', 'Sunscreen', 'Neck Cream', 'Vitamin C Serum'].map((l) => (
              <button key={l} onClick={() => setListFilter(l)} style={{ padding: 'var(--space-1) var(--space-3)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-full)', background: listFilter === l ? 'var(--color-primary-600)' : 'var(--color-bg-card)', color: listFilter === l ? 'white' : 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Kanban */}
        <div className="oai-crm__kanban">
          {PIPELINE_STAGES.map((stage) => {
            const stageContacts = filtered.filter((c) => c.stage === stage.id);
            return (
              <div key={stage.id} className="oai-crm__kanban-col">
                <div className="oai-crm__kanban-header">
                  <span className="oai-crm__kanban-title">{stage.label}</span>
                  <span className="oai-crm__kanban-count">{stageContacts.length}</span>
                </div>
                <div className="oai-crm__kanban-cards">
                  {stageContacts.map((contact) => (
                    <div key={contact.id} className="oai-crm__kanban-card">
                      <div className="oai-crm__kanban-card-header">
                        <span className="oai-sp-product-cell__avatar" style={{ background: contact.color, width: 28, height: 28, fontSize: 10 }}>{contact.initials}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span className="oai-crm__kanban-card-name">{contact.name}</span>
                          <div className="oai-crm__kanban-card-company">{contact.company}</div>
                        </div>
                      </div>
                      <div className="oai-crm__kanban-card-title">{contact.title}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)', marginBottom: 'var(--space-2)' }}>{contact.lastActivity}</div>
                      <div className="oai-crm__kanban-card-footer">
                        <Badge label={contact.list} variant="default" size="small" />
                        <Badge label={contact.priority} variant={contact.priority === 'High' ? 'warning' : 'info'} size="small" />
                      </div>
                    </div>
                  ))}
                  {stageContacts.length === 0 && <div className="oai-crm__kanban-empty">No contacts</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <PipelinePage />,
};

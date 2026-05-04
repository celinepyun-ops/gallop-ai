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
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

/* ── Sidebar setup ─────────────────────────────────────────────── */
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
          <span className="oai-sidebar__icon">{Icons.moon}</span><span className="oai-sidebar__label">Dark Mode</span>
        </button>
      </li>
      <li className="oai-sidebar__item">
        <button className="oai-sidebar__link"><Avatar initials="RT" size="small" /><span className="oai-sidebar__label">Ryan Torres</span></button>
      </li>
    </ul>
  </nav>
);

/* ── Inbox mock data ───────────────────────────────────────────── */
const INBOX_REPLIES = [
  { id: 'r1', from: { name: 'Sarah Chen', email: 'sarah.chen@cerave.com', title: 'VP of Business Development', company: 'CeraVe', initials: 'SC', color: '#6B8E23' }, subject: 'Re: Partnership Opportunity — Manufacturing Collaboration', preview: 'Hi Ryan, thanks for reaching out! We\'ve been looking to expand our manufacturing partnerships.', body: 'Hi Ryan,\n\nThanks for reaching out! We\'ve been looking to expand our manufacturing partnerships and your proposal aligns well with our current growth strategy.\n\nI\'d love to set up a call this week to discuss further. Would Thursday at 2pm PT work for you?\n\nLooking forward to connecting.\n\nBest,\nSarah Chen\nVP of Business Development, CeraVe', receivedAgo: '3 hours ago', isUnread: true, list: 'Sunscreen' },
  { id: 'r2', from: { name: 'James Miller', email: 'j.miller@olay.com', title: 'Director of Retail', company: 'Olay', initials: 'JM', color: '#DC143C' }, subject: 'Re: Exploring Manufacturing Partnership with Olay', preview: 'Ryan, appreciate the outreach. We\'re currently evaluating new manufacturing partners.', body: 'Ryan,\n\nAppreciate the outreach. We\'re currently evaluating new manufacturing partners for our 2027 product line.\n\nLet me loop in our procurement team.\n\nBest regards,\nJames Miller\nDirector of Retail, Olay', receivedAgo: '1 day ago', isUnread: true, list: 'Neck Cream' },
  { id: 'r3', from: { name: 'Holly Thaggard', email: 'holly@supergoop.com', title: 'Founder & CEO', company: 'Supergoop!', initials: 'HT', color: '#2E8B57' }, subject: 'Re: Supergoop! x Gallop — Manufacturing Partnership', preview: 'Thanks for your email. Unfortunately, we\'re fully committed with our current partners.', body: 'Hi Ryan,\n\nThanks for your email. Unfortunately, we\'re fully committed with our current manufacturing partners for the next 18 months.\n\nHappy to revisit in 2028.\n\nBest,\nHolly Thaggard', receivedAgo: '2 days ago', isUnread: false, list: 'Sunscreen' },
];

export default {
  title: 'Pages/Emails',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const EmailsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeEmailTab, setActiveEmailTab] = useState('summary');
  const [selectedReply, setSelectedReply] = useState(INBOX_REPLIES[0]);
  const [emailSidebarVisible, setEmailSidebarVisible] = useState(true);

  const emailTabs = [
    { id: 'summary', label: 'Summary (0)' },
    { id: 'inbox', label: 'Inbox (2)' },
    { id: 'review', label: 'For Review (2)' },
    { id: 'queue', label: 'Queue (0)' },
    { id: 'sent', label: 'Sent (0)' },
  ];

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="emails"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={<Navbar><Search placeholder="Search..." onChange={fn()} /></Navbar>}
    >
      <div className="oai-sp">
        {/* Left: Email filter sidebar */}
        {emailSidebarVisible && (
        <aside className="oai-sp-filters">
          <div className="oai-sp-filters__header">
            <span className="oai-sp-filters__title">Emails</span>
          </div>
          <div className="oai-sp-progress__context" style={{ borderBottom: 'none', paddingTop: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', padding: 'var(--space-1) var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lists</div>
            {['All', 'Sunscreen', 'Neck Cream', 'Vitamin C Serum'].map((l) => (
              <button key={l} className="oai-sp-progress__context-item"><span className="oai-sp-progress__context-name">{l}</span></button>
            ))}
          </div>
          <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-default)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campaigns</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) var(--space-2)' }}>
              <span>Sunscreen Outreach</span>
              <Badge label="Active" variant="success" size="small" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) var(--space-2)' }}>
              <span>Neck Cream Intro</span>
              <Badge label="Active" variant="success" size="small" />
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-default)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) 0' }}><span>Sent</span><span style={{ fontWeight: 600 }}>0 / 35</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) 0' }}><span>Replies</span><span style={{ fontWeight: 600 }}>2</span></div>
          </div>
        </aside>
        )}

        {/* Right: Main */}
        <main className={`oai-sp-main ${!emailSidebarVisible ? 'oai-sp-main--full' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <button onClick={() => setEmailSidebarVisible(!emailSidebarVisible)} style={{ background: 'none', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-1)', cursor: 'pointer', display: 'flex', color: 'var(--color-text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
              </button>
              <div>
                <h1 className="oai-sp-main__title" style={{ margin: 0 }}>Emails</h1>
                <p className="oai-sp-main__subtitle" style={{ margin: 0 }}>0 / 35 sent today &middot; 2 new replies</p>
              </div>
            </div>
            <Button variant="primary" size="small" label="Connect Email" onClick={fn()} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <Tabs tabs={emailTabs.map((t) => ({ id: t.id, label: t.label }))} activeTab={activeEmailTab} onTabChange={setActiveEmailTab} />
            <div style={{ maxWidth: '240px', flexShrink: 0 }}><Search placeholder="Search..." onChange={fn()} /></div>
          </div>

          {/* Summary Tab */}
          {activeEmailTab === 'summary' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, fontFamily: 'var(--font-family-sans)' }}>This Week</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Apr 21 — Apr 27</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  {[{ v: '8', l: 'Sent' }, { v: '2', l: 'Replied' }, { v: '5', l: 'No Response' }, { v: '25%', l: 'Reply Rate' }].map((m) => (
                    <div key={m.l} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-family-sans)' }}>{m.v}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, fontFamily: 'var(--font-family-sans)' }}>April 2026</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Month to date</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  {[{ v: '42', l: 'Total Sent' }, { v: '12', l: 'Replied' }, { v: '28.6%', l: 'Reply Rate' }, { v: '2', l: 'Deals' }].map((m) => (
                    <div key={m.l} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-family-sans)' }}>{m.v}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Inbox Tab */}
          {activeEmailTab === 'inbox' && (
            <div className="oai-inbox">
              <div className="oai-inbox__list">
                {INBOX_REPLIES.map((reply) => (
                  <button key={reply.id} className={`oai-inbox__item ${selectedReply?.id === reply.id ? 'oai-inbox__item--active' : ''} ${reply.isUnread ? 'oai-inbox__item--unread' : ''}`} onClick={() => setSelectedReply(reply)}>
                    <div className="oai-inbox__item-top">
                      <span className="oai-sp-product-cell__avatar" style={{ background: reply.from.color, width: 32, height: 32, fontSize: 11 }}>{reply.from.initials}</span>
                      <div className="oai-inbox__item-meta">
                        <div className="oai-inbox__item-from">
                          <span className="oai-inbox__item-name">{reply.from.name}</span>
                          <span className="oai-inbox__item-time">{reply.receivedAgo}</span>
                        </div>
                        <div className="oai-inbox__item-company">{reply.from.company}</div>
                      </div>
                    </div>
                    <div className="oai-inbox__item-subject">{reply.subject}</div>
                    <div className="oai-inbox__item-preview">{reply.preview}</div>
                    <div className="oai-inbox__item-footer">
                      <Badge label={reply.list} variant="default" size="small" />
                      {reply.isUnread && <span className="oai-inbox__unread-dot" />}
                    </div>
                  </button>
                ))}
              </div>
              {selectedReply && (
                <div className="oai-inbox__detail">
                  <div className="oai-inbox__detail-header">
                    <div className="oai-inbox__detail-from">
                      <span className="oai-sp-product-cell__avatar" style={{ background: selectedReply.from.color, width: 36, height: 36, fontSize: 12 }}>{selectedReply.from.initials}</span>
                      <div>
                        <div className="oai-inbox__detail-name">{selectedReply.from.name}</div>
                        <div className="oai-inbox__detail-email">{selectedReply.from.email}</div>
                      </div>
                    </div>
                    <Badge label={selectedReply.list} variant="info" size="small" />
                  </div>
                  <div className="oai-inbox__detail-subject">{selectedReply.subject}</div>
                  <div className="oai-inbox__detail-body">
                    {selectedReply.body.split('\n').map((line, i) => (<p key={i} style={{ margin: '0 0 4px', lineHeight: 1.7 }}>{line || '\u00A0'}</p>))}
                  </div>
                  <div className="oai-inbox__detail-actions">
                    <button className="oai-inbox__reply-btn">Reply</button>
                    <button className="oai-inbox__forward-btn">Forward</button>
                    <button className="oai-inbox__stage-btn">Move to Negotiating</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty state for other tabs */}
          {!['summary', 'inbox'].includes(activeEmailTab) && (
            <div style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-4)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>
              <div style={{ marginBottom: 'var(--space-2)' }}>{Icons.campaigns}</div>
              <h3 style={{ margin: '0 0 4px', fontSize: 'var(--font-size-md)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>No emails in {activeEmailTab}</h3>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Emails will appear here.</p>
            </div>
          )}
        </main>
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <EmailsPage />,
};

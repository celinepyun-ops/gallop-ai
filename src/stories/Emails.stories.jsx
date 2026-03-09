import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
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
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
  </div>
);

/* ── Emails mock data ────────────────────────────────────────────── */
const emailQueue = [
  {
    id: 1,
    to: { name: 'Sarah Chen', email: 'sarah.chen@ecoglow.com', title: 'Head of Partnerships, EcoGlow Naturals', company: 'EcoGlow Naturals', location: 'San Francisco, CA, United States' },
    subject: 'Partnership opportunity for EcoGlow Naturals',
    body: `Hey Sarah,\n\nI saw you are leading partnerships at EcoGlow Naturals and driving the brand's expansion on Amazon. Given how fast the clean beauty category is growing, I imagine scaling your seller network is a big priority right now.\n\nWe specialize in helping top-tier beauty brands like EcoGlow connect with high-performing Amazon sellers. We can help your products reach new audiences and increase sales velocity, eliminating the overhead of managing individual seller relationships.\n\nCurious if expanding your Amazon seller network is on your radar this quarter?\n\nBest,\n\nJane Doe\nOutreach AI`,
    signals: [
      { label: 'Head of Partnerships \u2014 EcoGlow Naturals', expandable: true },
      { label: 'Recent Hire \u2014 Mar 2025', expandable: true, detail: 'She started the Head of Partnerships position in March 2025, so she is newly responsible for shaping the partnership strategy and may be actively building new vendor pipelines.' },
      { label: 'Clean Beauty Category Growth', expandable: true, detail: 'EcoGlow Naturals is rapidly growing in clean beauty on Amazon; as Head of Partnerships she likely prioritizes expanding distribution channels.' },
    ],
  },
  {
    id: 2,
    to: { name: 'Marcus Johnson', email: 'marcus@techvibe.com', title: 'Brand Manager, TechVibe Audio', company: 'TechVibe Audio', location: 'Austin, TX, United States' },
    subject: 'Amazon growth strategy for TechVibe Audio',
    body: `Hey Marcus,\n\nI noticed TechVibe Audio has been gaining serious traction in the wireless earbuds category on Amazon. Your latest product launch looks impressive.\n\nWe help audio brands optimize their Amazon presence \u2014 from listing optimization to review management and advertising strategy. Our clients typically see a 40% increase in organic ranking within 90 days.\n\nWould you be open to a quick chat about how we could help TechVibe scale even faster?\n\nBest,\n\nJane Doe\nOutreach AI`,
    signals: [
      { label: 'Brand Manager \u2014 TechVibe Audio', expandable: true },
      { label: 'Product Launch \u2014 Feb 2025', expandable: true, detail: 'TechVibe recently launched new wireless earbuds, suggesting active investment in Amazon growth.' },
    ],
  },
];

export default {
  title: 'Pages/Emails',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const EmailsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeEmailTab, setActiveEmailTab] = useState('review');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSignal, setExpandedSignal] = useState(1);

  const emailTabs = [
    { id: 'review', label: 'For Review', count: emailQueue.length },
    { id: 'queue', label: 'Queue', count: 0 },
    { id: 'drafting', label: 'Drafting', count: 0 },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'failed', label: 'Failed', count: 0 },
  ];

  const currentEmail = emailQueue[currentIndex];

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
      navbar={
        <Navbar>
          <Search placeholder="Search brands..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        {/* Connect email banner */}
        <div className="oai-emails__banner">
          <span className="oai-emails__banner-icon">{Icons.campaigns}</span>
          <span className="oai-emails__banner-text">Connect your email to start sending outreach</span>
          <button className="oai-emails__banner-btn" onClick={fn()}>Connect Email</button>
        </div>

        {/* Header */}
        <div className="oai-emails__header">
          <div className="oai-emails__header-left">
            <h1 className="oai-emails__title">{Icons.campaigns} Emails</h1>
          </div>
          <div className="oai-emails__header-right">
            <span className="oai-emails__count">0 / 35 today</span>
            <Badge label="Active" variant="success" size="small" />
            <button className="oai-emails__action-btn" onClick={fn()}>&#x275A;&#x275A; Pause</button>
            <button className="oai-emails__action-btn oai-emails__action-btn--danger" onClick={fn()}>&#x25A0; Stop All</button>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="oai-emails__toolbar">
          <div className="oai-emails__tabs">
            {emailTabs.map((tab) => (
              <button
                key={tab.id}
                className={`oai-emails__tab ${activeEmailTab === tab.id ? 'oai-emails__tab--active' : ''}`}
                onClick={() => setActiveEmailTab(tab.id)}
              >
                {tab.label}
                <span className={`oai-emails__tab-count ${activeEmailTab === tab.id && tab.count > 0 ? 'oai-emails__tab-count--active' : ''}`}>{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="oai-emails__search-wrap">
            <Search placeholder="Search by name, email, or subject..." onChange={fn()} />
          </div>
        </div>

        {/* Email content */}
        {activeEmailTab === 'review' && currentEmail ? (
          <div className="oai-emails__content">
            {/* Email preview */}
            <div className="oai-emails__preview">
              {/* To line + navigation */}
              <div className="oai-emails__to-row">
                <span className="oai-emails__to-label">To:</span>
                <span className="oai-emails__to-name">{currentEmail.to.name}</span>
                <span className="oai-emails__to-email">&lt;{currentEmail.to.email}&gt;</span>
                <div className="oai-emails__nav">
                  <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>&lt;</button>
                  <span className="oai-emails__nav-count">{currentIndex + 1}/{emailQueue.length}</span>
                  <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.min(emailQueue.length - 1, currentIndex + 1))} disabled={currentIndex === emailQueue.length - 1}>&gt;</button>
                </div>
              </div>

              {/* Subject */}
              <div className="oai-emails__subject">{currentEmail.subject}</div>

              {/* Body */}
              <div className="oai-emails__body">
                {currentEmail.body.split('\n').map((line, i) => (
                  <p key={i} className="oai-emails__body-line">{line || '\u00A0'}</p>
                ))}
              </div>

              {/* Actions */}
              <div className="oai-emails__actions">
                <button className="oai-emails__delete-btn" onClick={fn()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
                <div className="oai-emails__actions-right">
                  <button className="oai-emails__asap-btn" onClick={fn()}>{Icons.sparkle} ASAP</button>
                  <button className="oai-emails__approve-btn" onClick={fn()}>&#x2713; Approve to Send</button>
                </div>
              </div>
            </div>

            {/* Contact sidebar */}
            <div className="oai-emails__contact">
              <div className="oai-emails__contact-header">
                <Avatar initials={currentEmail.to.name.split(' ').map(n => n[0]).join('')} size="medium" />
                <div>
                  <div className="oai-emails__contact-name">{currentEmail.to.name}</div>
                  <div className="oai-emails__contact-title">{currentEmail.to.title}</div>
                  <div className="oai-emails__contact-company">{currentEmail.to.company}</div>
                </div>
              </div>
              <div className="oai-emails__contact-details">
                <div className="oai-emails__contact-row">{Icons.campaigns} {currentEmail.to.email}</div>
                <div className="oai-emails__contact-row">{'\uD83D\uDCCD'} {currentEmail.to.location}</div>
              </div>
              <div className="oai-emails__signals">
                <div className="oai-emails__signals-label">KEY SIGNALS</div>
                {currentEmail.signals.map((signal, i) => (
                  <div key={i} className="oai-emails__signal">
                    <button className="oai-emails__signal-header" onClick={() => setExpandedSignal(expandedSignal === i ? -1 : i)}>
                      <span>{signal.label}</span>
                      <span className="oai-emails__signal-chevron">{expandedSignal === i ? '\u2227' : '\u2228'}</span>
                    </button>
                    {expandedSignal === i && signal.detail && (
                      <div className="oai-emails__signal-detail">{signal.detail}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="oai-emails__empty">
            <div className="oai-emails__empty-icon">{Icons.campaigns}</div>
            <h3 className="oai-emails__empty-title">No emails {activeEmailTab === 'drafting' ? 'drafting' : activeEmailTab === 'sent' ? 'sent' : activeEmailTab === 'failed' ? 'failed' : 'in queue'}</h3>
            <p className="oai-emails__empty-desc">Emails {activeEmailTab === 'drafting' ? 'being drafted' : activeEmailTab === 'sent' ? 'that have been sent' : activeEmailTab === 'failed' ? 'that failed to send' : 'queued for sending'} will appear here</p>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="oai-emails__keyboard-hint">
          <span>{'\u2318'} + Enter to approve</span>
          <span>{'\u2190'} {'\u2192'} to navigate</span>
          <button className="oai-emails__approve-all" onClick={fn()}>&#x2713; Approve all</button>
        </div>
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <EmailsPage />,
};

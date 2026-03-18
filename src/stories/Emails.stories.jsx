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
      { id: 'search', label: 'Search', icon: Icons.search, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
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

/* ── Emails mock data ────────────────────────────────────────────── */
const emailQueue = [
  {
    id: 1,
    to: { name: 'Sarah Chen', email: 'sarah.chen@ecoglow.com', title: 'Head of Partnerships, EcoGlow Naturals', company: 'EcoGlow Naturals', location: 'San Francisco, CA, United States' },
    subject: 'Manufacturing partnership for EcoGlow Naturals',
    body: `Hey Sarah,\n\nI noticed EcoGlow Naturals' Vitamin C Brightening Moisturizer has seen 46% revenue growth this quarter on Amazon — that's incredible traction in the clean beauty category.\n\nI'm Mike Torres at Pacific Beauty Labs. We're a contract manufacturer specializing in sunscreen and skincare formulations, and we've helped brands at your growth stage scale production without compromising quality.\n\nGiven how fast EcoGlow is growing, I imagine keeping up with demand and maintaining your formulation standards is becoming a bigger challenge. We could help you:\n\n• Scale production 3-5x with FDA-compliant facilities\n• Reduce per-unit cost by 15-20% at your current volume\n• Launch new SKUs faster with our R&D team\n\nWould you be open to a 15-minute call this week to explore if there's a fit?\n\nBest,\n\nMike Torres\nBusiness Development Manager\nPacific Beauty Labs`,
    signals: [
      { label: 'Head of Partnerships — Decision-Maker', expandable: true },
      { label: 'Revenue Growth +46% (90-day)', expandable: true, detail: 'EcoGlow Naturals\' Vitamin C Moisturizer has seen 46% revenue growth over 90 days based on Amazon sales rank trend, indicating rapidly scaling demand that may exceed current manufacturing capacity.' },
      { label: 'Recent Hire — Mar 2025', expandable: true, detail: 'Sarah started as Head of Partnerships in March 2025. She is building new vendor relationships and likely evaluating manufacturing partners.' },
      { label: 'Supply Signal — Frequently Out of Stock', expandable: true, detail: 'Keepa data shows this product has had 3 out-of-stock events in the last 60 days, suggesting demand is outpacing current supply — strong indicator they need manufacturing help.' },
    ],
  },
  {
    id: 2,
    to: { name: 'Priya Sharma', email: 'priya@aquaveil.com', title: 'Head of Supply Chain, AquaVeil', company: 'AquaVeil', location: 'New York, NY, United States' },
    subject: 'Scaling production for AquaVeil\'s growth',
    body: `Hey Priya,\n\nI came across AquaVeil's SPF 30 Hydrating Sunscreen — 55% revenue growth and a 52% increase in review velocity is seriously impressive for a brand at your stage.\n\nI'm Mike Torres at Pacific Beauty Labs. We manufacture sunscreen and skincare for growing DTC brands, and we specialize in reef-safe mineral formulations exactly like yours.\n\nI noticed AquaVeil has had some inventory challenges recently. We could help stabilize your supply chain while scaling:\n\n• Mineral sunscreen expertise (zinc oxide, titanium dioxide)\n• MOQ flexibility for brands doing 250-1,000 units/month\n• 4-week lead times vs. the industry standard 8-12 weeks\n\nWorth a quick chat?\n\nBest,\n\nMike Torres\nBusiness Development Manager\nPacific Beauty Labs`,
    signals: [
      { label: 'Head of Supply Chain — Direct Authority', expandable: true },
      { label: 'Revenue Growth +55% (90-day)', expandable: true, detail: 'AquaVeil\'s sunscreen has 55% revenue growth with rapidly accelerating review velocity (+52%), indicating viral growth that will stress current supply chain.' },
      { label: 'Actively Hiring — Scaling Operations', expandable: true, detail: 'LinkedIn shows AquaVeil is hiring for operations roles, confirming they are scaling and likely need manufacturing support.' },
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
          <div className="oai-emails__tabs" role="tablist" aria-label="Email status">
            {emailTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeEmailTab === tab.id}
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
                  <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} aria-label="Previous email">&lt;</button>
                  <span className="oai-emails__nav-count">{currentIndex + 1}/{emailQueue.length}</span>
                  <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.min(emailQueue.length - 1, currentIndex + 1))} disabled={currentIndex === emailQueue.length - 1} aria-label="Next email">&gt;</button>
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
                <button className="oai-emails__delete-btn" onClick={fn()} aria-label="Delete email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
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
                <div className="oai-emails__contact-row"><span aria-hidden="true">{Icons.campaigns}</span> {currentEmail.to.email}</div>
                <div className="oai-emails__contact-row"><span aria-hidden="true">{'\uD83D\uDCCD'}</span> {currentEmail.to.location}</div>
              </div>
              <div className="oai-emails__signals">
                <div className="oai-emails__signals-label">KEY SIGNALS</div>
                {currentEmail.signals.map((signal, i) => (
                  <div key={i} className="oai-emails__signal">
                    <button className="oai-emails__signal-header" onClick={() => setExpandedSignal(expandedSignal === i ? -1 : i)} aria-expanded={expandedSignal === i && !!signal.detail}>
                      <span>{signal.label}</span>
                      <span className="oai-emails__signal-chevron" aria-hidden="true">{expandedSignal === i ? '\u2227' : '\u2228'}</span>
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
            <h2 className="oai-emails__empty-title">No emails {activeEmailTab === 'drafting' ? 'drafting' : activeEmailTab === 'sent' ? 'sent' : activeEmailTab === 'failed' ? 'failed' : 'in queue'}</h2>
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

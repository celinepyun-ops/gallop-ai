import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import './stories/tokens.css';
import './stories/fonts.css';
import { PageLayout } from './stories/PageLayout';
import { Sidebar } from './stories/Sidebar';
import { Navbar } from './stories/Navbar';
import { Search } from './stories/Search';
import { Avatar } from './stories/Avatar';
import { HelpButton } from './stories/HelpButton';
import { StatsCard } from './stories/StatsCard';
import { Table } from './stories/Table';
import { Badge } from './stories/Badge';
import { Tabs } from './stories/Tabs';
import { Breadcrumbs } from './stories/Breadcrumbs';
import { Button } from './stories/Button';
import { Select } from './stories/Select';
import { NotFound } from './stories/NotFound';
import { Login } from './stories/Login';
import { SignUp } from './stories/SignUp';
import { Settings } from './stories/Settings';
import { LandingPage } from './stories/LandingPage';
import { PricingPage } from './stories/PricingPage';
import { ProductPage } from './stories/ProductPage';
import { Icons } from './stories/icons';
import { SearchPage } from './stories/SearchPage';
import { SavedListsPage } from './stories/SavedListsPage';
import { TasksPage } from './stories/TasksPage';
import { TokenBadge, TokenBalance, LeadContactCard } from './stories/TokenReveal';
import './stories/searchpage.css';
import './stories/TokenBadge.css';
const noop = () => {};

/* ── Sidebar footer ──────────────────────────────────────────────── */
const SidebarFooter = ({ darkMode, onToggleDark, onProfileClick, onSettingsClick }) => (
  <ul className="oai-sidebar__list">
    <li>
      <TokenBalance balance={48} />
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={noop}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={onSettingsClick}>
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
      <button className="oai-sidebar__item" onClick={onProfileClick}>
        <span className="oai-sidebar__icon"><Avatar initials="MT" size="small" /></span>
        <span className="oai-sidebar__label">Mike Torres</span>
      </button>
    </li>
  </ul>
);

/* ── Sidebar header ──────────────────────────────────────────────── */
const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

/* ── Campaign config (shared across Email/Pipeline/Lists) ─────────── */
const CAMPAIGNS = [
  { id: 'All', label: 'All Campaigns', status: 'all' },
  { id: 'Sunscreen', label: 'Sunscreen', status: 'active', cadence: '7d follow-up', dailyCap: 10 },
  { id: 'Neck Cream', label: 'Neck Cream', status: 'active', cadence: '7d follow-up', dailyCap: 10 },
  { id: 'Vitamin C Serum', label: 'Vitamin C Serum', status: 'draft', cadence: '14d follow-up', dailyCap: 5 },
];

/* CampaignSwitcher — persistent dropdown shown at top of pages */
const CampaignSwitcher = ({ active, onChange }) => {
  const [open, setOpen] = useState(false);
  const current = CAMPAIGNS.find((c) => c.id === active) || CAMPAIGNS[0];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-card)',
          fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)',
          cursor: 'pointer',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        <span>Viewing:</span>
        <strong style={{ color: 'var(--color-primary-700)' }}>{current.label}</strong>
        {current.status === 'active' && <Badge label="Active" variant="success" size="small" />}
        {current.status === 'draft' && <Badge label="Draft" variant="default" size="small" />}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0,
          minWidth: '260px', background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden',
        }}>
          {CAMPAIGNS.map((c) => (
            <button
              key={c.id}
              onClick={() => { onChange(c.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                padding: 'var(--space-2) var(--space-3)', border: 'none',
                background: c.id === active ? 'var(--color-primary-50)' : 'transparent',
                textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-family-sans)',
                fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)',
                borderBottom: '1px solid var(--color-border-default)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {c.id === active && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2.5"><polyline points="4 12 9 17 20 6" /></svg>}
                <span style={{ marginLeft: c.id === active ? 0 : 18, fontWeight: c.id === active ? 'var(--font-weight-semibold)' : 'normal' }}>{c.label}</span>
              </span>
              {c.status === 'active' && <Badge label="Active" variant="success" size="small" />}
              {c.status === 'draft' && <Badge label="Draft" variant="default" size="small" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Pipeline data ────────────────────────────────────────────────── */
const PIPELINE_CONTACTS = [
  { id: 'pc1', name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', email: 'sarah.chen@cerave.com', list: 'Sunscreen', stage: 'replied', priority: 'High', lastActivity: 'Replied 3 hours ago', initials: 'SC', color: '#6B8E23', companyInfo: { industry: 'Skincare / Sun Care', size: '1,000+', location: 'New York, NY', revenue: '$2.5B (L\'Oreal)', website: 'cerave.com' }, notes: 'Interested in manufacturing partnership. Wants to schedule a call Thursday 2pm PT.' },
  { id: 'pc2', name: 'James Miller', title: 'Director of Retail', company: 'Olay', email: 'j.miller@olay.com', list: 'Neck Cream', stage: 'replied', priority: 'Medium', lastActivity: 'Replied 1 day ago', initials: 'JM', color: '#DC143C', companyInfo: { industry: 'Skincare / Anti-Aging', size: '1,000+', location: 'Cincinnati, OH', revenue: '$3.2B (P&G)', website: 'olay.com' }, notes: 'Looping in procurement team. Expect email from Lisa Park by end of week.' },
  { id: 'pc3', name: 'Rachel Kim', title: 'Head of Partnerships', company: 'EltaMD', email: 'rachel.kim@eltamd.com', list: 'Sunscreen', stage: 'sent', priority: 'High', lastActivity: 'Email sent Apr 12', initials: 'RK', color: '#4682B4', companyInfo: { industry: 'Dermatologist Skincare', size: '51-200', location: 'Boise, ID', revenue: '$45M est.', website: 'eltamd.com' }, notes: 'Sent intro email. Follow up if no reply by Apr 19.' },
  { id: 'pc4', name: 'Lisa Wang', title: 'Business Development Manager', company: 'StriVectin', email: 'lwang@strivectin.com', list: 'Neck Cream', stage: 'negotiating', priority: 'High', lastActivity: 'Call scheduled Apr 18', initials: 'LW', color: '#8B008B', companyInfo: { industry: 'Anti-Aging Skincare', size: '201-1,000', location: 'Nashville, TN', revenue: '$120M est.', website: 'strivectin.com' }, notes: 'Discussing MOQ and pricing. Very interested in private label.' },
  { id: 'pc5', name: 'Tom Rinks', title: 'Director of Sales', company: 'Sun Bum', email: 'tom.r@sunbum.com', list: 'Sunscreen', stage: 'sent', priority: 'Medium', lastActivity: 'Email sent Apr 14', initials: 'TR', color: '#B8860B', companyInfo: { industry: 'Sun Care / Lifestyle', size: '51-200', location: 'Cocoa Beach, FL', revenue: '$60M est.', website: 'sunbum.com' }, notes: '' },
  { id: 'pc6', name: 'Marcus Johnson', title: 'Global Partnerships Manager', company: 'CeraVe', email: 'mjohnson@cerave.com', list: 'Neck Cream', stage: 'sent', priority: 'Medium', lastActivity: 'Email sent Apr 15', initials: 'MJ', color: '#6B8E23', companyInfo: { industry: 'Skincare / Sun Care', size: '1,000+', location: 'Los Angeles, CA', revenue: '$2.5B (L\'Oreal)', website: 'cerave.com' }, notes: '' },
  { id: 'pc7', name: 'Amy Foster', title: 'Co-Founder', company: 'TruSkin', email: 'amy@truskin.com', list: 'Vitamin C Serum', stage: 'sent', priority: 'Medium', lastActivity: 'Email sent Apr 16', initials: 'AF', color: '#FF8C00', companyInfo: { industry: 'Clean Skincare', size: '11-50', location: 'Austin, TX', revenue: '$8M est.', website: 'truskin.com' }, notes: '' },
  { id: 'pc8', name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', email: 'holly@supergoop.com', list: 'Sunscreen', stage: 'closed', priority: 'Low', lastActivity: 'Declined Apr 14', initials: 'HT', color: '#2E8B57', companyInfo: { industry: 'Sun Care / Clean Beauty', size: '201-1,000', location: 'San Antonio, TX', revenue: '$150M est.', website: 'supergoop.com' }, notes: 'Not interested. Fully committed with current partners for 18 months. Revisit in 2028.' },
];

const PIPELINE_STAGES_MAIN = [
  { id: 'sent', label: 'Email Sent' },
  { id: 'replied', label: 'Replied' },
  { id: 'negotiating', label: 'In Negotiation' },
  { id: 'closed', label: 'Closed' },
];

/* ── Page: Pipeline — Kanban Board ───────────────────────────────── */
const DashboardContent = ({ onNavigate, activeCampaign, setActiveCampaign }) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [pipelineDrawer, setPipelineDrawer] = useState(null);

  const filteredContacts = activeCampaign === 'All' ? PIPELINE_CONTACTS : PIPELINE_CONTACTS.filter((c) => c.list === activeCampaign);

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* ── Reply Notification Banner ──────────────────────── */}
      {!bannerDismissed && (
        <div
          onClick={() => onNavigate?.('emails')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', marginBottom: '16px',
            background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)',
            borderLeft: '4px solid var(--color-primary-600)', borderRadius: 'var(--radius-md)',
            cursor: 'pointer', fontFamily: 'var(--font-family-sans)', transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary-100)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-primary-50)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
              <strong>2 new replies</strong> from <strong>Sarah Chen</strong> (CeraVe) and <strong>James Miller</strong> (Olay)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-primary-700)', fontWeight: 600 }}>Open Inbox</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <button onClick={(e) => { e.stopPropagation(); setBannerDismissed(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--color-text-muted)', display: 'flex' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Pipeline</h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{filteredContacts.length} contacts &middot; {filteredContacts.filter((c) => c.stage === 'replied').length} replied &middot; {filteredContacts.filter((c) => c.stage === 'negotiating').length} in negotiation</p>
        </div>
        <CampaignSwitcher active={activeCampaign} onChange={setActiveCampaign} />
      </div>

      {/* ── Kanban Board ─────────────────────────────────── */}
      <div className="oai-crm__kanban">
        {PIPELINE_STAGES_MAIN.map((stage) => {
          const stageContacts = filteredContacts.filter((c) => c.stage === stage.id);
          return (
            <div key={stage.id} className="oai-crm__kanban-col">
              <div className="oai-crm__kanban-header">
                <span className="oai-crm__kanban-title">{stage.label}</span>
                <span className="oai-crm__kanban-count">{stageContacts.length}</span>
              </div>
              <div className="oai-crm__kanban-cards">
                {stageContacts.map((contact) => (
                  <div key={contact.id} className="oai-crm__kanban-card" onClick={() => setPipelineDrawer(contact)}>
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
                      <Badge label={contact.priority} variant={contact.priority === 'High' ? 'warning' : contact.priority === 'Low' ? 'default' : 'info'} size="small" />
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

      {/* ── Person Detail Drawer ─────────────────────────── */}
      {pipelineDrawer && (
        <div className="oai-crm-drawer-backdrop" onClick={() => setPipelineDrawer(null)}>
          <aside className="oai-crm-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="oai-crm-drawer__header">
              <button className="oai-crm-drawer__close" onClick={() => setPipelineDrawer(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Profile */}
            <div className="oai-crm-drawer__profile">
              <span className="oai-sp-product-cell__avatar" style={{ background: pipelineDrawer.color, width: 48, height: 48, fontSize: 16 }}>{pipelineDrawer.initials}</span>
              <h2 className="oai-crm-drawer__name">{pipelineDrawer.name}</h2>
              <p className="oai-crm-drawer__title">{pipelineDrawer.title}</p>
              <p className="oai-crm-drawer__company">{pipelineDrawer.company}</p>
            </div>

            {/* Status badges */}
            <div className="oai-crm-drawer__badges">
              <Badge label={PIPELINE_STAGES_MAIN.find((s) => s.id === pipelineDrawer.stage)?.label || pipelineDrawer.stage} variant={pipelineDrawer.stage === 'replied' ? 'success' : pipelineDrawer.stage === 'negotiating' ? 'info' : pipelineDrawer.stage === 'closed' ? 'default' : 'warning'} size="small" />
              <Badge label={pipelineDrawer.priority} variant={pipelineDrawer.priority === 'High' ? 'warning' : 'info'} size="small" />
              <Badge label={pipelineDrawer.list} variant="default" size="small" />
            </div>

            {/* Contact Details */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Contact</div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>{pipelineDrawer.email}</span>
              </div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                <span>{pipelineDrawer.lastActivity}</span>
              </div>
            </div>

            {/* Company Info */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Company</div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>{pipelineDrawer.companyInfo.industry}</span>
              </div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                <span>{pipelineDrawer.companyInfo.size} employees</span>
              </div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{pipelineDrawer.companyInfo.location}</span>
              </div>
              <div className="oai-crm-drawer__row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                <span>{pipelineDrawer.companyInfo.revenue}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="oai-crm-drawer__section">
              <div className="oai-crm-drawer__section-title">Notes</div>
              <p className="oai-crm-drawer__notes">{pipelineDrawer.notes || 'No notes yet.'}</p>
            </div>

            {/* Actions */}
            <div className="oai-crm-drawer__actions">
              <Button variant="primary" size="medium" label="Send Email" onClick={() => onNavigate?.('emails')} />
              <Button variant="ghost" size="medium" label="Change Stage" onClick={() => {}} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

/* ── Search Results mock data ─────────────────────────────────────── */
const searchResults = [
  { title: 'EcoGlow Naturals Vitamin C Brightening Moisturizer with Hyaluronic Acid', asin: 'B0CK9X2M1P', brand: 'EcoGlow Naturals', seller: 'EcoGlow Naturals LLC', isBrand: true, price: '$24.97', rating: 4.6, reviews: 1243, salesRank: 8420, monthlyRevenue: 22223, revenueGrowth: 46, salesRankTrend: -38, reviewVelocity: 32, priceStability: 'stable', partnershipScore: 92, brandStage: 'sweet-spot', estimatedMonthlySales: 890 },
  { title: 'SunShield Pro SPF 50 Mineral Sunscreen, Reef-Safe, Lightweight', asin: 'B0DJ7M3KN2', brand: 'SunShield Pro', seller: 'SunShield Pro Inc.', isBrand: true, price: '$18.49', rating: 4.5, reviews: 876, salesRank: 12300, monthlyRevenue: 11834, revenueGrowth: 38, salesRankTrend: -31, reviewVelocity: 28, priceStability: 'stable', partnershipScore: 88, brandStage: 'sweet-spot', estimatedMonthlySales: 640 },
  { title: 'PureRadiance Retinol Night Cream Anti-Aging Face Moisturizer', asin: 'B0BN4L8FQ3', brand: 'PureRadiance', seller: 'PureRadiance Beauty Co.', isBrand: true, price: '$21.99', rating: 4.4, reviews: 2108, salesRank: 15600, monthlyRevenue: 11215, revenueGrowth: 29, salesRankTrend: -24, reviewVelocity: 18, priceStability: 'stable', partnershipScore: 82, brandStage: 'sweet-spot', estimatedMonthlySales: 510 },
  { title: 'GlowUp Skin Niacinamide Serum 10% + Zinc for Pore Minimizer', asin: 'B0CRK8V1N4', brand: 'GlowUp Skin', seller: 'GlowUp Skin Care', isBrand: true, price: '$15.99', rating: 4.3, reviews: 645, salesRank: 21400, monthlyRevenue: 6076, revenueGrowth: 22, salesRankTrend: -19, reviewVelocity: 41, priceStability: 'moderate', partnershipScore: 78, brandStage: 'sweet-spot', estimatedMonthlySales: 380 },
  { title: 'Derma Botanics Collagen Peptide Face Cream with Vitamin E', asin: 'B0DM6P2KR5', brand: 'Derma Botanics', seller: 'Derma Botanics Ltd.', isBrand: true, price: '$28.50', rating: 4.7, reviews: 3456, salesRank: 6800, monthlyRevenue: 29925, revenueGrowth: 18, salesRankTrend: -14, reviewVelocity: 12, priceStability: 'stable', partnershipScore: 75, brandStage: 'sweet-spot', estimatedMonthlySales: 1050 },
  { title: 'AquaVeil Hydrating Sunscreen SPF 30 for Sensitive Skin', asin: 'B0CJ3N7MP6', brand: 'AquaVeil', seller: 'AquaVeil Skincare', isBrand: true, price: '$16.99', rating: 4.5, reviews: 412, salesRank: 34200, monthlyRevenue: 4248, revenueGrowth: 55, salesRankTrend: -42, reviewVelocity: 52, priceStability: 'stable', partnershipScore: 85, brandStage: 'sweet-spot', estimatedMonthlySales: 250 },
  { title: 'BotaniShield Zinc Oxide Sunscreen SPF 50+ Broad Spectrum', asin: 'B0BK2M9LN7', brand: 'BotaniShield', seller: 'BotaniShield Naturals', isBrand: true, price: '$22.00', rating: 4.2, reviews: 289, salesRank: 42100, monthlyRevenue: 4180, revenueGrowth: 61, salesRankTrend: -48, reviewVelocity: 67, priceStability: 'moderate', partnershipScore: 80, brandStage: 'sweet-spot', estimatedMonthlySales: 190 },
  { title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin', asin: 'B00TTD9BRC', brand: 'CeraVe', seller: "L'Oreal USA", isBrand: false, price: '$18.96', rating: 4.7, reviews: 138412, salesRank: 42, monthlyRevenue: 540360, revenueGrowth: 3, salesRankTrend: -2, reviewVelocity: 4, priceStability: 'stable', partnershipScore: 25, brandStage: 'enterprise', estimatedMonthlySales: 28500 },
  { title: 'Neutrogena Hydro Boost Gel Moisturizer for Dry Skin', asin: 'B00NR1YQHQ', brand: 'Neutrogena', seller: 'DiscountBeautyMart', isBrand: false, price: '$19.97', rating: 4.5, reviews: 62300, salesRank: 210, monthlyRevenue: 239640, revenueGrowth: 4, salesRankTrend: -1, reviewVelocity: 5, priceStability: 'stable', partnershipScore: 22, brandStage: 'enterprise', estimatedMonthlySales: 12000 },
  { title: 'FreshFace Co Aloe Vera Gel Moisturizer, Lightweight Daily Hydrator', asin: 'B0DN8K4QM8', brand: 'FreshFace Co', seller: 'FreshFace Co', isBrand: true, price: '$12.99', rating: 4.1, reviews: 87, salesRank: 78400, monthlyRevenue: 1429, revenueGrowth: 12, salesRankTrend: -8, reviewVelocity: 24, priceStability: 'volatile', partnershipScore: 42, brandStage: 'early', estimatedMonthlySales: 110 },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const TrendArrow = ({ value, suffix = '%' }) => {
  if (value === null || value === undefined) return <span className="oai-results__trend oai-results__trend--neutral">—</span>;
  const isPositive = value > 0;
  return <span className={`oai-results__trend oai-results__trend--${isPositive ? 'up' : 'down'}`}>{isPositive ? '▲' : '▼'} {Math.abs(value)}{suffix}</span>;
};

const InfoTooltip = ({ children, wide }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const handleEnter = () => {
    const rect = iconRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setShow(true);
  };
  return (
    <span className="oai-info-tooltip" onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)}>
      <span className="oai-info-tooltip__icon" ref={iconRef} aria-label="More info">ℹ</span>
      {show && createPortal(
        <div className={`oai-info-tooltip__portal ${wide ? 'oai-info-tooltip__portal--wide' : ''}`} style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}>
          {children}
        </div>,
        document.body
      )}
    </span>
  );
};

const ScoreBadge = ({ score, product }) => {
  if (score === null || score === undefined) return null;
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  let variant = 'low';
  if (score >= 80) variant = 'high';
  else if (score >= 60) variant = 'medium';
  if (!product) return <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>;
  const handleEnter = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setShow(true);
  };
  return (
    <span className="oai-info-tooltip" onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)} ref={ref}>
      <span className={`oai-results__score oai-results__score--${variant}`}>{score}</span>
      {show && createPortal(
        <div className="oai-info-tooltip__portal oai-info-tooltip__portal--wide" style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}>
          <strong>Score Breakdown</strong>
          <span className="oai-info-tooltip__row">Revenue Growth {product.revenueGrowth > 30 ? '+20' : product.revenueGrowth > 10 ? '+10' : product.revenueGrowth < -10 ? '−15' : '0'}</span>
          <span className="oai-info-tooltip__row">Sales Rank Fit {product.salesRank >= 5000 && product.salesRank <= 50000 ? '+15' : '−10'}</span>
          <span className="oai-info-tooltip__row">Price Stability {product.priceStability === 'stable' ? '+5' : '0'}</span>
          <span className="oai-info-tooltip__row">Review Velocity {product.reviewVelocity > 10 ? '+10' : '0'}</span>
          <span className="oai-info-tooltip__row oai-info-tooltip__row--total">Base 50 → Total {score}</span>
        </div>,
        document.body
      )}
    </span>
  );
};

const StageBadge = ({ stage }) => {
  const labels = { 'sweet-spot': 'Sweet Spot', early: 'Early', established: 'Established', enterprise: 'Enterprise', unknown: '—' };
  const variants = { 'sweet-spot': 'success', early: 'warning', established: 'info', enterprise: 'muted', unknown: 'muted' };
  return <span className={`oai-results__stage oai-results__stage--${variants[stage] || 'muted'}`}>{labels[stage] || stage}</span>;
};

const countryOptions = [
  { value: 'US', label: '🇺🇸 United States' }, { value: 'UK', label: '🇬🇧 United Kingdom' },
  { value: 'DE', label: '🇩🇪 Germany' }, { value: 'JP', label: '🇯🇵 Japan' },
  { value: 'CA', label: '🇨🇦 Canada' }, { value: 'FR', label: '🇫🇷 France' },
];
const appCategories = {
  'Cosmetics & Beauty': ['Sun Protection', 'Skin Care', 'Hair Care', 'Makeup', 'Beauty Tools', 'Fragrance', 'Nail Care', 'Body Lotions'],
  'Electronics': ['Smart Home', 'Audio & Headphones', 'Phone Accessories', 'Wearables', 'Cameras', 'Computer Accessories', 'Portable Chargers'],
  'Supplements & Health': ['Vitamins', 'Protein & Fitness', 'Probiotics', 'Herbal Supplements', 'Collagen', 'Sleep & Relaxation', 'Immune Support'],
  'Home & Kitchen': ['Kitchen Gadgets', 'Home Organization', 'Bedding', 'Cleaning Supplies', 'Candles & Fragrances', 'Small Appliances'],
  'Sports & Outdoors': ['Fitness Equipment', 'Yoga & Pilates', 'Camping & Hiking', 'Water Sports', 'Cycling', 'Running'],
  'Baby & Kids': ['Baby Care', 'Feeding', 'Toys & Games', 'Kids Clothing', 'Safety', 'Nursery'],
  'Pet Supplies': ['Dog Supplies', 'Cat Supplies', 'Pet Grooming', 'Pet Health', 'Fish & Aquarium', 'Pet Toys'],
};
const categoryOptions = Object.keys(appCategories).map((n) => ({ value: n, label: n }));
const getSubcategoryOptions = (cat) => (appCategories[cat] || []).map((s) => ({ value: s, label: s }));

/* ── Mock leads per product (token-gated contact reveal) ────────── */
const mockLeads = {
  'EcoGlow Naturals': [
    { id: 'l1', name: 'Sarah Chen', role: 'Founder & CEO', email: 'sarah@ecoglownaturals.com', linkedin: 'linkedin.com/in/sarahchen', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l2', name: 'David Park', role: 'Head of Supply Chain', email: 'david@ecoglownaturals.com', linkedin: 'linkedin.com/in/davidpark', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l3', name: 'Lisa Nguyen', role: 'Product Manager', email: 'lisa@ecoglownaturals.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'SunShield Pro': [
    { id: 'l4', name: 'Maria Santos', role: 'Co-Founder', email: 'maria@sunshieldpro.com', linkedin: 'linkedin.com/in/mariasantos', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l5', name: 'James Liu', role: 'Operations Director', email: 'james@sunshieldpro.com', linkedin: 'linkedin.com/in/jamesliu', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'AquaVeil': [
    { id: 'l6', name: 'Priya Sharma', role: 'Founder', email: 'priya@aquaveil.com', linkedin: 'linkedin.com/in/priyasharma', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l7', name: 'Tom Bradley', role: 'VP of Manufacturing', email: 'tom@aquaveil.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'PureRadiance': [
    { id: 'l8', name: 'Kevin Wright', role: 'CEO', email: 'kevin@pureradiance.com', linkedin: 'linkedin.com/in/kevinwright', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l9', name: 'Nina Patel', role: 'Procurement Lead', email: 'nina@pureradiance.com', linkedin: 'linkedin.com/in/ninapatel', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
  ],
  'BotaniShield': [
    { id: 'l10', name: 'Rachel Kim', role: 'Founder', email: 'rachel@botanishield.com', linkedin: 'linkedin.com/in/rachelkim', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
  ],
  'GlowUp Skin': [
    { id: 'l11', name: 'Alex Rivera', role: 'Co-Founder & COO', email: 'alex@glowupskin.com', linkedin: 'linkedin.com/in/alexrivera', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l12', name: 'Jenny Zhao', role: 'Brand Manager', email: 'jenny@glowupskin.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'Derma Botanics': [
    { id: 'l13', name: 'Emma Liu', role: 'Head of Product', email: 'emma@dermabotanics.com', linkedin: 'linkedin.com/in/emmaliu', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'high' },
    { id: 'l14', name: 'Carlos Mendez', role: 'Supply Chain Manager', email: 'carlos@dermabotanics.com', linkedin: 'linkedin.com/in/carlosmendez', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'FreshFace Co': [
    { id: 'l15', name: 'Amanda Brooks', role: 'Founder', email: 'amanda@freshfaceco.com', linkedin: 'linkedin.com/in/amandabrooks', hasEmail: true, hasLinkedin: true, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'Neutrogena': [
    { id: 'l16', name: 'Corporate Partnerships', role: 'Johnson & Johnson', email: 'partnerships@jnj.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
  'CeraVe': [
    { id: 'l17', name: 'Corporate Partnerships', role: "L'Oréal Group", email: 'partnerships@loreal.com', linkedin: '', hasEmail: true, hasLinkedin: false, emailRevealed: false, linkedinRevealed: false, confidence: 'medium' },
  ],
};

const LeadDrawer = ({ brand, product, onClose, onAddToContacts, tokenBalance: externalBalance, onTokenSpend: externalTokenSpend }) => {
  const leads = mockLeads[brand] || [];
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [localTokenBalance, setLocalTokenBalance] = useState(externalBalance ?? 48);
  const toggleLead = (id) => setSelectedLeads((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);
  const toggleAllLeads = () => setSelectedLeads(selectedLeads.length === leads.length ? [] : leads.map((l) => l.id));

  const handleTokenSpend = (cost, field, leadId) => {
    setLocalTokenBalance((prev) => Math.max(0, prev - cost));
    externalTokenSpend?.(cost, field, leadId);
  };

  return (
    <>
      <div className="oai-lead-drawer__overlay" onClick={onClose} />
      <aside className="oai-lead-drawer" role="dialog" aria-label={`Leads for ${brand}`}>
        <div className="oai-lead-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <h2 className="oai-lead-drawer__title">Product Leads</h2>
            <TokenBadge cost={localTokenBalance} variant={localTokenBalance < 10 ? 'balance-low' : 'balance'} />
          </div>
          <button className="oai-lead-drawer__close" onClick={onClose} aria-label="Close panel">✕</button>
        </div>
        <div className="oai-lead-drawer__body">
          <div className="oai-lead-drawer__brand-summary">
            <div className="oai-lead-drawer__brand-info">
              <div className="oai-lead-drawer__brand-name">{brand}</div>
              <div className="oai-lead-drawer__brand-meta">
                Score: {product.partnershipScore} · {product.brandStage === 'sweet-spot' ? 'Sweet Spot' : product.brandStage} · ▲ {product.revenueGrowth}% growth
              </div>
            </div>
            <ScoreBadge score={product.partnershipScore} product={product} />
          </div>
          <div className="oai-lead-drawer__section-label">
            Decision Makers ({leads.length})
            {leads.length > 0 && (
              <span style={{ float: 'right', cursor: 'pointer', color: 'var(--color-primary-600)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 'var(--font-weight-normal)' }} onClick={toggleAllLeads}>
                {selectedLeads.length === leads.length ? 'Deselect All' : 'Select All'}
              </span>
            )}
          </div>
          {leads.length === 0 ? (
            <div className="oai-lead-drawer__empty">No leads found for this product yet.</div>
          ) : (
            leads.map((lead) => (
              <LeadContactCard
                key={lead.id}
                lead={lead}
                tokenBalance={localTokenBalance}
                onTokenSpend={handleTokenSpend}
                selected={selectedLeads.includes(lead.id)}
                onSelect={toggleLead}
              />
            ))
          )}
        </div>
        <div className="oai-lead-drawer__footer">
          <span className="oai-lead-drawer__selected-count">{selectedLeads.length > 0 ? `${selectedLeads.length} selected` : 'Select contacts to add'}</span>
          <button className="oai-lead-drawer__btn oai-lead-drawer__btn--primary" disabled={selectedLeads.length === 0} onClick={() => { onAddToContacts(leads.filter((l) => selectedLeads.includes(l.id))); }}>
            Add to People ({selectedLeads.length})
          </button>
        </div>
      </aside>
    </>
  );
};

/* ── AI Brand Badge (stays as "Brand" — this is AI seller analysis) ── */
const AIBrandBadge = ({ isBrand }) => (
  <span className={`oai-results__ai-badge oai-results__ai-badge--${isBrand ? 'brand' : 'reseller'}`}>
    {isBrand ? 'Brand \u2713' : 'Reseller'}
  </span>
);

/* ── Search Tab Config ──────────────────────────────────────────── */
const SEARCH_TABS = [
  { id: 'product', label: 'Product', icon: '📦', description: 'Find Growing Products', subtitle: 'Discover fast-growing Amazon products ready for manufacturing partnerships.', placeholder: 'Try "vitamin C serum under $25 with high growth"' },
  { id: 'brand', label: 'Brand', icon: '🏷️', description: 'Discover Brands', subtitle: 'Find and analyze Amazon brands by aggregated product performance.', placeholder: 'Try "skincare brands with 20%+ growth in US"' },
  { id: 'people', label: 'People', icon: '👤', description: 'Find Decision Makers', subtitle: 'Search contacts and decision makers at target brands.', placeholder: 'Try "founder of EcoGlow Naturals" or "VP supply chain cosmetics"' },
  { id: 'company', label: 'Company', icon: '🏢', description: 'Search Companies', subtitle: 'Find manufacturers and brand companies for partnership opportunities.', placeholder: 'Try "cosmetics manufacturer in California with 50+ employees"' },
];

/* ── Page: Search ───────────────────────────────────────────────── */
const SearchContent = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('product');
  const [keyword, setKeyword] = useState('sunscreen');
  const [country, setCountry] = useState('US');
  const [category, setCategory] = useState('Cosmetics & Beauty');
  const [subcategory, setSubcategory] = useState('Sun Protection');
  const [minRating, setMinRating] = useState('3.5');
  const [rankMin, setRankMin] = useState('1000');
  const [rankMax, setRankMax] = useState('50000');
  const [revenueMin, setRevenueMin] = useState('');
  const [revenueMax, setRevenueMax] = useState('');
  const [growthMin, setGrowthMin] = useState('');
  const [growthMax, setGrowthMax] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('partnershipScore');
  const [sortDir, setSortDir] = useState('desc');
  const [drawerProduct, setDrawerProduct] = useState(null);
  const currentTab = SEARCH_TABS.find((t) => t.id === activeTab);

  const handleSearch = useCallback(() => {
    setLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      setResults(searchResults);
      setLoading(false);
    }, 1200);
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    const aVal = a[sortBy] ?? 0;
    const bVal = b[sortBy] ?? 0;
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const toggleSelect = (asin) => {
    setSelected((prev) => prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin]);
  };

  const toggleAll = () => {
    setSelected(selected.length === sortedResults.length ? [] : sortedResults.map((r) => r.asin));
  };

  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('desc'); }
  };

  const SortHeader = ({ label, field, className }) => (
    <th className={`oai-results__th oai-results__th--sortable ${className || ''}`} onClick={() => handleSort(field)}>
      {label}{sortBy === field && <span className="oai-results__sort-icon">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div className="oai-search-page__header">
        <h1 className="oai-search-page__title">{currentTab.description}</h1>
        <p className="oai-search-page__subtitle">{currentTab.subtitle}</p>
      </div>

      {/* ── Search Category Tabs ──────────────────────────────── */}
      <div className="oai-search-tabs">
        {SEARCH_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`oai-search-tabs__tab ${activeTab === tab.id ? 'oai-search-tabs__tab--active' : ''}`}
            onClick={() => { setActiveTab(tab.id); setResults([]); setHasSearched(false); }}
          >
            <span className="oai-search-tabs__icon">{tab.icon}</span>
            <span className="oai-search-tabs__label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="oai-search-card">
        {/* ── NLP Search Input ──────────────────────────────────── */}
        <div className="oai-search-card__nlp-row">
          <div className="oai-search-card__nlp-input-wrap">
            <svg className="oai-search-card__nlp-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              className="oai-search-card__nlp-input"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={currentTab.placeholder}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            {keyword && (
              <button className="oai-search-card__nlp-clear" onClick={() => setKeyword('')} aria-label="Clear search">✕</button>
            )}
          </div>
          <span className="oai-search-card__nlp-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M12 18v4"/><path d="M8 22h8"/></svg>
            AI-powered natural language search
          </span>
        </div>

        {/* ── Structured Filters (Product & Brand tabs) ─────────── */}
        {(activeTab === 'product' || activeTab === 'brand') && (
        <>
        <div className="oai-search-card__form-grid oai-search-card__form-grid--3col" style={{ marginTop: 'var(--space-4)' }}>
          <div className="oai-search-card__field">
            <Select label="Country" options={countryOptions} value={country} onChange={(e) => setCountry(e.target.value)} id="search-country" />
          </div>
          <div className="oai-search-card__field">
            <Select label="Category" options={categoryOptions} value={category} onChange={(e) => { setCategory(e.target.value); setSubcategory(''); }} id="search-category" />
          </div>
          <div className="oai-search-card__field">
            <Select label="Sub-Category" placeholder="All sub-categories" options={getSubcategoryOptions(category)} value={subcategory} onChange={(e) => setSubcategory(e.target.value)} id="search-subcategory" />
          </div>
        </div>

        <button className="oai-search-card__advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)} type="button">
          {showAdvanced ? '▾ Hide' : '▸ Show'} Advanced Filters
        </button>

        {showAdvanced && (
          <div className="oai-search-card__form-grid oai-search-card__form-grid--advanced">
            <div className="oai-search-card__field">
              <Select
                label="Min Rating"
                options={[
                  { value: '', label: 'Any' },
                  { value: '3.0', label: '3.0+' },
                  { value: '3.5', label: '3.5+' },
                  { value: '4.0', label: '4.0+' },
                  { value: '4.5', label: '4.5+' },
                ]}
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                id="search-min-rating"
              />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label">Sales Rank</label>
              <div className="oai-search-card__range-group">
                <input className="oai-search-card__text-input" type="number" value={rankMin} onChange={(e) => setRankMin(e.target.value)} placeholder="Min" aria-label="Sales rank minimum" />
                <span className="oai-search-card__range-sep">to</span>
                <input className="oai-search-card__text-input" type="number" value={rankMax} onChange={(e) => setRankMax(e.target.value)} placeholder="Max" aria-label="Sales rank maximum" />
              </div>
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label">Monthly Revenue ($)</label>
              <div className="oai-search-card__range-group">
                <input className="oai-search-card__text-input" type="number" value={revenueMin} onChange={(e) => setRevenueMin(e.target.value)} placeholder="Min" aria-label="Monthly revenue minimum" />
                <span className="oai-search-card__range-sep">to</span>
                <input className="oai-search-card__text-input" type="number" value={revenueMax} onChange={(e) => setRevenueMax(e.target.value)} placeholder="Max" aria-label="Monthly revenue maximum" />
              </div>
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label">Growth Value (%)</label>
              <div className="oai-search-card__range-group">
                <input className="oai-search-card__text-input" type="number" value={growthMin} onChange={(e) => setGrowthMin(e.target.value)} placeholder="Min" aria-label="Growth value minimum" />
                <span className="oai-search-card__range-sep">to</span>
                <input className="oai-search-card__text-input" type="number" value={growthMax} onChange={(e) => setGrowthMax(e.target.value)} placeholder="Max" aria-label="Growth value maximum" />
              </div>
            </div>
          </div>
        )}
        </>
        )}

        {/* ── People tab filters ───────────────────────────────── */}
        {activeTab === 'people' && (
          <div className="oai-search-card__form-grid oai-search-card__form-grid--3col" style={{ marginTop: 'var(--space-4)' }}>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="people-role">Role</label>
              <Select id="people-role" placeholder="All roles" options={[{ value: '', label: 'All Roles' }, { value: 'founder', label: 'Founder / CEO' }, { value: 'supply-chain', label: 'Supply Chain' }, { value: 'product', label: 'Product Manager' }, { value: 'sales', label: 'Sales / BD' }]} onChange={noop} />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="people-company">Company</label>
              <input id="people-company" className="oai-search-card__text-input" type="text" placeholder="e.g. EcoGlow Naturals" />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="people-source">Source</label>
              <Select id="people-source" options={[{ value: '', label: 'All Sources' }, { value: 'apollo', label: 'Apollo' }, { value: 'linkedin', label: 'LinkedIn' }, { value: 'manual', label: 'Manual' }]} onChange={noop} />
            </div>
          </div>
        )}

        {/* ── Company tab filters ──────────────────────────────── */}
        {activeTab === 'company' && (
          <div className="oai-search-card__form-grid oai-search-card__form-grid--3col" style={{ marginTop: 'var(--space-4)' }}>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="company-industry">Industry</label>
              <Select id="company-industry" placeholder="All industries" options={[{ value: '', label: 'All Industries' }, { value: 'cosmetics', label: 'Cosmetics & Beauty' }, { value: 'supplements', label: 'Health & Supplements' }, { value: 'electronics', label: 'Electronics' }, { value: 'home', label: 'Home & Garden' }]} onChange={noop} />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="company-size">Company Size</label>
              <Select id="company-size" options={[{ value: '', label: 'Any Size' }, { value: '1-10', label: '1–10' }, { value: '11-50', label: '11–50' }, { value: '51-200', label: '51–200' }, { value: '200+', label: '200+' }]} onChange={noop} />
            </div>
            <div className="oai-search-card__field">
              <label className="oai-search-card__label" htmlFor="company-location">Location</label>
              <input id="company-location" className="oai-search-card__text-input" type="text" placeholder="e.g. California, USA" />
            </div>
          </div>
        )}

        <div className="oai-search-card__form-row">
          <div className="oai-search-card__feature-callout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            {activeTab === 'product' || activeTab === 'brand' ? 'Powered by Keepa + AI — results ranked by growth potential' : activeTab === 'people' ? 'Powered by Apollo + AI — enriched contact data' : 'Powered by Ocean.io + AI — company intelligence'}
          </div>
          <button className="oai-search-card__search-btn" onClick={handleSearch} disabled={loading}>
            {loading ? <><span className="oai-search-card__spinner" /> Analyzing...</> : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> Search</>}
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="oai-results">
          <div className="oai-results__header">
            <h2 className="oai-results__title">{loading ? 'Searching...' : `${sortedResults.length} Products Found`}</h2>
            {!loading && sortedResults.length > 0 && <span className="oai-results__subtitle">Sorted by {sortBy === 'partnershipScore' ? 'Partnership Score' : sortBy}</span>}
          </div>

          {loading ? (
            <div className="oai-results__loading">
              <div className="oai-results__loading-bar" />
              <p className="oai-results__loading-text">Fetching products from Amazon via Keepa API...</p>
              <p className="oai-results__loading-subtext">Analyzing growth metrics with AI</p>
            </div>
          ) : (
            <div className="oai-results__table-wrap">
              <table className="oai-results__table">
                <thead>
                  <tr>
                    <th className="oai-results__th oai-results__th--check">
                      <input type="checkbox" aria-label="Select all products" checked={selected.length === sortedResults.length && sortedResults.length > 0} onChange={toggleAll} />
                    </th>
                    <th className="oai-results__th oai-results__th--title">Product</th>
                    <th className="oai-results__th">Brand <InfoTooltip wide><strong>AI Seller Analysis</strong><br/>AI analyzes the seller to determine if they are the actual brand owner or a third-party reseller.</InfoTooltip></th>
                    <SortHeader label="Price" field="price" />
                    <SortHeader label={<>Score <InfoTooltip><strong>Partnership Score (0–100)</strong><br/>Weighted from: revenue growth, sales rank fit, price stability, and review velocity. Higher = better manufacturing partner fit.</InfoTooltip></>} field="partnershipScore" />
                    <SortHeader label="Sales Rank" field="salesRank" />
                    <SortHeader label="Rev. Growth" field="revenueGrowth" />
                    <SortHeader label="Rating" field="rating" />
                    <SortHeader label="Reviews" field="reviews" />
                    <th className="oai-results__th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((product) => (
                    <tr key={product.asin} className={`oai-results__row ${selected.includes(product.asin) ? 'oai-results__row--selected' : ''}`}>
                      <td className="oai-results__td oai-results__td--check">
                        <input type="checkbox" aria-label={`Select ${product.title}`} checked={selected.includes(product.asin)} onChange={() => toggleSelect(product.asin)} />
                      </td>
                      <td className="oai-results__td oai-results__td--title">
                        <div className="oai-results__product-title">{product.title}</div>
                        <div className="oai-results__product-asin">ASIN: {product.asin}</div>
                      </td>
                      <td className="oai-results__td">
                        <div className="oai-results__brand-cell">
                          <span className="oai-results__brand-name">{product.brand}</span>
                          <AIBrandBadge isBrand={product.isBrand} />
                        </div>
                      </td>
                      <td className="oai-results__td">{product.price}</td>
                      <td className="oai-results__td oai-results__td--score"><ScoreBadge score={product.partnershipScore} product={product} /></td>
                      <td className="oai-results__td">{product.salesRank.toLocaleString()}</td>
                      <td className="oai-results__td"><TrendArrow value={product.revenueGrowth} /></td>
                      <td className="oai-results__td"><span className="oai-results__rating">{product.rating}</span></td>
                      <td className="oai-results__td">{product.reviews.toLocaleString()}</td>
                      <td className="oai-results__td">
                        <button className="oai-results__action-btn" onClick={() => setDrawerProduct(product)} title="View product leads">View Lead →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selected.length > 0 && (
            <div className="oai-results__list-section">
              <h3 className="oai-results__list-title">Selected Products <span className="oai-results__list-count">{selected.length}</span></h3>
              <div className="oai-results__list-items">
                {sortedResults.filter((r) => selected.includes(r.asin)).map((product) => (
                  <div key={product.asin} className="oai-results__list-item">
                    <div className="oai-results__list-item-info">
                      <span className="oai-results__list-item-name">{product.title}</span>
                      <span className="oai-results__list-item-brand">{product.brand} · Score: {product.partnershipScore} · Rev. Growth: +{product.revenueGrowth}%</span>
                    </div>
                    <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)}>✕</button>
                  </div>
                ))}
              </div>
              <div className="oai-results__list-actions">
                <button className="oai-results__bulk-btn oai-results__bulk-btn--primary" onClick={() => onNavigate?.('people')}>Find Decision Makers ({selected.length})</button>
                <button className="oai-results__bulk-btn">Export CSV</button>
              </div>
            </div>
          )}
        </div>
      )}

      {drawerProduct && (
        <LeadDrawer
          brand={drawerProduct.brand}
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onAddToContacts={(contacts) => {
            setDrawerProduct(null);
            onNavigate?.('people');
          }}
        />
      )}
    </div>
  );
};

/* ── Page: Email Templates ───────────────────────────────────────── */
const TemplatesContent = () => (
  <div style={{ maxWidth: '1100px' }}>
    <div className="oai-templates__header">
      <div>
        <h1 className="oai-templates__title">Email Templates</h1>
        <p className="oai-templates__subtitle">Create and manage reusable email templates</p>
      </div>
      <button className="oai-templates__new-btn" onClick={noop}>
        + New Template
      </button>
    </div>
    <div className="oai-templates__empty">
      <div className="oai-templates__empty-icon">
        {Icons.templates}
      </div>
      <h2 className="oai-templates__empty-title">No templates yet</h2>
      <p className="oai-templates__empty-desc">Create your first email template to speed up your outreach</p>
      <button className="oai-templates__create-btn" onClick={noop}>
        + Create Template
      </button>
    </div>
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
  {
    id: 3, list: 'Sunscreen', priority: 'High',
    to: { name: 'Sarah Chen', email: 'sarah.chen@cerave.com', title: 'VP of Business Development, CeraVe', company: 'CeraVe', location: 'New York, NY' },
    subject: 'CeraVe Mineral Sunscreen — manufacturing partnership',
    body: `Hi Sarah,\n\nCeraVe Mineral Sunscreen has hit 42K repeat purchases in the last 90 days — incredible traction.\n\nI'm Ryan at Pacific Beauty Labs. We specialize in reef-safe mineral sunscreen manufacturing and have helped brands scale at exactly your growth stage.\n\nWorth a 15-min call this week?\n\nBest,\nRyan`,
    signals: [{ label: '42K repeat purchases (90d)', expandable: false }, { label: 'TikTok Shop +340%', expandable: false }],
  },
  {
    id: 4, list: 'Sunscreen', priority: 'Medium',
    to: { name: 'Tom Rinks', email: 'tom.r@sunbum.com', title: 'Director of Sales, Sun Bum', company: 'Sun Bum', location: 'Cocoa Beach, FL' },
    subject: 'Scaling Sun Bum production for SPF 50',
    body: `Hi Tom,\n\nSun Bum Original SPF 50 has been steadily climbing the Amazon Sun Care category. Curious if you'd be open to exploring manufacturing capacity.\n\nWe handle reef-safe formulations and can scale 3-5x without quality compromise.\n\n15-min chat?\n\nRyan`,
    signals: [{ label: 'Top 100 Sun Care Amazon', expandable: false }],
  },
  {
    id: 5, list: 'Sunscreen', priority: 'High',
    to: { name: 'Rachel Kim', email: 'rachel.kim@eltamd.com', title: 'Head of Partnerships, EltaMD', company: 'EltaMD', location: 'Boise, ID' },
    subject: 'EltaMD x Pacific Beauty Labs — partnership',
    body: `Hi Rachel,\n\nEltaMD UV Clear has been a dermatologist favorite — your formulation standards are well known.\n\nI'm Ryan at Pacific Beauty Labs. We work with dermatologist-grade brands on contract manufacturing and could help with capacity expansion.\n\nWorth a quick call?\n\nRyan`,
    signals: [{ label: 'Dermatologist-grade brand', expandable: false }],
  },
  {
    id: 6, list: 'Neck Cream', priority: 'High',
    to: { name: 'Lisa Wang', email: 'lwang@strivectin.com', title: 'BD Manager, StriVectin', company: 'StriVectin', location: 'Nashville, TN' },
    subject: 'StriVectin TL Neck Cream — manufacturing scale',
    body: `Hi Lisa,\n\nStriVectin TL Advanced Neck Cream has been #1 on Amazon Neck Care for 4 weeks running. Impressive momentum.\n\nWe specialize in anti-aging formulations and private label production. Curious if there's a fit.\n\nRyan`,
    signals: [{ label: '#1 Amazon Neck Care 4 weeks', expandable: false }, { label: 'Target expansion', expandable: false }],
  },
  {
    id: 7, list: 'Neck Cream', priority: 'Medium',
    to: { name: 'Marcus Johnson', email: 'mjohnson@cerave.com', title: 'Global Partnerships, CeraVe', company: 'CeraVe', location: 'Los Angeles, CA' },
    subject: 'CeraVe Neck Cream — capacity expansion',
    body: `Hi Marcus,\n\nCeraVe Skin Renewing Neck Cream is gaining strong traction. As you scale into more retail channels, manufacturing capacity becomes critical.\n\nWe'd love to explore a partnership.\n\nRyan`,
    signals: [{ label: 'Retail expansion', expandable: false }],
  },
  {
    id: 8, list: 'Vitamin C Serum', priority: 'Medium',
    to: { name: 'Amy Foster', email: 'amy@truskin.com', title: 'Co-Founder, TruSkin', company: 'TruSkin', location: 'Austin, TX' },
    subject: 'TruSkin Vitamin C — scaling production',
    body: `Hi Amy,\n\nTruSkin Vitamin C Serum has built impressive Amazon presence. As a co-founder, manufacturing reliability must be top of mind.\n\nWe work with clean skincare brands on contract manufacturing.\n\nWorth a chat?\n\nRyan`,
    signals: [{ label: 'Clean skincare leader', expandable: false }],
  },
];

// Add list/priority defaults to first 2 entries
emailQueue[0].list = 'Sunscreen';
emailQueue[0].priority = 'High';
emailQueue[1].list = 'Sunscreen';
emailQueue[1].priority = 'High';

/* ── Page: Emails ────────────────────────────────────────────────── */
/* SentimentBadge — AI-classified reply sentiment */
const SentimentBadge = ({ sentiment }) => {
  const cfg = {
    positive: { label: 'Positive', bg: 'var(--color-success-100)', color: 'var(--color-success-700)', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="4 12 9 17 20 6" /></svg> },
    neutral: { label: 'Promising', bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /></svg> },
    negative: { label: 'Declined', bg: 'var(--color-neutral-100)', color: 'var(--color-text-muted)', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> },
  };
  const c = cfg[sentiment] || cfg.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', background: c.bg, color: c.color, fontSize: '10px', fontWeight: 'var(--font-weight-semibold)', fontFamily: 'var(--font-family-sans)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {c.icon}{c.label}
    </span>
  );
};

/* SequenceStepBadge — which follow-up step the email is on */
const SequenceStepBadge = ({ step }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', background: 'var(--color-neutral-100)', color: 'var(--color-text-secondary)', fontSize: '10px', fontWeight: 'var(--font-weight-medium)', fontFamily: 'var(--font-family-sans)' }}>
    Step {step}
  </span>
);

/* ── Inbox mock data — received replies ──────────────────────────── */
const INBOX_REPLIES = [
  {
    id: 'reply-1',
    from: { name: 'Sarah Chen', email: 'sarah.chen@cerave.com', title: 'VP of Business Development', company: 'CeraVe', initials: 'SC', color: '#6B8E23' },
    subject: 'Re: Partnership Opportunity — Manufacturing Collaboration',
    preview: 'Hi Ryan, thanks for reaching out! We\'ve been looking to expand our manufacturing partnerships. I\'d love to set up a call this week to discuss further.',
    body: 'Hi Ryan,\n\nThanks for reaching out! We\'ve been looking to expand our manufacturing partnerships and your proposal aligns well with our current growth strategy.\n\nI\'d love to set up a call this week to discuss further. Would Thursday at 2pm PT work for you?\n\nLooking forward to connecting.\n\nBest,\nSarah Chen\nVP of Business Development, CeraVe',
    receivedAt: '2026-04-16 09:23 AM',
    receivedAgo: '3 hours ago',
    isUnread: true,
    list: 'Sunscreen List',
    stage: 'replied',
    sentiment: 'positive',
    sentimentReason: 'Mentioned scheduling a call, confirmed alignment with growth strategy',
    sequenceStep: 1,
  },
  {
    id: 'reply-2',
    from: { name: 'James Miller', email: 'j.miller@olay.com', title: 'Director of Retail', company: 'Olay', initials: 'JM', color: '#DC143C' },
    subject: 'Re: Exploring Manufacturing Partnership with Olay',
    preview: 'Ryan, appreciate the outreach. We\'re currently evaluating new manufacturing partners for our 2027 product line. Let me loop in our procurement team.',
    body: 'Ryan,\n\nAppreciate the outreach. We\'re currently evaluating new manufacturing partners for our 2027 product line.\n\nLet me loop in our procurement team — they\'ll be the right people to continue this conversation. Expect an email from Lisa Park (lisa.park@olay.com) by end of week.\n\nBest regards,\nJames Miller\nDirector of Retail, Olay',
    receivedAt: '2026-04-15 04:47 PM',
    receivedAgo: '1 day ago',
    isUnread: true,
    list: 'Neck Cream List',
    stage: 'replied',
    sentiment: 'neutral',
    sentimentReason: 'Looped in another contact — needs follow-up to nurture',
    sequenceStep: 1,
  },
  {
    id: 'reply-3',
    from: { name: 'Holly Thaggard', email: 'holly@supergoop.com', title: 'Founder & CEO', company: 'Supergoop!', initials: 'HT', color: '#2E8B57' },
    subject: 'Re: Supergoop! x Gallop — Manufacturing Partnership',
    preview: 'Thanks for your email. Unfortunately, we\'re fully committed with our current manufacturing partners for the next 18 months. Happy to revisit in 2028.',
    body: 'Hi Ryan,\n\nThanks for your email. Unfortunately, we\'re fully committed with our current manufacturing partners for the next 18 months.\n\nHappy to revisit in 2028 — feel free to reach out again then.\n\nBest,\nHolly Thaggard\nFounder & CEO, Supergoop!',
    receivedAt: '2026-04-14 11:15 AM',
    receivedAgo: '2 days ago',
    isUnread: false,
    list: 'Sunscreen List',
    stage: 'replied',
    sentiment: 'negative',
    sentimentReason: 'Declined — fully committed with current partners',
    sequenceStep: 1,
  },
];

const EmailsContent = ({ activeCampaign, setActiveCampaign, pendingCampaignList, clearPendingCampaign }) => {
  const [activeEmailTab, setActiveEmailTab] = useState('summary');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSignal, setExpandedSignal] = useState(1);
  const [reviewQueue, setReviewQueue] = useState([...emailQueue]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [selectedReply, setSelectedReply] = useState(INBOX_REPLIES[0]);
  const [inboxReplies, setInboxReplies] = useState(INBOX_REPLIES);
  // Bulk send state
  const [bulkSelected, setBulkSelected] = useState(new Set());
  const [previewEmailId, setPreviewEmailId] = useState(null);
  const [bulkSendModalOpen, setBulkSendModalOpen] = useState(false);
  // Token + quota config
  const TOKENS_TOTAL = 200;
  const TOKENS_USED = 58;
  const TOKENS_LEFT = TOKENS_TOTAL - TOKENS_USED;
  const DAILY_CAP = 35;

  const handleApprove = () => {
    const remaining = reviewQueue.filter((_, i) => i !== currentIndex);
    setApprovedCount((c) => c + 1);
    setReviewQueue(remaining);
    if (currentIndex >= remaining.length) setCurrentIndex(Math.max(0, remaining.length - 1));
  };

  const handleDelete = () => {
    const remaining = reviewQueue.filter((_, i) => i !== currentIndex);
    setReviewQueue(remaining);
    if (currentIndex >= remaining.length) setCurrentIndex(Math.max(0, remaining.length - 1));
  };

  const handleApproveAll = () => {
    setApprovedCount((c) => c + reviewQueue.length);
    setReviewQueue([]);
    setCurrentIndex(0);
  };

  const handleMarkRead = (id) => {
    setInboxReplies((prev) => prev.map((r) => r.id === id ? { ...r, isUnread: false } : r));
  };

  // Bulk send helpers
  const filteredQueue = activeCampaign === 'All' ? reviewQueue : reviewQueue.filter((e) => e.list === activeCampaign);
  const previewEmail = filteredQueue.find((e) => e.id === previewEmailId) || filteredQueue[0];
  const toggleBulkRow = (id) => setBulkSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const selectAllVisible = () => setBulkSelected(new Set(filteredQueue.map((e) => e.id)));
  const selectByList = (list) => setBulkSelected(new Set(filteredQueue.filter((e) => e.list === list).map((e) => e.id)));
  const selectByPriority = (priority) => setBulkSelected(new Set(filteredQueue.filter((e) => e.priority === priority).map((e) => e.id)));
  const clearBulkSelection = () => setBulkSelected(new Set());
  const handleBulkSend = () => {
    setApprovedCount((c) => c + bulkSelected.size);
    setReviewQueue((prev) => prev.filter((e) => !bulkSelected.has(e.id)));
    setBulkSelected(new Set());
    setBulkSendModalOpen(false);
  };

  // Estimated send time (4-8 min spacing)
  const estimateMinutes = (count) => Math.round(count * 6); // avg 6 min apart
  const formatFinishTime = (mins) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + mins);
    return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const unreadCount = inboxReplies.filter((r) => r.isUnread).length;

  const emailTabs = [
    { id: 'summary', label: 'Summary', count: 0 },
    { id: 'inbox', label: 'Inbox', count: unreadCount },
    { id: 'review', label: 'For Review', count: filteredQueue.length },
    { id: 'queue', label: 'Queue', count: approvedCount },
    { id: 'sent', label: 'Sent', count: 0 },
  ];

  const currentEmail = reviewQueue[currentIndex];

  const EMAIL_LISTS = ['All', 'Sunscreen', 'Neck Cream', 'Vitamin C Serum'];
  const EMAIL_CAMPAIGNS = [
    { id: 'q2-sunscreen', name: 'Q2 Sunscreen Launch', list: 'Sunscreen', status: 'active', stats: '5 sent · 2 replied', progress: { day0: 5, day3: 5, day7: 2, day14: 0 }, totalContacts: 5, currentDay: 7 },
    { id: 'spring-mfg', name: 'Spring Manufacturing Outreach', list: 'Sunscreen', status: 'active', stats: '3 sent · 1 replied', progress: { day0: 3, day3: 3, day7: 0, day14: 0 }, totalContacts: 3, currentDay: 4 },
    { id: 'q2-neckcream', name: 'Q2 Neck Cream Intro', list: 'Neck Cream', status: 'active', stats: '2 sent · 1 reply', progress: { day0: 2, day3: 2, day7: 0, day14: 0 }, totalContacts: 2, currentDay: 5 },
    { id: 'vitamin-spring', name: 'Vitamin C Spring 2026', list: 'Vitamin C Serum', status: 'draft', stats: 'Not started', progress: { day0: 0, day3: 0, day7: 0, day14: 0 }, totalContacts: 1, currentDay: 0 },
  ];
  const [sidebarFolded, setSidebarFolded] = useState({ lists: false, campaigns: false, today: false });
  const toggleFold = (key) => setSidebarFolded((prev) => ({ ...prev, [key]: !prev[key] }));

  // Create Campaign modal state — multi-stage flow
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [campaignNamingDone, setCampaignNamingDone] = useState(false); // false = naming screen, true = tabbed UI
  const [campaignTab, setCampaignTab] = useState('leads');
  const [leadsSubstep, setLeadsSubstep] = useState('empty'); // empty | choose-source | upload | processed
  const [uploadSource, setUploadSource] = useState(null); // 'csv' | 'gsheets' | 'manual'
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    list: 'Sunscreen',
    dailyCap: 10,
    businessHours: true,
    sentimentAuto: true,
    duplicateCheck: { campaigns: true, lists: true, workspace: false },
    // Schedule
    startWhen: 'now', // 'now' | 'scheduled'
    endWhen: 'no_end', // 'no_end' | 'scheduled'
    scheduleName: 'New schedule',
    fromTime: '9:00 AM',
    toTime: '6:00 PM',
    timezone: 'Eastern Time (US & Canada) (UTC-04:00)',
    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
  });
  const updateCampaignForm = (field, value) => setCampaignForm((prev) => ({ ...prev, [field]: value }));

  // Sequence steps — empty by default, user adds Step 1, 2, 3, max 4
  const [sequenceSteps, setSequenceSteps] = useState([]);
  const [activeSequenceIdx, setActiveSequenceIdx] = useState(0);
  const addSequenceStep = () => {
    if (sequenceSteps.length >= 4) return;
    setSequenceSteps((prev) => [
      ...prev,
      { subject: '', body: '', delayValue: 3, delayUnit: 'days' },
    ]);
    setActiveSequenceIdx(sequenceSteps.length);
  };
  const updateSequenceStep = (idx, field, value) => {
    setSequenceSteps((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };
  const removeSequenceStep = (idx) => {
    setSequenceSteps((prev) => prev.filter((_, i) => i !== idx));
    setActiveSequenceIdx((prev) => Math.max(0, prev > idx ? prev - 1 : prev));
  };

  // CSV column mapping state — 14 mock columns from Apollo-style import
  const initialColumnMappings = [
    { col: 'Person Name', type: 'do_not_import', samples: ['Oj Songsong', 'Kevin Ho', 'Shivani Choudhary', 'Adedapo Mustapha'] },
    { col: 'Person First name', type: 'first_name', samples: ['Oj', 'Kevin', 'Shivani', 'Adedapo'] },
    { col: 'Person Last name', type: 'last_name', samples: ['Songsong', 'Ho', 'Choudhary', 'Mustapha'] },
    { col: 'Person Title', type: 'job_title', samples: ['Executive Assistant to CEO / HR', 'Senior Sales Executive', 'Sales Manager', 'Chief Executive Officer'] },
    { col: 'Person Seniority', type: 'do_not_import', samples: ['Other', 'Other', 'Manager', 'C-Level'] },
    { col: 'Person Location', type: 'location', samples: ['Metro Manila', 'Kuala Lumpur, Malaysia', 'Noida, India', 'Lekki, Lagos, Nigeria'] },
    { col: 'Person Email', type: 'email', samples: ['oj@jvsionadvertising.com', 'kevin@8848agency.com', 'shivani@adtric.com', 'adedapo@thrivetechafrica.com'] },
    { col: 'Person Email Status', type: 'do_not_import', samples: ['Guessed', 'Guessed', 'Guessed', 'Guessed'] },
    { col: 'Person LinkedIn', type: 'linkedin', samples: ['linkedin.com/in/ojsongsong', 'linkedin.com/in/kevin-ho', 'linkedin.com/in/shivani-c', 'linkedin.com/in/adedapo-m'] },
    { col: 'Person Phone', type: 'do_not_import', samples: ['—', '—', '—', '—'] },
    { col: 'Company', type: 'company_name', samples: ['JVsion Advertising', '8848 Communications', 'Adtric Solutions', 'ThriveTech Africa'] },
    { col: 'Country', type: 'do_not_import', samples: ['United States', 'United Kingdom', 'India', 'Nigeria'] },
    { col: 'Domain', type: 'website', samples: ['jvsionadvertising.com', '8848agency.com', 'adtric.com', 'thrivetechafrica.com'] },
    { col: 'Industries', type: 'do_not_import', samples: ['Advertising, Marketing', 'Advertising, PR', 'Digital Marketing', 'IT, Consulting'] },
  ];
  const [columnMappings, setColumnMappings] = useState(initialColumnMappings);
  const updateColumnType = (idx, type) => setColumnMappings((prev) => prev.map((c, i) => i === idx ? { ...c, type } : c));

  const closeCreateCampaign = () => {
    setCreateCampaignOpen(false);
    setCampaignNamingDone(false);
    setCampaignTab('leads');
    setLeadsSubstep('empty');
    setUploadSource(null);
    setSequenceSteps([]);
    setActiveSequenceIdx(0);
    clearPendingCampaign?.();
  };

  useEffect(() => {
    if (pendingCampaignList) {
      setCampaignForm((prev) => ({ ...prev, list: pendingCampaignList, name: `${pendingCampaignList} Outreach` }));
      setCreateCampaignOpen(true);
      setCampaignNamingDone(true); // skip naming when coming from a list
    }
  }, [pendingCampaignList]);
  const activateCampaign = () => {
    closeCreateCampaign();
    // Mock: in real app, would create campaign in backend
  };
  const [emailSidebarVisible, setEmailSidebarVisible] = useState(true);

  return (
    <div className="oai-sp">
      {/* ── LEFT: Email Sidebar ──────────────────────────── */}
      {emailSidebarVisible && (
      <aside className="oai-sp-filters">
        <div className="oai-sp-filters__header">
          <span className="oai-sp-filters__title">Emails</span>
        </div>

        {/* Lists — collapsible */}
        <div style={{ borderBottom: '1px solid var(--color-border-default)' }}>
          <button onClick={() => toggleFold('lists')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-family-sans)' }}>
            <span>Lists</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: sidebarFolded.lists ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {!sidebarFolded.lists && (
            <div style={{ paddingBottom: 'var(--space-2)' }}>
              {EMAIL_LISTS.map((listName) => (
                <button
                  key={listName}
                  className={`oai-sp-progress__context-item ${activeCampaign === listName ? 'oai-sp-progress__context-item--active' : ''}`}
                  onClick={() => setActiveCampaign(listName)}
                >
                  <span className="oai-sp-progress__context-name">{listName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Campaigns — collapsible */}
        <div style={{ borderBottom: '1px solid var(--color-border-default)' }}>
          <button onClick={() => toggleFold('campaigns')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-family-sans)' }}>
            <span>Campaigns</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: sidebarFolded.campaigns ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {!sidebarFolded.campaigns && (
            <div style={{ padding: '0 var(--space-3) var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <button
                onClick={() => setCreateCampaignOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: 'var(--space-2)', border: '1px dashed var(--color-primary-400)',
                  borderRadius: 'var(--radius-md)', background: 'transparent',
                  color: 'var(--color-primary-700)', cursor: 'pointer',
                  fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                New Campaign
              </button>
              {EMAIL_CAMPAIGNS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCampaign(c.list)}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '2px',
                    padding: 'var(--space-2)', border: '1px solid var(--color-border-default)',
                    borderRadius: 'var(--radius-md)', background: activeCampaign === c.list ? 'var(--color-primary-50)' : 'var(--color-bg-card)',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-family-sans)',
                    transition: 'background 0.15s, border-color 0.15s',
                    borderColor: activeCampaign === c.list ? 'var(--color-primary-500)' : 'var(--color-border-default)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <Badge label={c.status === 'active' ? 'Active' : 'Draft'} variant={c.status === 'active' ? 'success' : 'default'} size="small" />
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: c.status === 'active' ? '6px' : 0 }}>{c.list} &middot; {c.stats}</div>
                  {c.status === 'active' && (
                    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                      {[
                        { day: 0, count: c.progress.day0, label: 'D0' },
                        { day: 3, count: c.progress.day3, label: 'D3' },
                        { day: 7, count: c.progress.day7, label: 'D7' },
                        { day: 14, count: c.progress.day14, label: 'D14' },
                      ].map((s) => {
                        const pct = c.totalContacts > 0 ? (s.count / c.totalContacts) * 100 : 0;
                        const isCurrent = s.day <= c.currentDay && (s.day === 0 || c.currentDay > [0, 3, 7, 14][[0, 3, 7, 14].indexOf(s.day) - 1]);
                        return (
                          <div key={s.day} title={`${s.label}: ${s.count}/${c.totalContacts} sent`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                            <div style={{ width: '100%', height: '3px', borderRadius: '1px', background: 'var(--color-neutral-100)', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: isCurrent ? 'var(--color-primary-600)' : pct > 0 ? 'var(--color-success)' : 'transparent', transition: 'width 0.3s' }} />
                            </div>
                            <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontWeight: pct > 0 ? 'var(--font-weight-semibold)' : 'normal' }}>{s.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Today — collapsible */}
        <div>
          <button onClick={() => toggleFold('today')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-family-sans)' }}>
            <span>Today</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: sidebarFolded.today ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {!sidebarFolded.today && (
            <div style={{ padding: '0 var(--space-3) var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) 0', fontFamily: 'var(--font-family-sans)' }}>
                <span>Sent</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{approvedCount} / 35</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) 0', fontFamily: 'var(--font-family-sans)' }}>
                <span>Replies</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{unreadCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', padding: 'var(--space-1) 0', fontFamily: 'var(--font-family-sans)' }}>
                <span>In Queue</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{reviewQueue.length}</span>
              </div>
            </div>
          )}
        </div>
      </aside>
      )}

      {/* ── RIGHT: Main Content ──────────────────────────── */}
      <main className={`oai-sp-main ${!emailSidebarVisible ? 'oai-sp-main--full' : ''}`}>
        {/* Compact header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {!emailSidebarVisible && (
              <button onClick={() => setEmailSidebarVisible(true)} style={{ background: 'none', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-1)', cursor: 'pointer', display: 'flex', color: 'var(--color-text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
            )}
            {emailSidebarVisible && (
              <button onClick={() => setEmailSidebarVisible(false)} style={{ background: 'none', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-1)', cursor: 'pointer', display: 'flex', color: 'var(--color-text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
              </button>
            )}
            <div>
              <h1 className="oai-sp-main__title" style={{ margin: 0 }}>Emails</h1>
              <p className="oai-sp-main__subtitle" style={{ margin: 0 }}>{approvedCount} / 35 sent today &middot; {unreadCount} new {unreadCount === 1 ? 'reply' : 'replies'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <CampaignSwitcher active={activeCampaign} onChange={setActiveCampaign} />
            <Button variant="primary" size="small" label="Connect Email" onClick={noop} />
          </div>
        </div>

        {/* Tabs + Search in one row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <Tabs
            tabs={emailTabs.map((t) => ({ id: t.id, label: `${t.label} (${t.count})` }))}
            activeTab={activeEmailTab}
            onTabChange={setActiveEmailTab}
          />
          <div style={{ maxWidth: '240px', flexShrink: 0 }}>
            <Search placeholder="Search..." onChange={noop} />
          </div>
        </div>

        {/* ── SUMMARY TAB ──────────────────────────────────── */}
        {activeEmailTab === 'summary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Weekly + Monthly side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {/* This Week */}
              <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>This Week</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>Apr 14 — Apr 20</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  {[
                    { value: '8', label: 'Sent', color: 'var(--color-text-primary)' },
                    { value: '2', label: 'Replied', color: 'var(--color-success)' },
                    { value: '5', label: 'No Response', color: 'var(--color-text-secondary)' },
                    { value: '25%', label: 'Reply Rate', color: 'var(--color-primary-600)' },
                  ].map((m) => (
                    <div key={m.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'var(--font-weight-semibold)', color: m.color, fontFamily: 'var(--font-family-sans)' }}>{m.value}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'var(--space-3)', height: '6px', borderRadius: '3px', background: 'var(--color-neutral-100)', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: '25%', background: 'var(--color-success)' }} />
                  <div style={{ width: '12.5%', background: 'var(--color-primary-600)' }} />
                  <div style={{ width: '62.5%', background: 'var(--color-neutral-200)' }} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-1)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} /> Replied</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary-600)', display: 'inline-block' }} /> Negotiating</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-neutral-200)', display: 'inline-block' }} /> Waiting</span>
                </div>
              </div>

              {/* This Month */}
              <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>April 2026</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>Month to date</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  {[
                    { value: '42', label: 'Total Sent', color: 'var(--color-text-primary)' },
                    { value: '12', label: 'Replied', color: 'var(--color-success)' },
                    { value: '28.6%', label: 'Reply Rate', color: 'var(--color-primary-600)' },
                    { value: '2', label: 'Deals', color: 'var(--color-primary-600)' },
                  ].map((m) => (
                    <div key={m.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'var(--font-weight-semibold)', color: m.color, fontFamily: 'var(--font-family-sans)' }}>{m.value}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                {/* By list breakdown */}
                <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {[
                    { name: 'Sunscreen', sent: 18, replied: 6, rate: '33%' },
                    { name: 'Neck Cream', sent: 15, replied: 4, rate: '27%' },
                    { name: 'Vitamin C Serum', sent: 9, replied: 2, rate: '22%' },
                  ].map((l) => (
                    <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', padding: 'var(--space-1) 0' }}>
                      <span style={{ width: '100px', color: 'var(--color-text-secondary)' }}>{l.name}</span>
                      <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--color-neutral-100)', overflow: 'hidden' }}>
                        <div style={{ width: `${(l.replied / l.sent) * 100}%`, height: '100%', background: 'var(--color-success)', borderRadius: '2px' }} />
                      </div>
                      <span style={{ color: 'var(--color-text-muted)', minWidth: '70px', textAlign: 'right' }}>{l.replied}/{l.sent} ({l.rate})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Needs Follow-up section */}
            <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)', marginBottom: 'var(--space-3)' }}>Needs Follow-up (3+ days no reply)</div>
              {[
                { name: 'Rachel Kim', company: 'EltaMD', list: 'Sunscreen', sentDate: 'Apr 12', daysAgo: 8, initials: 'RK', color: '#4682B4' },
                { name: 'Tom Rinks', company: 'Sun Bum', list: 'Sunscreen', sentDate: 'Apr 14', daysAgo: 6, initials: 'TR', color: '#B8860B' },
                { name: 'Marcus Johnson', company: 'CeraVe', list: 'Neck Cream', sentDate: 'Apr 15', daysAgo: 5, initials: 'MJ', color: '#6B8E23' },
                { name: 'Amy Foster', company: 'TruSkin', list: 'Vitamin C Serum', sentDate: 'Apr 16', daysAgo: 4, initials: 'AF', color: '#FF8C00' },
              ].map((c) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-border-default)', fontFamily: 'var(--font-family-sans)' }}>
                  <span className="oai-sp-product-cell__avatar" style={{ background: c.color, width: 28, height: 28, fontSize: 10, flexShrink: 0 }}>{c.initials}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{c.company}</div>
                  </div>
                  <Badge label={c.list} variant="default" size="small" />
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Sent {c.sentDate}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: c.daysAgo >= 7 ? 'var(--color-error)' : 'var(--color-text-secondary)', fontWeight: 'var(--font-weight-medium)' }}>{c.daysAgo}d ago</span>
                  <Button variant="ghost" size="small" label="Send Follow-up" onClick={() => {}} />
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ── INBOX TAB ─────────────────────────────────────── */}
      {activeEmailTab === 'inbox' && (
        <div className="oai-inbox">
          {/* Reply list (left) — sorted by sentiment priority: positive → neutral → negative */}
          <div className="oai-inbox__list">
            {[...inboxReplies].sort((a, b) => {
              const order = { positive: 0, neutral: 1, negative: 2 };
              return (order[a.sentiment] ?? 3) - (order[b.sentiment] ?? 3);
            }).map((reply) => (
              <button
                key={reply.id}
                className={`oai-inbox__item ${selectedReply?.id === reply.id ? 'oai-inbox__item--active' : ''} ${reply.isUnread ? 'oai-inbox__item--unread' : ''}`}
                onClick={() => { setSelectedReply(reply); handleMarkRead(reply.id); }}
              >
                <div className="oai-inbox__item-top">
                  <span className="oai-sp-product-cell__avatar" style={{ background: reply.from.color, width: 32, height: 32, fontSize: 11, flexShrink: 0 }}>{reply.from.initials}</span>
                  <div className="oai-inbox__item-meta">
                    <div className="oai-inbox__item-from">
                      <span className="oai-inbox__item-name">{reply.from.name}</span>
                      <span className="oai-inbox__item-time">{reply.receivedAgo}</span>
                    </div>
                    <div className="oai-inbox__item-company">{reply.from.company} &middot; {reply.from.title}</div>
                  </div>
                </div>
                <div className="oai-inbox__item-subject">{reply.subject}</div>
                <div className="oai-inbox__item-preview">{reply.preview}</div>
                <div className="oai-inbox__item-footer">
                  <SentimentBadge sentiment={reply.sentiment} />
                  <Badge label={reply.list} variant="default" size="small" />
                  {reply.isUnread && <span className="oai-inbox__unread-dot" />}
                </div>
              </button>
            ))}
          </div>

          {/* Reply detail (right) */}
          {selectedReply && (
            <div className="oai-inbox__detail">
              <div className="oai-inbox__detail-header">
                <div className="oai-inbox__detail-from">
                  <span className="oai-sp-product-cell__avatar" style={{ background: selectedReply.from.color, width: 36, height: 36, fontSize: 12 }}>{selectedReply.from.initials}</span>
                  <div>
                    <div className="oai-inbox__detail-name">{selectedReply.from.name}</div>
                    <div className="oai-inbox__detail-email">{selectedReply.from.email} &middot; {selectedReply.receivedAt}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                  <SentimentBadge sentiment={selectedReply.sentiment} />
                  <Badge label={selectedReply.list} variant="info" size="small" />
                </div>
              </div>

              {/* Sentiment Insight */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', padding: 'var(--space-3)', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-primary-600)" style={{ flexShrink: 0, marginTop: '1px' }}><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /></svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sentiment</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{selectedReply.sentimentReason}</div>
                </div>
              </div>

              <div className="oai-inbox__detail-subject">{selectedReply.subject}</div>
              <div className="oai-inbox__detail-body">
                {selectedReply.body.split('\n').map((line, i) => (
                  <p key={i} style={{ margin: '0 0 4px', lineHeight: 1.7 }}>{line || '\u00A0'}</p>
                ))}
              </div>
              <div className="oai-inbox__detail-actions">
                <button className="oai-inbox__reply-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></svg>
                  Reply
                </button>
                <button className="oai-inbox__forward-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 17 20 12 15 7" /><path d="M4 18v-2a4 4 0 0 1 4-4h12" /></svg>
                  Forward
                </button>
                <button className="oai-inbox__stage-btn">Move to Negotiating</button>
              </div>
            </div>
          )}
        </div>
      )}

        {/* ── REVIEW TAB ── Bulk Send ──────────────────────── */}
        {activeEmailTab === 'review' && filteredQueue.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {/* Token & Quota Meter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', fontFamily: 'var(--font-family-sans)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Tokens this month</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{TOKENS_LEFT}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>/ {TOKENS_TOTAL} left</span>
                </div>
                <div style={{ marginTop: '4px', height: '4px', borderRadius: '2px', background: 'var(--color-neutral-100)', overflow: 'hidden' }}>
                  <div style={{ width: `${(TOKENS_LEFT / TOKENS_TOTAL) * 100}%`, height: '100%', background: 'var(--color-primary-600)' }} />
                </div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--color-border-default)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Daily limit</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{approvedCount}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>/ {DAILY_CAP} sent today</span>
                </div>
                <div style={{ marginTop: '4px', height: '4px', borderRadius: '2px', background: 'var(--color-neutral-100)', overflow: 'hidden' }}>
                  <div style={{ width: `${(approvedCount / DAILY_CAP) * 100}%`, height: '100%', background: 'var(--color-success)' }} />
                </div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--color-border-default)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Selected</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'var(--font-weight-semibold)', color: bulkSelected.size > 0 ? 'var(--color-primary-700)' : 'var(--color-text-muted)' }}>{bulkSelected.size}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>of {filteredQueue.length}</span>
                </div>
                {bulkSelected.size > 0 && (
                  <div style={{ marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Finishes ~{formatFinishTime(estimateMinutes(bulkSelected.size))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick filter row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)', fontWeight: 'var(--font-weight-medium)' }}>Quick select:</span>
              <button onClick={selectAllVisible} style={{ padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer' }}>Select all ({filteredQueue.length})</button>
              <button onClick={() => selectByList('Sunscreen')} style={{ padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer' }}>Sunscreen ({reviewQueue.filter((e) => e.list === 'Sunscreen').length})</button>
              <button onClick={() => selectByList('Neck Cream')} style={{ padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer' }}>Neck Cream ({reviewQueue.filter((e) => e.list === 'Neck Cream').length})</button>
              <button onClick={() => selectByPriority('High')} style={{ padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer' }}>High Priority ({reviewQueue.filter((e) => e.priority === 'High').length})</button>
              {bulkSelected.size > 0 && <button onClick={clearBulkSelection} style={{ padding: 'var(--space-1) var(--space-2)', border: 'none', background: 'transparent', color: 'var(--color-text-link)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)', cursor: 'pointer', textDecoration: 'underline' }}>Clear selection</button>}
            </div>

            {/* Two-pane: list (left) + preview (right) */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', minHeight: '500px' }}>
              <div style={{ width: '380px', minWidth: '380px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', overflow: 'auto', maxHeight: '600px' }}>
                {filteredQueue.map((email) => {
                  const isSelected = bulkSelected.has(email.id);
                  const isPreviewing = previewEmail?.id === email.id;
                  return (
                    <div key={email.id} style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-3)', borderBottom: '1px solid var(--color-border-default)', background: isPreviewing ? 'var(--color-primary-50)' : isSelected ? 'var(--color-neutral-50)' : 'transparent', cursor: 'pointer' }} onClick={() => setPreviewEmailId(email.id)}>
                      <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); toggleBulkRow(email.id); }} onClick={(e) => e.stopPropagation()} style={{ marginTop: '2px' }} />
                      <div style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-family-sans)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{email.to.name}</span>
                          <Badge label={email.priority} variant={email.priority === 'High' ? 'warning' : 'info'} size="small" />
                        </div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{email.to.company}</div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>{email.subject}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.body.split('\n')[0]}</div>
                        <div style={{ marginTop: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          <Badge label={email.list} variant="default" size="small" />
                          {email.sequenceStep && <SequenceStepBadge step={email.sequenceStep} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {previewEmail && (
                <div className="oai-email-preview" style={{ flex: 1 }}>
                  <div className="oai-email-preview__to">
                    <span className="oai-email-preview__to-label">To:</span>
                    <span className="oai-email-preview__to-name">{previewEmail.to.name}</span>
                    <span className="oai-email-preview__to-email">&lt;{previewEmail.to.email}&gt;</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-1)' }}>
                      {previewEmail.sequenceStep && <SequenceStepBadge step={previewEmail.sequenceStep} />}
                      <Badge label={previewEmail.priority} variant={previewEmail.priority === 'High' ? 'warning' : 'info'} size="small" />
                    </div>
                  </div>
                  <div className="oai-email-preview__subject">{previewEmail.subject}</div>
                  <div className="oai-email-preview__body">
                    {previewEmail.body.split('\n').map((line, i) => (<p key={i}>{line || ' '}</p>))}
                  </div>
                  <div className="oai-email-preview__actions">
                    <Button variant="ghost" size="small" label="Delete" onClick={handleDelete} />
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Button variant="ghost" size="small" label="Edit" onClick={() => {}} />
                      <Button variant="primary" size="small" label="Approve" onClick={handleApprove} />
                    </div>
                  </div>
                </div>
              )}

              {previewEmail && (
                <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ border: '1px solid var(--color-primary-200)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-primary-600)"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /></svg>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Lead Overview</span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
                      {previewEmail.aiOverview || 'AI is generating overview...'}
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>Contact</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{previewEmail.to.name}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>{previewEmail.to.title}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {previewEmail.to.location}
                    </div>
                  </div>

                  {previewEmail.signals && previewEmail.signals.length > 0 && (
                    <div style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                      <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>Brand Signals</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {previewEmail.signals.slice(0, 3).map((s, i) => (
                          <div key={i} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                            <span>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>Sequence</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[
                        { step: 1, label: 'Day 0 — Intro', current: (previewEmail.sequenceStep || 1) === 1 },
                        { step: 2, label: 'Day 3 — Follow-up #1', current: (previewEmail.sequenceStep || 1) === 2, queued: true },
                        { step: 3, label: 'Day 7 — Follow-up #2', current: (previewEmail.sequenceStep || 1) === 3 },
                        { step: 4, label: 'Day 14 — Final break-up', current: (previewEmail.sequenceStep || 1) === 4 },
                      ].map((s) => (
                        <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', borderRadius: 'var(--radius-sm)', background: s.current ? 'var(--color-primary-50)' : 'transparent', fontSize: 'var(--font-size-xs)', color: s.current ? 'var(--color-primary-700)' : 'var(--color-text-secondary)', fontWeight: s.current ? 'var(--font-weight-semibold)' : 'normal' }}>
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', background: s.current ? 'var(--color-primary-600)' : 'var(--color-neutral-200)', color: 'white', fontSize: '10px', fontWeight: 600 }}>{s.step}</span>
                          <span style={{ flex: 1 }}>{s.label}</span>
                          {s.queued && <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>auto</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeEmailTab === 'review' && filteredQueue.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-4)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>
            <div style={{ marginBottom: 'var(--space-2)' }}>{Icons.campaigns}</div>
            <h3 style={{ margin: '0 0 4px', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)' }}>No emails for review</h3>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Drafts will appear here when you find new contacts.</p>
          </div>
        )}

        {!['summary', 'inbox', 'review'].includes(activeEmailTab) && (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-4)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>
            <div style={{ marginBottom: 'var(--space-2)' }}>{Icons.campaigns}</div>
            <h3 style={{ margin: '0 0 4px', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)' }}>No emails in {activeEmailTab}</h3>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Emails will appear here.</p>
          </div>
        )}


        {/* Keyboard hint — only when no bulk selected */}
        {bulkSelected.size === 0 && (
          <div className="oai-email-hint-bar">
            <span>Cmd + Enter to approve</span>
            <span>Arrow keys to navigate</span>
            <Button variant="ghost" size="small" label="Approve all" onClick={handleApproveAll} />
          </div>
        )}
      </main>

      {/* Bulk Action Bar (fixed bottom when emails selected) */}
      {bulkSelected.size > 0 && activeEmailTab === 'review' && (
        <div className="oai-search-action-bar">
          <span className="oai-search-action-bar__count">{bulkSelected.size} email{bulkSelected.size > 1 ? 's' : ''} selected</span>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}>
            Tokens after send: {TOKENS_LEFT - bulkSelected.size} &middot; Finishes ~{formatFinishTime(estimateMinutes(bulkSelected.size))}
          </span>
          <Button variant="primary" size="medium" label={`Send ${bulkSelected.size} email${bulkSelected.size > 1 ? 's' : ''}`} onClick={() => setBulkSendModalOpen(true)} />
          <Button variant="ghost" size="small" label="Approve only (queue)" onClick={handleBulkSend} />
          <Button variant="ghost" size="small" label="Clear" onClick={clearBulkSelection} />
        </div>
      )}

      {/* Bulk Send Confirmation Modal */}
      {bulkSendModalOpen && (
        <div onClick={() => setBulkSendModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '440px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', fontFamily: 'var(--font-family-sans)', boxShadow: 'var(--shadow-xl)' }}>
            <h2 style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Send {bulkSelected.size} email{bulkSelected.size > 1 ? 's' : ''}?</h2>
            <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Breakdown by campaign:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
              {['Sunscreen', 'Neck Cream', 'Vitamin C Serum'].map((listName) => {
                const count = reviewQueue.filter((e) => bulkSelected.has(e.id) && e.list === listName).length;
                if (count === 0) return null;
                return (
                  <div key={listName} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-sm)' }}>
                    <span>{count} to <strong>{listName}</strong></span>
                    <Badge label={listName} variant="default" size="small" />
                  </div>
                );
              })}
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Tokens used</span>
                <strong>{bulkSelected.size}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Remaining after send</span>
                <strong>{TOKENS_LEFT - bulkSelected.size}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Estimated completion</span>
                <strong>{formatFinishTime(estimateMinutes(bulkSelected.size))}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Pacing</span>
                <strong>4-8 min apart (auto)</strong>
              </div>
            </div>
            <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Emails will be spaced naturally throughout the day to protect your domain reputation. You can pause the queue anytime.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="medium" label="Cancel" onClick={() => setBulkSendModalOpen(false)} />
              <Button variant="primary" size="medium" label={`Send ${bulkSelected.size} email${bulkSelected.size > 1 ? 's' : ''}`} onClick={handleBulkSend} />
            </div>
          </div>
        </div>
      )}

      {/* ── Create Campaign Modal (multi-tab flow) ─────────────────── */}
      {createCampaignOpen && (
        <div onClick={closeCreateCampaign} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '960px', maxWidth: '95vw', maxHeight: '90vh', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-family-sans)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column' }}>

            {/* ─── Initial Naming Screen ─── */}
            {!campaignNamingDone && (
              <div style={{ padding: 'var(--space-6) var(--space-6) var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-2)' }}>
                  <button onClick={closeCreateCampaign} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: 'var(--space-1)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <div style={{ textAlign: 'center', padding: 'var(--space-6) 0 var(--space-4)' }}>
                  <h2 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Let's create a new campaign</h2>
                  <p style={{ margin: 0, fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)' }}>What would you like to name it?</p>
                </div>
                <div style={{ maxWidth: '440px', margin: '0 auto var(--space-6)' }}>
                  <input
                    type="text"
                    placeholder="e.g. Q2 Sunscreen Launch"
                    value={campaignForm.name}
                    onChange={(e) => updateCampaignForm('name', e.target.value)}
                    autoFocus
                    onKeyDown={(e) => { if (e.key === 'Enter' && campaignForm.name.trim()) setCampaignNamingDone(true); }}
                    style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-md)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', paddingBottom: 'var(--space-4)' }}>
                  <Button variant="ghost" size="medium" label="Cancel" onClick={closeCreateCampaign} />
                  <Button variant="primary" size="medium" label="Continue" onClick={() => campaignForm.name.trim() && setCampaignNamingDone(true)} />
                </div>
              </div>
            )}

            {/* ─── Tabbed Multi-Step UI ─── */}
            {campaignNamingDone && (
              <>
                {/* Header */}
                <div style={{ padding: 'var(--space-4) var(--space-5) var(--space-3)', borderBottom: '1px solid var(--color-border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>{campaignForm.name || 'New Campaign'}</h2>
                    <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)' }}>Configure leads, sequence, schedule, and options</p>
                  </div>
                  <button onClick={closeCreateCampaign} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: 'var(--space-1)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-default)', padding: '0 var(--space-5)' }}>
                  {[
                    { id: 'leads', label: 'Leads' },
                    { id: 'sequences', label: 'Sequences' },
                    { id: 'schedule', label: 'Schedule' },
                    { id: 'options', label: 'Options' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCampaignTab(t.id)}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: campaignTab === t.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                        color: campaignTab === t.id ? 'var(--color-primary-700)' : 'var(--color-text-secondary)',
                        borderBottom: '2px solid',
                        borderBottomColor: campaignTab === t.id ? 'var(--color-primary-600)' : 'transparent',
                        marginBottom: '-1px',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div style={{ padding: 'var(--space-5)', overflowY: 'auto', flex: 1, fontFamily: 'var(--font-family-sans)' }}>

                  {/* ─── LEADS TAB ─── */}
                  {campaignTab === 'leads' && leadsSubstep === 'empty' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-10) var(--space-4)', textAlign: 'center' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ marginBottom: 'var(--space-3)' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>No leads yet</h3>
                      <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Add leads to start your campaign</p>
                      <Button variant="primary" size="medium" label="+ Add Leads" onClick={() => setLeadsSubstep('choose-source')} />
                    </div>
                  )}

                  {campaignTab === 'leads' && leadsSubstep === 'choose-source' && (
                    <div>
                      <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Add leads</h3>
                      <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Choose where to import from</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
                        {[
                          { id: 'csv', label: 'Upload CSV', desc: 'Import from a .csv file', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                          { id: 'gsheets', label: 'Google Sheets', desc: 'Connect a Google Sheet', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> },
                          { id: 'manual', label: 'Add Emails Manually', desc: 'Paste a list of emails', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
                        ].map((s) => (
                          <button
                            key={s.id}
                            onClick={() => { setUploadSource(s.id); setLeadsSubstep('upload'); }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-4)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)', cursor: 'pointer', fontFamily: 'var(--font-family-sans)', color: 'var(--color-text-primary)', transition: 'border-color 0.15s, background 0.15s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-400)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.background = 'var(--color-bg-card)'; }}
                          >
                            <span style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--space-2)' }}>{s.icon}</span>
                            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>{s.label}</span>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {campaignTab === 'leads' && leadsSubstep === 'upload' && (
                    <div>
                      <button onClick={() => setLeadsSubstep('choose-source')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', padding: 0, marginBottom: 'var(--space-3)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to source selection
                      </button>
                      <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>{uploadSource === 'csv' ? 'Upload CSV file' : uploadSource === 'gsheets' ? 'Connect Google Sheet' : 'Add emails manually'}</h3>
                      <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Drop your file or click to browse</p>
                      <div
                        onClick={() => setLeadsSubstep('processed')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-10) var(--space-4)', border: '2px dashed var(--color-border-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-50)', cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.15s, background 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-500)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.background = 'var(--color-neutral-50)'; }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="1.5" style={{ marginBottom: 'var(--space-3)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Drag or click to upload</span>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Supports .csv up to 10MB</span>
                      </div>
                    </div>
                  )}

                  {campaignTab === 'leads' && leadsSubstep === 'processed' && (
                    <div>
                      {/* Confirmation */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-success-100)', border: '1px solid var(--color-success)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-700)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success-700)' }}>File Processed</div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Detected 35 data rows · Map columns below to import</div>
                        </div>
                      </div>

                      {/* Column mapping table */}
                      <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '180px 160px 1fr', gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-border-default)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <span>Column Name</span>
                          <span>Select Type</span>
                          <span>Samples</span>
                        </div>
                        <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                          {columnMappings.map((c, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 160px 1fr', gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)', borderBottom: '1px solid var(--color-border-default)', alignItems: 'center', fontSize: 'var(--font-size-xs)' }}>
                              <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-medium)' }}>{c.col}</span>
                              <select
                                value={c.type}
                                onChange={(e) => updateColumnType(i, e.target.value)}
                                style={{ padding: '4px 6px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-sm)', background: c.type === 'do_not_import' ? 'var(--color-neutral-50)' : 'var(--color-bg-card)', color: c.type === 'do_not_import' ? 'var(--color-text-muted)' : 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', cursor: 'pointer', outline: 'none' }}
                              >
                                <option value="do_not_import">Do not import</option>
                                <option value="email">Email</option>
                                <option value="first_name">First Name</option>
                                <option value="last_name">Last Name</option>
                                <option value="job_title">Job Title</option>
                                <option value="company_name">Company Name</option>
                                <option value="website">Website</option>
                                <option value="location">Location</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="phone">Phone</option>
                              </select>
                              <div style={{ color: 'var(--color-text-muted)', overflow: 'hidden' }}>
                                {c.samples.slice(0, 2).map((s, j) => (
                                  <div key={j} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Duplicate check + verify */}
                      <div style={{ padding: 'var(--space-3)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>Check for duplicates across</div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                          {[
                            { key: 'campaigns', label: 'All Campaigns' },
                            { key: 'lists', label: 'All Lists' },
                            { key: 'workspace', label: 'The Workspace' },
                          ].map((d) => (
                            <label key={d.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={campaignForm.duplicateCheck[d.key]}
                                onChange={(e) => updateCampaignForm('duplicateCheck', { ...campaignForm.duplicateCheck, [d.key]: e.target.checked })}
                              />
                              {d.label}
                            </label>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ─── SEQUENCES TAB ─── */}
                  {campaignTab === 'sequences' && (
                    <div style={{ display: 'flex', gap: 'var(--space-4)', minHeight: '480px' }}>
                      {/* Left: step list */}
                      <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <div>
                          <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Email sequence</h3>
                          <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Add up to 4 steps. Use {`{{name}}`}, {`{{company}}`} as variables.</p>
                        </div>

                        {sequenceSteps.length === 0 && (
                          <div style={{ padding: 'var(--space-5) var(--space-3)', textAlign: 'center', border: '1px dashed var(--color-border-strong)', borderRadius: 'var(--radius-md)', background: 'var(--color-neutral-50)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ marginBottom: 'var(--space-2)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', marginBottom: '2px' }}>No steps yet</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Add your first email below</div>
                          </div>
                        )}

                        {sequenceSteps.map((s, idx) => (
                          <div
                            key={idx}
                            style={{
                              border: '1px solid',
                              borderColor: activeSequenceIdx === idx ? 'var(--color-primary-500)' : 'var(--color-border-default)',
                              borderRadius: 'var(--radius-md)',
                              background: activeSequenceIdx === idx ? 'var(--color-primary-50)' : 'var(--color-bg-card)',
                              fontFamily: 'var(--font-family-sans)',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Top: clickable header */}
                            <div
                              onClick={() => setActiveSequenceIdx(idx)}
                              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', cursor: 'pointer' }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: activeSequenceIdx === idx ? 'var(--color-primary-600)' : 'var(--color-neutral-200)', color: activeSequenceIdx === idx ? 'white' : 'var(--color-text-secondary)', fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>{idx + 1}</span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Step {idx + 1}</div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.subject || '<empty subject>'}</div>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); removeSequenceStep(idx); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '2px', display: 'flex' }} aria-label="Remove step">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                              </button>
                            </div>

                            {/* Bottom: Send next in — always visible */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', borderTop: '1px solid var(--color-border-default)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', background: activeSequenceIdx === idx ? 'rgba(255,255,255,0.5)' : 'var(--color-neutral-50)' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                              <span>Send next in</span>
                              <select
                                value={`${s.delayValue}-${s.delayUnit}`}
                                onChange={(e) => {
                                  const [val, unit] = e.target.value.split('-');
                                  updateSequenceStep(idx, 'delayValue', Number(val));
                                  updateSequenceStep(idx, 'delayUnit', unit);
                                }}
                                style={{ padding: '2px 6px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-xs)', background: 'var(--color-bg-card)', cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}
                              >
                                <option value="0-immediately">Immediately</option>
                                <option value="1-days">1 day</option>
                                <option value="3-days">3 days</option>
                                <option value="7-days">1 week</option>
                                <option value="14-days">2 weeks</option>
                              </select>
                            </div>
                          </div>
                        ))}

                        {sequenceSteps.length < 4 && (
                          <button
                            onClick={addSequenceStep}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%',
                              padding: 'var(--space-3)', border: '1px dashed var(--color-primary-400)',
                              borderRadius: 'var(--radius-md)', background: 'transparent',
                              color: 'var(--color-primary-700)', cursor: 'pointer',
                              fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Add sequence ({sequenceSteps.length}/4)
                          </button>
                        )}
                      </div>

                      {/* Right: editor */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {sequenceSteps.length === 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', textAlign: 'center', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-neutral-50)' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ marginBottom: 'var(--space-2)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-sans)' }}>Add a step to start writing</div>
                          </div>
                        ) : (
                          <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
                            {/* Subject row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-3) var(--space-3)', borderBottom: '1px solid var(--color-border-default)', gap: 'var(--space-2)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 1 }}>
                                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Subject</span>
                                <input
                                  type="text"
                                  placeholder="Your subject"
                                  value={sequenceSteps[activeSequenceIdx]?.subject || ''}
                                  onChange={(e) => updateSequenceStep(activeSequenceIdx, 'subject', e.target.value)}
                                  style={{ flex: 1, padding: '4px 8px', border: 'none', outline: 'none', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', background: 'transparent' }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', border: '1px solid var(--color-primary-300)', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-card)', color: 'var(--color-primary-700)', cursor: 'pointer', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-sans)' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                  Preview
                                </button>
                                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 8px', border: '1px solid var(--color-primary-300)', borderRadius: 'var(--radius-sm)', background: 'var(--color-primary-50)', color: 'var(--color-primary-700)', cursor: 'pointer' }} title="AI rewrite">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /></svg>
                                </button>
                              </div>
                            </div>

                            {/* Body */}
                            <textarea
                              placeholder="Start typing here..."
                              value={sequenceSteps[activeSequenceIdx]?.body || ''}
                              onChange={(e) => updateSequenceStep(activeSequenceIdx, 'body', e.target.value)}
                              rows={12}
                              style={{ flex: 1, width: '100%', padding: 'var(--space-3)', border: 'none', outline: 'none', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6, color: 'var(--color-text-primary)' }}
                            />

                            {/* Toolbar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', borderTop: '1px solid var(--color-border-default)', background: 'var(--color-neutral-50)' }}>
                              <Button variant="primary" size="small" label="Save" onClick={() => {}} />
                              <div style={{ display: 'flex', gap: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
                                {[
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>,
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
                                ].map((icon, i) => (
                                  <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '4px', display: 'flex' }}>{icon}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ─── SCHEDULE TAB ─── */}
                  {campaignTab === 'schedule' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div>
                        <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Schedule</h3>
                        <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Set when this campaign starts, ends, and runs.</p>
                      </div>

                      {/* Start / End row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                        <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>Start</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary-600)' }} />
                            <select
                              value={campaignForm.startWhen}
                              onChange={(e) => updateCampaignForm('startWhen', e.target.value)}
                              style={{ flex: 1, padding: '6px 8px', border: 'none', background: 'transparent', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', cursor: 'pointer', outline: 'none' }}
                            >
                              <option value="now">Now</option>
                              <option value="scheduled">Scheduled date</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>End</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--color-neutral-300)' }} />
                            <select
                              value={campaignForm.endWhen}
                              onChange={(e) => updateCampaignForm('endWhen', e.target.value)}
                              style={{ flex: 1, padding: '6px 8px', border: 'none', background: 'transparent', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', cursor: 'pointer', outline: 'none' }}
                            >
                              <option value="no_end">No end date</option>
                              <option value="scheduled">Scheduled end date</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* New schedule section */}
                      <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>New schedule</div>

                        {/* Schedule name */}
                        <div>
                          <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Schedule Name</label>
                          <input
                            type="text"
                            value={campaignForm.scheduleName}
                            onChange={(e) => updateCampaignForm('scheduleName', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>

                        {/* Timing */}
                        <div>
                          <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Timing</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>From</span>
                            <select
                              value={campaignForm.fromTime}
                              onChange={(e) => updateCampaignForm('fromTime', e.target.value)}
                              style={{ padding: '8px 10px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', cursor: 'pointer', outline: 'none', background: 'var(--color-bg-card)' }}
                            >
                              {['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM'].map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>To</span>
                            <select
                              value={campaignForm.toTime}
                              onChange={(e) => updateCampaignForm('toTime', e.target.value)}
                              style={{ padding: '8px 10px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', cursor: 'pointer', outline: 'none', background: 'var(--color-bg-card)' }}
                            >
                              {['3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'].map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Timezone */}
                        <div>
                          <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Timezone</label>
                          <select
                            value={campaignForm.timezone}
                            onChange={(e) => updateCampaignForm('timezone', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', cursor: 'pointer', outline: 'none', background: 'var(--color-bg-card)', boxSizing: 'border-box' }}
                          >
                            <option value="Eastern Time (US & Canada) (UTC-04:00)">Eastern Time (US & Canada) (UTC-04:00)</option>
                            <option value="Central Time (US & Canada) (UTC-05:00)">Central Time (US & Canada) (UTC-05:00)</option>
                            <option value="Mountain Time (US & Canada) (UTC-06:00)">Mountain Time (US & Canada) (UTC-06:00)</option>
                            <option value="Pacific Time (US & Canada) (UTC-07:00)">Pacific Time (US & Canada) (UTC-07:00)</option>
                            <option value="London (UTC+01:00)">London (UTC+01:00)</option>
                            <option value="Seoul (UTC+09:00)">Seoul (UTC+09:00)</option>
                          </select>
                        </div>

                        {/* Days */}
                        <div>
                          <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Days</label>
                          <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => {
                              const isOn = campaignForm.days[d];
                              return (
                                <button
                                  key={d}
                                  onClick={() => updateCampaignForm('days', { ...campaignForm.days, [d]: !isOn })}
                                  style={{
                                    padding: '8px 14px',
                                    border: '1px solid',
                                    borderColor: isOn ? 'var(--color-primary-600)' : 'var(--color-border-default)',
                                    borderRadius: 'var(--radius-md)',
                                    background: isOn ? 'var(--color-primary-600)' : 'var(--color-bg-card)',
                                    color: isOn ? 'white' : 'var(--color-text-primary)',
                                    fontFamily: 'var(--font-family-sans)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: isOn ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                  }}
                                >
                                  {d === 'Mon' ? 'Monday' : d === 'Tue' ? 'Tuesday' : d === 'Wed' ? 'Wednesday' : d === 'Thu' ? 'Thursday' : d === 'Fri' ? 'Friday' : d === 'Sat' ? 'Saturday' : 'Sunday'}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Daily send limit */}
                      <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>
                          <span>Daily send limit</span>
                          <span style={{ color: 'var(--color-primary-700)', fontWeight: 'var(--font-weight-semibold)' }}>{campaignForm.dailyCap} emails / day</span>
                        </label>
                        <input
                          type="range" min="5" max="35" step="5"
                          value={campaignForm.dailyCap}
                          onChange={(e) => updateCampaignForm('dailyCap', Number(e.target.value))}
                          style={{ width: '100%', accentColor: 'var(--color-primary-600)' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          <span>5</span><span>20</span><span>35 (recommended max)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── OPTIONS TAB ─── */}
                  {campaignTab === 'options' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div>
                        <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-sans)' }}>Options</h3>
                        <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Advanced campaign settings.</p>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                        <input type="checkbox" checked={campaignForm.sentimentAuto} onChange={(e) => updateCampaignForm('sentimentAuto', e.target.checked)} style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>Auto-categorize replies</div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Sentiment classifier marks replies as Positive / Promising / Declined</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>Stop sequence on reply</div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Once a contact replies, no more follow-ups go out</div>
                        </div>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>Track opens and clicks</div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Add tracking pixel and rewrite links (may affect deliverability)</div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{ padding: 'var(--space-3) var(--space-5)', borderTop: '1px solid var(--color-border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    {leadsSubstep === 'processed' ? `35 leads ready · ${sequenceSteps.length || 'no'} sequence step${sequenceSteps.length === 1 ? '' : 's'} · ${campaignForm.dailyCap} emails/day` : 'Add leads to activate'}
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Button variant="ghost" size="medium" label="Cancel" onClick={closeCreateCampaign} />
                    {campaignTab === 'leads' && leadsSubstep === 'processed' && (
                      <Button variant="primary" size="medium" label="Confirm Upload" onClick={() => setCampaignTab('sequences')} />
                    )}
                    {campaignTab !== 'leads' && (
                      <Button variant="primary" size="medium" label={campaignTab === 'options' ? 'Activate Campaign' : 'Next'} onClick={() => {
                        if (campaignTab === 'sequences') setCampaignTab('schedule');
                        else if (campaignTab === 'schedule') setCampaignTab('options');
                        else if (campaignTab === 'options') closeCreateCampaign();
                      }} />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      )}
    </div>
  );
};

/* ── People mock data ────────────────────────────────────────────── */
const brandsInList = [
  { brand: 'EcoGlow Naturals', company: 'EcoGlow Inc.', domain: 'ecoglownaturals.com', state: 'CA', city: 'San Francisco', growth: '+46%' },
  { brand: 'SunShield Pro', company: 'SunShield Beauty LLC', domain: 'sunshieldpro.com', state: 'FL', city: 'Miami', growth: '+38%' },
  { brand: 'AquaVeil', company: 'AquaVeil Skincare Inc.', domain: 'aquaveil.com', state: 'NY', city: 'New York', growth: '+55%' },
];

const peopleData = [
  { name: 'Sarah Chen', title: 'Head of Partnerships', company: 'EcoGlow Naturals', location: 'San Francisco, CA', initials: 'SC', match: 'BULLSEYE', tags: ['Decision-Maker', 'Recent Hire — Mar 2025'] },
  { name: 'Jason Park', title: 'VP Operations', company: 'EcoGlow Naturals', location: 'San Francisco, CA', initials: 'JP', match: 'BULLSEYE', tags: ['Operations Leader', 'Supply Chain Authority'] },
  { name: 'Maria Santos', title: 'Director of Product Development', company: 'SunShield Pro', location: 'Miami, FL', initials: 'MS', match: 'BULLSEYE', tags: ['Product Development Lead', 'Formulation Expert'] },
  { name: 'Kevin Wright', title: 'CEO & Founder', company: 'SunShield Pro', location: 'Miami, FL', initials: 'KW', match: 'BULLSEYE', tags: ['Founder', 'Final Decision-Maker'] },
  { name: 'Priya Sharma', title: 'Head of Supply Chain', company: 'AquaVeil', location: 'New York, NY', initials: 'PS', match: 'BULLSEYE', tags: ['Supply Chain Lead', 'Actively Hiring'] },
  { name: 'Alex Rivera', title: 'Brand Manager', company: 'AquaVeil', location: 'New York, NY', initials: 'AR', match: 'BULLSEYE', tags: ['Brand Strategy', 'Amazon Growth Focus'] },
  { name: 'Emma Liu', title: 'COO', company: 'AquaVeil', location: 'New York, NY', initials: 'EL', match: 'BULLSEYE', tags: ['C-Suite', 'Operations Authority'] },
];

/* ── Page: People — Revealed Contacts CRM ───────────────────────── */
const REVEALED_CONTACTS = [
  { id: 'r1', name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', email: 'sarah.chen@cerave.com', list: 'Sunscreen List', revealedAt: '2026-04-05', initials: 'SC', color: '#6B8E23', stage: 'Replied', tokensUsed: 1 },
  { id: 'r2', name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', email: 'holly@supergoop.com', list: 'Sunscreen List', revealedAt: '2026-04-05', initials: 'HT', color: '#2E8B57', stage: 'Contacted', tokensUsed: 1 },
  { id: 'r3', name: 'Rachel Kim', title: 'Head of Partnerships', company: 'EltaMD', email: 'rachel.kim@eltamd.com', list: 'Sunscreen List', revealedAt: '2026-04-07', initials: 'RK', color: '#4682B4', stage: 'Contacted', tokensUsed: 1 },
  { id: 'r4', name: 'Lisa Wang', title: 'Business Development Manager', company: 'StriVectin', email: 'lwang@strivectin.com', list: 'Neck Cream List', revealedAt: '2026-04-08', initials: 'LW', color: '#8B008B', stage: 'Negotiating', tokensUsed: 1 },
  { id: 'r5', name: 'James Miller', title: 'Director of Retail', company: 'Olay', email: 'j.miller@olay.com', list: 'Neck Cream List', revealedAt: '2026-04-08', initials: 'JM', color: '#DC143C', stage: 'Replied', tokensUsed: 1 },
  { id: 'r6', name: 'Diana Voss', title: 'VP of Global Sales', company: 'StriVectin', email: 'dvoss@crownlabs.com', list: null, revealedAt: '2026-04-10', initials: 'DV', color: '#8B008B', stage: null, tokensUsed: 1 },
  { id: 'r7', name: 'Mia Tanaka', title: 'Head of Partnerships', company: 'Drunk Elephant', email: 'mia.tanaka@shiseido.com', list: null, revealedAt: '2026-04-12', initials: 'MT', color: '#FF6B6B', stage: null, tokensUsed: 1 },
  { id: 'r8', name: 'Jennifer Wu', title: 'Sr. Brand Manager', company: 'IT Cosmetics', email: 'jwu@loreal.com', list: null, revealedAt: '2026-04-14', initials: 'JW', color: '#E91E63', stage: null, tokensUsed: 1 },
];

const PeopleContent = ({ onNavigate }) => {
  const [peopleTab, setPeopleTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());

  const assigned = REVEALED_CONTACTS.filter((c) => c.list);
  const unassigned = REVEALED_CONTACTS.filter((c) => !c.list);

  const displayContacts = peopleTab === 'all' ? REVEALED_CONTACTS : peopleTab === 'assigned' ? assigned : unassigned;
  const filtered = searchQuery
    ? displayContacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase()))
    : displayContacts;

  const toggleRow = (id) => setSelectedRows((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const toggleAll = () => setSelectedRows(selectedRows.size === filtered.length ? new Set() : new Set(filtered.map((c) => c.id)));

  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'People' }]} />

      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>People</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>All contacts you've revealed. {REVEALED_CONTACTS.length} contacts &middot; {REVEALED_CONTACTS.length} tokens used.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatsCard title="Total Revealed" value={String(REVEALED_CONTACTS.length)} change={`${REVEALED_CONTACTS.length} tokens used`} trend="neutral" icon={Icons.contacts} />
        <StatsCard title="Assigned to List" value={String(assigned.length)} change={`${assigned.length} in lists`} trend="up" icon={Icons.list} />
        <StatsCard title="Unassigned" value={String(unassigned.length)} change="Add to a list" trend="neutral" icon={Icons.profile} />
        <StatsCard title="Replied" value={String(REVEALED_CONTACTS.filter((c) => c.stage === 'Replied').length)} change="Awaiting your action" trend="up" icon={Icons.campaigns} />
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '16px' }}>
        <Tabs
          tabs={[
            { id: 'all', label: `All (${REVEALED_CONTACTS.length})` },
            { id: 'assigned', label: `Assigned (${assigned.length})` },
            { id: 'unassigned', label: `Unassigned (${unassigned.length})` },
          ]}
          activeTab={peopleTab}
          onTabChange={setPeopleTab}
        />
      </div>

      {/* Search */}
      <div style={{ marginBottom: '16px', maxWidth: '320px' }}>
        <Search placeholder="Search by name or company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Table */}
      <div className="oai-crm__table-wrap">
        <table className="oai-crm__table">
          <thead>
            <tr>
              <th className="oai-crm__th" style={{ width: 40 }}>
                <input type="checkbox" checked={selectedRows.size === filtered.length && filtered.length > 0} onChange={toggleAll} />
              </th>
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
                <td className="oai-crm__td">
                  {c.list
                    ? <Badge label={c.list} variant="default" size="small" />
                    : <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>Unassigned</span>
                  }
                </td>
                <td className="oai-crm__td">
                  {c.stage
                    ? <Badge label={c.stage} variant={c.stage === 'Replied' ? 'success' : c.stage === 'Negotiating' ? 'info' : 'warning'} size="small" />
                    : <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>--</span>
                  }
                </td>
                <td className="oai-crm__td oai-crm__td--meta">{c.revealedAt}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="oai-crm__empty">No contacts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk action bar */}
      {selectedRows.size > 0 && (
        <div className="oai-search-action-bar">
          <span className="oai-search-action-bar__count">{selectedRows.size} selected</span>
          <Button variant="primary" size="small" label="Add to List" onClick={() => {}} />
          <Button variant="ghost" size="small" label="Send Email" onClick={() => onNavigate?.('emails')} />
          <Button variant="ghost" size="small" label="Export CSV" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

/* ── App with simple path-based routing ──────────────────────────── */
function AppMain() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'landing';
    return path;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Campaign filter — persisted across Email / Pipeline / Lists pages
  const [activeCampaign, setActiveCampaign] = useState('All');
  // Pending campaign creation — set when user clicks "Create Campaign from this List"
  const [pendingCampaignList, setPendingCampaignList] = useState(null);

  // Shared saved lists state
  const [savedLists, setSavedLists] = useState([
    {
      id: 'list-1', name: 'Sunscreen List', createdAt: '2026-04-05',
      products: [
        { id: '1', name: 'CeraVe Hydrating Mineral Sunscreen SP...', brand: 'CeraVe', initials: 'CV', color: '#6B8E23', category: 'Mineral Sunscreen', price: 15.99 },
        { id: '2', name: 'Supergoop! Unseen Sunscreen SPF 40', brand: 'Supergoop!', initials: 'SG', color: '#2E8B57', category: 'Chemical Sunscreen', price: 22.00 },
        { id: '3', name: 'Sun Bum Original SPF 50 Sunscreen Lot...', brand: 'Sun Bum', initials: 'SB', color: '#B8860B', category: 'Lotion', price: 12.49 },
      ],
      brands: ['CeraVe', 'Supergoop!', 'Sun Bum'],
      people: [
        { name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', status: 'replied', initials: 'SC', color: '#6B8E23' },
        { name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', status: 'contacted', initials: 'HT', color: '#2E8B57' },
      ],
      pipeline: { searched: true, brandsFound: true, peopleFound: true, contacted: 2, replied: 1, pending: 0 },
    },
    {
      id: 'list-2', name: 'Neck Cream List', createdAt: '2026-04-06',
      products: [
        { id: '11', name: 'StriVectin TL Advanced Neck Cream', brand: 'StriVectin', initials: 'SV', color: '#8B008B', category: 'Neck Care', price: 89.00 },
        { id: '12', name: 'CeraVe Skin Renewing Neck Cream', brand: 'CeraVe', initials: 'CV', color: '#6B8E23', category: 'Neck Care', price: 17.49 },
      ],
      brands: ['StriVectin', 'CeraVe'],
      people: [],
      pipeline: { searched: true, brandsFound: true, peopleFound: false, contacted: 0, replied: 0, pending: 0 },
    },
  ]);

  const addNewList = (name) => {
    const newList = {
      id: `list-${Date.now()}`, name, createdAt: new Date().toISOString().slice(0, 10),
      products: [], brands: [], people: [],
      pipeline: { searched: false, brandsFound: false, peopleFound: false, contacted: 0, replied: 0, pending: 0 },
    };
    setSavedLists((prev) => [...prev, newList]);
    return newList.id;
  };

  const addProductsToList = (listId, products) => {
    setSavedLists((prev) => prev.map((l) => {
      if (l.id !== listId) return l;
      const existingIds = new Set(l.products.map((p) => p.id));
      const newProducts = products.filter((p) => !existingIds.has(p.id));
      const allProducts = [...l.products, ...newProducts];
      const allBrands = [...new Set(allProducts.map((p) => p.brand))];
      return { ...l, products: allProducts, brands: allBrands, pipeline: { ...l.pipeline, searched: true, brandsFound: allBrands.length > 0 } };
    }));
  };

  const navigate = (p) => {
    setPage(p);
    window.history.pushState({}, '', p === 'landing' ? '/' : `/${p}`);
  };

  const startCampaignCreation = (listName) => {
    setPendingCampaignList(listName);
    setActiveCampaign(listName);
    navigate('emails');
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'landing';
      setPage(path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleDark = (val) => {
    setDarkMode(val);
    document.documentElement.dataset.theme = val ? 'dark' : '';
  };

  /* ── Marketing pages — full-screen, no app chrome ──────────────── */
  if (page === 'landing') {
    return (
      <LandingPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  if (page === 'product') {
    return (
      <ProductPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  if (page === 'pricing') {
    return (
      <PricingPage
        onNavigate={navigate}
        onSignIn={() => navigate('login')}
        onGetStarted={() => navigate('signup')}
      />
    );
  }

  /* ── Auth pages ──────────────────────────────────────────────────── */
  if (page === 'login') {
    return (
      <Login
        onLogin={() => navigate('pipeline')}
        onSignUpClick={() => navigate('signup')}
        onForgotPassword={noop}
      />
    );
  }

  if (page === 'signup') {
    return (
      <SignUp
        onSignUp={() => navigate('pipeline')}
        onLoginClick={() => navigate('login')}
      />
    );
  }

  /* ── Sidebar items ───────────────────────────────────────────────── */
  const sidebarItems = [
    {
      items: [
        { id: 'search', label: 'Search', icon: Icons.search, onClick: () => navigate('search') },
        { id: 'pipeline', label: 'Pipeline', icon: Icons.dashboard, onClick: () => navigate('pipeline') },
        { id: 'lists', label: 'Lists', icon: Icons.list, onClick: () => navigate('lists') },
        { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: () => navigate('emails') },
        { id: 'tasks', label: 'Tasks', icon: Icons.templates, onClick: () => navigate('tasks') },
      ],
    },
  ];

  if (page === '404') {
    return <NotFound onBackClick={() => navigate('pipeline')} />;
  }

  const renderContent = () => {
    switch (page) {
      case 'pipeline': return <DashboardContent onNavigate={navigate} activeCampaign={activeCampaign} setActiveCampaign={setActiveCampaign} />;
      case 'search': return <SearchPage savedLists={savedLists} onAddNewList={addNewList} onAddProductsToList={addProductsToList} />;
      case 'lists': return <SavedListsPage savedLists={savedLists} onAddNewList={addNewList} activeCampaign={activeCampaign} setActiveCampaign={setActiveCampaign} onCreateCampaign={startCampaignCreation} />;
      case 'tasks': return <TasksPage />;
      case 'people': return <PeopleContent onNavigate={navigate} />;
      case 'emails': return <EmailsContent activeCampaign={activeCampaign} setActiveCampaign={setActiveCampaign} pendingCampaignList={pendingCampaignList} clearPendingCampaign={() => setPendingCampaignList(null)} />;
      case 'templates': return <TemplatesContent />;
      default: return <NotFound onBackClick={() => navigate('pipeline')} />;
    }
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem={page}
          header={sidebarHeader}
          footer={
            <SidebarFooter
              darkMode={darkMode}
              onToggleDark={toggleDark}
              onProfileClick={() => setSettingsOpen(true)}
              onSettingsClick={() => setSettingsOpen(true)}
            />
          }
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar />

      }
    >
      {renderContent()}
      <HelpButton onSubmit={noop} />
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          onLogout={() => { setSettingsOpen(false); navigate('landing'); }}
          onSave={noop}
        />
      )}
    </PageLayout>
  );
}

export default AppMain;

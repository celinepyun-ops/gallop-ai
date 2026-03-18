import { fn } from 'storybook/test';
import { useState } from 'react';
import { TokenBadge, TokenBalance, ContactField, RevealConfirm, LeadContactCard } from './TokenReveal';
import '../stories/tokens.css';
import '../stories/searchpage.css';

export default {
  title: 'Token Reveal/ContactField',
  component: ContactField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── TokenBadge ──────────────────────────────────────────────────── */
export const CostBadge = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <TokenBadge cost={2} />
      <TokenBadge cost={1} />
      <TokenBadge cost={5} variant="balance" />
      <TokenBadge cost={3} variant="balance-low" />
    </div>
  ),
  name: 'Token Badges',
};

/* ── TokenBalance (sidebar pill) ─────────────────────────────────── */
export const BalancePill = {
  render: () => (
    <div style={{ width: '220px', background: 'var(--color-primary-900)', padding: '16px', borderRadius: '8px' }}>
      <TokenBalance balance={48} />
    </div>
  ),
  name: 'Token Balance (Sidebar)',
};

/* ── ContactField: Hidden (email available, not revealed) ────────── */
export const EmailAvailableHidden = {
  args: {
    type: 'email',
    available: true,
    revealed: false,
    value: 'sarah@ecoglownaturals.com',
    tokenCost: 2,
    onReveal: fn(),
  },
  name: 'Email Available (Hidden)',
};

/* ── ContactField: Email not available ───────────────────────────── */
export const EmailNotAvailable = {
  args: {
    type: 'email',
    available: false,
    revealed: false,
    value: '',
    tokenCost: 2,
  },
  name: 'Email Not Available',
};

/* ── ContactField: LinkedIn available (hidden) ───────────────────── */
export const LinkedInAvailableHidden = {
  args: {
    type: 'linkedin',
    available: true,
    revealed: false,
    value: 'linkedin.com/in/sarahchen',
    tokenCost: 1,
    onReveal: fn(),
  },
  name: 'LinkedIn Available (Hidden)',
};

/* ── ContactField: Email revealed ────────────────────────────────── */
export const EmailRevealed = {
  args: {
    type: 'email',
    available: true,
    revealed: true,
    value: 'sarah@ecoglownaturals.com',
    tokenCost: 2,
  },
  name: 'Email Revealed',
};

/* ── ContactField: LinkedIn revealed ─────────────────────────────── */
export const LinkedInRevealed = {
  args: {
    type: 'linkedin',
    available: true,
    revealed: true,
    value: 'linkedin.com/in/sarahchen',
    tokenCost: 1,
  },
  name: 'LinkedIn Revealed',
};

/* ── RevealConfirm dialog ────────────────────────────────────────── */
export const ConfirmReveal = {
  render: () => (
    <div style={{ maxWidth: '380px' }}>
      <RevealConfirm
        type="email"
        tokenCost={2}
        tokenBalance={48}
        onConfirm={fn()}
        onCancel={fn()}
      />
    </div>
  ),
  name: 'Confirm Reveal Dialog',
};

/* ── RevealConfirm: insufficient tokens ──────────────────────────── */
export const InsufficientTokens = {
  render: () => (
    <div style={{ maxWidth: '380px' }}>
      <RevealConfirm
        type="email"
        tokenCost={2}
        tokenBalance={1}
        onConfirm={fn()}
        onCancel={fn()}
      />
    </div>
  ),
  name: 'Insufficient Tokens',
};

/* ── Full lead card: Interactive demo ────────────────────────────── */
const InteractiveDemo = () => {
  const [tokenBalance, setTokenBalance] = useState(48);

  const mockLeads = [
    {
      id: 'l1',
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      hasEmail: true,
      hasLinkedin: true,
      email: 'sarah@ecoglownaturals.com',
      linkedin: 'linkedin.com/in/sarahchen',
      emailRevealed: false,
      linkedinRevealed: false,
      confidence: 'high',
    },
    {
      id: 'l2',
      name: 'David Park',
      role: 'Head of Supply Chain',
      hasEmail: true,
      hasLinkedin: true,
      email: 'david@ecoglownaturals.com',
      linkedin: 'linkedin.com/in/davidpark',
      emailRevealed: false,
      linkedinRevealed: false,
      confidence: 'high',
    },
    {
      id: 'l3',
      name: 'Lisa Nguyen',
      role: 'Product Manager',
      hasEmail: true,
      hasLinkedin: false,
      email: 'lisa@ecoglownaturals.com',
      linkedin: '',
      emailRevealed: false,
      linkedinRevealed: false,
      confidence: 'medium',
    },
  ];

  const handleTokenSpend = (cost) => {
    setTokenBalance((prev) => Math.max(0, prev - cost));
  };

  return (
    <div style={{ maxWidth: '400px', fontFamily: 'var(--font-family-sans)' }}>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '18px' }}>
          Lead Contacts
        </h3>
        <TokenBadge cost={tokenBalance} variant={tokenBalance < 10 ? 'balance-low' : 'balance'} />
      </div>
      {mockLeads.map((lead) => (
        <LeadContactCard
          key={lead.id}
          lead={lead}
          tokenBalance={tokenBalance}
          onTokenSpend={handleTokenSpend}
        />
      ))}
    </div>
  );
};

export const FullInteractiveDemo = {
  render: () => <InteractiveDemo />,
  name: 'Full Interactive Demo',
  parameters: { layout: 'padded' },
};

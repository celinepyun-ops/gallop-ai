import { useState } from 'react';
import PropTypes from 'prop-types';
import { MarketingNavbar } from './MarketingNavbar';
import { Icons } from './icons';
import './pricing.css';

const Check = () => (
  <span className="oai-pricing__check">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const TokenIcon = () => (
  <svg className="oai-pricing__token-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4" />
  </svg>
);

/* ── Monthly Plans ────────────────────────────────────────────── */
const plans = [
  {
    name: 'Basic',
    tokens: 500,
    price: 39,
    perToken: '$0.078',
    bestFor: 'Regular prospecting & outreach',
    btnLabel: 'Subscribe to Basic',
    includes: [
      'Unlimited product search',
      '500 tokens / month',
      'Contact availability check (free)',
      'List management',
      'Email queue',
    ],
  },
  {
    name: 'Pro',
    tokens: 1000,
    price: 69,
    perToken: '$0.069',
    bestFor: 'High-volume sales teams',
    btnLabel: 'Subscribe to Pro',
    featured: true,
    saveBadge: 'Best Value',
    includes: [
      'Everything in Basic',
      '1,000 tokens / month',
      'Priority support',
      'Bulk export',
      'Advanced analytics',
    ],
  },
];

/* ── Pay-as-you-go presets ────────────────────────────────────── */
const PAYG_PRESETS = [80, 200, 500, 1000];
const PAYG_RATE = 0.10; // $0.10 per token
const PAYG_MIN = 80;

const commonFeatures = [
  'Unlimited product search',
  'AI seller analysis',
  'List management',
  'Email queue',
  'Dark mode',
];

const faqs = [
  {
    question: 'What are tokens?',
    answer: 'Tokens are credits used to reveal contact information such as email addresses and LinkedIn profiles. Each reveal costs a set number of tokens depending on the type of contact data.',
  },
  {
    question: 'What\'s the difference between plans and pay-as-you-go?',
    answer: 'Monthly plans give you a set number of tokens each month at a lower per-token rate. Pay-as-you-go lets you buy exactly the amount you need, starting from 80 tokens, with no commitment.',
  },
  {
    question: 'Do unused plan tokens roll over?',
    answer: 'Monthly plan tokens reset each billing cycle. Pay-as-you-go tokens never expire — they stay in your account until you use them.',
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. You can also top up with pay-as-you-go tokens at any time.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Unused pay-as-you-go tokens can be refunded within 30 days of purchase. Monthly plan subscriptions can be cancelled at any time — you keep access until the end of your billing period.',
  },
];

/* ── Pay-as-you-go Section ────────────────────────────────────── */
const PayAsYouGo = ({ onGetStarted }) => {
  const [amount, setAmount] = useState(200);

  const handleSlider = (e) => {
    const val = Math.max(PAYG_MIN, Number(e.target.value));
    setAmount(val);
  };

  const handleInput = (e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    setAmount(val);
  };

  const total = typeof amount === 'number' ? (amount * PAYG_RATE).toFixed(2) : '0.00';
  const isValid = typeof amount === 'number' && amount >= PAYG_MIN;

  return (
    <div className="oai-pricing__payg">
      <div className="oai-pricing__payg-header">
        <h3 className="oai-pricing__payg-title">Pay As You Go</h3>
        <p className="oai-pricing__payg-desc">
          Buy exactly what you need — no subscription required. Minimum {PAYG_MIN} tokens.
        </p>
      </div>

      <div className="oai-pricing__payg-body">
        {/* Preset buttons */}
        <div className="oai-pricing__payg-presets">
          {PAYG_PRESETS.map((preset) => (
            <button
              key={preset}
              className={`oai-pricing__payg-preset ${amount === preset ? 'oai-pricing__payg-preset--active' : ''}`}
              onClick={() => setAmount(preset)}
            >
              {preset} tokens
            </button>
          ))}
        </div>

        {/* Slider + input */}
        <div className="oai-pricing__payg-slider-row">
          <input
            type="range"
            className="oai-pricing__payg-slider"
            min={PAYG_MIN}
            max={2000}
            step={10}
            value={typeof amount === 'number' ? amount : PAYG_MIN}
            onChange={handleSlider}
            aria-label="Token amount"
          />
          <div className="oai-pricing__payg-input-wrap">
            <input
              type="number"
              className="oai-pricing__payg-input"
              min={PAYG_MIN}
              max={10000}
              value={amount}
              onChange={handleInput}
              aria-label="Custom token amount"
            />
            <span className="oai-pricing__payg-input-label">tokens</span>
          </div>
        </div>

        {/* Total */}
        <div className="oai-pricing__payg-total-row">
          <div className="oai-pricing__payg-total">
            <span className="oai-pricing__payg-total-label">Total</span>
            <span className="oai-pricing__payg-total-price">${total}</span>
          </div>
          <span className="oai-pricing__payg-rate">${PAYG_RATE.toFixed(2)} per token</span>
        </div>

        <button
          className="oai-pricing__card-btn oai-pricing__card-btn--primary"
          onClick={onGetStarted}
          disabled={!isValid}
        >
          Buy {isValid ? amount : '—'} Tokens
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   PricingPage
   ══════════════════════════════════════════════════════════════════ */
export const PricingPage = ({ onNavigate, onSignIn, onGetStarted }) => {
  const [tab, setTab] = useState('plans');

  return (
    <div className="oai-pricing">
      <MarketingNavbar
        activePage="pricing"
        onNavigate={onNavigate}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
      />

      {/* Header */}
      <div className="oai-pricing__header">
        <p className="oai-pricing__label">Pricing</p>
        <h1 className="oai-pricing__title">Simple, Transparent Pricing</h1>
        <p className="oai-pricing__subtitle">
          Choose a monthly plan for the best value, or pay as you go — only for what you use.
        </p>

        {/* Toggle */}
        <div className="oai-pricing__toggle">
          <button
            className={`oai-pricing__toggle-btn ${tab === 'plans' ? 'oai-pricing__toggle-btn--active' : ''}`}
            onClick={() => setTab('plans')}
          >
            Monthly Plans
          </button>
          <button
            className={`oai-pricing__toggle-btn ${tab === 'payg' ? 'oai-pricing__toggle-btn--active' : ''}`}
            onClick={() => setTab('payg')}
          >
            Pay As You Go
          </button>
        </div>
      </div>

      {/* Plans tab */}
      {tab === 'plans' && (
        <div className="oai-pricing__grid">
          {plans.map((plan) => (
            <div
              className={`oai-pricing__card ${plan.featured ? 'oai-pricing__card--featured' : ''}`}
              key={plan.name}
            >
              {plan.saveBadge && (
                <span className="oai-pricing__save-badge">{plan.saveBadge}</span>
              )}

              <h2 className="oai-pricing__plan-name">{plan.name}</h2>

              <div className="oai-pricing__token-row">
                <TokenIcon />
                <span className="oai-pricing__token-count">{plan.tokens.toLocaleString()} tokens/mo</span>
              </div>

              <div className="oai-pricing__price-row">
                <span className="oai-pricing__price">${plan.price}</span>
                <span className="oai-pricing__price-period">/month</span>
              </div>

              <div className="oai-pricing__per-token">
                {plan.perToken}/token
                {plan.featured && <span className="oai-pricing__per-token-save"> — 12% cheaper</span>}
              </div>

              <p className="oai-pricing__best-for">
                Best for: <strong>{plan.bestFor}</strong>
              </p>

              <button
                className={`oai-pricing__card-btn oai-pricing__card-btn--${plan.featured ? 'primary' : 'outline'}`}
                onClick={onGetStarted}
              >
                {plan.btnLabel}
              </button>

              <div className="oai-pricing__includes-label">Includes:</div>
              <ul className="oai-pricing__features">
                {plan.includes.map((f) => (
                  <li className="oai-pricing__feature" key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Pay-as-you-go tab */}
      {tab === 'payg' && (
        <div className="oai-pricing__payg-container">
          <PayAsYouGo onGetStarted={onGetStarted} />
        </div>
      )}

      {/* Common Features */}
      <div className="oai-pricing__common">
        <h3 className="oai-pricing__common-title">All options include</h3>
        <div className="oai-pricing__common-list">
          {commonFeatures.map((f) => (
            <span className="oai-pricing__common-item" key={f}>
              <Check />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="oai-pricing__faq">
        <h2 className="oai-pricing__faq-title">Frequently Asked Questions</h2>
        <div className="oai-pricing__faq-list">
          {faqs.map((faq) => (
            <div className="oai-pricing__faq-item" key={faq.question}>
              <h3 className="oai-pricing__faq-question">{faq.question}</h3>
              <p className="oai-pricing__faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="oai-pricing__footer">
        <div className="oai-pricing__footer-brand">
          <span className="oai-pricing__footer-logo">{Icons.logo(20)}</span>
          <span className="oai-pricing__footer-name">Gallop AI</span>
        </div>
        <span className="oai-pricing__footer-copy">&copy; 2026 Gallop AI. All rights reserved.</span>
      </footer>
    </div>
  );
};

PricingPage.propTypes = {
  onNavigate: PropTypes.func,
  onSignIn: PropTypes.func,
  onGetStarted: PropTypes.func,
};

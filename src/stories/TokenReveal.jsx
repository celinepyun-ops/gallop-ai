import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icons } from './icons';
import './TokenBadge.css';

/* ── Helpers ─────────────────────────────────────────────────────── */
const blurText = (text) => (
  <span className="oai-reveal__blur" aria-hidden="true">{text}</span>
);

const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return `${local[0]}${'•'.repeat(Math.max(local.length - 1, 3))}@${domain}`;
};

const getFirstName = (fullName) => fullName?.split(' ')[0] || '';
const getLastName = (fullName) => fullName?.split(' ').slice(1).join(' ') || '';

/* ── Token cost badge ────────────────────────────────────────────── */
export const TokenBadge = ({ cost, variant = 'cost' }) => (
  <span className={`oai-token-badge oai-token-badge--${variant}`}>
    <span className="oai-token-badge__icon">{Icons.credits}</span>
    {cost} {cost === 1 ? 'token' : 'tokens'}
  </span>
);

TokenBadge.propTypes = {
  cost: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['cost', 'balance', 'balance-low']),
};

/* ── Token balance pill (for sidebar) ────────────────────────────── */
export const TokenBalance = ({ balance }) => (
  <div className="oai-token-balance" aria-label={`${balance} tokens remaining`}>
    <span className="oai-token-balance__icon">{Icons.credits}</span>
    <span className="oai-token-balance__count">{balance}</span>
    <span className="oai-token-balance__label">tokens</span>
  </div>
);

TokenBalance.propTypes = {
  balance: PropTypes.number.isRequired,
};

/* ── Contact field with reveal gating ────────────────────────────── */
export const ContactField = ({
  type = 'email',
  available = false,
  revealLevel = 'none', // 'none' | 'partial' | 'full'
  partialValue = '',
  fullValue = '',
  tokenCost = 2,
  onReveal,
  disabled = false,
}) => {
  const label = type === 'email' ? 'Email' : 'LinkedIn';

  // Full reveal — show complete value
  if (revealLevel === 'full' && fullValue) {
    return (
      <div className="oai-contact-field">
        <span className="oai-contact-field__status oai-contact-field__status--available">
          <span className="oai-contact-field__status-icon" aria-hidden="true">{'\u2713'}</span>
          <span className="oai-contact-field__revealed">
            {type === 'linkedin' ? (
              <a href={`https://${fullValue}`} target="_blank" rel="noopener noreferrer">{fullValue}</a>
            ) : (
              fullValue
            )}
          </span>
        </span>
      </div>
    );
  }

  // Partial reveal — show masked value + reveal full button
  if (revealLevel === 'partial' && partialValue) {
    return (
      <div className="oai-contact-field">
        <span className="oai-contact-field__status oai-contact-field__status--available">
          <span className="oai-contact-field__status-icon" aria-hidden="true">{'\u2713'}</span>
          <span className="oai-contact-field__partial">{partialValue}</span>
        </span>
        <button
          className="oai-reveal-btn"
          onClick={onReveal}
          disabled={disabled}
          aria-label={`Reveal full ${label} for ${tokenCost} tokens`}
        >
          Reveal
          <TokenBadge cost={tokenCost} />
        </button>
      </div>
    );
  }

  // None — show availability + initial reveal button
  return (
    <div className="oai-contact-field">
      <span className={`oai-contact-field__status oai-contact-field__status--${available ? 'available' : 'unavailable'}`}>
        <span className="oai-contact-field__status-icon" aria-hidden="true">
          {available ? '\u2713' : '\u2717'}
        </span>
        <span className="oai-contact-field__label">
          {available ? `${label} available` : `No ${label.toLowerCase()}`}
        </span>
      </span>
      {available && (
        <button
          className="oai-reveal-btn"
          onClick={onReveal}
          disabled={disabled}
          aria-label={`Reveal ${label} for ${tokenCost} tokens`}
        >
          Reveal
          <TokenBadge cost={tokenCost} />
        </button>
      )}
    </div>
  );
};

ContactField.propTypes = {
  type: PropTypes.oneOf(['email', 'linkedin']),
  available: PropTypes.bool,
  revealLevel: PropTypes.oneOf(['none', 'partial', 'full']),
  partialValue: PropTypes.string,
  fullValue: PropTypes.string,
  tokenCost: PropTypes.number,
  onReveal: PropTypes.func,
  disabled: PropTypes.bool,
};

/* ── Reveal confirmation dialog ──────────────────────────────────── */
export const RevealConfirm = ({ type = 'email', tokenCost = 2, tokenBalance = 48, stage = 'initial', onConfirm, onCancel }) => {
  const label = type === 'email' ? 'email' : 'LinkedIn profile';
  const canAfford = tokenBalance >= tokenCost;

  const stageText = stage === 'full'
    ? `reveal the full ${label}`
    : `check if this ${label} is verified`;

  return (
    <div className="oai-reveal-confirm" role="alert">
      <p className="oai-reveal-confirm__text">
        {canAfford ? (
          <>
            This will use <span className="oai-reveal-confirm__cost">{tokenCost} tokens</span> to {stageText}.{' '}
            <span className="oai-reveal-confirm__balance">You have {tokenBalance} remaining.</span>
          </>
        ) : (
          <>
            You need <span className="oai-reveal-confirm__cost">{tokenCost} tokens</span> but only have{' '}
            <span className="oai-reveal-confirm__balance">{tokenBalance} remaining</span>. Upgrade your plan for more tokens.
          </>
        )}
      </p>
      <div className="oai-reveal-confirm__actions">
        <button className="oai-reveal-confirm__btn" onClick={onCancel}>
          Cancel
        </button>
        {canAfford && (
          <button className="oai-reveal-confirm__btn oai-reveal-confirm__btn--primary" onClick={onConfirm}>
            Reveal
          </button>
        )}
      </div>
    </div>
  );
};

RevealConfirm.propTypes = {
  type: PropTypes.oneOf(['email', 'linkedin']),
  tokenCost: PropTypes.number,
  tokenBalance: PropTypes.number,
  stage: PropTypes.oneOf(['initial', 'full']),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

/* ══════════════════════════════════════════════════════════════════
   LeadContactCard — Progressive reveal flow

   Step 1: View Lead → FREE
     - First name visible, last name blurred
     - Email: ✓ available / ✗ not available (free)
     - LinkedIn: ✓ available / ✗ not available (free)

   Step 2: "Reveal" email → Token cost confirmation
     - Apollo API check → partial email ("Sarah C•••@company.com")
     - First name revealed

   Step 3: "Reveal Full" → Additional token cost
     - Full email revealed

   Step 4: Already revealed → no further cost
   ══════════════════════════════════════════════════════════════════ */
export const LeadContactCard = ({
  lead,
  tokenBalance = 48,
  onTokenSpend,
  selected = false,
  onSelect,
}) => {
  // Reveal stages: 'none' → 'partial' → 'full'
  const [emailReveal, setEmailReveal] = useState(lead.emailRevealed ? 'full' : 'none');
  const [linkedinReveal, setLinkedinReveal] = useState(lead.linkedinRevealed ? 'full' : 'none');
  const [confirmingField, setConfirmingField] = useState(null);
  const [confirmStage, setConfirmStage] = useState('initial');

  const emailInitialCost = 2;
  const emailFullCost = 1;
  const linkedinCost = 1;

  const firstName = getFirstName(lead.name);
  const lastName = getLastName(lead.name);
  const nameRevealed = emailReveal !== 'none' || linkedinReveal !== 'none';

  const handleRevealClick = (field, stage) => {
    setConfirmingField(field);
    setConfirmStage(stage);
  };

  const handleConfirm = () => {
    if (confirmingField === 'email') {
      if (confirmStage === 'initial') {
        setEmailReveal('partial');
        onTokenSpend?.(emailInitialCost, 'email-partial', lead.id);
      } else {
        setEmailReveal('full');
        onTokenSpend?.(emailFullCost, 'email-full', lead.id);
      }
    } else if (confirmingField === 'linkedin') {
      setLinkedinReveal('full');
      onTokenSpend?.(linkedinCost, 'linkedin', lead.id);
    }
    setConfirmingField(null);
    setConfirmStage('initial');
  };

  const handleCancel = () => {
    setConfirmingField(null);
    setConfirmStage('initial');
  };

  const currentCost = () => {
    if (confirmingField === 'email') {
      return confirmStage === 'initial' ? emailInitialCost : emailFullCost;
    }
    return linkedinCost;
  };

  return (
    <div className={`oai-lead-drawer__contact ${selected ? 'oai-lead-drawer__contact--selected' : ''}`}>
      <input
        type="checkbox"
        className="oai-lead-drawer__contact-check"
        checked={selected}
        onChange={() => onSelect?.(lead.id)}
        aria-label={`Select ${firstName}`}
      />
      <div className="oai-lead-drawer__contact-body">
        {/* Name: first visible, last blurred until a reveal happens */}
        <div className="oai-lead-drawer__contact-name">
          {firstName}{' '}
          {nameRevealed ? lastName : blurText(lastName || 'Smith')}
        </div>
        <div className="oai-lead-drawer__contact-role">{lead.role}</div>

        <div className="oai-lead-drawer__contact-details" style={{ flexDirection: 'column', gap: '0' }}>
          {/* Email field */}
          <ContactField
            type="email"
            available={lead.hasEmail}
            revealLevel={emailReveal}
            partialValue={maskEmail(lead.email)}
            fullValue={lead.email}
            tokenCost={emailReveal === 'partial' ? emailFullCost : emailInitialCost}
            onReveal={() => handleRevealClick('email', emailReveal === 'partial' ? 'full' : 'initial')}
          />
          {/* LinkedIn field */}
          <ContactField
            type="linkedin"
            available={lead.hasLinkedin}
            revealLevel={linkedinReveal}
            fullValue={lead.linkedin}
            tokenCost={linkedinCost}
            onReveal={() => handleRevealClick('linkedin', 'full')}
          />
        </div>

        {confirmingField && (
          <RevealConfirm
            type={confirmingField}
            tokenCost={currentCost()}
            tokenBalance={tokenBalance}
            stage={confirmStage}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        <div className="oai-lead-drawer__contact-confidence">
          <span className={`oai-lead-drawer__confidence-dot oai-lead-drawer__confidence-dot--${lead.confidence}`} />
          {lead.confidence === 'high' ? 'High' : 'Medium'} confidence
        </div>
      </div>
    </div>
  );
};

LeadContactCard.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    hasEmail: PropTypes.bool,
    hasLinkedin: PropTypes.bool,
    email: PropTypes.string,
    linkedin: PropTypes.string,
    emailRevealed: PropTypes.bool,
    linkedinRevealed: PropTypes.bool,
    confidence: PropTypes.oneOf(['high', 'medium']),
  }).isRequired,
  tokenBalance: PropTypes.number,
  onTokenSpend: PropTypes.func,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icons } from './icons';
import './TokenBadge.css';

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
  revealed = false,
  value = '',
  tokenCost = 2,
  onReveal,
  disabled = false,
}) => {
  const label = type === 'email' ? 'Email' : 'LinkedIn';

  if (revealed && value) {
    return (
      <div className="oai-contact-field">
        <span className="oai-contact-field__revealed">
          {type === 'linkedin' ? (
            <a href={`https://${value}`} target="_blank" rel="noopener noreferrer">{value}</a>
          ) : (
            value
          )}
        </span>
      </div>
    );
  }

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
  revealed: PropTypes.bool,
  value: PropTypes.string,
  tokenCost: PropTypes.number,
  onReveal: PropTypes.func,
  disabled: PropTypes.bool,
};

/* ── Reveal confirmation dialog ──────────────────────────────────── */
export const RevealConfirm = ({ type = 'email', tokenCost = 2, tokenBalance = 48, onConfirm, onCancel }) => {
  const label = type === 'email' ? 'email' : 'LinkedIn profile';
  const canAfford = tokenBalance >= tokenCost;

  return (
    <div className="oai-reveal-confirm" role="alert">
      <p className="oai-reveal-confirm__text">
        {canAfford ? (
          <>
            This will use <span className="oai-reveal-confirm__cost">{tokenCost} tokens</span> to reveal this {label}.{' '}
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
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

/* ── Full lead contact card with token-gated reveal ──────────────── */
export const LeadContactCard = ({
  lead,
  tokenBalance = 48,
  onTokenSpend,
  selected = false,
  onSelect,
}) => {
  const [confirmingField, setConfirmingField] = useState(null);
  const [revealedFields, setRevealedFields] = useState({
    email: lead.emailRevealed || false,
    linkedin: lead.linkedinRevealed || false,
  });

  const emailCost = 2;
  const linkedinCost = 1;

  const handleRevealClick = (field) => {
    setConfirmingField(field);
  };

  const handleConfirm = (field) => {
    const cost = field === 'email' ? emailCost : linkedinCost;
    setRevealedFields((prev) => ({ ...prev, [field]: true }));
    onTokenSpend?.(cost, field, lead.id);
    setConfirmingField(null);
  };

  const handleCancel = () => {
    setConfirmingField(null);
  };

  return (
    <div className={`oai-lead-drawer__contact ${selected ? 'oai-lead-drawer__contact--selected' : ''}`}>
      <input
        type="checkbox"
        className="oai-lead-drawer__contact-check"
        checked={selected}
        onChange={() => onSelect?.(lead.id)}
        aria-label={`Select ${lead.name}`}
      />
      <div className="oai-lead-drawer__contact-body">
        <div className="oai-lead-drawer__contact-name">{lead.name}</div>
        <div className="oai-lead-drawer__contact-role">{lead.role}</div>
        <div className="oai-lead-drawer__contact-details" style={{ flexDirection: 'column', gap: '0' }}>
          <ContactField
            type="email"
            available={lead.hasEmail}
            revealed={revealedFields.email}
            value={lead.email}
            tokenCost={emailCost}
            onReveal={() => handleRevealClick('email')}
          />
          <ContactField
            type="linkedin"
            available={lead.hasLinkedin}
            revealed={revealedFields.linkedin}
            value={lead.linkedin}
            tokenCost={linkedinCost}
            onReveal={() => handleRevealClick('linkedin')}
          />
        </div>
        {confirmingField && (
          <RevealConfirm
            type={confirmingField}
            tokenCost={confirmingField === 'email' ? emailCost : linkedinCost}
            tokenBalance={tokenBalance}
            onConfirm={() => handleConfirm(confirmingField)}
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

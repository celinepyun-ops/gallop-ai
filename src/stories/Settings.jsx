import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import { Icons } from './icons';
import './settings.css';

const navItems = [
  { id: 'account', label: 'Account', icon: Icons.profile },
  { id: 'subscription', label: 'Subscription', icon: Icons.pricing },
  { id: 'preferences', label: 'Preferences', icon: Icons.settings },
];

/* ── Account Tab ──────────────────────────────────────────────────── */
const AccountTab = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState(user?.firstName || 'Jane');
  const [lastName, setLastName] = useState(user?.lastName || 'Doe');
  const [email] = useState(user?.email || 'jane.doe@outreach.ai');

  return (
    <div>
      <h2 className="oai-settings__section-title">Account</h2>
      <p className="oai-settings__section-desc">Manage your profile information and preferences.</p>

      {/* Profile Photo */}
      <div className="oai-settings__photo-row">
        <div className="oai-settings__photo">
          {firstName[0]}{lastName[0]}
        </div>
        <div className="oai-settings__photo-actions">
          <button className="oai-settings__photo-btn" type="button">Upload photo</button>
          <button className="oai-settings__photo-btn oai-settings__photo-btn--remove" type="button">Remove</button>
        </div>
      </div>

      <div className="oai-settings__divider" />

      {/* Name Fields */}
      <div className="oai-settings__form">
        <div className="oai-settings__row">
          <div className="oai-settings__field">
            <label className="oai-settings__label" htmlFor="settings-first">First name</label>
            <input
              className="oai-settings__input"
              id="settings-first"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="oai-settings__field">
            <label className="oai-settings__label" htmlFor="settings-last">Last name</label>
            <input
              className="oai-settings__input"
              id="settings-last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="oai-settings__field">
          <label className="oai-settings__label" htmlFor="settings-email">Email address</label>
          <input
            className="oai-settings__input"
            id="settings-email"
            type="email"
            value={email}
            disabled
          />
        </div>

        <div className="oai-settings__actions">
          <Button
            variant="primary"
            size="medium"
            label="Save Changes"
            onClick={() => onSave?.({ firstName, lastName })}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Subscription Tab ─────────────────────────────────────────────── */
const SubscriptionTab = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <h2 className="oai-settings__section-title">Subscription</h2>
      <p className="oai-settings__section-desc">Manage your plan and billing information.</p>

      {/* Current Plan */}
      <div className="oai-settings__plan-card">
        <div className="oai-settings__plan-info">
          <span className="oai-settings__plan-label">Current plan</span>
          <span className="oai-settings__plan-name">Standard</span>
        </div>
        <button className="oai-settings__plan-btn" type="button">Manage plan</button>
      </div>

      <p className="oai-settings__trial-msg">
        Your trial ends in 7 days. Activate now to unlock full access.
      </p>

      <button className="oai-settings__activate-btn" type="button">
        Activate Subscription
      </button>

      <div className="oai-settings__divider" />

      {/* Pause Plan Toggle */}
      <div className="oai-settings__toggle-row">
        <div className="oai-settings__toggle-info">
          <span className="oai-settings__toggle-label">Pause Subscription</span>
          <span className="oai-settings__toggle-desc">Temporarily pause your plan. You won't be charged while paused.</span>
        </div>
        <button
          className={`oai-settings__toggle ${paused ? 'oai-settings__toggle--checked' : ''}`}
          type="button"
          role="switch"
          aria-checked={paused}
          onClick={() => setPaused(!paused)}
        >
          <span className="oai-settings__toggle-knob" />
        </button>
      </div>

      <div className="oai-settings__divider" />

      {/* Payment Method */}
      <h3 className="oai-settings__section-title" style={{ fontSize: 'var(--font-size-md)' }}>Payment Method</h3>

      <div className="oai-settings__card-row">
        <div className="oai-settings__card-info">
          <div className="oai-settings__card-icon">VISA</div>
          <div className="oai-settings__card-details">
            <span className="oai-settings__card-number">**** **** **** 4242</span>
            <span className="oai-settings__card-expiry">Expires 12/2027</span>
          </div>
        </div>
        <button className="oai-settings__card-edit" type="button">Edit</button>
      </div>

      {/* Footer */}
      <div className="oai-settings__footer">
        <button className="oai-settings__footer-link" type="button">Terms of Service</button>
        <button className="oai-settings__footer-link" type="button">Privacy Policy</button>
      </div>
    </div>
  );
};

/* ── Preferences Tab ──────────────────────────────────────────────── */
const PreferencesTab = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div>
      <h2 className="oai-settings__section-title">Preferences</h2>
      <p className="oai-settings__section-desc">Customize your notification and communication settings.</p>

      <div className="oai-settings__toggle-row">
        <div className="oai-settings__toggle-info">
          <span className="oai-settings__toggle-label">Email Notifications</span>
          <span className="oai-settings__toggle-desc">Receive email alerts for campaign responses and updates.</span>
        </div>
        <button
          className={`oai-settings__toggle ${emailNotifs ? 'oai-settings__toggle--checked' : ''}`}
          type="button"
          role="switch"
          aria-checked={emailNotifs}
          onClick={() => setEmailNotifs(!emailNotifs)}
        >
          <span className="oai-settings__toggle-knob" />
        </button>
      </div>

      <div className="oai-settings__toggle-row">
        <div className="oai-settings__toggle-info">
          <span className="oai-settings__toggle-label">Weekly Digest</span>
          <span className="oai-settings__toggle-desc">Get a weekly summary of your outreach performance.</span>
        </div>
        <button
          className={`oai-settings__toggle ${weeklyDigest ? 'oai-settings__toggle--checked' : ''}`}
          type="button"
          role="switch"
          aria-checked={weeklyDigest}
          onClick={() => setWeeklyDigest(!weeklyDigest)}
        >
          <span className="oai-settings__toggle-knob" />
        </button>
      </div>
    </div>
  );
};

/* ── Settings Modal ───────────────────────────────────────────────── */
export const Settings = ({ onClose, onLogout, onSave, initialTab = 'account' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'subscription':
        return <SubscriptionTab />;
      case 'preferences':
        return <PreferencesTab />;
      case 'account':
      default:
        return <AccountTab onSave={onSave} />;
    }
  };

  return (
    <div className="oai-settings-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="oai-settings-modal" role="dialog" aria-label="Settings">
        <div className="oai-settings-modal__header">
          <h2 className="oai-settings-modal__title">Settings</h2>
          <button className="oai-settings-modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="oai-settings-modal__body">
          <nav className="oai-settings__nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`oai-settings__nav-item ${activeTab === item.id ? 'oai-settings__nav-item--active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <span className="oai-settings__nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              className="oai-settings__nav-item oai-settings__nav-item--danger"
              onClick={onLogout}
              type="button"
            >
              <span className="oai-settings__nav-icon">{Icons.signout}</span>
              Log out
            </button>
          </nav>

          <div className="oai-settings-modal__body-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  /** Close the modal */
  onClose: PropTypes.func,
  /** Callback when user logs out */
  onLogout: PropTypes.func,
  /** Callback when profile is saved */
  onSave: PropTypes.func,
  /** Which tab to show initially */
  initialTab: PropTypes.oneOf(['account', 'subscription', 'preferences']),
};

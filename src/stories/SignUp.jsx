import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icons } from './icons';
import './auth.css';

/** Sign Up page */
export const SignUp = ({ onSignUp, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp?.({ name, email, password });
  };

  return (
    <div className="oai-auth">
      <span className="oai-auth__cross oai-auth__cross--tl">+</span>
      <span className="oai-auth__cross oai-auth__cross--tr">+</span>
      <span className="oai-auth__cross oai-auth__cross--bl">+</span>
      <span className="oai-auth__cross oai-auth__cross--br">+</span>

      <div className="oai-auth__card">
        <div className="oai-auth__logo">
          <div className="oai-auth__logo-mark">
            {Icons.logo(32)}
          </div>
        </div>

        <h1 className="oai-auth__heading">Create Account</h1>
        <p className="oai-auth__subtitle">
          Sign up for Outreach AI to start your brand outreach.
        </p>

        <form className="oai-auth__form" onSubmit={handleSubmit}>
          <div className="oai-auth__field">
            <input
              className="oai-auth__input"
              type="text"
              id="signup-name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="oai-auth__label" htmlFor="signup-name">Full name*</label>
          </div>

          <div className="oai-auth__field">
            <input
              className="oai-auth__input"
              type="email"
              id="signup-email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="oai-auth__label" htmlFor="signup-email">Email address*</label>
          </div>

          <div className="oai-auth__field">
            <input
              className="oai-auth__input"
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '44px' }}
            />
            <label className="oai-auth__label" htmlFor="signup-password">Password*</label>
            <button
              type="button"
              className="oai-auth__password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div className="oai-auth__field">
            <input
              className="oai-auth__input"
              type={showConfirm ? 'text' : 'password'}
              id="signup-confirm"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              style={{ paddingRight: '44px' }}
            />
            <label className="oai-auth__label" htmlFor="signup-confirm">Confirm password*</label>
            <button
              type="button"
              className="oai-auth__password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showConfirm ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <button type="submit" className="oai-auth__submit">Create Account</button>
        </form>

        <div className="oai-auth__divider">
          <span className="oai-auth__divider-text">or</span>
        </div>

        <div className="oai-auth__social">
          <button type="button" className="oai-auth__social-btn">
            <span className="oai-auth__social-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </span>
            Sign up with Google
          </button>
          <button type="button" className="oai-auth__social-btn">
            <span className="oai-auth__social-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF"/>
                <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900"/>
                <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022"/>
                <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00"/>
              </svg>
            </span>
            Sign up with Microsoft Account
          </button>
        </div>

        <div className="oai-auth__footer">
          Already have an account?{' '}
          <button type="button" onClick={onLoginClick}>Log in</button>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  /** Called with { name, email, password } on form submit */
  onSignUp: PropTypes.func,
  /** Navigate to login page */
  onLoginClick: PropTypes.func,
};

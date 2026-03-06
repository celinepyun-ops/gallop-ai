import PropTypes from 'prop-types';
import { Icons } from './icons';
import './navbar.css';

/** Top application navigation bar */
export const Navbar = ({ brand, children, actions }) => {
  return (
    <header className="oai-navbar" role="banner">
      <div className="oai-navbar__brand">
        <span className="oai-navbar__brand-icon" style={{ color: 'var(--color-primary-600)' }}>{Icons.logo(24)}</span>
        {brand || 'Outreach AI'}
      </div>
      {children && <div className="oai-navbar__center">{children}</div>}
      {actions && <div className="oai-navbar__actions">{actions}</div>}
    </header>
  );
};

Navbar.propTypes = {
  /** Brand name or logo element */
  brand: PropTypes.node,
  /** Center content (e.g. Search) */
  children: PropTypes.node,
  /** Right-side action elements */
  actions: PropTypes.node,
};

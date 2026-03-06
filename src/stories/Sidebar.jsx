import PropTypes from 'prop-types';
import './sidebar.css';

/** Clean sidebar navigation with collapsible sections */
export const Sidebar = ({ items = [], collapsed = false, header, footer, activeItem, onToggleCollapse }) => {
  return (
    <aside className={`oai-sidebar ${collapsed ? 'oai-sidebar--collapsed' : ''}`}>
      {header && <div className="oai-sidebar__header">{header}</div>}
      {onToggleCollapse && (
        <button
          className="oai-sidebar__collapse-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed
              ? <polyline points="9 18 15 12 9 6" />
              : <polyline points="15 18 9 12 15 6" />
            }
          </svg>
        </button>
      )}
      <nav className="oai-sidebar__nav" aria-label="Main navigation">
        {items.map((section, sIdx) => (
          <div key={sIdx} className="oai-sidebar__section">
            {section.title && (
              <div className="oai-sidebar__section-title">{section.title}</div>
            )}
            <ul className="oai-sidebar__list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    className={`oai-sidebar__item ${activeItem === item.id ? 'oai-sidebar__item--active' : ''}`}
                    onClick={item.onClick}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.icon && <span className="oai-sidebar__icon">{item.icon}</span>}
                    <span className="oai-sidebar__label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="oai-sidebar__footer">{footer}</div>}
    </aside>
  );
};

Sidebar.propTypes = {
  /** Grouped navigation items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          icon: PropTypes.node,
          onClick: PropTypes.func,
        })
      ).isRequired,
    })
  ).isRequired,
  /** Whether sidebar is collapsed */
  collapsed: PropTypes.bool,
  /** Header content */
  header: PropTypes.node,
  /** Footer content */
  footer: PropTypes.node,
  /** Active item id */
  activeItem: PropTypes.string,
  /** Callback to toggle collapsed state */
  onToggleCollapse: PropTypes.func,
};

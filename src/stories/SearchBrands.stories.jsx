import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <ul className="oai-sidebar__list">
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
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
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
  </div>
);

/* ── Search Results mock data ─────────────────────────────────────── */
const searchResults = [
  { title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Ski...', asin: 'B00TTD9BRC', brand: 'CeraVe', price: '$18.96', rating: 4.7, reviews: 138412 },
  { title: 'La Roche-Posay Toleriane Double Repair Face Moisturizer, Daily M...', asin: 'B01N95PQHQ', brand: 'La Roche-Posay', price: '$24.99', rating: 4.6, reviews: 46666 },
  { title: 'CeraVe PM Facial Moisturizing Lotion, Night Cream with Hyaluron...', asin: 'B00365DABC', brand: 'CeraVe', price: '$14.87', rating: 4.7, reviews: 58786 },
  { title: 'Neutrogena Hydro Boost Water Gel Face Moisturizer with Hyaluroni...', asin: 'B00NR1YQHM', brand: 'Neutrogena', price: '$19.42', rating: 4.6, reviews: 72341 },
  { title: "Kiehl's Ultra Facial Cream, with 4.5% Squalane to Strengthen Ski...", asin: 'B004JVSWVU', brand: "Kiehl's", price: 'N/A', rating: 4.7, reviews: 5741 },
  { title: 'Olay Face Moisturizer, Regenerist Micro-Sculpting Cream for Wo...', asin: 'B007M81B4M', brand: 'Olay', price: '$24.94', rating: 4.6, reviews: 32829 },
  { title: "L'Oreal Paris Collagen Daily Face Moisturizer, Anti Aging Face Cre...", asin: 'B002JDUMFO', brand: "L'Oreal Paris", price: '$9.99', rating: 4.5, reviews: 51486 },
  { title: 'SimplyVital Collagen, Retinol & Hyaluronic Acid Cream - Anti-Agin...', asin: 'B08BSP2JNQ', brand: 'SimplyVital', price: 'N/A', rating: 4.4, reviews: 29018 },
  { title: 'The Ordinary Natural Moisturizing Factors + Hyaluronic Acid, Ligh...', asin: 'B0711DTHY2', brand: 'The Ordinary', price: '$6.70', rating: 4.6, reviews: 19216 },
  { title: 'Cetaphil Face & Body Moisturizer, Hydrating Moisturizing Cream f...', asin: 'B01H20MA62', brand: 'Cetaphil', price: '$19.48', rating: 4.7, reviews: 34147 },
  { title: 'Vanicream Daily Facial Moisturizer With Ceramides and Hyaluron...', asin: 'B088W4BXXK', brand: 'Vanicream', price: '$13.97', rating: 4.6, reviews: 21135 },
  { title: "POND'S Nourishing Moisturizing Cream, Crema S 14.1 oz", asin: 'B001FDJ71', brand: "POND'S", price: '$7.74', rating: 4.7, reviews: 12626 },
];

export default {
  title: 'Pages/Search Brands',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const SearchBrandsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [keyword, setKeyword] = useState('facial cream');
  const [limit, setLimit] = useState('20');
  const [minRating, setMinRating] = useState('');
  const [hasSearched, setHasSearched] = useState(true);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (asin) => {
    setSelected((prev) => prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin]);
  };

  const toggleAll = () => {
    if (selected.length === searchResults.length) {
      setSelected([]);
    } else {
      setSelected(searchResults.map((r) => r.asin));
    }
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="search-brands"
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
      <div style={{ maxWidth: '1100px' }}>
        <div className="oai-search-page__header">
          <h1 className="oai-search-page__title">Search Amazon Products</h1>
          <p className="oai-search-page__subtitle">Find top-selling and fast-growing brands to target for outreach.</p>
        </div>

        {/* Search form card */}
        <div className="oai-search-card">
          <div className="oai-search-card__form-grid">
            <div className="oai-search-card__field oai-search-card__field--keyword">
              <label className="oai-search-card__label">Keyword</label>
              <input className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. facial cream, sunscreen, vitamins" />
            </div>
            <div className="oai-search-card__field oai-search-card__field--limit">
              <label className="oai-search-card__label">Limit</label>
              <input className="oai-search-card__text-input" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />
            </div>
          </div>
          <div className="oai-search-card__form-row">
            <div className="oai-search-card__field oai-search-card__field--rating">
              <label className="oai-search-card__label">Min Rating (Optional)</label>
              <input className="oai-search-card__text-input" type="text" value={minRating} onChange={(e) => setMinRating(e.target.value)} placeholder="e.g., 4.0" />
            </div>
            <button className="oai-search-card__search-btn" onClick={() => setHasSearched(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="oai-results">
            <h2 className="oai-results__title">Search Results</h2>
            <div className="oai-results__table-wrap">
              <table className="oai-results__table">
                <thead>
                  <tr>
                    <th className="oai-results__th oai-results__th--check">
                      <input type="checkbox" checked={selected.length === searchResults.length} onChange={toggleAll} />
                    </th>
                    <th className="oai-results__th oai-results__th--image">Image</th>
                    <th className="oai-results__th oai-results__th--title">Title</th>
                    <th className="oai-results__th">Brand</th>
                    <th className="oai-results__th">Price</th>
                    <th className="oai-results__th">Rating</th>
                    <th className="oai-results__th oai-results__th--reviews">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((product) => (
                    <tr key={product.asin} className={`oai-results__row ${selected.includes(product.asin) ? 'oai-results__row--selected' : ''}`}>
                      <td className="oai-results__td oai-results__td--check">
                        <input type="checkbox" checked={selected.includes(product.asin)} onChange={() => toggleSelect(product.asin)} />
                      </td>
                      <td className="oai-results__td oai-results__td--image">
                        <div className="oai-results__image-placeholder" />
                      </td>
                      <td className="oai-results__td oai-results__td--title">
                        <div className="oai-results__product-title">{product.title}</div>
                        <div className="oai-results__product-asin">ASIN: {product.asin}</div>
                      </td>
                      <td className="oai-results__td">{product.brand}</td>
                      <td className="oai-results__td">{product.price}</td>
                      <td className="oai-results__td">
                        <span className="oai-results__rating">{'\u2605'} {product.rating}</span>
                      </td>
                      <td className="oai-results__td oai-results__td--reviews">{product.reviews.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Products in list */}
            <div className="oai-results__list-section">
              <h3 className="oai-results__list-title">
                Products in This List
                <span className="oai-results__list-count">{selected.length}</span>
              </h3>
              {selected.length === 0 ? (
                <div className="oai-results__list-empty">
                  <div className="oai-results__list-empty-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M8 12h8" />
                    </svg>
                  </div>
                  <p>No products in this list yet. Search and add products above.</p>
                </div>
              ) : (
                <div className="oai-results__list-items">
                  {searchResults.filter((r) => selected.includes(r.asin)).map((product) => (
                    <div key={product.asin} className="oai-results__list-item">
                      <div className="oai-results__image-placeholder oai-results__image-placeholder--sm" />
                      <div className="oai-results__list-item-info">
                        <span className="oai-results__list-item-name">{product.title}</span>
                        <span className="oai-results__list-item-brand">{product.brand}</span>
                      </div>
                      <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)}>{'\u2715'}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <SearchBrandsPage />,
};

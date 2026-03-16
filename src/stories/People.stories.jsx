import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <nav aria-label="Settings and account">
    <ul className="oai-sidebar__list">
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.contacts}</span>
          <span className="oai-sidebar__label">Support</span>
        </button>
      </li>
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.settings}</span>
          <span className="oai-sidebar__label">Settings</span>
        </button>
      </li>
      <li>
        <button
          className="oai-sidebar__item oai-sidebar__item--toggle"
          role="switch"
          aria-checked={darkMode}
          aria-label="Dark Mode"
          onClick={() => onToggleDark(!darkMode)}
        >
          <span className="oai-sidebar__icon" aria-hidden="true">{Icons.moon}</span>
          <span className="oai-sidebar__label">Dark Mode</span>
          <span className={`oai-sidebar__toggle ${darkMode ? 'oai-sidebar__toggle--checked' : ''}`}>
            <span className="oai-sidebar__toggle-knob" />
          </span>
        </button>
      </li>
      <li>
        <button className="oai-sidebar__item" onClick={fn()}>
          <span className="oai-sidebar__icon"><Avatar initials="MT" size="small" /></span>
          <span className="oai-sidebar__label">Mike Torres</span>
        </button>
      </li>
    </ul>
  </nav>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Gallop AI</span>
  </div>
);

/* ── Mock data ─────────────────────────────────────────────────────── */

const defaultTags = [
  'Vendor Manager',
  'Category Manager',
  'Business Development',
  'Brand Manager',
  'Buyer',
];

const brands = [
  { name: 'EcoGlow Naturals', company: 'EcoGlow Naturals Inc.', domain: 'ecoglownaturals.com', country: 'United States', state: 'California', city: 'San Francisco', growth: '+46%' },
  { name: 'SunShield Pro', company: 'SunShield Pro LLC', domain: 'sunshieldpro.com', country: 'United States', state: 'Florida', city: 'Miami', growth: '+38%' },
  { name: 'AquaVeil', company: 'AquaVeil Skincare Inc.', domain: 'aquaveil.com', country: 'United States', state: 'New York', city: 'New York', growth: '+55%' },
];

const people = [
  { id: 1, name: 'Sarah Chen', title: 'Head of Partnerships', company: 'EcoGlow Naturals', location: 'San Francisco', initials: 'SC', tags: ['Partnership Decision-Maker', 'Recent Hire — Building Vendor Pipeline'], growth: '+46%' },
  { id: 2, name: 'Jason Park', title: 'VP of Operations', company: 'EcoGlow Naturals', location: 'San Francisco', initials: 'JP', tags: ['Operations & Supply Chain Lead', 'Manufacturing Sourcing Authority'], growth: '+46%' },
  { id: 3, name: 'Maria Santos', title: 'Director of Product Development', company: 'SunShield Pro', location: 'Miami', initials: 'MS', tags: ['Product & Formulation Lead', 'Sunscreen Category Expert'], growth: '+38%' },
  { id: 4, name: 'Kevin Wright', title: 'Co-Founder & CEO', company: 'SunShield Pro', location: 'Miami', initials: 'KW', tags: ['Founder — Final Decision-Maker', 'Scaling Brand (Raised Series A)'], growth: '+38%' },
  { id: 5, name: 'Priya Sharma', title: 'Head of Supply Chain', company: 'AquaVeil', location: 'New York', initials: 'PS', tags: ['Supply Chain Lead', 'Actively Hiring — Scaling Operations'], growth: '+55%' },
  { id: 6, name: 'Alex Rivera', title: 'Brand Manager', company: 'AquaVeil', location: 'New York', initials: 'AR', tags: ['Brand & Amazon Strategy', 'Former L\'Oréal — DTC Experience'], growth: '+55%' },
  { id: 7, name: 'Emma Liu', title: 'COO', company: 'AquaVeil', location: 'New York', initials: 'EL', tags: ['Operations Decision-Maker', 'Frequently Out of Stock Signal'], growth: '+55%' },
];

/* ── Inline icon helpers ───────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const BullseyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default {
  title: 'Pages/People',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const PeoplePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [titleTags, setTitleTags] = useState([...defaultTags]);
  const [titleInput, setTitleInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && titleInput.trim()) {
      setTitleTags([...titleTags, titleInput.trim()]);
      setTitleInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTitleTags(titleTags.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleTogglePerson = (id) => {
    setSelectedPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(people.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="people"
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
      <div style={{ maxWidth: '1200px' }}>
        {/* Find Decision Makers card */}
        <div className="oai-people__finder">
          <h2 className="oai-people__finder-title"><span aria-hidden="true">{Icons.contacts}</span> Find Decision Makers</h2>

          <div className="oai-people__finder-input-row">
            <input
              className="oai-people__finder-input"
              type="text"
              placeholder="Type a job title and press Enter..."
              aria-label="Job title filter"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          {titleTags.length > 0 && (
            <div className="oai-people__finder-tags">
              {titleTags.map((tag, i) => (
                <span key={i} className="oai-people__finder-tag">
                  {tag}
                  <button className="oai-people__finder-tag-remove" onClick={() => handleRemoveTag(i)} aria-label={`Remove ${tag}`}>&times;</button>
                </span>
              ))}
            </div>
          )}

          <button className="oai-people__finder-search-btn" onClick={handleSearch}>
            <span aria-hidden="true">{Icons.search}</span> Find Contacts for All {brands.length} Brands
          </button>
        </div>

        {/* Brands in This List table */}
        <div className="oai-people__brands">
          <h3 className="oai-people__brands-title">
            Brands in This List <span className="oai-people__brands-count">{brands.length}</span>
          </h3>
          <div className="oai-people__brands-table-wrap">
            <table className="oai-people__brands-table">
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Company Name</th>
                  <th>Domain</th>
                  <th>Location</th>
                  <th>Rev. Growth</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b, i) => (
                  <tr key={i}>
                    <td className="oai-people__brands-td--bold">{b.name}</td>
                    <td>{b.company}</td>
                    <td>{b.domain}</td>
                    <td>{b.city}, {b.state}</td>
                    <td><span className="oai-results__trend oai-results__trend--up">{b.growth}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results (shown after clicking search) */}
        {showResults && (
          <>
            {/* Results header with stats and actions */}
            <div className="oai-people__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                <div className="oai-people__stat-box">
                  <div className="oai-people__stat-num">7</div>
                  <div className="oai-people__stat-lbl">Saved</div>
                </div>
                <div className="oai-people__stat-box">
                  <div className="oai-people__stat-num">0</div>
                  <div className="oai-people__stat-lbl">Emails</div>
                </div>
              </div>
              <div className="oai-people__header-actions">
                <button className="oai-people__find-btn" onClick={fn()}><span aria-hidden="true">{Icons.search}</span> Find More</button>
                <button className="oai-people__export-btn" onClick={fn()}>Export Contacts</button>
                <button className="oai-people__outbound-btn" onClick={fn()}><span aria-hidden="true">{Icons.campaigns}</span> Outbound</button>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="oai-people__toolbar">
              <div className="oai-people__filters">
                <div className="oai-people__search-input">
                  <Search placeholder="Search..." onChange={fn()} />
                </div>
                <button className="oai-people__filter-btn" onClick={fn()} aria-haspopup="true">Company <span aria-hidden="true">&#9662;</span></button>
                <button className="oai-people__filter-btn" onClick={fn()} aria-haspopup="true">Location <span aria-hidden="true">&#9662;</span></button>
                <button className="oai-people__filter-btn" onClick={fn()} aria-haspopup="true">Title <span aria-hidden="true">&#9662;</span></button>
              </div>
              <div className="oai-people__filters-right">
                <button className="oai-people__filter-btn" onClick={fn()} aria-haspopup="true">Sort: Intent <span aria-hidden="true">&#9662;</span></button>
                <label className="oai-people__select-all">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  Select all
                </label>
              </div>
            </div>

            {/* Date row */}
            <div className="oai-people__date-row">
              <span className="oai-people__date">March 9, 2026</span>
              <span className="oai-people__lead-count">{people.length} leads</span>
            </div>

            {/* People list */}
            <div className="oai-people__list">
              {people.map((person) => (
                <div
                  key={person.id}
                  className={`oai-people__row ${selectedPeople.includes(person.id) ? 'oai-people__row--selected' : ''}`}
                >
                  <div className="oai-people__row-check">
                    <input
                      type="checkbox"
                      aria-label={`Select ${person.name}`}
                      checked={selectedPeople.includes(person.id)}
                      onChange={() => handleTogglePerson(person.id)}
                    />
                  </div>
                  <div className="oai-people__row-avatar">
                    <Avatar initials={person.initials} size="medium" />
                  </div>
                  <div className="oai-people__row-info">
                    <div className="oai-people__row-name">{person.name}</div>
                    <div className="oai-people__row-title">{person.title}</div>
                    <div className="oai-people__row-company">{person.company} &middot; {person.location}</div>
                  </div>
                  <div className="oai-people__row-tags">
                    <Badge label="BULLSEYE" variant="success" size="small" icon={<BullseyeIcon />} />
                    {person.tags.map((tag, i) => (
                      <span key={i} className="oai-people__tag">{tag}</span>
                    ))}
                  </div>
                  <div className="oai-people__row-actions">
                    <button className="oai-people__icon-btn" aria-label="LinkedIn" title="LinkedIn" onClick={fn()}><LinkedInIcon /></button>
                    <button className="oai-people__icon-btn" aria-label="Email" title="Email" onClick={fn()}><EmailIcon /></button>
                    <button className="oai-people__icon-btn" aria-label="View profile" title="View" onClick={fn()}><ViewIcon /></button>
                    <button className="oai-people__icon-btn" aria-label="Save contact" title="Save" onClick={fn()}><SaveIcon /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selection action bar */}
            {selectedPeople.length > 0 && (
              <div className="oai-people__action-bar">
                <span className="oai-people__action-bar-count">
                  {selectedPeople.length} {selectedPeople.length === 1 ? 'lead' : 'leads'} selected
                </span>
                <div className="oai-people__action-bar-btns">
                  <button className="oai-people__action-bar-btn oai-people__action-bar-btn--primary" onClick={fn()}>
                    <span aria-hidden="true">{Icons.campaigns}</span> Add to Email Queue
                  </button>
                  <button className="oai-people__action-bar-btn" onClick={fn()}>
                    Export CSV
                  </button>
                  <button className="oai-people__action-bar-btn oai-people__action-bar-btn--danger" onClick={() => { setSelectedPeople([]); setSelectAll(false); }}>
                    Deselect All
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <PeoplePage />,
};

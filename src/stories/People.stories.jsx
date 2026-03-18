import { useState, useRef, useEffect } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Tabs } from './Tabs';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search', label: 'Search', icon: Icons.search, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
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

const suggestedRoles = [
  { label: 'CEO / Founder', category: 'Leadership' },
  { label: 'COO', category: 'Leadership' },
  { label: 'VP of Operations', category: 'Leadership' },
  { label: 'Head of Partnerships', category: 'Partnerships' },
  { label: 'Director of Business Development', category: 'Partnerships' },
  { label: 'Vendor Manager', category: 'Partnerships' },
  { label: 'Head of Supply Chain', category: 'Operations' },
  { label: 'Director of Purchasing', category: 'Operations' },
  { label: 'Procurement Manager', category: 'Operations' },
  { label: 'Category Manager', category: 'Operations' },
  { label: 'Director of Product Development', category: 'Product' },
  { label: 'Brand Manager', category: 'Product' },
  { label: 'Product Manager', category: 'Product' },
  { label: 'Head of Marketing', category: 'Marketing' },
  { label: 'Buyer', category: 'Retail' },
  { label: 'Retail Account Manager', category: 'Retail' },
];

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
  { id: 6, name: 'Alex Rivera', title: 'Brand Manager', company: 'AquaVeil', location: 'New York', initials: 'AR', tags: ['Brand & Amazon Strategy', 'Former L\'Oreal — DTC Experience'], growth: '+55%' },
  { id: 7, name: 'Emma Liu', title: 'COO', company: 'AquaVeil', location: 'New York', initials: 'EL', tags: ['Operations Decision-Maker', 'Frequently Out of Stock Signal'], growth: '+55%' },
];

/* ── Company mock data ─────────────────────────────────────────────── */

const companies = [
  { id: 1, name: 'EcoGlow Naturals Inc.', domain: 'ecoglownaturals.com', industry: 'Skincare & Beauty', size: '51-200', location: 'San Francisco, CA', employeeCount: 142, growth: '+46%' },
  { id: 2, name: 'SunShield Pro LLC', domain: 'sunshieldpro.com', industry: 'Suncare & SPF', size: '11-50', location: 'Miami, FL', employeeCount: 38, growth: '+38%' },
  { id: 3, name: 'AquaVeil Skincare Inc.', domain: 'aquaveil.com', industry: 'Skincare & Hydration', size: '51-200', location: 'New York, NY', employeeCount: 89, growth: '+55%' },
  { id: 4, name: 'Botaniq Beauty Co.', domain: 'botaniqbeauty.com', industry: 'Natural Cosmetics', size: '11-50', location: 'Austin, TX', employeeCount: 27, growth: '+32%' },
  { id: 5, name: 'PureRoot Labs', domain: 'purerootlabs.com', industry: 'Clean Beauty & Skincare', size: '201-500', location: 'Portland, OR', employeeCount: 315, growth: '+61%' },
];

const companyPeople = {
  1: [
    { id: 101, name: 'Sarah Chen', title: 'Head of Partnerships', initials: 'SC', tags: ['Partnership Decision-Maker'] },
    { id: 102, name: 'Jason Park', title: 'VP of Operations', initials: 'JP', tags: ['Operations Lead'] },
    { id: 103, name: 'Linda Tran', title: 'Procurement Manager', initials: 'LT', tags: ['Sourcing Authority'] },
  ],
  2: [
    { id: 201, name: 'Maria Santos', title: 'Director of Product Development', initials: 'MS', tags: ['Product Lead'] },
    { id: 202, name: 'Kevin Wright', title: 'Co-Founder & CEO', initials: 'KW', tags: ['Final Decision-Maker'] },
  ],
  3: [
    { id: 301, name: 'Priya Sharma', title: 'Head of Supply Chain', initials: 'PS', tags: ['Supply Chain Lead'] },
    { id: 302, name: 'Alex Rivera', title: 'Brand Manager', initials: 'AR', tags: ['Brand Strategy'] },
    { id: 303, name: 'Emma Liu', title: 'COO', initials: 'EL', tags: ['Operations Decision-Maker'] },
  ],
  4: [
    { id: 401, name: 'Dana Kim', title: 'Founder & CEO', initials: 'DK', tags: ['Founder'] },
    { id: 402, name: 'Raj Patel', title: 'Head of Sales', initials: 'RP', tags: ['Sales Lead'] },
  ],
  5: [
    { id: 501, name: 'Nicole Okafor', title: 'VP of Operations', initials: 'NO', tags: ['Operations Lead'] },
    { id: 502, name: 'James Whitfield', title: 'Director of Purchasing', initials: 'JW', tags: ['Purchasing Authority'] },
    { id: 503, name: 'Mei-Ling Zhao', title: 'Category Manager', initials: 'MZ', tags: ['Category Expert'] },
  ],
};

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

const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <line x1="8" y1="6" x2="8" y2="6" />
    <line x1="12" y1="6" x2="12" y2="6" />
    <line x1="16" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="8" y2="10" />
    <line x1="12" y1="10" x2="12" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="8" y2="14" />
    <line x1="12" y1="14" x2="12" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
  </svg>
);

const FindSimilarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default {
  title: 'Pages/People',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

/* ── People Tab Content ─────────────────────────────────────────────── */

const PeopleTabContent = ({
  titleTags, setTitleTags, titleInput, setTitleInput,
  showResults, setShowResults, selectedPeople, setSelectedPeople,
  selectAll, setSelectAll, showSuggestions, setShowSuggestions,
  focusedSuggestion, setFocusedSuggestion, inputWrapRef,
}) => {
  const filteredSuggestions = suggestedRoles.filter(
    (r) => !titleTags.includes(r.label) && (titleInput === '' || r.label.toLowerCase().includes(titleInput.toLowerCase()))
  );

  const groupedSuggestions = filteredSuggestions.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  const flatSuggestions = filteredSuggestions;

  const addTag = (label) => {
    if (!titleTags.includes(label)) {
      setTitleTags([...titleTags, label]);
    }
    setTitleInput('');
    setShowSuggestions(false);
    setFocusedSuggestion(-1);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedSuggestion >= 0 && flatSuggestions[focusedSuggestion]) {
        addTag(flatSuggestions[focusedSuggestion].label);
      } else if (titleInput.trim()) {
        addTag(titleInput.trim());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setShowSuggestions(true);
      setFocusedSuggestion((i) => (i + 1) % flatSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestion((i) => (i - 1 + flatSuggestions.length) % flatSuggestions.length);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
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
    <>
      {/* Find Decision Makers card */}
      <div className="oai-people__finder">
        <h2 className="oai-people__finder-title"><span aria-hidden="true">{Icons.contacts}</span> Find Decision Makers</h2>

        <div className="oai-people__finder-input-row">
          <div className="oai-people__finder-input-wrap" ref={inputWrapRef}>
            <input
              className="oai-people__finder-input"
              type="text"
              placeholder="Type a job title or select from suggestions..."
              aria-label="Job title filter"
              aria-autocomplete="list"
              value={titleInput}
              onChange={(e) => { setTitleInput(e.target.value); setShowSuggestions(true); setFocusedSuggestion(-1); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleAddTag}
            />
            {showSuggestions && flatSuggestions.length > 0 && (
              <ul className="oai-people__autocomplete" role="listbox">
                {Object.entries(groupedSuggestions).map(([cat, roles]) => (
                  <li key={cat} role="presentation">
                    <div className="oai-people__autocomplete-section">{cat}</div>
                    {roles.map((r) => {
                      const idx = flatSuggestions.indexOf(r);
                      return (
                        <div
                          key={r.label}
                          className={[
                            'oai-people__autocomplete-item',
                            idx === focusedSuggestion && 'oai-people__autocomplete-item--focused',
                          ].filter(Boolean).join(' ')}
                          role="option"
                          aria-selected={idx === focusedSuggestion}
                          onClick={() => addTag(r.label)}
                          onMouseEnter={() => setFocusedSuggestion(idx)}
                        >
                          {r.label}
                        </div>
                      );
                    })}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            <div className="oai-people__stat-box">
              <div className="oai-people__stat-num">{selectedPeople.length}</div>
              <div className="oai-people__stat-lbl">Saved</div>
            </div>
            <div className="oai-people__stat-box">
              <div className="oai-people__stat-num">0</div>
              <div className="oai-people__stat-lbl">Emails</div>
            </div>
            <button className="oai-people__find-btn" onClick={fn()}><span aria-hidden="true">{Icons.contacts}</span> Find More</button>
            <button className="oai-people__export-btn" onClick={fn()}>Export &#9662;</button>
            <button className="oai-people__outbound-btn" onClick={fn()}><span aria-hidden="true">{Icons.campaigns}</span> Outbound</button>
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
            <span className="oai-people__date">March 18, 2026</span>
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
    </>
  );
};

/* ── Company Tab Content ────────────────────────────────────────────── */

const CompanyTabContent = () => {
  const [companySearch, setCompanySearch] = useState('');
  const [showCompanyResults, setShowCompanyResults] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyPeople, setSelectedCompanyPeople] = useState([]);

  const filteredCompanies = companies.filter(
    (c) => companySearch === '' ||
      c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
      c.domain.toLowerCase().includes(companySearch.toLowerCase())
  );

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setSelectedCompanyPeople([]);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
    setSelectedCompanyPeople([]);
  };

  const handleToggleCompanyPerson = (id) => {
    setSelectedCompanyPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCompanySearch = () => {
    setShowCompanyResults(true);
  };

  // Company people drill-down view
  if (selectedCompany) {
    const companyContacts = companyPeople[selectedCompany.id] || [];
    return (
      <div className="oai-company__drilldown">
        <button className="oai-company__back-btn" onClick={handleBackToCompanies}>
          <ArrowLeftIcon /> Back to Companies
        </button>

        <div className="oai-company__detail-header">
          <div className="oai-company__detail-avatar">
            <BuildingIcon />
          </div>
          <div className="oai-company__detail-info">
            <h3 className="oai-company__detail-name">{selectedCompany.name}</h3>
            <div className="oai-company__detail-meta">
              <span><GlobeIcon /> {selectedCompany.domain}</span>
              <span>{selectedCompany.industry}</span>
              <span>{selectedCompany.location}</span>
            </div>
          </div>
          <div className="oai-company__detail-stats">
            <div className="oai-people__stat-box">
              <div className="oai-people__stat-num">{selectedCompany.employeeCount}</div>
              <div className="oai-people__stat-lbl">Employees</div>
            </div>
            <div className="oai-people__stat-box">
              <div className="oai-people__stat-num">{companyContacts.length}</div>
              <div className="oai-people__stat-lbl">Contacts</div>
            </div>
          </div>
        </div>

        <div className="oai-people__date-row">
          <span className="oai-people__date">People at {selectedCompany.name}</span>
          <span className="oai-people__lead-count">{companyContacts.length} contacts</span>
        </div>

        <div className="oai-people__list">
          {companyContacts.map((person) => (
            <div
              key={person.id}
              className={`oai-people__row ${selectedCompanyPeople.includes(person.id) ? 'oai-people__row--selected' : ''}`}
            >
              <div className="oai-people__row-check">
                <input
                  type="checkbox"
                  aria-label={`Select ${person.name}`}
                  checked={selectedCompanyPeople.includes(person.id)}
                  onChange={() => handleToggleCompanyPerson(person.id)}
                />
              </div>
              <div className="oai-people__row-avatar">
                <Avatar initials={person.initials} size="medium" />
              </div>
              <div className="oai-people__row-info">
                <div className="oai-people__row-name">{person.name}</div>
                <div className="oai-people__row-title">{person.title}</div>
                <div className="oai-people__row-company">{selectedCompany.name}</div>
              </div>
              <div className="oai-people__row-tags">
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

        {selectedCompanyPeople.length > 0 && (
          <div className="oai-people__action-bar">
            <span className="oai-people__action-bar-count">
              {selectedCompanyPeople.length} {selectedCompanyPeople.length === 1 ? 'contact' : 'contacts'} selected
            </span>
            <div className="oai-people__action-bar-btns">
              <button className="oai-people__action-bar-btn oai-people__action-bar-btn--primary" onClick={fn()}>
                <span aria-hidden="true">{Icons.campaigns}</span> Add to Email Queue
              </button>
              <button className="oai-people__action-bar-btn" onClick={fn()}>
                Export CSV
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Company search and results list view
  return (
    <>
      {/* Company search card */}
      <div className="oai-company__search-card">
        <h2 className="oai-people__finder-title"><span aria-hidden="true"><BuildingIcon /></span> Find Companies</h2>
        <div className="oai-company__search-row">
          <input
            className="oai-people__finder-input"
            type="text"
            placeholder="Search by company name or domain..."
            aria-label="Company search"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCompanySearch()}
          />
          <button className="oai-company__search-btn" onClick={handleCompanySearch}>
            <span aria-hidden="true">{Icons.search}</span> Search
          </button>
        </div>
      </div>

      {/* Company results */}
      {showCompanyResults && (
        <>
          <div className="oai-people__date-row">
            <span className="oai-people__date">Company Results</span>
            <span className="oai-people__lead-count">{filteredCompanies.length} companies</span>
          </div>

          <div className="oai-company__results">
            <div className="oai-company__table-wrap">
              <table className="oai-company__table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Domain</th>
                    <th>Industry</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Employees</th>
                    <th>Growth</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="oai-company__row">
                      <td>
                        <button
                          className="oai-company__name-btn"
                          onClick={() => handleCompanyClick(company)}
                          title={`View people at ${company.name}`}
                        >
                          {company.name}
                        </button>
                      </td>
                      <td className="oai-company__domain">{company.domain}</td>
                      <td><Badge label={company.industry} variant="info" size="small" /></td>
                      <td>{company.size}</td>
                      <td>{company.location}</td>
                      <td>{company.employeeCount}</td>
                      <td><span className="oai-results__trend oai-results__trend--up">{company.growth}</span></td>
                      <td>
                        <div className="oai-company__actions">
                          <button
                            className="oai-company__view-btn"
                            onClick={() => handleCompanyClick(company)}
                            title="View people"
                          >
                            <ViewIcon /> People
                          </button>
                          <button
                            className="oai-company__similar-btn"
                            onClick={fn()}
                            title="Find similar companies"
                          >
                            <FindSimilarIcon /> Find Similar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* ── Main People Page ──────────────────────────────────────────────── */

const PeoplePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('people');

  // People tab state
  const [titleTags, setTitleTags] = useState([...defaultTags]);
  const [titleInput, setTitleInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const inputWrapRef = useRef(null);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (inputWrapRef.current && !inputWrapRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const tabs = [
    { id: 'people', label: 'People' },
    { id: 'company', label: 'Company' },
  ];

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
          <Search placeholder="Search products..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        <div className="oai-people__tabs-header">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} variant="underline" />
        </div>

        <div className="oai-tabs__panel" role="tabpanel" aria-label={activeTab === 'people' ? 'People search' : 'Company search'}>
          {activeTab === 'people' && (
            <PeopleTabContent
              titleTags={titleTags} setTitleTags={setTitleTags}
              titleInput={titleInput} setTitleInput={setTitleInput}
              showResults={showResults} setShowResults={setShowResults}
              selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople}
              selectAll={selectAll} setSelectAll={setSelectAll}
              showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions}
              focusedSuggestion={focusedSuggestion} setFocusedSuggestion={setFocusedSuggestion}
              inputWrapRef={inputWrapRef}
            />
          )}

          <button className="oai-people__finder-search-btn" onClick={handleSearch}>
            <span aria-hidden="true">{Icons.search}</span> Find Contacts for All {brands.length} Products
          </button>
        </div>

        {/* Products in This List table */}
        <div className="oai-people__brands">
          <h3 className="oai-people__brands-title">
            Products in This List <span className="oai-people__brands-count">{brands.length}</span>
          </h3>
          <div className="oai-people__brands-table-wrap">
            <table className="oai-people__brands-table">
              <thead>
                <tr>
                  <th>Product Name</th>
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
              <div className="oai-people__stat-box">
                <div className="oai-people__stat-num">{selectedPeople.length}</div>
                <div className="oai-people__stat-lbl">Saved</div>
              </div>
              <div className="oai-people__stat-box">
                <div className="oai-people__stat-num">0</div>
                <div className="oai-people__stat-lbl">Emails</div>
              </div>
              <button className="oai-people__find-btn" onClick={fn()}><span aria-hidden="true">{Icons.contacts}</span> Find More</button>
              <button className="oai-people__export-btn" onClick={fn()}>Export ▾</button>
              <button className="oai-people__outbound-btn" onClick={fn()}><span aria-hidden="true">{Icons.campaigns}</span> Outbound</button>
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

          {activeTab === 'company' && (
            <CompanyTabContent />
          )}
        </div>
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  name: 'People Tab',
  render: () => <PeoplePage />,
};

export const CompanyTab = {
  name: 'Company Tab',
  render: () => {
    const Component = () => {
      const [darkMode, setDarkMode] = useState(false);
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

      const tabs = [
        { id: 'people', label: 'People' },
        { id: 'company', label: 'Company' },
      ];

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
              <Search placeholder="Search products..." onChange={fn()} />
            </Navbar>
          }
        >
          <div style={{ maxWidth: '1200px' }}>
            <div className="oai-people__tabs-header">
              <Tabs tabs={tabs} activeTab="company" onTabChange={fn()} variant="underline" />
            </div>
            <div className="oai-tabs__panel" role="tabpanel" aria-label="Company search">
              <CompanyTabContent />
            </div>
          </div>
          <HelpButton onSubmit={fn()} />
        </PageLayout>
      );
    };
    return <Component />;
  },
};

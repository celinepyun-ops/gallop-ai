import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseSearchQuery } from '../services/nlpParser';
import { Badge } from './Badge';
import './searchpage.css';

/* ══════════════════════════════════════════════════════════════════
   NLPSearchInput — Natural language search with parsed filter preview
   ══════════════════════════════════════════════════════════════════ */

const RECENT_SEARCHES = ['sunscreen SPF 50', 'CeraVe', 'vitamin C serum'];
const SUGGESTED_SEARCHES = [
  'skincare brands growing over 30%',
  'sunscreen under rank 5000',
  'hair care above $50K revenue',
];

export const NLPSearchInput = ({ onSearch, onFiltersDetected }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const parsed = useMemo(() => parseSearchQuery(query), [query]);

  const hasFilters = Object.keys(parsed.filters).length > 0;

  const handleSearch = () => {
    onSearch?.(parsed.keyword, parsed.type);
    onFiltersDetected?.(parsed.filters);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') setShowSuggestions(false);
  };

  const applySuggestion = (text) => {
    setQuery(text);
    setShowSuggestions(false);
  };

  const filterTags = [];
  if (parsed.keyword) filterTags.push({ label: `keyword: "${parsed.keyword}"`, variant: 'info' });
  if (parsed.filters.salesRankMax) filterTags.push({ label: `rank: <${parsed.filters.salesRankMax.toLocaleString()}`, variant: 'success' });
  if (parsed.filters.salesRankMin) filterTags.push({ label: `rank: >${parsed.filters.salesRankMin.toLocaleString()}`, variant: 'success' });
  if (parsed.filters.revenueMin) filterTags.push({ label: `revenue: >$${(parsed.filters.revenueMin / 1000).toFixed(0)}K`, variant: 'success' });
  if (parsed.filters.revenueMax) filterTags.push({ label: `revenue: <$${(parsed.filters.revenueMax / 1000).toFixed(0)}K`, variant: 'success' });
  if (parsed.filters.growthMin) filterTags.push({ label: `growth: >${parsed.filters.growthMin}%`, variant: 'success' });
  if (parsed.type === 'brand') filterTags.push({ label: 'type: brand', variant: 'warning' });

  return (
    <div className="oai-nlp-search">
      {/* Input row */}
      <div className="oai-nlp-search__input-wrap">
        <span className="oai-nlp-search__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          className="oai-nlp-search__input"
          type="text"
          placeholder='Try: "sunscreen under rank 5000 with 20% growth"'
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          aria-label="Natural language search"
        />
        {query && (
          <button
            className="oai-nlp-search__clear"
            onClick={() => { setQuery(''); setShowSuggestions(false); }}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
        <button className="oai-nlp-search__btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Parsed filter tags */}
      {query && hasFilters && (
        <div className="oai-nlp-search__tags">
          {filterTags.map((tag, i) => (
            <Badge key={i} label={tag.label} variant={tag.variant} size="small" />
          ))}
        </div>
      )}

      {/* Suggestion dropdown */}
      {showSuggestions && !query && (
        <div className="oai-nlp-search__dropdown">
          <div className="oai-nlp-search__dropdown-section">
            <span className="oai-nlp-search__dropdown-title">Recent Searches</span>
            {RECENT_SEARCHES.map((s) => (
              <button key={s} className="oai-nlp-search__dropdown-item" onClick={() => applySuggestion(s)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                {s}
              </button>
            ))}
          </div>
          <div className="oai-nlp-search__dropdown-section">
            <span className="oai-nlp-search__dropdown-title">Suggested</span>
            {SUGGESTED_SEARCHES.map((s) => (
              <button key={s} className="oai-nlp-search__dropdown-item" onClick={() => applySuggestion(s)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

NLPSearchInput.propTypes = {
  /** Called with (keyword, type) on search */
  onSearch: PropTypes.func,
  /** Called with parsed filter object */
  onFiltersDetected: PropTypes.func,
};

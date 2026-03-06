import { useState, useId, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './select.css';

/** Custom select dropdown with label and helper text */
export const Select = ({ label, placeholder, options = [], helperText, error, disabled, name, id, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const autoId = useId();
  const selectId = id || autoId;
  const listboxId = `${selectId}-listbox`;
  const ref = useRef(null);
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selected = options.find((opt) => opt.value === value);
  const displayLabel = selected ? selected.label : placeholder || '';

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus selected or first item on open
  useEffect(() => {
    if (open) {
      const idx = options.findIndex((opt) => opt.value === value);
      setFocusedIndex(idx >= 0 ? idx : 0);
    }
  }, [open, options, value]);

  // Scroll focused item into view
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      listRef.current?.children[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, focusedIndex]);

  const handleSelect = (opt) => {
    onChange?.({ target: { name, value: opt.value } });
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) handleSelect(options[focusedIndex]);
        break;
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      default:
        break;
    }
  };

  const triggerClass = [
    'oai-select__trigger',
    open && 'oai-select__trigger--open',
    error && 'oai-select__trigger--error',
    disabled && 'oai-select__trigger--disabled',
    !selected && 'oai-select__trigger--placeholder',
  ].filter(Boolean).join(' ');

  return (
    <div className="oai-select-wrapper" ref={ref}>
      {label && <label className="oai-select__label" id={`${selectId}-label`}>{label}</label>}

      {/* Hidden native select for form submission */}
      {name && <input type="hidden" name={name} value={value || ''} />}

      <button
        type="button"
        className={triggerClass}
        id={selectId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-invalid={error || undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
      >
        <span className="oai-select__value">{displayLabel}</span>
        <svg className={`oai-select__chevron ${open ? 'oai-select__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          className="oai-select__menu"
          role="listbox"
          id={listboxId}
          ref={listRef}
          aria-labelledby={label ? `${selectId}-label` : undefined}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              className={[
                'oai-select__option',
                opt.value === value && 'oai-select__option--selected',
                i === focusedIndex && 'oai-select__option--focused',
              ].filter(Boolean).join(' ')}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => setFocusedIndex(i)}
            >
              <span className="oai-select__option-check">
                {opt.value === value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {helperText && (
        <span className={`oai-select__helper ${error ? 'oai-select__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Select.propTypes = {
  /** Label text */
  label: PropTypes.string,
  /** Placeholder text when no option is selected */
  placeholder: PropTypes.string,
  /** Select options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Helper text below the select */
  helperText: PropTypes.string,
  /** Whether the select has an error */
  error: PropTypes.bool,
  /** Whether the select is disabled */
  disabled: PropTypes.bool,
  /** Form name attribute */
  name: PropTypes.string,
  /** Element id attribute */
  id: PropTypes.string,
  /** Controlled value */
  value: PropTypes.string,
  /** Change handler — receives { target: { name, value } } */
  onChange: PropTypes.func,
};

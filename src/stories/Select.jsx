import { useId } from 'react';
import PropTypes from 'prop-types';
import './select.css';

/** Native select field with label and helper text */
export const Select = ({ label, placeholder, options = [], helperText, error, disabled, name, id, value, onChange }) => {
  const autoId = useId();
  const selectId = id || autoId;

  const selectClass = [
    'oai-select',
    error && 'oai-select--error',
    disabled && 'oai-select--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className="oai-select-wrapper">
      {label && <label className="oai-select__label" htmlFor={selectId}>{label}</label>}
      <select
        className={selectClass}
        id={selectId}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error || undefined}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
  /** Placeholder option (shown as disabled first option) */
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
  /** Select name attribute */
  name: PropTypes.string,
  /** Select id attribute */
  id: PropTypes.string,
  /** Controlled value */
  value: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
};

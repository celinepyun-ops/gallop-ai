import PropTypes from 'prop-types';
import './button.css';

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  label,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type="button"
      className={['oai-button', `oai-button--${variant}`, `oai-button--${size}`].join(' ')}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /** Visual style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  /** How large should the button be? */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Optional click handler */
  onClick: PropTypes.func,
};

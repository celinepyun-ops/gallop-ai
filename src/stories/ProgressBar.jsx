import PropTypes from 'prop-types';
import './progressbar.css';

/** Horizontal progress indicator */
export const ProgressBar = ({ value = 0, max = 100, variant = 'primary', size = 'md', showValue = false }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="oai-progress">
      <div
        className={`oai-progress__track oai-progress__track--${size}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`oai-progress__fill oai-progress__fill--${variant}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showValue && <span className="oai-progress__value">{Math.round(percent)}%</span>}
    </div>
  );
};
ProgressBar.propTypes = {
  /** Current value */
  value: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Color variant */
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'error']),
  /** Track height */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Show percentage label */
  showValue: PropTypes.bool,
};

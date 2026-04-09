import { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { Icons } from './icons';
import './table.css';

/** Data table with sorting, selection, and loading states */
export const Table = ({
  columns = [],
  data = [],
  sortable = false,
  selectable = false,
  striped = false,
  loading = false,
  emptyMessage = 'No data available',
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [selected, setSelected] = useState([]);

  const handleSort = (key) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey] ?? '';
        const bVal = b[sortKey] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  const allSelected = data.length > 0 && selected.length === data.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : data.map((_, i) => i));
  };

  const toggleRow = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="oai-table-wrapper" role="status" aria-label="Loading table">
        <table className="oai-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    <LoadingSkeleton variant="text" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="oai-table-wrapper">
        <EmptyState title={emptyMessage} icon={Icons.templates} />
      </div>
    );
  }

  return (
    <div className="oai-table-wrapper">
      <table className={`oai-table ${striped ? 'oai-table--striped' : ''}`}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  className="oai-table__checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={sortable ? 'oai-table__th--sortable' : undefined}
                onClick={() => handleSort(col.key)}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                {col.label}
                {sortable && sortKey === col.key && (
                  <span className="oai-table__sort-icon">{sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    className="oai-table__checkbox"
                    checked={selected.includes(rowIndex)}
                    onChange={() => toggleRow(rowIndex)}
                    aria-label={`Select row ${rowIndex + 1}`}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  /** Column definitions */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  /** Row data */
  data: PropTypes.arrayOf(PropTypes.object),
  /** Enable column sorting */
  sortable: PropTypes.bool,
  /** Enable row selection */
  selectable: PropTypes.bool,
  /** Striped row backgrounds */
  striped: PropTypes.bool,
  /** Show loading skeleton */
  loading: PropTypes.bool,
  /** Empty state message */
  emptyMessage: PropTypes.string,
};

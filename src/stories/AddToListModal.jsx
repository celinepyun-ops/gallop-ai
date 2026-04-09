import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';
import { Badge } from './Badge';
import './Lists.css';

/* ══════════════════════════════════════════════════════════════════
   AddToListModal — shown from Search page to add a product to a list
   ══════════════════════════════════════════════════════════════════ */

const MOCK_LISTS = [
  { id: 'list-1', name: 'Sunscreen Brands', itemCount: 10 },
  { id: 'list-2', name: 'Hair Care Prospects', itemCount: 10 },
  { id: 'list-3', name: 'Q2 Outreach', itemCount: 10 },
];

export const AddToListModal = ({
  isOpen = false,
  onClose,
  onAdd,
  productName = 'Selected Product',
  lists = MOCK_LISTS,
}) => {
  const [selectedListId, setSelectedListId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (selectedListId) {
      onAdd?.(selectedListId);
      onClose?.();
      setSelectedListId(null);
    }
  };

  const handleCreate = () => {
    if (newName.trim()) {
      onAdd?.(`new:${newName.trim()}`);
      onClose?.();
      setNewName('');
      setCreating(false);
    }
  };

  const handleClose = () => {
    setSelectedListId(null);
    setCreating(false);
    setNewName('');
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add to List"
      size="sm"
      footer={
        <div className="oai-lists__modal-actions">
          <button className="oai-lists__cancel-btn" onClick={handleClose}>Cancel</button>
          {creating ? (
            <button className="oai-lists__save-btn" onClick={handleCreate} disabled={!newName.trim()}>
              Create & Add
            </button>
          ) : (
            <button className="oai-lists__save-btn" onClick={handleAdd} disabled={!selectedListId}>
              Add to List
            </button>
          )}
        </div>
      }
    >
      <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        Adding <strong>{productName}</strong> to:
      </p>

      {creating ? (
        <div className="oai-lists__form-group">
          <label className="oai-lists__form-label" htmlFor="atl-new-name">New List Name</label>
          <input
            id="atl-new-name"
            className="oai-lists__form-input"
            type="text"
            placeholder="e.g. Summer Skincare Brands"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <button
            className="oai-lists__cancel-btn"
            style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}
            onClick={() => { setCreating(false); setNewName(''); }}
          >
            Back to existing lists
          </button>
        </div>
      ) : (
        <>
          <div className="oai-atl__list">
            {lists.map((list) => (
              <button
                key={list.id}
                className={`oai-atl__list-item ${selectedListId === list.id ? 'oai-atl__list-item--selected' : ''}`}
                onClick={() => setSelectedListId(list.id)}
              >
                <span className="oai-atl__list-item-name">{list.name}</span>
                <Badge label={`${list.itemCount}`} variant="info" size="small" />
              </button>
            ))}
          </div>
          <button
            className="oai-atl__create-link"
            onClick={() => setCreating(true)}
          >
            + Create new list
          </button>
        </>
      )}
    </Modal>
  );
};

AddToListModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  productName: PropTypes.string,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      itemCount: PropTypes.number,
    })
  ),
};

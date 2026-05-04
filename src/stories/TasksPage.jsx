import { useState } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Table } from './Table';
import { Icons } from './icons';
import './taskspage.css';

/* ══════════════════════════════════════════════════════════════════
   Pipeline Stages
   ══════════════════════════════════════════════════════════════════ */
const STAGES = [
  { id: 'research', label: 'Research', color: '#6B6B63' },
  { id: 'listed', label: 'Listed', color: '#2563EB' },
  { id: 'people-found', label: 'People Found', color: '#F97316' },
  { id: 'outreach-sent', label: 'Outreach Sent', color: '#D97706' },
  { id: 'replied', label: 'Replied', color: '#16A34A' },
  { id: 'closed', label: 'Closed', color: '#006400' },
];

const PRIORITY_VARIANT = { high: 'error', medium: 'warning', low: 'info' };

/* ══════════════════════════════════════════════════════════════════
   Mock Tasks
   ══════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════
   Pipelines (linked to Lists)
   ══════════════════════════════════════════════════════════════════ */
const PIPELINES = [
  { id: 'pipe-sunscreen', name: 'Sunscreen', listName: 'Sunscreen List' },
  { id: 'pipe-neckcream', name: 'Neck Cream', listName: 'Neck Cream List' },
];

const MOCK_TASKS = [
  // Sunscreen pipeline
  { id: 't3', title: 'CeraVe Mineral Sunscreen added', stage: 'listed', priority: 'high', brand: 'CeraVe', person: null, pipeline: 'pipe-sunscreen', date: '2026-04-05', assignee: 'MT', initials: 'CV', color: '#6B8E23' },
  { id: 't4', title: 'Supergoop! Unseen SPF 40 added', stage: 'listed', priority: 'high', brand: 'Supergoop!', person: null, pipeline: 'pipe-sunscreen', date: '2026-04-05', assignee: 'MT', initials: 'SG', color: '#2E8B57' },
  { id: 't6', title: 'Sarah Chen identified at CeraVe', stage: 'people-found', priority: 'high', brand: 'CeraVe', person: 'Sarah Chen', pipeline: 'pipe-sunscreen', date: '2026-04-05', assignee: 'MT', initials: 'SC', color: '#6B8E23' },
  { id: 't7', title: 'Holly Thaggard identified at Supergoop!', stage: 'people-found', priority: 'high', brand: 'Supergoop!', person: 'Holly Thaggard', pipeline: 'pipe-sunscreen', date: '2026-04-05', assignee: 'MT', initials: 'HT', color: '#2E8B57' },
  { id: 't8', title: 'Partnership proposal to Sarah Chen', stage: 'outreach-sent', priority: 'high', brand: 'CeraVe', person: 'Sarah Chen', pipeline: 'pipe-sunscreen', date: '2026-04-06', assignee: 'MT', initials: 'SC', color: '#6B8E23' },
  { id: 't9', title: 'Intro email to Holly Thaggard', stage: 'outreach-sent', priority: 'medium', brand: 'Supergoop!', person: 'Holly Thaggard', pipeline: 'pipe-sunscreen', date: '2026-04-06', assignee: 'MT', initials: 'HT', color: '#2E8B57' },
  { id: 't10', title: 'Sarah Chen — meeting accepted', stage: 'replied', priority: 'high', brand: 'CeraVe', person: 'Sarah Chen', pipeline: 'pipe-sunscreen', date: '2026-04-07', assignee: 'MT', initials: 'SC', color: '#6B8E23' },
  { id: 't11', title: 'CeraVe partnership MOU signed', stage: 'closed', priority: 'high', brand: 'CeraVe', person: 'Sarah Chen', pipeline: 'pipe-sunscreen', date: '2026-04-07', assignee: 'MT', initials: 'CV', color: '#6B8E23' },
  // Neck Cream pipeline
  { id: 't20', title: 'StriVectin Neck Cream added', stage: 'listed', priority: 'medium', brand: 'StriVectin', person: null, pipeline: 'pipe-neckcream', date: '2026-04-06', assignee: 'MT', initials: 'SV', color: '#8B008B' },
  { id: 't21', title: 'IT Cosmetics Neck Cream added', stage: 'listed', priority: 'high', brand: 'IT Cosmetics', person: null, pipeline: 'pipe-neckcream', date: '2026-04-06', assignee: 'MT', initials: 'IT', color: '#E91E63' },
  { id: 't22', title: 'Drunk Elephant Protini added', stage: 'listed', priority: 'high', brand: 'Drunk Elephant', person: null, pipeline: 'pipe-neckcream', date: '2026-04-06', assignee: 'MT', initials: 'DE', color: '#FF6B6B' },
  { id: 't23', title: 'Diana Voss identified at StriVectin', stage: 'people-found', priority: 'high', brand: 'StriVectin', person: 'Diana Voss', pipeline: 'pipe-neckcream', date: '2026-04-07', assignee: 'MT', initials: 'DV', color: '#8B008B' },
  { id: 't24', title: 'Jennifer Wu identified at IT Cosmetics', stage: 'people-found', priority: 'high', brand: 'IT Cosmetics', person: 'Jennifer Wu', pipeline: 'pipe-neckcream', date: '2026-04-07', assignee: 'MT', initials: 'JW', color: '#E91E63' },
  { id: 't25', title: 'Mia Tanaka identified at Drunk Elephant', stage: 'research', priority: 'medium', brand: 'Drunk Elephant', person: 'Mia Tanaka', pipeline: 'pipe-neckcream', date: '2026-04-07', assignee: 'MT', initials: 'MT', color: '#FF6B6B' },
];

/* ── Table columns ───────────────────────────────────────────── */
const taskTableColumns = [
  { key: 'title', label: 'TASK' },
  {
    key: 'stage', label: 'STAGE',
    render: (val) => {
      const s = STAGES.find((st) => st.id === val);
      return <span className="oai-tasks-stage-dot" style={{ '--dot-color': s?.color }}>{s?.label}</span>;
    },
  },
  { key: 'priority', label: 'PRIORITY', render: (val) => <Badge label={val.charAt(0).toUpperCase() + val.slice(1)} variant={PRIORITY_VARIANT[val]} size="small" /> },
  { key: 'brand', label: 'BRAND', render: (val) => val || '—' },
  { key: 'person', label: 'PERSON', render: (val) => val || '—' },
  { key: 'pipeline', label: 'PIPELINE', render: (val) => { const p = PIPELINES.find((pp) => pp.id === val); return p?.name || '—'; } },
  { key: 'date', label: 'DATE' },
];

/* ══════════════════════════════════════════════════════════════════
   TasksPage
   ══════════════════════════════════════════════════════════════════ */
export const TasksPage = () => {
  const [view, setView] = useState('board');
  const [sortBy, setSortBy] = useState('date');
  const [sortOpen, setSortOpen] = useState(false);
  const [activePipeline, setActivePipeline] = useState('pipe-sunscreen');
  const [pipelineDropdownOpen, setPipelineDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [priorityMenuTask, setPriorityMenuTask] = useState(null);

  const currentPipeline = PIPELINES.find((p) => p.id === activePipeline);
  const filteredTasks = activePipeline === 'all' ? tasks : tasks.filter((t) => t.pipeline === activePipeline);

  const changePriority = (taskId, newPriority) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, priority: newPriority } : t));
    setPriorityMenuTask(null);
  };

  const tasksByStage = {};
  for (const stage of STAGES) {
    tasksByStage[stage.id] = filteredTasks.filter((t) => t.stage === stage.id);
  }

  const totalTasks = filteredTasks.length;

  return (
    <div className="oai-tasks">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="oai-tasks__header">
        <h1 className="oai-tasks__title">Tasks</h1>
        <Button variant="primary" size="medium" label="+ New Task" onClick={() => {}} />
      </div>

      {/* ── Toolbar (Apollo-style) ───────────────────────── */}
      <div className="oai-tasks__toolbar">
        <div className="oai-tasks__toolbar-left">
          <div className="oai-tasks__sort-wrapper">
            <button className="oai-tasks__toolbar-btn oai-tasks__toolbar-btn--pipeline" onClick={() => setPipelineDropdownOpen(!pipelineDropdownOpen)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
              {currentPipeline?.name || 'All Pipelines'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {pipelineDropdownOpen && (
              <div className="oai-tasks__sort-dropdown">
                <div className="oai-tasks__sort-title">Pipelines</div>
                <button className={`oai-tasks__sort-option ${activePipeline === 'all' ? 'oai-tasks__sort-option--active' : ''}`} onClick={() => { setActivePipeline('all'); setPipelineDropdownOpen(false); }}>
                  All Pipelines
                </button>
                {PIPELINES.map((p) => (
                  <button key={p.id} className={`oai-tasks__sort-option ${activePipeline === p.id ? 'oai-tasks__sort-option--active' : ''}`} onClick={() => { setActivePipeline(p.id); setPipelineDropdownOpen(false); }}>
                    {p.name}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid var(--color-border-default)', margin: 'var(--space-1) 0' }} />
                <button className="oai-tasks__sort-option" style={{ color: 'var(--color-text-link)' }} onClick={() => setPipelineDropdownOpen(false)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Manage Pipelines
                </button>
              </div>
            )}
          </div>
          <button className="oai-tasks__toolbar-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            All tasks
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button className="oai-tasks__toolbar-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
            Show Filters
          </button>
          <div className="oai-tasks__toolbar-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search tasks..." className="oai-tasks__toolbar-search-input" />
          </div>
        </div>
        <div className="oai-tasks__toolbar-right">
          <div className="oai-tasks__sort-wrapper">
            <button className="oai-tasks__toolbar-btn" onClick={() => setSortOpen(!sortOpen)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              {sortBy === 'date' ? 'Created date' : sortBy === 'priority' ? 'Priority' : 'Stage'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {sortOpen && (
              <div className="oai-tasks__sort-dropdown">
                <div className="oai-tasks__sort-title">Sort by</div>
                {[{ id: 'date', label: 'Created date' }, { id: 'priority', label: 'Priority' }, { id: 'stage', label: 'Stage' }, { id: 'brand', label: 'Brand' }, { id: 'person', label: 'Person' }, { id: 'list', label: 'List' }].map((opt) => (
                  <button key={opt.id} className={`oai-tasks__sort-option ${sortBy === opt.id ? 'oai-tasks__sort-option--active' : ''}`} onClick={() => { setSortBy(opt.id); setSortOpen(false); }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="oai-tasks__view-toggle">
            <button className={`oai-tasks__view-btn ${view === 'board' ? 'oai-tasks__view-btn--active' : ''}`} onClick={() => setView('board')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Board
            </button>
            <button className={`oai-tasks__view-btn ${view === 'table' ? 'oai-tasks__view-btn--active' : ''}`} onClick={() => setView('table')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Table
            </button>
          </div>
        </div>
      </div>

      {/* ── Board View ──────────────────────────────────── */}
      {view === 'board' && (
        <div className="oai-tasks__board">
          {STAGES.map((stage) => {
            const tasks = tasksByStage[stage.id];
            return (
              <div key={stage.id} className="oai-tasks__column">
                <div className="oai-tasks__column-header">
                  <span className="oai-tasks__column-badge" style={{ background: stage.color }}>{stage.label}</span>
                  <span className="oai-tasks__column-count">{tasks.length}</span>
                  <div className="oai-tasks__column-actions">
                    <button className="oai-tasks__column-action" aria-label="Add task">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <button className="oai-tasks__column-action" aria-label="More options">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </div>
                </div>
                <div className="oai-tasks__column-body">
                  {tasks.map((task) => (
                    <div key={task.id} className="oai-tasks__card">
                      <div className="oai-tasks__card-top">
                        <span className="oai-tasks__card-title">{task.title}</span>
                      </div>
                      <div className="oai-tasks__card-priority-row">
                        <div className="oai-tasks__priority-wrapper">
                          <button className={`oai-tasks__priority-badge oai-tasks__priority-badge--${task.priority}`} onClick={(e) => { e.stopPropagation(); setPriorityMenuTask(priorityMenuTask === task.id ? null : task.id); }}>
                            <span className="oai-tasks__priority-badge-dot" />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          </button>
                          {priorityMenuTask === task.id && (
                            <div className="oai-tasks__priority-menu" onClick={(e) => e.stopPropagation()}>
                              <div className="oai-tasks__priority-menu-title">Priority</div>
                              {[
                                { id: 'high', label: 'High', color: 'var(--color-error)' },
                                { id: 'medium', label: 'Medium', color: 'var(--color-warning)' },
                                { id: 'low', label: 'Low', color: 'var(--color-info)' },
                              ].map((opt) => (
                                <button key={opt.id} className={`oai-tasks__priority-option ${task.priority === opt.id ? 'oai-tasks__priority-option--active' : ''}`} onClick={() => changePriority(task.id, opt.id)}>
                                  <span className="oai-tasks__priority-dot" style={{ background: opt.color }} />
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {(task.brand || task.person) && (
                        <div className="oai-tasks__card-meta">
                          {task.initials && (
                            <span className="oai-tasks__card-avatar" style={{ background: task.color }}>{task.initials}</span>
                          )}
                          <span className="oai-tasks__card-brand">{task.person || task.brand}</span>
                        </div>
                      )}
                      <div className="oai-tasks__card-footer">
                        <span className="oai-tasks__card-date">{task.date}</span>
                        <span className="oai-tasks__card-assignee">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                  <button className="oai-tasks__add-btn">Add task</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Table View ──────────────────────────────────── */}
      {view === 'table' && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Table columns={taskTableColumns} data={filteredTasks} sortable striped />
        </div>
      )}
    </div>
  );
};

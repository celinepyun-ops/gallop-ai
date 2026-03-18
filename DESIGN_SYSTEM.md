# Gallop AI — Design System

All visual values come from CSS custom properties defined in `src/stories/tokens.css`. Components use BEM naming with the `oai-` prefix.

## Colors

### Brand
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-600` | `#006400` | Primary actions, links, sidebar bg |
| `--color-secondary-700` | `#C2410C` | Secondary accents |

### Semantic
| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#16A34A` | Success states |
| `--color-warning` | `#D97706` | Warning states |
| `--color-error` | `#DC2626` | Error states, Paused badge |
| `--color-info` | `#2563EB` | Info states |

### Surfaces (Light Mode)
| Token | Value |
|-------|-------|
| `--color-bg-page` | `#FAFAF7` |
| `--color-bg-card` | `#FFFFFF` |
| `--color-bg-sidebar` | `#002900` |
| `--color-text-primary` | `#1A1A17` |
| `--color-text-secondary` | `#6B6B63` |

### Dark Mode
Applied via `[data-theme="dark"]` — overrides semantic aliases only. Text secondary upgrades to `neutral-300` for contrast. Avatar inverts to white circle with green initials.

## Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Test Tiempos Text (serif) | 400 (regular, not bold) |
| Body / UI | Geist (sans-serif) | 400–600 |
| Code | SF Mono, Fira Code | 400 |

### Scale
| Token | Size |
|-------|------|
| `--font-size-xs` | 12px |
| `--font-size-sm` | 13px |
| `--font-size-base` | 14px |
| `--font-size-md` | 16px |
| `--font-size-lg` | 18px |
| `--font-size-xl` | 20px |
| `--font-size-2xl` | 24px |

## Spacing

4px base unit: `--space-1` (4px) through `--space-16` (64px).

## Border Radius

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |

## Layout

| Constant | Value |
|----------|-------|
| Sidebar width | 256px |
| Sidebar collapsed | 64px |
| Navbar height | 56px |
| Search bar max-width | 680px |

## Components (40+)

### Form
Button, Input, Select, Search

### Data Display
Table, Badge, Avatar, StatsCard, Card, Pagination

### Navigation
Tabs, Breadcrumbs, Dropdown, Sidebar, Navbar

### Feedback
Modal, Toast, Alert, Spinner, LoadingSkeleton, Tooltip, EmptyState, ProgressBar

### Layout
PageLayout, Sidebar, Navbar, MarketingNavbar

### Utility
Icons (`Icons.logo(size)` is a function, uses `currentColor`), HelpButton

## Key Conventions

- **BEM with `oai-` prefix**: `.oai-button`, `.oai-button--primary`, `.oai-button__icon`
- **CSS custom properties**: Always use `--color-*` tokens, never hardcode hex values
- **Dark mode**: Only override semantic aliases in `[data-theme="dark"]` selector
- **Accessibility**: WCAG AA (4.5:1 contrast ratio for normal text)
- **Sidebar logo**: Text at 20px, horse mark at 34px via `Icons.logo(34)`
- **Dropdown icons**: Circular grey backgrounds (32px circles)

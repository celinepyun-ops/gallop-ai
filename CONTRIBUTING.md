# Contributing to Gallop AI

## Setup

```bash
git clone https://github.com/celinepyun-ops/storybook.git
cd storybook
npm install
```

## Development Workflow

1. **Run Storybook** to develop components in isolation:
   ```bash
   npm run storybook
   ```

2. **Run the app** to see full pages:
   ```bash
   npm run dev:app
   ```

3. **Push to `main`** — Chromatic runs visual regression tests automatically.

## Project Structure

```
src/
└── stories/           # All components live here
    ├── tokens.css     # Design tokens (colors, spacing, typography)
    ├── fonts.css      # Font face declarations
    ├── icons.jsx      # Icon library
    ├── *.jsx          # Components
    ├── *.css          # Component styles (BEM with oai- prefix)
    └── *.stories.jsx  # Storybook stories
```

## Code Conventions

- **CSS**: Use BEM naming with `oai-` prefix (e.g., `.oai-button--primary`)
- **Tokens**: Always reference `--color-*`, `--space-*`, `--font-*` custom properties from `tokens.css`. Never hardcode colors or spacing.
- **Dark mode**: Use `[data-theme="dark"]` to override semantic color aliases only
- **Accessibility**: All components must meet WCAG AA (4.5:1 contrast for normal text)
- **Typography**: Headings use Test Tiempos Text at weight 400 (regular). Body uses Geist.

## Adding a Component

1. Create `ComponentName.jsx` and `ComponentName.css` in `src/stories/`
2. Create `ComponentName.stories.jsx` with at least a Default story
3. Use tokens from `tokens.css` — don't hardcode values
4. Test in Storybook, verify dark mode works

## Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Full app (marketing + app) |
| `npm run dev:marketing` | Marketing pages only (port 5173) |
| `npm run dev:app` | App pages only (port 5174) |
| `npm run storybook` | Storybook (port 6006) |
| `npm run build` | Production build |
| `npm run build-storybook` | Build static Storybook |
| `npm run lint` | Run ESLint |

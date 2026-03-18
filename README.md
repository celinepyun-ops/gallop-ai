# Gallop AI

B2B SaaS platform for Amazon brand outreach. Helps manufacturing businesses discover fast-growing Amazon brands and initiate strategic partnerships through AI-powered scoring, contact discovery, and automated email outreach.

**Live:** [gallopai.vercel.app](https://gallopai.vercel.app)

## Quick Start

```bash
npm install
```

### Development

```bash
# Full app (combined marketing + app)
npm run dev

# Marketing site only (Landing, Product, Pricing) — port 5173
npm run dev:marketing

# App only (Dashboard, Search, People, Emails) — port 5174
npm run dev:app

# Storybook design system — port 6006
npm run storybook
```

### Build

```bash
npm run build
npm run build-storybook
```

## Architecture

```
src/
├── AppMain.jsx          # Main app router (all pages unified for Vercel SPA)
├── App.jsx              # App shell
├── MarketingApp.jsx     # Marketing pages shell
├── services/            # API integrations (Keepa)
└── stories/             # All components, pages, and styles
    ├── tokens.css       # Design system tokens
    ├── fonts.css        # Typography
    ├── icons.jsx        # SVG icon library
    ├── PageLayout.jsx   # Sidebar + Navbar + content wrapper
    ├── Sidebar.jsx      # Collapsible navigation
    ├── Navbar.jsx       # Top bar with search
    ├── Dashboard.jsx    # Dashboard page
    ├── SearchBrands.jsx # Brand discovery + results
    ├── People.jsx       # Contact finder
    ├── Emails.jsx       # Outreach review UI
    └── ...              # 40+ components
```

## Multi-Server Setup

| Server    | Command              | Port | Pages                                    |
|-----------|----------------------|------|------------------------------------------|
| Marketing | `npm run dev:marketing` | 5173 | Landing, Product, Pricing             |
| App       | `npm run dev:app`       | 5174 | Dashboard, Search, People, Emails, Templates, Settings |
| Storybook | `npm run storybook`     | 6006 | Component library & design system     |
| Vercel    | Single SPA deploy       | —    | All pages combined via AppMain.jsx    |

## Tech Stack

- **React 19** + Vite 7
- **CSS** with BEM (`oai-` prefix) + CSS custom properties
- **Storybook 10** for component development
- **Chromatic** for visual regression testing
- **Vercel** for deployment

## CI/CD

- Push to `main` auto-triggers Chromatic visual tests
- Vercel auto-deploys from `main`

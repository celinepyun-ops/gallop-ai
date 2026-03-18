# Gallop AI — Product Requirements Document

## Overview

Gallop AI is a B2B SaaS CRM for Amazon brand outreach. It enables manufacturing businesses (e.g., contract beauty manufacturers) to discover fast-growing Amazon brands, identify decision makers, and automate personalized outreach — all from one platform.

## Target User

**Sales reps at manufacturing companies** looking to find high-potential Amazon brands to partner with. They need to identify brands that are growing fast but haven't yet locked in manufacturing partners.

## Core User Flow

```
Search Brands → Select Prospects → Find Decision Makers → Review Emails → Send Outreach
```

1. **Search** — Enter keyword (e.g., "sunscreen"), country, category
2. **Discover** — AI-ranked results by Partnership Score (growth potential)
3. **Select** — Check brands of interest (multi-select with batch actions)
4. **Find** — Search for decision makers by job title at selected brands
5. **Review** — Review AI-generated outreach emails with contact signals
6. **Send** — Approve and send emails

## Pages

### Marketing (Public)
| Page | Purpose |
|------|---------|
| Landing | Hero with value prop, CTAs for sign-in/sign-up |
| Product | Features and benefits overview |
| Pricing | Pricing tiers |

### Auth
| Page | Purpose |
|------|---------|
| Login | Email + password authentication |
| SignUp | Account creation |

### App (Authenticated)
| Page | Purpose |
|------|---------|
| Dashboard | Stats overview (Total Outreach, Response Rate, Active Campaigns, Brands Contacted), brand list with status tabs |
| Search Brands | Keyword/category search with AI-powered Partnership Score ranking, lead drawer with decision maker preview |
| People | Find decision makers by job title across selected brands, filterable results with match badges |
| Emails | Review queue for AI-generated outreach emails, dual-pane UI with contact signals sidebar |
| Templates | Email template library (empty state, future feature) |
| Settings | Account settings, dark mode toggle, logout |

## Key Metrics & Scoring

### Partnership Score (0–100)
AI-ranked composite score based on:
- Revenue Growth % (recent trend)
- Sales Rank position (sweet spot: 5K–50K)
- Price Stability (low volatility = good)
- Review Velocity (momentum indicator)

### Brand Stage Classification
| Stage | Sales Rank | Fit |
|-------|-----------|-----|
| Early | >50K | Too small |
| Sweet Spot | 5K–50K | Ideal target |
| Established | 1K–5K | Competitive |
| Enterprise | <1K | Too large |

## Data Sources

- **Keepa API** — Amazon product data, sales rank history, pricing. Architecture built (`keepaApi.js`), currently using mock data. Live API deferred until paid subscription.
- **Mock Data** — 10 products, 7 contacts, 2 email drafts for development/demo purposes.

## Current Status

### Built
- All 12 pages with full UI
- 40+ component design system with Storybook stories
- Dark mode support
- WCAG AA accessibility compliance
- Chromatic visual regression CI
- Vercel production deployment

### Not Yet Built
- Backend / database
- Email provider integration (Gmail, Outlook)
- Live Keepa API integration
- Template editor
- Analytics and tracking
- User authentication (UI only, no auth service)

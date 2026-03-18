# Gallop AI — Product Requirements Document

## Overview

Gallop AI is a B2B SaaS CRM for Amazon brand outreach. It enables manufacturing businesses (e.g., contract beauty manufacturers) to discover fast-growing Amazon products and brands, identify decision makers, and automate personalized outreach — all from one platform.

## Target User

**Sales reps at manufacturing companies** looking to find high-potential Amazon brands to partner with. They need to identify brands that are growing fast but haven't yet locked in manufacturing partners.

## Core User Flow

```
Search Products → AI Brand Enrichment → Save to Lists → Find Decision Makers → Token Reveal Contact → Review Emails → Send Outreach
```

1. **Search** — Enter keyword (e.g., "sunscreen"), filters (Sales Rank, Monthly Revenue, Growth Value), country, category
2. **Discover** — AI-ranked product results by Partnership Score; AI determines if seller is a real brand
3. **Save** — Add products/brands to custom Lists for organization
4. **Find** — Search for decision makers (People / Company split)
5. **Reveal** — Token-gated contact reveal (free: ✓/✗ exists; paid: full details)
6. **Review** — Review AI-generated outreach emails with contact signals
7. **Send** — Approve and send emails

## Pages

### Marketing (Public)
| Page | Purpose |
|------|---------|
| Landing | Hero with value prop, CTAs for sign-in/sign-up |
| Product | Features and benefits overview |
| Pricing | Token package pricing tiers |

### Auth
| Page | Purpose |
|------|---------|
| Login | Email + password authentication |
| SignUp | Account creation |

### App (Authenticated)
| Page | Purpose |
|------|---------|
| Dashboard | Stats overview, prospect list with status tabs |
| Search | Product-first search with AI brand enrichment. Filters: keyword, Sales Rank, Monthly Revenue, Growth Value, country, category. Results show products with enriched brand data. |
| Lists | Custom prospect lists for organizing saved products/brands (inspired by Apollo.io) |
| People | Find decision makers — split into People search and Company search (inspired by Ocean.io) |
| Emails | Review queue for AI-generated outreach emails, dual-pane UI with contact signals sidebar |
| Templates | Email template library |
| Settings | Account settings, token balance, dark mode toggle, logout |

## Key Metrics & Scoring

### Partnership Score (0–100)
AI-ranked composite score based on:
- Revenue Growth % (recent trend)
- Sales Rank position (sweet spot: 5K–50K)
- Monthly Revenue estimate
- Price Stability (low volatility = good)
- Review Velocity (momentum indicator)

### Brand Stage Classification
| Stage | Sales Rank | Fit |
|-------|-----------|-----|
| Early | >50K | Too small |
| Sweet Spot | 5K–50K | Ideal target |
| Established | 1K–5K | Competitive |
| Enterprise | <1K | Too large |

## Token System & Monetization

### Free Tier
- Search products and view results (unlimited)
- See if email/LinkedIn **exists** for a contact (✓ / ✗)
- Basic list management

### Token-Gated Actions
| Action | Token Cost | What's Revealed |
|--------|-----------|-----------------|
| Name reveal | Low | First name of contact |
| Email reveal | Medium | Full verified email address |
| LinkedIn reveal | Medium | LinkedIn profile URL |
| Bulk export | Variable | CSV of saved contacts |

### Token Packages
- Credit-based purchasing (buy token bundles)
- Two package tiers (TBD pricing)
- Clear token cost shown before every action (no dark patterns)

## Data Sources

| Source | Purpose | Status |
|--------|---------|--------|
| **Keepa API** | Product data, sales rank, pricing, revenue estimates | Architecture built, using mock data |
| **Apollo API** | Email verification, contact enrichment | Not started |
| **NLP Layer** | Smart search wrapping around Keepa queries | Not started |

## Competitive References

| Tool | What to Learn |
|------|---------------|
| **Apollo.io** | Credit system, lists, people/company search UX |
| **ZoomInfo** | Contact database model, data enrichment |
| **Ocean.io** | Company → people search flow, "find similar" |

## Current Status

### Built (Frontend)
- 12 pages with full UI (brand-centric, needs restructuring)
- 40+ component design system with Storybook stories
- Dark mode support
- WCAG AA accessibility compliance
- Chromatic visual regression CI
- Vercel production deployment

### Needs Restructuring
- Search page: brand-centric → product-centric
- People page: add People / Company split
- Add Lists page
- View Lead: add token-gated contact reveal
- Pricing page: update with token packages
- Settings: add token balance display

### Not Yet Built (Backend)
- Database / auth service
- Keepa API live integration
- Apollo API integration (email verification)
- NLP search layer
- Token/credit system
- Email provider integration (Gmail, Outlook)
- Template editor

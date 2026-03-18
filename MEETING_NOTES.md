# Meeting Notes

## 2026-03-16 — Product Feedback Session

### 1. Search: Product-First Architecture
- Keepa API returns **product-level** data, not brand data
- Shift from "Search Brands" to product-based search
- AI determines whether a product seller qualifies as a brand, then enriches CRM data
- Add search filters: Sales Rank, Monthly Revenue, Growth Value
- Users should find value directly from filter parameters

### 2. Contact Reveal: Token-Based Model
- View Lead should be **token-gated**:
  - **Free**: show whether email/LinkedIn exists (✓ / ✗)
  - **Token cost**: reveal first name → user decides → reveal full email
- Backend: Apollo API verifies if contact has a confirmed email
- **Transparency required** — clearly display token cost per action (no dark patterns)

### 3. Pricing: Credit/Token Packages
- Two pricing options (credit token bundles)
- Users purchase token packages to reveal contact information

### 4. List Management
- Add a **Lists** section for organizing prospects
- Customer reference: managing products across Excel tabs
- Inspiration: Apollo.io lists, ZoomInfo

### 5. Search UX Improvements
- NLP wrapping around Keepa search queries
- Split search into **People** and **Company** categories
- Reference: Ocean.io (company search → people search → "find similar contact")

### 6. Competitive References
| Tool | What to Study |
|------|---------------|
| Apollo.io | Credit system, lists, people/company search |
| ZoomInfo | Contact database model |
| Ocean.io | Company → people search flow |

### 7. DevOps
- Evaluate Firefly for git automation

---

### Action Items
- [ ] Restructure Search from brand-centric to product-centric
- [ ] Design token-gated contact reveal UX
- [ ] Research Apollo API for email verification
- [ ] Add Lists feature for prospect organization
- [ ] Split search into People / Company views
- [ ] Define token pricing packages
- [ ] Study Apollo.io, ZoomInfo, Ocean.io flows

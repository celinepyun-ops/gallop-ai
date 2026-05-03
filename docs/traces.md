# Traces — Key Product Decisions

## 2026-04-29

### Meeting Feedback — Campaign Creation Flow Priority

**Wow Points (차별점)**
- Company → People 자동 연결 (edge case): Company 이름만 추가해도 그 회사의 BD 담당자 후보 즉시 표시 — Apollo enrich 자동화

**Email Follow-up Automation 개념 정리**
- Segment = List = 사람 그룹
- Campaign = 그 리스트에 대한 시기/목적별 outreach 시도
- 1 list = 1 campaign으로 단순화 (multi-campaign per list는 MVP 제외)
- **Interest Level (High/Medium/Low)는 MVP에서 빼기** — Sentiment AI로 대체
- Email Sequence 초기 셋업 (Day 0 / Day 3 / Day 7 / Day 14)이 가장 critical

**핵심 미구현 기능 (P0)**
- **Create Campaign 플로우** — 현재는 Campaign 디스플레이만 있고 생성 기능 없음
- 양방향 연결 필요:
  - List → Create Campaign (기존 리스트로 캠페인 생성)
  - Campaign → Pull from List (캠페인 만들고 어떤 리스트 쓸지 선택)
- 이유: List 만들어놓고 진행 안 할 수도 있고, 리드 반려/필터링 후 캠페인 시작하는 케이스 분리
- Activate 시점부터 시퀀스 자동 발송 메커니즘 + 진행 상황 시각화

**경쟁 비교 (Mike Torres 워크플로 — 현재 vs Gallop)**
- 현재: Instantly + Apollo + Smartlead (3개 툴, 5단계, 며칠 작업)
  1. Instantly 결제 → 온보딩
  2. 타겟팅 (예: 화장품 제조사 35명 + Marketing agency 35명)
  3. Apollo에서 회사 검색 → 직책 enrich → CSV 다운로드
  4. Smartlead에 CSV 업로드 → 시퀀스 작성 → Activate
  5. 두 개 리스트 따로 관리
- Gallop 가치 제안: Search → Reveal → Create Campaign → Activate (1개 툴, 4단계, 1시간 내)

**개발 우선순위**
1. **Create Campaign UI 플로우** (4-step modal): Name + List → Sequence templates (Day 0/3/7/14) → Sending settings → Review & Activate
2. **List → Create Campaign 진입점**: Lists 페이지에서 "Create Campaign from this List" 버튼
3. **Campaign Activation 흐름 시각화**: Active 상태, sequence 진행 상황 실시간, Pause/Stop
4. **Onboarding 단순화**: Connect Email OAuth, 첫 캠페인 가이드

**To-do 자체 검증 (dogfooding)**
- Gallop 자체 홍보 이메일 시퀀스를 Gallop으로 만들어보기
- 타겟: 화장품 제조사 + Marketing agency
- 실제 사용해보면서 빠진 기능/플로우 발견

---

## 2026-04-28

### Master User Story Map (Problem → Solution → Feature)

Full reference: `docs/master-problem-feature-sheet.csv`

#### SEARCH — Ryan needs to find growing Amazon products and the right people behind them

1. **Brand-level data hidden in Amazon** → Product table with brand grouping + growth metrics (Sales Rank, Monthly Revenue, Revenue Growth %)
2. **Keepa queries are technical** → Natural language advanced search (open text input → structured filters)
3. **Exact revenue/growth is unknowable** → Partnership Score (0–100) synthesizing Sales Rank trend, Review Velocity, Price Stability, Brand Stage
4. **Don't know who to contact at the brand** → People tab linked to selected products (Apollo-style filtered by brand)
5. **Wrong decision-maker = wasted tokens** → Free preview of email/LinkedIn availability before reveal
6. **Accidental token burn** → Reveal Email confirmation modal with prominent Cancel (anti-dark-pattern)
7. **One-by-one search is slow** → Bulk select on People tab with bottom action bar (Add to List, Send Email)
8. **No lifetime record of revealed contacts** → Saved People page with token usage history + Assigned/Unassigned tabs

#### LISTS — Ryan organizes leads into product-specific lists

1. **Sunscreen vs Neck Cream are different conversations** → Multi-list system with named lists
2. **Can't isolate replied vs no-reply across 25 contacts** → Salesforce-style chevron pipeline bar + sidebar filter
3. **Card layout requires too many clicks** → Sortable CRM table (Name, Company, Title, Stage, Priority, List, Date)
4. **Flat table doesn't show bottlenecks** → Table/Kanban view toggle (5 columns: New → Contacted → Replied → Negotiating → Closed Won)
5. **Updating stages or exporting CSV one-by-one kills productivity** → Checkbox selection + fixed bottom action bar (Download CSV, Change Stage, Change Priority, Move to List)
6. **Need full context per contact** → Contact detail drawer (profile + company + notes + actions)
7. **Same person across multiple lists has different statuses** → Per-list stage tracking (Sarah Chen = Replied in Sunscreen, New in Neck Cream)

#### PIPELINE — Ryan tracks where every contact sits in his outreach funnel

1. **Can't visualize where deals are stuck** → Kanban pipeline board (Email Sent → Replied → In Negotiation → Closed)
2. **Manager asks "how's it going" and Ryan guesses** → Pipeline subtitle metrics + per-campaign filter
3. **Card click should give full lead story** → Pipeline contact drawer with company details (industry, size, location, revenue, notes)
4. **No surface for which replies need attention now** → Reply notification banner at top of Pipeline (clickable → Inbox)

#### EMAIL — Ryan finished listing leads, now sending cold emails and follow-ups

1. **No visibility into tokens / sends / daily cap** → Bulk send mode with token + daily-limit meter
2. **Stuck in manual follow-up process** → Sequencing filters (Step 1, 2, 3 — if no reply, send this template)
3. **Can't see what happened across all emails** → Inbox sorted by sentiment priority with stage markers
4. **Hard to view weekly/monthly progress** → Summary tab with per-campaign breakdown bars
5. **Personalized emails take too long** → AI Lead Overview + AI-drafted emails (using product list context, contact role, brand growth signals)
6. **Follow-up drafting is slow, details blur across products** → Auto-drafted follow-ups referencing previous conversation (Open Sequence step 2 → pre-drafted)
7. **No way to mark replies as positive/negative** → Sentiment classification (Positive / Promising / Declined) + reasoning
8. **Different segments need different messaging** → Campaigns per list (Q2 Sunscreen Launch, Spring Manufacturing Outreach, Q2 Neck Cream Intro, etc.) with own template, cadence, tracking
9. **Sending all at once triggers spam filters** → Auto-pacing (4–8 min apart, business hours only)
10. **Want one final review before bulk send** → Confirmation modal with campaign breakdown + token usage + estimated finish time

#### TOKENS — Ryan wants visibility and clear control over spending

1. **Never tells how many tokens left** → Token Balance in navbar + Token History page
2. **Surprise charges from unclear paid actions** → Pre-deduction modal with explicit cost (Cancel ≥ Confirm visibility)
3. **Worried about re-charging for same contact** → Idempotent reveal — repeat access is free

#### TASKS / BACKLOG (planned)

1. **End-to-end workflow lives in head** → Tasks page Kanban (Research → Listed → People Found → Outreach Sent → Replied → Closed)
2. **Search/Lists/Email actions don't connect** → Auto-task creation from upstream actions

---

## 2026-04-24

### Email Page — Two Core Problems

**Problem 1: Bulk Email Sending**
- Ryan needs to send 50+ emails at once but has no visibility into token quota, daily send caps, or spam-safety pacing
- **Solution**: Bulk send with token/quota meter, daily limit visibility, auto-pacing across the day
- **Feature**:
  - Multi-select with quick filters ("Select all from Sunscreen", "Select all High Priority")
  - Live token & quota meter above Send button (tokens left, daily cap, estimated finish time)
  - Auto-throttle: emails spaced 4-8 min apart, business hours only, randomized
  - Bulk Send confirmation modal with breakdown by list
  - Sent tab: batch grouping with delivery/open/reply status
  - Pause queue button to stop mid-send

**Problem 2: Campaign Per Product Segment**
- Outreach is fundamentally segmented (Sunscreen, Neck Cream, Vitamin C) but every page mixes them into one bucket
- Each segment needs different messaging, cadence, and tracking
- **Solution**: Each product segment becomes a self-contained campaign with its own emails, pipeline, replies, metrics, settings — viewable in isolation across all pages
- **Feature**:
  - **Campaign Switcher** at top of Email/Pipeline/Lists pages (filters all data to selected campaign)
  - **Persistent campaign context** across pages with breadcrumb (e.g. "Sunscreen Campaign → Pipeline → Sarah Chen")
  - **Campaign settings** per list: template, follow-up cadence (3d/7d/14d), daily cap, sending hours
  - **Email page**: Inbox/Review/Queue/Sent/Summary all scoped to campaign; campaign settings panel in sidebar
  - **Pipeline page**: Kanban + metrics scoped to campaign; All view shows campaign tag on each card
  - **Lists page**: List = campaign (single source of truth); add campaign settings + performance summary
  - **New Campaigns page**: meta view with status, performance comparison, pause/duplicate/archive

### Implementation Order
1. Campaign Switcher component (shared across pages)
2. Campaign context persistence (state across navigation)
3. Email page — bulk send + campaign filtering
4. Pipeline page — campaign filtering + tag display
5. Campaigns meta page — overview + management

---

## 2026-04-03

### Search Tab Structure
- **Decision**: Product | Brand | People 3개 탭
- **Rationale**: 3 Pillars (Product + Brand / Brand + People), Ryan(Global BD) 유저의 flow: 제품 찾기 → 브랜드 확인 → 사람 찾기

### Tab Grouping: Option B 채택
- **Decision**: `[Product]` | `[Brand]` | `[People]` (Brand + People 분리)
- **Rejected**: Product+Brand 합침 / Brand+People 합침
- **Rationale**: Product에서 체크 선택 후 People에서 해당 브랜드 담당자 필터링

### MVP Scope
- **Decision**: Lead Finding + Email Outreach까지만
- **Rationale**: Engineering resource 제한, 정확한 매출/월간 증가율 데이터 한계

### AI Search (Open Text)
- **Decision**: AI-powered 버튼 클릭 시 검색바를 오픈텍스트 textarea로 확장 (Julius/Lovable 스타일)
- **Rationale**: 자연어 검색 지원, ChatGPT 이후 유저들이 익숙한 open text input 패턴

### Lists Tab + Progress Tree
- **Decision**: Search 하위에 Lists 탭 추가 (Product | Brand | People | Lists)
- Listed Products / Listed Brands / Listed People 서브탭 (Apollo Workstreams 참고)
- 왼쪽 사이드바가 Lists 모드일 때 Progress 트리로 전환 (Claude UI 참고)
- **Rationale**: Ryan이 sunscreen/neck cream 등 여러 리스트를 만들어서 outreach pipeline 추적 필요

### Tasks Page (replaces Templates)
- **Decision**: Templates 네비게이션을 Tasks로 교체
- Kanban board view (Apollo Deals / Wrike 참고)
- Columns: Research → Listed → People Found → Outreach Sent → Replied → Closed
- 각 카드: 제목, Brand/Product/Person 연결, 날짜, 담당자, 우선순위
- Board view (기본) + Table view 토글
- **Search/Lists 연동**: 제품 체크 → Research 태스크 생성, Add to List → Listed, Reveal Email → People Found, 이메일 발송 → Outreach Sent
- **Rationale**: Ryan의 end-to-end 워크플로우를 한 곳에서 관리 (리서치 → 리스트업 → 아웃리치 → 딜 클로징)

### Reveal Email Token Flow
- **Decision**: Reveal 클릭 시 "1 token 차감" 확인 모달 표시
- Cancel을 primary (눈에 띄게), Use 1 Token을 secondary — dark pattern 방지
- 한번 reveal된 이메일은 재접근 시 토큰 불필요
- **Rationale**: 유저가 실수로 토큰을 사용하지 않도록 보호

### Person Profile Drawer
- **Decision**: People 탭에서 이름 클릭 시 오른쪽 슬라이드 drawer
- Verified Email: blur 처리 + hover 시 Reveal 버튼
- LinkedIn: Available + 외부 링크 바로가기
- Overview Notes: 2-3개 trending insights (재구매율, 바이럴, 매출 급상승 등)
- **Rationale**: 리드 정보를 한눈에 보고 outreach 결정 가능

### UI Reference
- **Apollo.io**: Search People UI, Workstreams 레이아웃
- **Ocean.io**: Search UI 패턴
- **Julius AI / Lovable**: Open text input 패턴
- **Claude UI**: Progress tree + Context sidebar

---

## 2026-04-01

### Product Direction
- Keepa API 기반 제품 검색 (product-centric)
- 정확한 매출/monthly 증가율은 알 수 없는 pain point
- Ryan (Global Business Development) — 최종 목적은 사람 찾기 (제품 검색이 entry point)
- Product listing delete = status change (not hard delete)

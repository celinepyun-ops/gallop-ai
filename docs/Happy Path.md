# Ryan's Happy Path Walkthrough

## Persona
**Ryan** — Global Business Development Manager. Amazon에서 잘 팔리는 제품을 찾아서 그 브랜드 담당자에게 제조 파트너십을 제안하는 게 목표.

---

## Step 1: Login → Dashboard
Ryan이 로그인하면 **Dashboard**에서 현재 상태를 한눈에 봄:
- 48 tokens 남음
- Active outreach 현황 (sent/replied/pending)
- 최근 활동 요약

---

## Step 2: Search → Product 탭
**"sunscreen"** 키워드로 검색.

```
Product 탭 → 필터 (Category: Sun Protection, Revenue: $1M+)
→ 테이블에서 CeraVe, Supergoop!, Sun Bum 등 제품 확인
→ 체크박스로 관심 제품 5개 선택
→ "Add to List" → "Sunscreen List" 생성
```

**AI-powered** 클릭 시 자연어로도 가능:
> "Find mineral sunscreen under $20 with high growth sold by small brands"

---

## Step 3: Search → Brand 탭
같은 검색 결과를 **Brand 단위로 그루핑**해서 봄:

```
Brand 탭 → CeraVe (5 products), Supergoop! (2 products) 등
→ 브랜드별 제품 목록 펼쳐서 확인
→ 어떤 브랜드가 제조 파트너십에 적합한지 판단
```

---

## Step 4: Search → People 탭
선택한 제품들의 **브랜드 담당자**를 확인:

```
People 탭 → 왼쪽 필터가 자동으로 People용으로 전환
  (Job Title: VP/Director, Department: Sales/BD, Seniority: VP-Level)
→ CeraVe 밑에 Sarah Chen (VP of BD), Marcus Johnson (Partnerships Manager)
→ Supergoop! 밑에 Holly Thaggard (Founder & CEO)
```

**Sarah Chen 이름 클릭** → 프로필 Drawer 오픈:
- Location: New York, NY
- Verified Email: `s****@loreal.com` → **Reveal** 클릭 → 1 token 차감 확인 → 이메일 공개
- LinkedIn: Available (외부 링크)
- **Overview Notes**: "CeraVe 90일간 42K 재구매, TikTok Shop 340% 매출 급상승"
- → **Add to List** 클릭

---

## Step 5: Lists 페이지
사이드바에서 **Lists** 클릭:

```
왼쪽: Progress 트리
  [done] Product Search
  [done] Brand Identified
  [done] People Found
  [active] Email Outreach — in progress
  [pending] Reply Received

오른쪽: Sunscreen List 카드
  5 products / 5 brands / 3 contacts
  [2 contacted] [1 replied] [1 pending]
→ Listed Products / Listed Brands / Listed People 서브탭으로 상세 확인
```

---

## Step 6: Tasks 페이지
사이드바에서 **Tasks** 클릭 — 칸반 보드:

```
Research    Listed         People Found      Outreach Sent     Replied          Closed
[2]         [3]            [2]               [2]               [1]              [1]
                                             Partnership       Sarah Chen —
                                             proposal to       meeting accepted
                                             Sarah Chen
```

Ryan은 "Outreach Sent" → "Replied"로 카드가 이동하는 걸 보면서 파이프라인을 관리.

---

## Step 7: 반복
Ryan이 **neck cream**도 찾고 싶으면:

```
Search → "neck cream" → 제품 체크 → "Neck Cream List" 생성
→ People 탭에서 담당자 확인 → Reveal Email
→ Lists에서 Progress 추적 → Tasks에서 outreach 관리
```

---

## 전체 Flow 요약

```
Search (Product → Brand → People)
  ↓ Add to List
Lists (Progress 추적 + 리스트 관리)
  ↓ Outreach
Tasks (칸반 파이프라인: Research → Closed)
```

**3 Pillars가 자연스럽게 연결됨:**
- **Product**: Keepa 검색으로 시작
- **Brand**: 제품 뒤의 브랜드 확인
- **People**: 브랜드 담당자 찾기 → 이메일 reveal → outreach

---

## MVP Scope
- Search: 로그인 데이터 표시, Product/Brand Search, Natural Language Search
- Search Data Display: Dashboard, People 탭
- Listing 관리: Product listing delete = status change
- Lead Finding + Email Outreach까지만

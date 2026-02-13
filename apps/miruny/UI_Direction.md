# MIRUNY UI Direction / PRD / Tokens / Route Sketch (Refined)

> 목표: **로직/플로우는 그대로** 유지하면서, “Lovable 기본톤” 느낌을 지우고 **프로덕티비티 툴급(Linear/Superhuman 계열) 세련됨**으로 올린다.

---

## 0) Problem Statement (현재 UI에서 ‘덜 세련돼 보이는’ 원인)

- **강한 색(오렌지) + 두꺼운 보더/이중 아웃라인**이 많아서, ‘브랜드’보다 ‘경고/강조 UI’처럼 느껴짐.
- 카드마다 **강조 방식이 제각각(보더/배경/칩/링 두께)**이라 위계가 흔들림.
- `/run`의 핑크 배경/워터마크 텍스트는 **집중을 분산**시키고 “툴”보다 “포스터”처럼 보이게 함.
- 입력/버튼/카드의 **라운드/패딩 문법이 통일되지 않아** 완성도가 떨어져 보임.

---

## 1) MIRUNY UI Direction 4가지 (각 1문장)

- **Crisp Productivity UI**: 중립 톤(화이트/그레이) 기반 + 1개의 강한 Primary로 “툴”처럼 단단하게 보이게 한다.
- **Fast / Simple / Delightful**: 입력 즉시 반응하고 클릭 수를 줄이며 작은 피드백으로 “생각 전에 실행” 감각을 만든다.
- **Noise ↓, Hierarchy ↑**: 카드 스택 1개 중심 위계와 규칙화된 간격으로 정보 해석 비용을 낮춘다.
- **Calm Focus Timer**: `/run`에서는 “지금 해야 할 1개”만 강하게 드러내고 step3 단일 진행 정책을 시각적으로도 일관되게 유지한다.

---

## 2) Reference-inspired Design Archetypes (이 방향으로 ‘느낌’을 맞춘다)

- **Linear / Superhuman 계열**: 얇은 보더(1px), 선명한 타이포 위계, 절제된 컬러 사용.
- **Raycast / Vercel 계열**: 큰 여백 + 작은 디테일(hover/shadow)로 고급스러움을 만든다.
- **Apple Reminders/Things 계열**: 상태는 “색”이 아니라 **구조(아이콘/정렬/여백)** 로 전달한다.

> 주의: “앱을 닮게”가 아니라 **패턴(위계/토큰/상태 표현)** 을 가져온다.

---

## 3) PRD Directives (MUST / SHOULD / MAY) — 1페이지

### MUST (절대)
- `[MUST][Flow]` 라우트/핵심 흐름은 `/ -> /prepare -> /run -> /done` 고정, 구조 변경 없이 시각 개선만 수행한다.
- `[MUST][Layout]` 각 화면 above-the-fold에는 **메인 포커스 카드 스택 1개**만 둔다.
- `[MUST][Action Priority]` **화면당 Primary Action 1개** 원칙을 유지하고 나머지는 secondary/muted로 내린다.
- `[MUST][Stroke Discipline]` **보더는 1px만** 사용한다. (2px+ 금지) “강조”는 보더 두께가 아니라 **배경 틴트/좌측 인디케이터/텍스트 대비**로 한다.
- `[MUST][Focus Ring]` 입력/버튼/카드는 `focus-visible` 링으로만 포커스 표현(보더 색 변경은 보조).
- `[MUST][Spacing]` 섹션 간격은 24/32만 사용하고 카드 내부는 12/16 규칙으로 고정한다.
- `[MUST][State]` default/hover/active/disabled/loading/success/error 상태를 컴포넌트 공통 규칙으로 정의한다.
- `[MUST][Test Safety]` disabled 상태는 DOM 제거 없이 시각/속성으로만 처리해 E2E 안정성을 유지한다.
- `[MUST][Run Step3]` `/run` step3는 **하단 CTA 비활성 유지 + 진행 액션은 카드 완료 버튼 단일 진입**으로 고정한다.
- `[MUST][Background]` 앱 배경은 **중립(white/near-white)** 를 기본으로 유지한다. 강한 핑크/워터마크 텍스트는 제거(또는 2% 이하 틴트).
- `[MUST][Resession Slot]` 모든 메인 화면 카드 상단에 Session Meta Slot 1줄(세션 태그/ID/오늘 세션)을 placeholder로 예약한다.
- `[MUST][Done Metrics Slot]` `/done`에 Metrics Summary Cards 2~3개(총 소요시간/완료 steps/score placeholder) 슬롯을 예약한다.
- `[MUST][Typography Roles]` 텍스트 역할은 H1/H2/Body/Caption/Numeric 5종만 사용한다.
- `[MUST][Numeric]` 타이머/메트릭 숫자는 `tabular-nums`를 강제한다.
- `[MUST][Color Roles]` 색은 bg/surface/primary/accent/muted/danger 역할 기반으로만 사용한다.
- `[MUST][Primary Usage]` primary 컬러는 **(1) 진행 CTA, (2) 현재 단계 인디케이터, (3) 타이머 링 진행** 3곳만 허용한다. 동시에 강하게 보이는 primary는 최대 2개.
- `[MUST][Done Confetti]` `/done` confetti는 유지하되 레이아웃 shift를 만들지 않아야 한다.
- `[MUST][Component Consistency]` MISSION 카드, Timer/Done 링, Step 카드의 라운드/패딩/타이포 문법을 `/run` 기준으로 통일한다.
- `[MUST][A11y]` 핵심 CTA는 의미가 분명한 aria-label과 focus-visible ring을 가진다.

### SHOULD (권장)
- `[SHOULD][Surface over Stroke]` 카드 강조는 “보더” 대신 **surface tint + 좌측 3px bar + 아이콘** 조합을 우선한다.
- `[SHOULD][Shadow]` 그림자는 hover/raise 1~2단계만 사용(항상 떠있는 shadow 금지).
- `[SHOULD][Microcopy]` 모바일(320px)에서는 안내 문구를 1줄 우선으로 압축하고 의미 중복 문구를 제거한다.
- `[SHOULD][Danger Usage]` danger는 삭제/종료 등 파괴적 액션에서만 사용한다.
- `[SHOULD][Motion]` 모션은 상태 전환 이해를 돕는 기능성만 허용하고 장식성 모션은 제한한다.
- `[SHOULD][Density]` 정보 밀도는 유지하되 한 화면에서 동시에 강하게 보이는 강조 요소는 최대 2개로 제한한다.

### MAY (선택)
- `[MAY][Subtle Gradient]` 배경은 1~2% 수준의 매우 약한 그라데이션만 허용.
- `[MAY][Tone Accent]` 브랜드 톤 강조는 아이콘/배지 1개 수준으로 제한해 집중력을 해치지 않게 한다.
- `[MAY][Progressive Disclosure]` 상세 설명은 기본 숨김 후 필요 시 1줄 힌트로 노출한다.

---

## 4) Design Tokens (Refined Draft)

### Typography (roles only)
- `H1`: 28/34, 700, tracking-tight (Landing hero, 화면당 1회)
- `H2`: 20/26, 650
- `Body`: 16/24, 500
- `Caption`: 13/18, 500
- `Numeric-L`: 32/36, 700, `tabular-nums`
- `Numeric-S`: 18/22, 650, `tabular-nums`

### Spacing / Radius / Stroke
- `Spacing Scale`: 4/8/12/16/24/32
- `Rule`: 카드 padding=16, 카드 내부 gap=12, 섹션 간격=24 또는 32
- `Radius`: sm=10, md=14, lg=18 (Input/Buttons=md, Cards=lg)
- `Border`: **1px only** (neutral), 강조는 tint/bar로.

### Color Roles (권장 팔레트)
- `bg`: #FCFCFD (near-white)
- `surface`: #FFFFFF
- `border`: #E6E8EC
- `text`: #111827
- `mutedText`: #6B7280
- `primary`: #F05A28 (브랜드 오렌지, 과포화 금지)
- `primaryTint`: #FFF1EA (1~2% 느낌의 아주 약한 틴트)
- `accent`: #FFB020 (success/celebration에만 제한적으로)
- `danger`: #EF4444

### State Tokens (공통)
- `default`: surface + base text
- `hover`: border 대비 1단계 상승 + shadow-sm(선택)
- `active`: surface tint + text 대비 유지
- `disabled`: opacity 0.45 + `cursor-not-allowed` + `aria-disabled`
- `loading`: 진행 표식 1개 (텍스트/아이콘/스피너 중 1)
- `success`: accent + check icon (대문짝한 배경색 금지)
- `error`: danger + 짧은 문장 1줄

---

## 5) Component Grammar (핵심: “강조 방식 통일”)

### Input
- 기본: 1px neutral border + surface
- focus: `focus-visible` ring(Primary) + border는 neutral 유지(또는 1단계만 변화)
- 금지: **이중 아웃라인/두꺼운 오렌지 보더**

### Buttons
- Primary: solid primary + white text
- Secondary: neutral surface + neutral border (또는 muted fill)
- Destructive: danger (사용 빈도 낮게)

### StepCard (3-state)
- `future`: muted surface + disabled affordance
- `current`: surface + `left bar(3px, primary)` + title 강조 + CTA(완료) 활성
- `done`: surface + check icon + CTA 숨김/비활성 (정책에 따라)

### TimerRing / DoneRing
- stroke는 얇게(현재보다 얇게), 숫자(Numeric-L)가 주인공
- 상태는 chip 1개로만 (“거의 다 됐어요”, “시간 초과”, “잘했어요”)

---

## 6) Screen-by-screen Changes (로직 유지)

### `/` (Landing + Todo)
- 바꿀 것
  1) Hero 타이포는 유지하되 “오렌지 강조”를 **단어 1개/밑줄/배지** 정도로 축소
  2) Input: 이중 보더 제거 → 1px border + focus ring로 변경
  3) Buttons: Primary/Secondary 위계 차이를 더 명확히(Secondary는 중립톤)
  4) Todo Row: 체크/삭제 affordance를 더 작고 정돈되게 (아이콘/간격 규칙)
- 유지할 것
  - Enter/버튼으로 `currentRun` 생성 후 `/prepare` 진입 로직
  - Todo 저장/토글/삭제 동작 및 localStorage 키 체계

### `/prepare`
- 바꿀 것
  1) 중앙 패널 위계(H2→Body→진행 표식)를 고정
  2) 로딩 피드백 요소는 1개만
  3) 배경을 중립으로(강한 틴트 금지)
- 유지할 것
  - 3초 카운트다운 및 자동 `/run` 이동
  - “작업을 분석하고 있어요...” 톤

### `/run`
- 바꿀 것
  1) 배경 핑크/워터마크 제거 → near-white bg
  2) StepCard는 **left bar + tint**로 현재 단계 강조(두꺼운 보더 제거)
  3) TimerRing stroke 얇게 + chip 1개로 상태 표현
  4) 하단 secondary CTA 대비를 낮춰 카드 완료 CTA 집중도 강화
- 유지할 것
  - 3-step 상태/타이머/재시작/재생성/나가기 동작
  - step3 정책(하단 CTA 비활성 + 카드 완료 단일 진행)

### `/done`
- 바꿀 것
  1) 완료 요약 아래 Metrics Summary Cards 2~3개 placeholder
  2) `/run`과 동일한 카드 문법으로 톤 연속성 고정
  3) confetti는 overlay 고정(shift 없음)
- 유지할 것
  - confetti + 완료 요약 구조
  - `1단계부터 다시 시작` 플로우 및 홈 복귀 흐름

---

## 7) Acceptance Criteria (완료 기준)

- 보더는 전 컴포넌트에서 **1px**만 사용(두꺼운 강조 보더 0개).
- primary 컬러는 한 화면에서 **CTA + 현재상태(링/바) 중심으로 1~2개만** 강하게 보인다.
- `/run` 배경은 중립이며 워터마크 텍스트가 없다(또는 시각적 간섭 0).
- Input/Buttons/StepCard의 라운드/패딩/타이포가 토큰 규칙과 일치한다.
- 키보드 탭 이동 시 focus-visible 링이 명확하고, disabled는 DOM 제거 없이 유지된다.
- confetti는 레이아웃 shift를 만들지 않는다.

---

## 8) Next Micro-Tasks (파일 범위 포함)

- MT1: **Stroke Discipline 적용** (이중/두꺼운 오렌지 보더 제거 → 1px + focus ring)
  - Files: `apps/miruny/app/page.tsx`, `apps/miruny/components/InputCard.tsx`, `apps/miruny/components/Button.tsx`(있다면)
- MT2: `/run` **현재 단계 강조 방식 통일** (left bar + tint) + TimerRing stroke/칩 정리
  - Files: `apps/miruny/app/run/page.tsx`, `apps/miruny/components/StepCard.tsx`, `apps/miruny/components/TimerRing.tsx`
- MT3: `/done` Metrics Summary placeholder + `/run` 톤 연속성 + confetti overlay 고정 확인
  - Files: `apps/miruny/app/done/page.tsx`, `apps/miruny/components/DoneRing.tsx`, `apps/miruny/components/ConfettiBurst.tsx`

Last updated: 2026-02-12 (KST)

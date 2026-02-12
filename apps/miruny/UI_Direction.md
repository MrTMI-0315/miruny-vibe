# MIRUNY UI Direction / PRD / Tokens / Route Sketch

## 1) MIRUNY UI Direction 3가지 (각 1문장)
- Fast / Simple / Delightful: 입력 즉시 반응하고 클릭 수를 줄이며 작은 피드백으로 “생각 전에 실행” 감각을 만든다.
- Noise ↓, Hierarchy ↑: 카드 스택 1개 중심 위계와 규칙화된 간격으로 정보 해석 비용을 낮춘다.
- Calm Focus Timer: `/run`에서는 “지금 해야 할 1개”만 강하게 드러내고 step3 단일 진행 정책을 시각적으로도 일관되게 유지한다.

## 2) Reference-derived PRD Directives (MUST/SHOULD/MAY) — 1페이지
- `[MUST][Flow]` 라우트/핵심 흐름은 `/ -> /prepare -> /run -> /done` 고정, 구조 변경 없이 시각 개선만 수행한다.
- `[MUST][Layout]` 각 화면 above-the-fold에는 메인 포커스 카드 스택 1개만 둔다.
- `[MUST][Action Priority]` 화면당 Primary Action 1개 원칙을 유지하고 나머지는 secondary/muted로 내린다.
- `[MUST][Spacing]` 섹션 간격은 24/32만 사용하고 카드 내부는 12/16 규칙으로 고정한다.
- `[MUST][State]` default/hover/active/disabled/loading/success/error 상태를 컴포넌트 공통 규칙으로 정의한다.
- `[MUST][Test Safety]` disabled 상태는 DOM 제거 없이 시각/속성으로만 처리해 E2E 안정성을 유지한다.
- `[MUST][Run Step3]` `/run` step3는 하단 CTA 비활성 유지 + 진행 액션은 카드 완료 버튼 단일 진입으로 고정한다.
- `[MUST][Resession Slot]` 모든 메인 화면 카드 상단에 Session Meta Slot 1줄(세션 태그/ID/오늘 세션)을 placeholder로 예약한다.
- `[MUST][Done Metrics Slot]` `/done`에 Metrics Summary Cards 2~3개(총 소요시간/완료 steps/score placeholder) 슬롯을 예약한다.
- `[SHOULD][Streak]` streak 정보는 신규 페이지가 아니라 배지/라벨 슬롯으로 수용 가능하게 설계한다.
- `[MUST][Typography Roles]` 텍스트 역할은 H1/H2/Body/Caption/Numeric 5종만 사용한다.
- `[MUST][Numeric]` 타이머/메트릭 숫자는 `tabular-nums`를 강제한다.
- `[MUST][Color Roles]` 색은 bg/surface/primary/accent/muted/danger 역할 기반으로만 사용한다.
- `[MUST][Primary Usage]` primary 컬러는 진행 CTA에만 사용하고 화면 내 1개만 강조한다.
- `[SHOULD][Danger Usage]` danger는 삭제/종료 등 파괴적 액션에서만 사용한다.
- `[SHOULD][Motion]` 모션은 상태 전환 이해를 돕는 기능성만 허용하고 장식성 모션은 제한한다.
- `[MUST][Done Confetti]` `/done` confetti는 유지하되 레이아웃 shift를 만들지 않아야 한다.
- `[MUST][Component Consistency]` MISSION 카드, Timer/Done 링, Step 카드의 보더/라운드/패딩 문법을 `/run` 기준으로 통일한다.
- `[SHOULD][Microcopy]` 모바일(320px)에서는 안내 문구를 1줄 우선으로 압축하고 의미 중복 문구를 제거한다.
- `[MUST][A11y]` 핵심 CTA는 의미가 분명한 aria-label과 focus-visible ring을 가진다.
- `[SHOULD][Density]` 정보 밀도는 유지하되 한 화면에서 동시에 강하게 보이는 강조 요소는 최대 2개로 제한한다.
- `[MAY][Progressive Disclosure]` 상세 설명은 기본 숨김 후 필요 시 1줄 힌트로 노출한다.
- `[MAY][Tone Accent]` 브랜드 톤 강조는 아이콘/배지 1개 수준으로 제한해 집중력을 해치지 않게 한다.

## 3) MIRUNY Design Tokens 초안 (1페이지)
- `Typography/H1`: 28/34, 700, tracking-tight, 화면당 1회.
- `Typography/H2`: 20/26, 650, 섹션 타이틀용.
- `Typography/Body`: 16/24, 500, 기본 설명/라벨.
- `Typography/Caption`: 13/18, 500, 보조 상태/힌트.
- `Typography/Numeric-L`: 32/36, 700, `tabular-nums` (타이머 중심 숫자).
- `Typography/Numeric-S`: 18/22, 650, `tabular-nums` (요약 카드 수치).
- `Spacing Scale`: 4/8/12/16/24/32.
- `Spacing Rule`: 카드 padding=16, 카드 내부 gap=12, 섹션 간격=24 또는 32.
- `Radius`: sm=10, md=14, lg=18.
- `Border`: 1px low-contrast, 상태 강조는 컬러 변경 우선.
- `Shadow`: sm(hover 보조), md(포커스 또는 중요 surface 한정).
- `Color Role/bg`: 앱 배경.
- `Color Role/surface`: 카드/패널 배경.
- `Color Role/primary`: 진행 CTA 전용.
- `Color Role/accent`: 배지/포인트 텍스트.
- `Color Role/muted`: 보조 액션/설명.
- `Color Role/danger`: 파괴적 액션.
- `State Token/default`: 기본 surface + base text.
- `State Token/hover`: 대비 1단계 상승.
- `State Token/active`: 대비 2단계 상승.
- `State Token/disabled`: low contrast + pointer-events/disabled 속성 유지.
- `State Token/loading`: 스피너/점멸 대신 안정적 진행 표식 1개.
- `State Token/success`: 완료 텍스트 + accent.
- `State Token/error`: 짧은 메시지 + danger.
- `Component Mapping/InputCard`: H1 + Body + Primary 1 + Secondary 1.
- `Component Mapping/StepCard`: Step label(Caption) + Title(Body) + CTA(primary only when current).
- `Component Mapping/TimerRing/DoneRing`: Numeric-L 중심 + Caption 1줄.
- `Component Mapping/Summary Card`: H2 + Numeric-S + Caption.

## 4) 화면별 적용 스케치 (글로만)
- `/` 바꿀 것 1: 입력 카드 상단에 Session Meta Slot placeholder 1줄 예약.
- `/` 바꿀 것 2: Primary(`지금 바로 시작`)와 Secondary(목록 추가)의 시각 우선순위 차이를 더 명확히 고정.
- `/` 바꿀 것 3: Todo 블록 간격을 토큰(12/16/24)로 통일해 밀도 균형 정리.
- `/` 유지할 것 1: Enter/버튼으로 `currentRun` 생성 후 `/prepare` 진입 로직.
- `/` 유지할 것 2: Todo 저장/토글/삭제 동작 및 localStorage 키 체계.
- `/prepare` 바꿀 것 1: 중앙 패널 위계(H2→Body→진행 표식)를 고정해 정보 순서를 명료화.
- `/prepare` 바꿀 것 2: 로딩 피드백 요소를 1개만 유지해 노이즈 감소.
- `/prepare` 바꿀 것 3: 상하 여백을 24/32 규칙으로 고정.
- `/prepare` 유지할 것 1: 3초 카운트다운 및 자동 `/run` 이동.
- `/prepare` 유지할 것 2: “작업을 분석하고 있어요...” 톤.
- `/run` 바꿀 것 1: StepCard를 `STEP 라벨 / 제목 / 보조문구 / 액션` 4구획 문법으로 고정.
- `/run` 바꿀 것 2: 타이머 영역은 Numeric 중심, 보조 텍스트는 Caption 1줄만 허용.
- `/run` 바꿀 것 3: 하단 secondary CTA 묶음의 대비를 낮춰 카드 완료 CTA 집중도 강화.
- `/run` 유지할 것 1: 3-step 상태/타이머/재시작/재생성/나가기 동작.
- `/run` 유지할 것 2: step3 정책(하단 CTA 비활성 + 카드 완료 단일 진행).
- `/done` 바꿀 것 1: 완료 요약 아래 Metrics Summary Cards 2~3개 placeholder 슬롯 예약.
- `/done` 바꿀 것 2: `/run`과 동일한 카드 문법(보더/라운드/패딩/타이포)으로 톤 연속성 고정.
- `/done` 바꿀 것 3: confetti는 유지하되 overlay 고정으로 shift 없는 피드백 강화.
- `/done` 유지할 것 1: confetti + 완료 요약 구조.
- `/done` 유지할 것 2: `1단계부터 다시 시작` 플로우 및 홈 복귀 흐름.

## 5) 다음 Micro-Task 3개 (UI 작업용, 파일 범위 포함)
- MT1: 토큰 매핑 기반 기본 컴포넌트 스타일 통일(구조 유지, 문법 정리).
- MT1 Files: `apps/miruny/components/InputCard.tsx`, `apps/miruny/components/TodoList.tsx`, `apps/miruny/components/StepCard.tsx`, `apps/miruny/components/TimerRing.tsx`
- MT2: `/done` Metrics Summary placeholder 카드 도입 + `/run`과 surface 톤 연속성 강화.
- MT2 Files: `apps/miruny/app/done/page.tsx`, `apps/miruny/components/DoneRing.tsx`, `apps/miruny/components/ConfettiBurst.tsx`
- MT3: 라우트별 Primary/Secondary 액션 위계 최종 정리(동작/테스트 셀렉터 불변).
- MT3 Files: `apps/miruny/app/page.tsx`, `apps/miruny/app/prepare/page.tsx`, `apps/miruny/app/run/page.tsx`, `apps/miruny/app/done/page.tsx`

Last updated: 2026-02-12 (KST)

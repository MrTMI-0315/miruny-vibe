# MIRUNY UI Redesign PRD v0.2 (Scope-locked)

## 1) 목표 / 성공지표 (측정 가능한 형태)

### Primary Metrics
- **TTVS (Time To Visible Start)**: 홈 진입 → 실행 화면에서 Step 1이 보이는 시간  
  - 목표: p50 < 3s / p95 < 7s
- **Start Rate**: 홈에서 “지금 시작” 실행까지 도달 비율  
  - 목표: +20% (baseline 대비)
- **Step Completion Rate**: Step 1 완료 비율 / 전체 3단계 완료 비율  
  - 목표: Step1 완료율 +15%p

### Secondary (있으면 좋음)
- “오늘 목록”에서 **row 클릭으로 시작** 비율
- 삭제 후 Undo 사용률(실수 방지 효과 확인)

> 분석/계측은 이번 스코프에서 필수는 아님. 다만 최소 이벤트만 박아두면 리디자인 판단이 쉬움(8번).

---

## 2) 이번 스코프 (Must / Should / Won’t)

### Must (이번 PRD에서 반드시)
- 화면별 **Primary Action 1개** 원칙 적용
- Home: 입력 UX 단순화 + 목록 아이템 row 클릭으로 “즉시 시작”
- Analyze: “왜 기다리는지” + (가능하면) 스텝 생성 프리뷰
- Execute: 현재 스텝 카드 1개를 “메인”으로, 완료/다음 중복 제거
- Summary: 다음 행동(Next Best Action) CTA 강화

### Should (여유되면)
- Delete Undo Toast
- 로딩 1초 이상일 때만 로딩 UI 노출(깜빡임 방지)

### Won’t (이번엔 안 함)
- 로그인/계정/동기화/프로젝트/태그/우선순위
- AI 품질 고도화(단, **프리뷰/스트리밍 표시**는 UI로 취급 가능)
- 게이미피케이션(점수 시스템 개선)

---

## 3) IA / 라우팅 구조 (최소)
- `/` Home (Capture & Pick)
- `/generate` Analyze (optional route; 로직상 존재하면 유지)
- `/session` Execute (Focus)
- `/summary` Summary

---

## 4) 화면별 UX Spec (현재 화면 기반 “갈아엎기” 포인트를 명확히)

### 4.1 Home (Capture & Pick)

#### 핵심 UX 원칙
- 입력창은 “작성”이 아니라 **“시작 트리거”**
- 버튼 2개가 아니라 **시각적으로 1개만 강하게**

#### 레이아웃/동작
- Primary CTA: **지금 시작** (강한 버튼)
- Secondary Action: **목록에 추가** (ghost/outline/텍스트 버튼급)
- 키보드:
  - `Enter` → 지금 시작
  - `Shift+Enter` → 목록에 추가 (또는 Secondary 클릭)
- 오늘 목록:
  - row 전체 클릭 = **즉시 시작**
  - 우측 X = 삭제
  - 삭제 후 **Undo toast (5초)**

#### 상태
- Empty list: “예시 3개 + Enter 힌트”
- Input error(빈값): 인풋 하단 캡션 “한 가지를 적어주세요”

#### 카피(교체 권장)
- H1: `지금 바로 시작할 한 가지를 적어주세요`
- Sub: `Enter를 누르면 3단계로 쪼개서 바로 시작해요`
- Secondary: `목록에만 추가`

---

### 4.2 Analyze (Generate)

#### 핵심 UX 원칙
- 기다림을 “불안”이 아니라 “확신”으로 바꾼다

#### 동작
- 1초 미만이면 로딩 화면 스킵(가능하면)
- 1초 이상이면:
  - 제목: `3단계로 쪼개는 중…`
  - 서브: `곧 실행 화면으로 이동해요`
  - 가능하면 Step title이 1개씩 등장(프리뷰)

> 진행률(%) 거짓표시 금지. 인디케이터 스피너/점 애니메이션만.

---

### 4.3 Execute (Focus Mode)

#### 핵심 UX 원칙
- “지금 할 행동 1개”만 크게
- **완료/다음 버튼 중복 제거**

#### 레이아웃/동작(권장)
- 상단: Mission + (나가기 / 다시 생성)
- 중앙: 타이머(선택) + **Active Step Card**
- 하단: Primary CTA = `이 단계 완료`
- 완료 시:
  - 자동으로 다음 단계 Active로 전환
  - 마지막 단계 완료 시 Summary로 전환

#### Step 리스트(히스토리화)
- 완료된 Step: 한 줄로 접힘 + “완료됨”
- 잠긴 Step: 한 줄 프리뷰 + “대기”
- Active Step만 카드 형태로 확장

#### 타이머
- “로딩 원형”과 “타이머 원형” 의미가 섞이지 않게:
  - 타이머는 determinate ring + `남은 초` 텍스트
  - 서브 카피는 압박형(“서두르세요!”)보다 **부드럽게**
    - 예: `20초만 해볼까요?`

#### 카피(교체 권장)
- 상단 타이틀: `지금 시작하세요`
- 타이머 아래: `지금은 “시작”만 해도 성공이에요`

---

### 4.4 Summary

#### 핵심 UX 원칙
- 요약은 “끝”이 아니라 “다음 시작”

#### 레이아웃/동작
- Primary CTA: `다른 할 일 시작하기` (Home로)
- Secondary CTA: `같은 미션 다시 하기`
- 통계(초/스텝/점수)는 보조(아래로)

---

## 5) 디자인 시스템(최소 토큰) — “프로덕트처럼 보이게 만드는 최소”
> 기존 톤(오렌지)은 유지하되, **간격/타입/버튼 상태**만 통일해도 “갈아엎은 느낌”이 확 남.

### Tokens (예시 스펙)
- Spacing: 4/8/12/16/24/32
- Radius: 12(card), 10(input/button)
- Typography:
  - H1 28 / H2 20 / Body 16 / Caption 12
- Button states:
  - default / hover / active / disabled / loading / focus
- Input states:
  - default / focus / error / disabled

---

## 6) 컴포넌트 명세 (Codex 구현용)
- `<Button variant="primary|secondary|ghost" size="lg|md" loading disabled />`
- `<TextInput value onChange onKeyDown error hint />`
- `<Toast kind="info|danger" actionLabel="되돌리기" onAction />`
- `<StepCard status="active|done|locked" title body onComplete />`
- `<ProgressRing mode="timer|loading" value? max? label />`

---

## 7) QA 시나리오 (출고 게이트)
- Home
  - 입력 → Enter → Execute 진입
  - Shift+Enter → 목록 추가
  - 목록 row 클릭 → Execute 진입
  - X 삭제 → Undo로 복구
- Analyze
  - 1초 이상 걸릴 때 로딩 표시/문구 자연스러움
- Execute
  - Step1 완료 → Step2 자동 이동
  - Step3 완료 → Summary 이동
  - “다시 생성” 시 이전 상태 정리(중복 스텝/타이머 리셋)
- Summary
  - “다른 할 일 시작하기” → Home
  - “같은 미션 다시 하기” → Execute

## 8) 레퍼런스 스윕 반영 후보 (웹 기반 v0.2 보강)

### Home (capture/start)
- 빠른 입력 1회 + 즉시 시작 동작(Enter) 패턴은 Todoist/Task 퀵 인풋 계열과 정합성이 높다.
- 행 클릭(row tap)으로 시작, `Enter` 보조 트리거 분기(예: Shift+Enter)는 과잉 행동 분리보다 “행동 단일성” 유지 관점에서 보존.
- Empty 상태 텍스트는 “작업 없음”이 아니라 `예시 3개 + Enter 힌트`로 진입 전환율을 살리는 방식 유지.

### Analyze (breakdown/preview)
- “3초 미만은 바로 이동, 1초 이상은 로딩 표시”는 `일시적 지연에 대한 지연 표시의 적정성` 원칙(과한 진행률 미표기, Apple/Material loading 지침)과 합치.
- 스텝 텍스트는 한 번에 하나씩 노출해 지각적 안정성 확보. (프리뷰=진행 중 기대 관리)

### Execute (single focus)
- `Task + timer + 하나의 현재 단계`는 Pomodoro형 포커스 앱 패턴(단일 타이머 + 현재 작업 강조)과 정합.
- 완료/다음 이중 CTA는 유지하지 않고 하단 1개로 고정.
- “지금은 시작만 해도 성공” 계열의 소프트 카피 사용을 우선 적용해 압박형 경고 카피를 줄인다.

### Summary (completion loop)
- 요약은 보조 지표 + 주된 다음 행동 CTA(다음 미션/다시 시작)로 정렬하는 2-depth 계층을 유지.
- 통계(초/스텝/점수)는 보조 슬롯으로 내려두고, 완료 문구는 축하/회귀 최소형 톤으로 정돈.

### 공통 컴포넌트/상태
- 로딩/빈/완료 상태는 각 구간당 단일 상태 신호(Spinner or tiny chip)만 표기해 시각 잡음/전환 지연을 최소화.
- 포커스/키보드 접근성은 Tab 순서 + focus ring 가시성 강화로 정합.
- 라우트별 단일 소스 업데이트 우선: `/`,`/generate`,`/session`,`/summary` 텍스트·행동 문구만 바꾸고 핵심 로직은 고정.

---

## 9) (선택) 최소 이벤트(나중에 판단 쉬워짐)
- `home_start_clicked`
- `home_add_clicked`
- `list_item_start_clicked`
- `generate_started` / `generate_completed` (duration)
- `step_completed` (stepIndex)
- `session_completed`

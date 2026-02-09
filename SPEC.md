# MIRUNY 2.1 MVP Specification

## 1) Functional Scope

단일 Next.js 앱에서 아래 4개 화면을 제공한다.

- Landing(`/`)
- Prepare(`/prepare`)
- Run(`/run`)
- Done(`/done`)

사용자는 작업 텍스트를 입력하고 즉시 3단계 실행 플로우로 들어갈 수 있어야 하며, 모든 핵심 상태는 `localStorage`에 유지된다.

## 2) Routes

## `/` Landing

- 상단 타이틀: `MIRUNY 2.1` + 작은 아이콘
- 헤드라인: `지금 바로 시작하고 싶은 일을 적으세요`
  - `적으세요`만 오렌지 강조
- 서브텍스트: `오늘 꼭 시작하고 싶은 일을 할 일 목록에 모두 추가해보세요`
- 입력 placeholder: `예: 밀린 강의 자료 정리하기`
- 버튼:
  - Primary: `지금 바로 시작 ->`
  - Secondary: `할 일 목록에 추가`
- 힌트: `Enter 키를 눌러 바로 시작하세요`
- 섹션: `오늘의 할 일 목록`
  - 아이템 UI: 체크박스, 라벨, 삭제(X)
  - 완료 항목은 strike-through
  - 하단 액션: `완료된 항목 삭제하기`, `전체 삭제하기`

핵심 동작:
- Enter = Primary 버튼과 동일 동작
- `할 일 목록에 추가`: Task 저장 후 입력창 초기화
- `지금 바로 시작`: CurrentRun 생성 후 `/prepare` 이동

## `/prepare`

- 중앙 카운트다운: `3 -> 2 -> 1`
- 텍스트: `준비하세요...`
- 카운트다운 종료 시 `/run` 이동
- `currentRun`이 없으면 `/`로 리다이렉트

## `/run`

- 상단 텍스트: `지금 당장 시작하세요!`
- 미션 박스:
  - 라벨: `MISSION`
  - 본문: `currentRun.taskText`
- 액션 링크/버튼: `다시 생성하기`
  - 같은 taskText로 steps 재생성
  - `currentStepIndex=0`, `completedStepIndexes=[]`, 타이머 리셋
- 타이머 링(SVG) + 남은 초 표시
- `remaining <= 3`일 때 `서두르세요!` 노출
- 버튼:
  - `1단계부터 다시 시작`
  - `다음 단계로 ->`
- 3단계 카드 목록:
  - 현재 단계 강조(오렌지 계열)
  - 미래 단계 비활성(회색)
  - 카드 오른쪽 `완료` 버튼

핵심 동작:
- `다음 단계로` 또는 `완료` 클릭:
  - 현재 인덱스 완료 처리
  - 다음 인덱스로 이동
  - 마지막(3단계) 완료 시 `/done`
- `1단계부터 다시 시작`:
  - 진행도 초기화 + 단계 1로 이동 + 타이머 재시작

## `/done`

- confetti 애니메이션
- 링 + 완료 텍스트: `{총 소요초} 완료!`
- 버튼: `1단계부터 다시 시작`
- 3단계 완료 리스트(모두 체크) 표시

## 3) Data Models

```ts
type Task = {
  id: string;
  text: string;
  createdAt: number;
  completed: boolean;
};

type Step = {
  title: string;
  detail?: string;
  durationSec: number;
};

type CurrentRun = {
  taskText: string;
  steps: Step[];
  currentStepIndex: number;
  stepStartedAt: number;
  totalStartedAt: number;
  completedStepIndexes: number[];
};
```

## 4) Storage

`localStorage` 키:

- `miruny.tasks`: `Task[]`
- `miruny.currentRun`: `CurrentRun | null`

저장/로드 규칙:
- JSON parse 실패 시 안전 기본값 사용
- 브라우저 환경 체크 후 접근
- 쓰기 시 즉시 반영

## 5) Timer Rules

- `Date.now()` 기반 계산만 사용
- 각 단계 남은 시간:
  - `elapsedSec = floor((Date.now() - stepStartedAt) / 1000)`
  - `remaining = max(durationSec - elapsedSec, 0)`
- 음수 표시 금지
- 탭 백그라운드/절전/리프레시 후에도 `remaining` 정확 복원

## 6) Chunking / Step Generation

필수 함수:

```ts
createThreeSteps(taskText: string): Step[];
```

v1 휴리스틱:
- 한국어 명령형 제목
- 예시 톤: `1단계 지금 바로 VS Code를 실행하기!`
- 짧고 즉시 행동 가능한 문장
- 기본 duration:
  - Option A: `[10, 20, 20]` (본 MVP 채택)
  - Option B: `[20, 20, 20]`

선택 API:
- `POST /api/chunk`
- `OPENAI_API_KEY` 있으면 LLM 생성 시도
- 없거나 오류면 `createThreeSteps()` fallback
- MVP는 API 부재/실패로 막히면 안 됨

## 7) State Machine

상태:

- `idle` (Landing, currentRun 없음)
- `prepared` (currentRun 생성됨, Prepare 카운트다운)
- `running(step=0..2)`
- `done`

이벤트:

- `START_NOW(taskText)`:
  - `idle -> prepared`
- `COUNTDOWN_FINISHED`:
  - `prepared -> running(step=0)`
- `COMPLETE_STEP`:
  - `running(step<n) -> running(step=n+1)`
- `COMPLETE_LAST_STEP`:
  - `running(step=2) -> done`
- `RESTART_RUN`:
  - `running|done -> running(step=0)`
- `REGENERATE_STEPS`:
  - `running -> running(step=0)` with new steps
- `MISSING_CURRENT_RUN`:
  - `prepared|running|done -> idle` redirect `/`

## 8) UI Style Guidelines

- 배경: off-white/light gray
- 메인 강조: orange
- 큰 radius 입력/버튼
- 입력창 오렌지 테두리
- 타이머 링은 SVG `stroke-dasharray` / `stroke-dashoffset` 사용
- Tailwind로 일관성 유지

## 9) File/Module Plan

- `lib/types.ts`: 타입 정의
- `lib/storage.ts`: 안전한 get/set helper
- `lib/timer.ts`: 순수 시간 계산 helper
- `lib/chunking.ts`: 휴리스틱 생성 + API 호출 helper
- `components/InputCard.tsx`: Landing 입력 카드
- `components/TodoList.tsx`: 할 일 목록 CRUD UI
- `components/TimerRing.tsx`: 링 타이머
- `components/StepCard.tsx`: 단계 카드

## 10) Acceptance Checklist

- [ ] Enter 키로 즉시 시작(Primary 버튼과 동일)
- [ ] Todo CRUD 동작 + 새로고침 후 유지
- [ ] `/prepare`에서 3초 카운트다운 후 `/run` 이동
- [ ] `/run` 타이머가 refresh/background 이후에도 정확
- [ ] 남은 시간이 3초 이하일 때 `서두르세요!` 표시
- [ ] 단계 진행이 정확하며 3단계 완료 시 `/done` 이동
- [ ] `/done`에 confetti와 `{총 소요초} 완료!` 표시

# CODEX Context Pack (MIRUNY)

## Product (1 sentence)
MIRUNY는 “바로 시작”을 돕는 3단계 실행 플로우 앱으로, 할 일 입력부터 준비/실행/완료까지를 짧은 타이머 기반으로 연결한다.

## Routes / Flow
- `/`: 작업 입력 + Todo 목록 관리 (`지금 바로 시작` 또는 Enter로 실행 시작)
- `/prepare`: 실행 전 준비 화면(3초 후 자동 이동)
- `/run`: 단계 진행 화면(재생성/재시작/다음 단계/완료)
- `/done`: 완료 요약 + confetti + 1단계부터 재시작
- 전체 흐름: `/ -> /prepare -> /run -> /done`

## localStorage Keys
- `miruny.tasks`: 랜딩 Todo 목록
- `miruny.currentRun`: 현재 실행 세션(steps, currentStepIndex, timestamps, 완료 정보)

## Scripts / Quality Gate
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm test` = smoke gate (`npm run lint && npm run build`)

## Recent Work Snapshot
- `/prepare`: “작업을 분석하고 있어요...” 톤으로 정렬(브랜드 아이콘 + 실제 로딩 인디케이터 + 3초 이동 유지)
- `/run`: 상태 배지 3단계, step3 CTA 정책(하단 next 대신 카드 완료 유도), StepCard 상세/힌트, TimerRing “초” 중심 표기 반영
- `/` Landing: 이번 라운드 기준 동작 변경 없음(기존 UX/로직 유지)

## Operational Rules (Non-Negotiables)
- 최소 변경/최대 체감 원칙
- 신규 의존성 추가 금지
- 추측 금지: 명령/로그/스크린샷으로만 보고
- 작업 범위 밖 파일 수정 금지(허용 파일만)
- 품질 게이트: `npm test` 필수

## File Lock Policy
- 전역 동결(기본): `globals.css`, `lib/types.ts`, `lib/storage.ts`, `lib/timer.ts`, `lib/chunking.ts`
- MB 단위로 허용 파일을 먼저 고정하고, 해당 파일만 수정
- 허용 범위 밖 변경 발생 시 즉시 복구 후 재작업

## Next Task: MB3 (Done Visual Continuity)
### Goal
`/done` 화면을 `/run`과 시각적으로 연속되게 정렬하고, 완료 순간의 피드백(링/배지/confetti)을 레퍼런스 톤으로 다듬는다.

### Allowed Files
- `app/done/page.tsx`
- `components/DoneRing.tsx`
- `components/ConfettiBurst.tsx`

### Forbidden
- `/run`, `/prepare`, `/` 파일 수정 금지
- `globals.css`, `lib/*` 수정 금지
- 신규 deps 금지

### Acceptance Criteria
- `/done`에서 완료 요약 가독성 강화(핵심 수치 + 상태 문구)
- `/run`과 톤이 자연스럽게 이어지도록 상단/카드 계열 시각 정렬
- confetti가 과하거나 부족하지 않게 1회 연출
- `1단계부터 다시 시작` 동작은 기존과 동일
- `npm test` 통과

## Fixed Report Format
- 변경 요약(3~6줄)
- 수정 파일 목록(허용 파일만)
- 실행 명령/결과(로그 핵심: lint/build exit 0)
- 핵심 화면 스크린샷(요청된 라우트)
- 남은 리스크 1개 + 다음 마이크로 태스크 1개

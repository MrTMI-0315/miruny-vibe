# CODEX Context Pack (MIRUNY)

## Product (1 sentence)
MIRUNY는 “바로 시작”을 돕는 3단계 실행 플로우 앱으로, 할 일 입력부터 준비/실행/완료까지를 짧은 타이머 기반으로 연결한다.

## Routes / Flow
- `/`: 작업 입력 + Todo 목록 관리 (`지금 바로 시작` 또는 Enter로 실행 시작)
- `/prepare`: 실행 전 준비 화면(3초 후 자동 이동)
- `/run`: 단계 진행 화면(재생성/재시작/나가기/다음 단계/완료)
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
- `npm run e2e` = Playwright 회귀 스모크(landing→prepare, prepare positive, run exit/guard/restart/regenerate, prepare/done guard, run step advance, step3 CTA policy, done positive/restart/exit)

## Recent Work Snapshot
- `/prepare`: “작업을 분석하고 있어요...” 톤으로 정렬(브랜드 아이콘 + 실제 로딩 인디케이터 + 3초 이동 유지)
- `/run`: 상태 배지 3단계, step3 CTA 정책(하단 next 대신 카드 완료 유도), StepCard 상세/힌트, TimerRing “초” 중심 표기 반영
- `/run`: 헤더에 `처음으로 나가기` 추가(세션 폐기 + `/` replace)로 P0 출구 확보
- `/done`: 헤더에 `홈으로` 추가(세션 폐기 + `/` replace)로 run/done 출구 일관성 확보
- `/` Landing: 이번 라운드 기준 동작 변경 없음(기존 UX/로직 유지)
- E2E: `landing-to-prepare`, `prepare-positive`, `run-exit`, `run-guard-redirect`, `run-restart`, `run-regenerate`, `prepare-guard-redirect`, `run-step-advance`, `step3-cta-policy`, `done-guard-redirect`, `done-positive`, `done-restart`, `done-exit` 스모크 추가

## Operational Rules (Non-Negotiables)
- 최소 변경/최대 체감 원칙
- 신규 의존성 추가 금지
- 추측 금지: 명령/로그/스크린샷으로만 보고
- 작업 범위 밖 파일 수정 금지(허용 파일만)
- 품질 게이트: `npm test` 필수

## Ultra-Compact Reporting Rule (Context Saver)
- 채팅 리포트는 `증거 최소 + 다음 액션`만 남기고, 상세는 `CODEX_CONTEXT.md`에만 축적한다.
- 하드 제한: 채팅 Report 최대 10줄(빈 줄 포함), 로그는 `npm test exit 0` 1줄만, 파일 목록 1줄만, 캡처는 사용자 수동 캡처 + Codex `캡처 필요 리스트` 1줄만.
- 고정 템플릿:
- 1) 요약: (최대 3줄)
- 2) 수정 파일: (1줄)
- 3) 검증: npm test (exit 0) (1줄)
- 4) 캡처 필요: (1줄, 라우트+타이밍)
- 5) 다음: (1줄, 다음 마이크로 태스크 제안)
- 예외: 추가 설명이 꼭 필요하면 `Decision log`에 1~3줄만 남기고 채팅에는 쓰지 않는다.
- 컨텍스트 90% 근접 시 즉시 `CODEX_CONTEXT.md` 갱신 후 새 세션으로 전환하며, 채팅 설명은 생략한다.

## File Lock Policy
- 전역 동결(기본): `globals.css`, `lib/types.ts`, `lib/storage.ts`, `lib/timer.ts`, `lib/chunking.ts`
- MB 단위로 허용 파일을 먼저 고정하고, 해당 파일만 수정
- 허용 범위 밖 변경 발생 시 즉시 복구 후 재작업

## Context & Capture Policy (UI Polish)
- UI polish 단계에서 Codex는 스크린샷 자동 캡처를 수행하지 않는다.
- 금지: Playwright 설치/다운로드, 자동 스크린샷 파이프라인, `next dev/start` 서버 실행, `curl/ps`/포트 스캔 기반 환경 조사.
- 스크린샷은 사용자(사람)가 브라우저에서 수동 캡처한다.
- Codex는 Report에 `캡처 필요 화면 리스트(라우트 + 타이밍)`만 기록한다. 예: `/done` 진입 직후, +1s, +2s.
- 품질 증거는 `npm test`(= `lint + build`) exit 0 로그로 대체한다.

## Context Window 90% Rule (세션 전환)
- context window가 90%에 근접하면 즉시 세션 전환 절차를 시작한다.
- 1) 현재 마이크로태스크를 종료 가능한 상태로 정리하고 남은 작업/결정사항을 명시한다.
- 2) `CODEX_CONTEXT.md`에 스냅샷(변경 요약/수정 파일/검증 명령 결과/다음 태스크)을 갱신한다.
- 3) 새 세션을 열어 다음 태스크를 진행한다.
- 새 세션 시작 시 근거 문서는 `CODEX_CONTEXT.md`만 사용하며, 이전 대화 맥락에 의존하지 않는다.

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
- 1) 요약
- 2) 수정 파일
- 3) 검증: `npm test (exit 0)`
- 4) 캡처 필요: 라우트 + 타이밍
- 5) 다음 마이크로 태스크

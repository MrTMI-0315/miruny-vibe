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
- `npm run e2e` = Playwright 회귀 스모크(landing list add/toggle/delete/clear-completed/clear-all/start/enter-start/todo-persist, prepare positive, run exit/guard/restart/regenerate, prepare/done guard, run step advance, step3 CTA policy, done positive/restart/exit)

## Dev Panic Runbook (Turbopack)
- 증상: `next dev` 실행 중 Turbopack panic / `.next/dev/lock` 충돌 / corrupted cache 류 에러.
- 복구: (1) 중복 `next dev` 프로세스 종료 → (2) `.next/` 폴더 삭제(wipe) → (3) `npm run dev` 재실행.
- 재발 방지: dev 서버는 1개만 유지(새로 띄우기 전 기존 터미널 종료).

## Recent Work Snapshot
- UI 문서 고정: `apps/miruny/UI_Direction.md`를 단일 소스로 유지하고 `README.md` + `CODEX_CONTEXT.md`에 링크/로그 연결
- 토큰 정렬(MT1): `InputCard/TodoList/StepCard/TimerRing/DoneRing`에 spacing/radius/border/focus-visible 문법 일관화(기능/라벨 불변)
- 라우트 위계(MT3): `/`, `/prepare`, `/run`, `/done`의 primary/secondary CTA 시각 우선순위 정리(플로우/로직 불변)
- Done 연속성(MB3): `/done`을 `/run` 톤으로 정렬 + metrics placeholder + no-shift confetti overlay 반영
- Session Slot(MB4): `/`, `/prepare`, `/run`, `/done` 상단에 `SessionMetaSlot` placeholder 추가(표시 전용, 데이터 연동 없음)
- E2E 확장: `landing-enter-start`, `landing-todo-persist` 포함 스모크 세트 유지, 전체 20개 기준 회귀 실행 가능 상태
- 최신 E2E 보정(로컬): `e2e/step3-cta-policy.spec.ts`를 문구 의존에서 상태/행동 기반 검증으로 변경, `npm run e2e` 20 passed 확인

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

## Current Pending Worktree Snapshot
- 미커밋 변경 파일: `apps/miruny/UI_Direction.md`, `components/InputCard.tsx`, `components/TodoList.tsx`, `components/StepCard.tsx`, `components/TimerRing.tsx`, `components/DoneRing.tsx`, `e2e/step3-cta-policy.spec.ts`
- 성격 분류: UI 시각 리파인 잔여분(컴포넌트 5개+문서 1개) + E2E 정책 보정 1개
- 정리 원칙: `git add .` 금지, 범위별 선택 스테이징/커밋 유지
- 품질 증거(최신): `npm test` exit 0, `npm run e2e` exit 0(20 passed)

## Fixed Report Format
- 1) 요약
- 2) 수정 파일
- 3) 검증: `npm test (exit 0)`
- 4) 캡처 필요: 라우트 + 타이밍
- 5) 다음 마이크로 태스크

## UI 리디자인 로그 (MIRUNY)
- 2026-02-12 (KST)
- 목표: 토큰 문법(간격/라운드/보더/타이포) 정렬 + 라우트 액션 위계 정돈 + step3 정책 유지
- 산출물: `apps/miruny/UI_Direction.md` (UI 시스템/지시사항 단일 소스)
- 품질 게이트: `npm test (exit 0)`
- 관련 커밋: `496b981` (`feat(ui): add done metrics placeholders and no-shift confetti`)
- 관련 커밋: `2897211` (`refactor(ui): apply token system to core components`), `a2a9518` (`docs: add miruny UI direction and token guide`)
- TODO: e2e 보정(`landing-enter-start`, `landing-todo-persist`, `step3-cta-policy`)은 stash 기준으로 별도 커밋 분리

## Session Update Log (2026-02-13 KST)
- 기준 브랜치: `main` (`origin/main` 추적), 최근 반영 커밋: `ff21d92`, `4a1f029`, `a2a9518`, `2897211`
- MB4 반영 완료: Session Meta Slot placeholder를 4개 라우트에 시각-only로 도입
- docs 반영 완료: README에 UI Direction 단일 소스 링크 및 플로우/step3 정책 유지 문구 고정
- E2E 상태: `step3-cta-policy` 스펙을 복사 문구 기반에서 정책 동작 기반으로 보정(로컬 변경)
- 주의: 현재 워킹트리에 UI 리파인 및 e2e 스펙 변경이 남아 있으므로 다음 액션은 범위별 분리 커밋이 우선

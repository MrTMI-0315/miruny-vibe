# MIRUNY 2.1 MVP

Next.js(App Router) + TypeScript + Tailwind로 구현하는 단일 앱입니다.  
목표는 "할 일 입력 -> 3초 준비 -> 3단계 실행 -> 완료 축하" 흐름을 빠르게 제공하는 것입니다.

## 실행 방법

```bash
cd apps/miruny
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 주요 명령어

```bash
cd apps/miruny
npm run dev
npm run build
npm run start
npm run lint
npm test
```

`npm test`는 smoke 경로이며, 내부적으로 `npm run lint && npm run build`를 실행합니다.

## 현재 구현 플로우

1. `/` Landing에서 작업 입력 및 Todo 관리
2. `지금 바로 시작` 또는 Enter로 `currentRun` 생성 후 `/prepare` 이동
3. `/prepare`에서 `3 -> 2 -> 1` 카운트다운 후 `/run` 이동
4. `/run`에서 단계 진행/재시작/재생성 및 타이머 진행
5. 3단계 완료 시 `/done` 이동
6. `/done`에서 confetti + 완료 요약 확인 후 `1단계부터 다시 시작`

## localStorage

- `miruny.tasks`: 랜딩 Todo 목록
- `miruny.currentRun`: 실행 세션(단계/타이머/완료 정보)

## 프로젝트 구조

```text
apps/miruny/
  app/
    page.tsx                # Landing
    prepare/page.tsx        # 3-2-1 countdown
    run/page.tsx            # 3-step run + timer
    done/page.tsx           # confetti + summary
  components/
    InputCard.tsx
    TodoList.tsx
    StepCard.tsx
    TimerRing.tsx
    DoneRing.tsx
    ConfettiBurst.tsx
  lib/
    types.ts
    storage.ts
    chunking.ts
    timer.ts
```

## MIRUNY 문서

- UI System / Direction: `apps/miruny/UI_Direction.md`
- 위 문서는 토큰/라우트별 지시사항/다음 UI 태스크의 단일 소스(SSOT)입니다.
- 핵심 플로우(`/ -> /prepare -> /run -> /done`)와 `/run` step3 단일 진행 정책(하단 CTA 비활성, 카드 완료 진입)은 유지합니다.

## 개발 중 이슈 메모

- Next 템플릿의 `next/font/google` fetch로 오프라인 빌드 실패가 발생해, 외부 폰트 의존성을 제거하고 시스템 폰트 기반으로 전환했습니다.
- 현재 `npm run build`는 오프라인 환경에서도 통과합니다.

## done-positive E2E 증거

- 실행 일시: `2026-02-13 15:20:26 KST` (`/Users/mrtmi/Desktop/Mr_TMI/repos/miruny`)
- 명령: `npm run e2e -- done-positive.spec.ts`
- 샌드박스 재현: 기본 환경 실패 (`EPERM 127.0.0.1:3310`), 승인 실행에서 통과
- 결과: `✓ ...` `1 passed (7.3s)`

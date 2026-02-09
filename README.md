# MIRUNY 2.1 MVP

Next.js(App Router) + TypeScript + Tailwind로 구현하는 단일 앱입니다.  
목표는 "할 일 입력 -> 3초 준비 -> 3단계 실행 -> 완료 축하" 흐름을 빠르게 제공하는 것입니다.

## Quickstart

```bash
cd apps/miruny
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## Commands

```bash
cd apps/miruny
npm run dev
npm run build
npm run start
npm run lint
```

`typecheck`, `test` 스크립트는 구현 단계에서 `package.json`에 추가합니다.

## Planned Project Structure

```text
apps/miruny/
  app/
    page.tsx                # Landing
    prepare/page.tsx        # 3-2-1 countdown
    run/page.tsx            # 3-step run + timer
    done/page.tsx           # confetti + summary
    api/chunk/route.ts      # optional LLM step generation
  components/
    InputCard.tsx
    TodoList.tsx
    StepCard.tsx
    TimerRing.tsx
  lib/
    types.ts
    storage.ts
    chunking.ts
    timer.ts
```

## Key UX Flow

1. Landing(`/`)에서 작업 텍스트를 입력한다.
2. `지금 바로 시작` 또는 Enter로 `CurrentRun`을 생성하고 `/prepare`로 이동한다.
3. `/prepare`에서 3 -> 2 -> 1 카운트다운 후 `/run`으로 자동 이동한다.
4. `/run`에서 각 단계 타이머를 보며 `다음 단계로` 또는 `완료`로 진행한다.
5. 3단계 완료 시 `/done`으로 이동하고 confetti 및 총 소요 시간을 보여준다.
6. `1단계부터 다시 시작`으로 동일 미션을 재시작한다.

## Persistence

- `localStorage` 키
  - `miruny.tasks`
  - `miruny.currentRun`
- 리프레시/백그라운드 이후에도 `Date.now()` 기반으로 타이머가 정확히 복구되어야 합니다.

## MVP Scope Notes

- 외부 DB 없음, 로컬 저장소만 사용.
- LLM 스텝 생성은 선택 기능:
  - `OPENAI_API_KEY`가 있으면 `/api/chunk`를 통해 생성 시도
  - 없거나 실패하면 로컬 휴리스틱(`createThreeSteps`)으로 즉시 fallback

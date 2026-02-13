"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { DoneRing } from "@/components/DoneRing";
import { SessionMetaSlot } from "@/components/SessionMetaSlot";
import {
  CURRENT_RUN_STORAGE_KEY,
  loadCurrentRun,
  saveCurrentRun,
} from "@/lib/storage";
import { CurrentRun } from "@/lib/types";

export default function DonePage() {
  const router = useRouter();
  const [currentRun, setCurrentRun] = useState<CurrentRun | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedRun = loadCurrentRun();

      if (
        !storedRun ||
        storedRun.finishedAt === undefined ||
        storedRun.totalElapsedSec === undefined
      ) {
        router.replace("/");
        setIsReady(true);
        return;
      }

      setCurrentRun(storedRun);
      window.localStorage.removeItem(CURRENT_RUN_STORAGE_KEY);
      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [router]);

  const handleRestart = () => {
    if (!currentRun) {
      return;
    }

    const now = Date.now();
    const resetRun: CurrentRun = {
      ...currentRun,
      currentStepIndex: 0,
      completedStepIndexes: [],
      stepStartedAt: now,
      totalStartedAt: now,
      finishedAt: undefined,
      totalElapsedSec: undefined,
    };

    setCurrentRun(resetRun);
    saveCurrentRun(resetRun);
    router.push("/run");
  };

  const handleExitToLanding = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CURRENT_RUN_STORAGE_KEY);
    }
    setCurrentRun(null);
    router.replace("/");
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100">
        <p className="text-sm text-zinc-600">불러오는 중...</p>
      </main>
    );
  }

  if (!currentRun || currentRun.totalElapsedSec === undefined) {
    return null;
  }

  const completedStepCount = currentRun.completedStepIndexes.length;
  const totalStepCount = currentRun.steps.length;
  const focusScoreValue =
    totalStepCount > 0 ? Math.round((completedStepCount / totalStepCount) * 100) : 0;
  const focusScoreTone =
    focusScoreValue >= 80
      ? "좋음"
      : focusScoreValue >= 60
        ? "보통"
        : "개선 필요";

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8">
      <ConfettiBurst />

      <section className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
        <SessionMetaSlot className="mb-3" />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">지금 당장 시작하세요!</h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="홈으로"
              onClick={handleExitToLanding}
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
            >
              처음으로 나가기
            </button>
            <button
              type="button"
              aria-label="단계 다시 생성하기"
              onClick={handleRestart}
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
            >
              다시 생성하기
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
          <p className="text-xs font-semibold tracking-wider text-orange-600">MISSION</p>
          <p className="mt-1 text-base font-medium text-zinc-900">{currentRun.taskText}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-6">
          <p className="inline-flex rounded-full bg-zinc-200/70 px-3 py-1 text-xs font-semibold text-zinc-700">
            완료 요약
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">완료 상태</p>
          <p className="mt-1 text-xs text-zinc-600">모든 단계가 완료되어 요약을 표시했습니다.</p>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white px-4 py-5">
          <p className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">
            완료 소요시간
          </p>
          <DoneRing totalElapsedSec={currentRun.totalElapsedSec} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-[14px] border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-zinc-500">총 소요시간</p>
            <p className="mt-2 text-2xl font-black tabular-nums text-zinc-900">
              {currentRun.totalElapsedSec}
            </p>
            <p className="mt-1 text-xs text-zinc-500">초</p>
          </article>
          <article className="rounded-[14px] border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-zinc-500">완료 steps</p>
            <p className="mt-2 text-2xl font-black tabular-nums text-zinc-900">
              {completedStepCount}/{totalStepCount}
            </p>
            <p className="mt-1 text-xs text-zinc-500">스텝</p>
          </article>
          <article className="rounded-[14px] border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-zinc-500">focus score</p>
            <p className="mt-2 text-2xl font-black tabular-nums text-zinc-900">
              {focusScoreValue}
            </p>
            <p className="mt-1 text-xs text-zinc-500">점 / {focusScoreTone}</p>
          </article>
        </div>

        <ul className="mt-6 space-y-3">
          {currentRun.steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="flex items-start gap-3 rounded-[14px] border border-zinc-200 bg-white p-4 transition sm:items-center"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 h-10 w-[3px] shrink-0 rounded-full bg-emerald-500"
              >
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-wide text-zinc-500">
                  STEP {index + 1}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-800">{step.title}</p>
                <p className="mt-2 text-xs text-emerald-600">완료됨</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleRestart}
          aria-label="1단계부터 다시 시작"
          className="mt-8 h-12 w-full rounded-2xl bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2"
        >
          1단계부터 다시 시작
        </button>
      </section>
    </main>
  );
}

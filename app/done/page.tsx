"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { DoneRing } from "@/components/DoneRing";
import { loadCurrentRun, saveCurrentRun } from "@/lib/storage";
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

  return (
    <main className="relative min-h-screen bg-zinc-100 px-4 py-8">
      <ConfettiBurst />

      <section className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            지금 당장 시작하세요!
          </h1>
          <button
            type="button"
            onClick={handleRestart}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            다시 생성하기
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
          <p className="text-xs font-semibold tracking-wider text-orange-600">MISSION</p>
          <p className="mt-1 text-base font-medium text-zinc-900">{currentRun.taskText}</p>
        </div>

        <div className="mt-7 text-center">
          <p className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            잘했어요! 🎉
          </p>
          <DoneRing totalElapsedSec={currentRun.totalElapsedSec} />
          <p className="mt-4 text-3xl font-black tracking-tight text-zinc-900">
            {currentRun.totalElapsedSec} 완료!
          </p>
        </div>

        <ul className="mt-8 space-y-3">
          {currentRun.steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 opacity-80"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                ✓
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-wide text-zinc-500">
                  STEP {index + 1}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-700">{step.title}</p>
                <p className="mt-1 text-xs text-emerald-600">완료됨</p>
              </div>
              <span className="shrink-0 text-xs text-zinc-400">DONE</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleRestart}
          className="mt-8 h-12 w-full rounded-2xl bg-zinc-800 text-sm font-semibold text-white transition hover:bg-zinc-900"
        >
          1단계부터 다시 시작
        </button>
      </section>
    </main>
  );
}

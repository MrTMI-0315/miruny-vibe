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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">잘 끝냈어요!</h1>
        <p className="mt-1 text-sm text-zinc-600">지금 당장 시작한 집중이 결과로 이어졌어요.</p>

        <div className="mt-7 text-center">
          <DoneRing totalElapsedSec={currentRun.totalElapsedSec} />
          <p className="mt-4 text-3xl font-black tracking-tight text-zinc-900">
            {currentRun.totalElapsedSec} 완료!
          </p>
          <p className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            잘했어요! 🎉
          </p>
        </div>

        <ul className="mt-8 space-y-3">
          {currentRun.steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 opacity-80"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                ✓
              </span>
              <span className="text-sm font-medium text-zinc-700">{step.title}</span>
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

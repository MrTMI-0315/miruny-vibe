"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StepCard } from "@/components/StepCard";
import { TimerRing } from "@/components/TimerRing";
import { createThreeSteps } from "@/lib/chunking";
import { loadCurrentRun, saveCurrentRun } from "@/lib/storage";
import { CurrentRun } from "@/lib/types";
import { getProgressRatio, getRemainingSeconds } from "@/lib/timer";

function getCompletedIndexes(run: CurrentRun, index: number): number[] {
  const deduped = new Set(run.completedStepIndexes);
  deduped.add(index);
  return Array.from(deduped).sort((a, b) => a - b);
}

export default function RunPage() {
  const router = useRouter();
  const [currentRun, setCurrentRun] = useState<CurrentRun | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedRun = loadCurrentRun();

      if (!storedRun || storedRun.steps.length === 0) {
        router.replace("/");
        setIsReady(true);
        return;
      }

      setCurrentRun(storedRun);
      setNowMs(Date.now());
      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [router]);

  useEffect(() => {
    if (!currentRun) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [currentRun]);

  const persistRun = (nextRun: CurrentRun) => {
    setCurrentRun(nextRun);
    saveCurrentRun(nextRun);
    setNowMs(Date.now());
  };

  const currentStep = useMemo(() => {
    if (!currentRun) {
      return null;
    }

    return currentRun.steps[currentRun.currentStepIndex] ?? null;
  }, [currentRun]);

  const remainingSec = useMemo(() => {
    if (!currentRun || !currentStep) {
      return 0;
    }

    return getRemainingSeconds(currentStep.durationSec, currentRun.stepStartedAt, nowMs);
  }, [currentRun, currentStep, nowMs]);

  const progressRatio = useMemo(() => {
    if (!currentStep) {
      return 0;
    }

    return getProgressRatio(currentStep.durationSec, remainingSec);
  }, [currentStep, remainingSec]);

  const handleRegenerate = () => {
    if (!currentRun) {
      return;
    }

    const now = Date.now();
    const nextRun: CurrentRun = {
      ...currentRun,
      steps: createThreeSteps(currentRun.taskText),
      currentStepIndex: 0,
      completedStepIndexes: [],
      totalStartedAt: now,
      stepStartedAt: now,
      finishedAt: undefined,
      totalElapsedSec: undefined,
    };
    persistRun(nextRun);
  };

  const handleRestartFromFirst = () => {
    if (!currentRun) {
      return;
    }

    const now = Date.now();
    const nextRun: CurrentRun = {
      ...currentRun,
      currentStepIndex: 0,
      completedStepIndexes: [],
      stepStartedAt: now,
      finishedAt: undefined,
      totalElapsedSec: undefined,
    };
    persistRun(nextRun);
  };

  const handleCompleteCurrent = () => {
    if (!currentRun) {
      return;
    }

    const currentIndex = currentRun.currentStepIndex;
    const completedStepIndexes = getCompletedIndexes(currentRun, currentIndex);
    const nextIndex = currentIndex + 1;

    if (nextIndex < currentRun.steps.length) {
      const nextRun: CurrentRun = {
        ...currentRun,
        currentStepIndex: nextIndex,
        completedStepIndexes,
        stepStartedAt: Date.now(),
        finishedAt: undefined,
        totalElapsedSec: undefined,
      };
      persistRun(nextRun);
      return;
    }

    const finishedAt = Date.now();
    const totalElapsedSec = Math.max(
      0,
      Math.floor((finishedAt - currentRun.totalStartedAt) / 1000),
    );
    const nextRun: CurrentRun = {
      ...currentRun,
      completedStepIndexes,
      finishedAt,
      totalElapsedSec,
    };

    persistRun(nextRun);
    router.push("/done");
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100">
        <p className="text-sm text-zinc-600">불러오는 중...</p>
      </main>
    );
  }

  if (!currentRun || !currentStep) {
    return null;
  }

  const isFinalStep = currentRun.currentStepIndex === currentRun.steps.length - 1;

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8">
      <section className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            지금 당장 시작하세요!
          </h1>
          <button
            type="button"
            onClick={handleRegenerate}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            다시 생성하기
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
          <p className="text-xs font-semibold tracking-wider text-orange-600">MISSION</p>
          <p className="mt-1 text-base font-medium text-zinc-900">{currentRun.taskText}</p>
        </div>

        <div className="mt-6">
          <TimerRing
            totalSec={currentStep.durationSec}
            remainingSec={remainingSec}
            progressRatio={progressRatio}
          />
          {remainingSec <= 3 && (
            <p className="mt-3 text-center text-sm font-bold text-orange-600">서두르세요!</p>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleRestartFromFirst}
            className="h-12 rounded-2xl bg-zinc-800 text-sm font-semibold text-white hover:bg-zinc-900"
          >
            1단계부터 다시 시작
          </button>
          <button
            type="button"
            onClick={handleCompleteCurrent}
            disabled={isFinalStep}
            className={`h-12 rounded-2xl px-3 text-center text-[11px] font-semibold leading-tight transition sm:px-4 sm:text-sm ${
              isFinalStep
                ? "cursor-not-allowed border border-orange-200 bg-orange-50 text-orange-500"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {isFinalStep ? "마지막 단계는 카드 완료 버튼을 눌러주세요" : "다음 단계로 →"}
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {currentRun.steps.map((step, index) => (
            <StepCard
              key={`${step.title}-${index}`}
              step={step}
              index={index}
              isCurrent={index === currentRun.currentStepIndex}
              isCompleted={currentRun.completedStepIndexes.includes(index)}
              isDisabled={index !== currentRun.currentStepIndex}
              isFinalStep={index === currentRun.steps.length - 1}
              onCompleteCurrent={handleCompleteCurrent}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionMetaSlot } from "@/components/SessionMetaSlot";
import { loadCurrentRun } from "@/lib/storage";
import { CurrentRun } from "@/lib/types";

export default function PreparePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [showLoadingUi, setShowLoadingUi] = useState(false);
  const [currentRun] = useState<CurrentRun | null>(() => loadCurrentRun());

  useEffect(() => {
    if (!currentRun) {
      router.replace("/");
      return;
    }

    const intervalId = window.setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          window.clearInterval(intervalId);
          router.push("/run");
          return 1;
        }

        return prevCount - 1;
      });
    }, 1000);

    const loadingDelayId = window.setTimeout(() => {
      setShowLoadingUi(true);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(loadingDelayId);
    };
  }, [router, currentRun]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-xl rounded-[18px] border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <SessionMetaSlot className="mb-3 text-left" />

        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M13 2 6 13h5l-1 9 8-12h-5z" />
          </svg>
        </div>

        {currentRun ? (
          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-zinc-500">
              {currentRun.steps?.[0]?.title ?? "미션 준비"}
            </p>

            <div
              className="mt-4 flex items-center justify-center gap-3"
              role="status"
              aria-live="polite"
              aria-label="작업 분석 진행 중"
            >
              {showLoadingUi ? (
                <>
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
                  <p className="text-2xl font-semibold tracking-tight text-zinc-800">
                    3단계로 쪼개는 중…
                  </p>
                </>
              ) : (
                <p className="text-xl font-semibold tracking-tight text-zinc-700">
                  이제 실행 준비 중...
                </p>
              )}
            </div>

            <p className="text-sm text-zinc-600">곧 실행 화면으로 이동해요</p>
          </div>
        ) : null}

        <p className="mt-3 text-sm text-zinc-600">
          약 {countdown}초 후 실행 화면으로 이동합니다
        </p>
      </div>
    </main>
  );
}

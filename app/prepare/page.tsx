"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionMetaSlot } from "@/components/SessionMetaSlot";
import { loadCurrentRun } from "@/lib/storage";

export default function PreparePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!loadCurrentRun()) {
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

    return () => {
      window.clearInterval(intervalId);
    };
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-xl rounded-[18px] border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <SessionMetaSlot className="mb-3 text-left" />

        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M13 2 6 13h5l-1 9 8-12h-5z" />
          </svg>
        </div>

        <div
          className="mt-8 flex items-center justify-center gap-3"
          role="status"
          aria-live="polite"
          aria-label="작업 분석 진행 중"
        >
          <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
          <p className="text-2xl font-semibold tracking-tight text-zinc-800">
            작업을 분석하고 있어요...
          </p>
        </div>

        <p className="mt-3 text-sm text-zinc-600">
          약 {countdown}초 후 실행 화면으로 이동합니다
        </p>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCurrentRun } from "@/lib/storage";
import { CurrentRun } from "@/lib/types";

export default function RunPage() {
  const router = useRouter();
  const [currentRun, setCurrentRun] = useState<CurrentRun | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedRun = loadCurrentRun();

      if (!storedRun) {
        router.replace("/");
        setCheckedStorage(true);
        return;
      }

      setCurrentRun(storedRun);
      setCheckedStorage(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [router]);

  if (!checkedStorage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100">
        <p className="text-sm text-zinc-600">불러오는 중...</p>
      </main>
    );
  }

  if (!currentRun) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10">
      <section className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-2xl font-bold text-zinc-900">지금 당장 시작하세요!</h1>
        <div className="mt-4 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
          <p className="text-xs font-semibold tracking-wider text-orange-600">MISSION</p>
          <p className="mt-1 text-base font-medium text-zinc-900">
            {currentRun.taskText}
          </p>
        </div>

        <ul className="mt-5 space-y-2">
          {currentRun.steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700 ring-1 ring-zinc-200"
            >
              {step.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

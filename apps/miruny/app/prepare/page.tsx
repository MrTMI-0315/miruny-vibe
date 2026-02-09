"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      <p className="text-8xl font-black tracking-tight text-zinc-900">{countdown}</p>
      <p className="mt-4 text-lg text-zinc-600">준비하세요...</p>
    </main>
  );
}

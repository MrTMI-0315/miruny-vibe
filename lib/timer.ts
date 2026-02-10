export function getRemainingSeconds(
  durationSec: number,
  stepStartedAt: number,
  nowMs: number,
): number {
  const elapsedSec = Math.floor((nowMs - stepStartedAt) / 1000);
  return Math.max(0, durationSec - elapsedSec);
}

export function getProgressRatio(totalSec: number, remainingSec: number): number {
  if (totalSec <= 0) {
    return 1;
  }

  const elapsedSec = totalSec - remainingSec;
  return Math.min(1, Math.max(0, elapsedSec / totalSec));
}

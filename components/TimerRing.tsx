type TimerRingProps = {
  totalSec: number;
  remainingSec: number;
  progressRatio: number;
};

export function TimerRing({
  totalSec,
  remainingSec,
  progressRatio,
}: TimerRingProps) {
  const size = 220;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progressRatio);

  return (
    <div className="relative mx-auto h-[220px] w-[220px]">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-zinc-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="fill-none stroke-orange-500 transition-[stroke-dashoffset]"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-6xl font-black leading-none tabular-nums text-zinc-900">
          {remainingSec}
        </p>
        <p className="mt-1 text-xs font-medium tabular-nums text-zinc-500">/ {totalSec}s</p>
      </div>
    </div>
  );
}

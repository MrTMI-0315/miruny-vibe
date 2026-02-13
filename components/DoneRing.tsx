type DoneRingProps = {
  totalElapsedSec: number;
};

export function DoneRing({ totalElapsedSec }: DoneRingProps) {
  const size = 220;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const durationText = `${totalElapsedSec}s`;

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
          strokeDashoffset={0}
          strokeLinecap="round"
          className="fill-none stroke-orange-500"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-6xl font-black leading-none tabular-nums text-zinc-900">
          {totalElapsedSec}
        </p>
        <p className="text-xs font-semibold text-zinc-500">{durationText}</p>
      </div>
    </div>
  );
}

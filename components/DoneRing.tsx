type DoneRingProps = {
  totalElapsedSec: number;
};

export function DoneRing({ totalElapsedSec }: DoneRingProps) {
  return (
    <div className="relative mx-auto h-[220px] w-[220px]">
      <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
        <circle
          cx="110"
          cy="110"
          r="96"
          strokeWidth="12"
          className="fill-none stroke-zinc-200"
        />
        <circle
          cx="110"
          cy="110"
          r="96"
          strokeWidth="12"
          strokeDasharray={603}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="fill-none stroke-orange-500"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-6xl font-black leading-none text-zinc-900">{totalElapsedSec}</p>
        <p className="mt-1 text-sm font-semibold text-zinc-600">초</p>
      </div>
    </div>
  );
}

type DoneRingProps = {
  totalElapsedSec: number;
};

export function DoneRing({ totalElapsedSec }: DoneRingProps) {
  return (
    <div className="relative mx-auto h-56 w-56">
      <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
        <circle
          cx="110"
          cy="110"
          r="94"
          strokeWidth="16"
          className="fill-none stroke-zinc-200"
        />
        <circle
          cx="110"
          cy="110"
          r="94"
          strokeWidth="16"
          strokeDasharray={590}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="fill-none stroke-orange-500"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl font-black text-zinc-900">{totalElapsedSec}</p>
        <p className="mt-1 text-sm font-semibold text-zinc-500">초</p>
      </div>
    </div>
  );
}

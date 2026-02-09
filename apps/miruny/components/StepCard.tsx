import { Step } from "@/lib/types";

type StepCardProps = {
  step: Step;
  index: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  onCompleteCurrent: () => void;
};

export function StepCard({
  step,
  index,
  isCurrent,
  isCompleted,
  isDisabled,
  onCompleteCurrent,
}: StepCardProps) {
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
        isCurrent
          ? "border-orange-300 bg-orange-50"
          : "border-zinc-200 bg-zinc-50 opacity-70"
      }`}
    >
      <div className="flex-1">
        <p className="text-xs font-semibold tracking-wide text-zinc-500">
          STEP {index + 1}
        </p>
        <p
          className={`mt-1 text-sm font-medium ${
            isDisabled ? "text-zinc-500" : "text-zinc-800"
          }`}
        >
          {step.title}
        </p>
        {isCompleted && <p className="mt-2 text-xs text-emerald-600">완료됨</p>}
      </div>

      {isCurrent ? (
        <button
          type="button"
          onClick={onCompleteCurrent}
          className="h-10 shrink-0 rounded-xl bg-orange-500 px-4 text-xs font-semibold text-white transition hover:bg-orange-600"
        >
          완료
        </button>
      ) : (
        <span className="shrink-0 text-xs text-zinc-400">
          {isCompleted ? "DONE" : "대기"}
        </span>
      )}
    </li>
  );
}

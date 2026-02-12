import { Step } from "@/lib/types";

type StepCardProps = {
  step: Step;
  index: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  isFinalStep: boolean;
  onCompleteCurrent: () => void;
};

export function StepCard({
  step,
  index,
  isCurrent,
  isCompleted,
  isDisabled,
  isFinalStep,
  onCompleteCurrent,
}: StepCardProps) {
  const isFinalCurrentStep = isCurrent && isFinalStep;

  return (
    <li
      className={`flex items-start gap-3 rounded-2xl border p-3 transition sm:items-center sm:p-4 ${
        isFinalCurrentStep
          ? "max-[360px]:flex-col max-[360px]:items-stretch max-[360px]:gap-2.5"
          : ""
      } ${
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
        {isFinalCurrentStep && (
          <p className="mt-1.5 text-[11px] font-semibold leading-snug text-orange-600 sm:mt-2 sm:text-xs">
            마지막 단계는 완료 버튼만 누르세요.
          </p>
        )}
        {isCompleted && <p className="mt-2 text-xs text-emerald-600">완료됨</p>}
      </div>

      {isCurrent ? (
        <button
          type="button"
          onClick={onCompleteCurrent}
          aria-label={`${index + 1}단계 완료하기`}
          className={`shrink-0 rounded-xl text-white transition ${
            isFinalCurrentStep
              ? "h-11 self-start bg-orange-500 px-4 text-xs font-bold shadow-sm ring-2 ring-orange-200 hover:bg-orange-600 sm:px-5 sm:text-sm max-[360px]:mt-1 max-[360px]:w-full max-[360px]:self-stretch"
              : "h-10 bg-orange-500 px-4 text-xs font-semibold hover:bg-orange-600"
          }`}
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

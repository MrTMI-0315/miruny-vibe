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
  const isDoneCard = !isCurrent && isCompleted;
  const isFutureCard = !isCurrent && isDisabled && !isCompleted;
  const currentSurfaceClass = isCurrent ? "bg-orange-50/60" : "";

  return (
    <li
      className={`flex items-start gap-3 rounded-[14px] border border-zinc-200 bg-white p-4 transition sm:items-center ${currentSurfaceClass} ${
        isFinalCurrentStep
          ? "max-[360px]:flex-col max-[360px]:items-stretch max-[360px]:gap-2.5"
          : ""
      } ${
        isCurrent
          ? ""
          : isDoneCard
            ? "bg-zinc-50"
            : isFutureCard
              ? "bg-zinc-50/50"
              : "bg-white"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 h-10 w-[3px] shrink-0 rounded-full ${
          isCurrent ? "bg-orange-500" : "bg-zinc-200"
        }`}
      />

      <div className="flex-1">
        <p className="text-xs font-semibold tracking-wide text-zinc-500">
          STEP {index + 1}
        </p>
        <p
          className={`mt-1 text-base leading-6 font-medium ${
            isCurrent ? "text-zinc-900" : isDisabled ? "text-zinc-500" : "text-zinc-800"
          }`}
        >
          {step.title}
        </p>
        {isFinalCurrentStep && (
          <p className="mt-2 text-xs font-semibold leading-[18px] text-orange-600">
            마지막 단계는 완료 버튼만 누르세요.
          </p>
        )}
        {isCompleted && <p className="mt-2 text-xs text-emerald-600">완료됨</p>}
      </div>

      {isCurrent ? (
        <button
          type="button"
          onClick={onCompleteCurrent}
          aria-label={isFinalCurrentStep ? "마지막 단계 완료하기" : `${index + 1}단계 완료하기`}
          className={`shrink-0 rounded-[10px] text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 ${
            isFinalCurrentStep
              ? "h-11 self-start bg-orange-500 px-4 text-xs font-bold shadow-sm ring-1 ring-orange-200 hover:bg-orange-600 sm:px-5 sm:text-sm max-[360px]:mt-1 max-[360px]:w-full max-[360px]:self-stretch"
              : "h-10 bg-orange-500 px-4 text-xs font-semibold hover:bg-orange-600 active:bg-orange-700"
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

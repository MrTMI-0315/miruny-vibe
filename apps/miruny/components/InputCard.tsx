type InputCardProps = {
  value: string;
  canSubmit: boolean;
  onChange: (value: string) => void;
  onAddToList: () => void;
  onStartNow: () => void;
};

export function InputCard({
  value,
  canSubmit,
  onChange,
  onAddToList,
  onStartNow,
}: InputCardProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
      <header className="mb-5 flex items-center gap-2 text-zinc-900">
        <span className="text-lg font-extrabold tracking-tight">MIRUNY 2.1</span>
        <span
          aria-hidden
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M13 2 6 13h5l-1 9 8-12h-5z" />
          </svg>
        </span>
      </header>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          지금 바로 시작하고 싶은 일을{" "}
          <span className="text-orange-500">적으세요</span>
        </h1>
        <p className="text-sm text-zinc-600 sm:text-base">
          오늘 꼭 시작하고 싶은 일을 할 일 목록에 모두 추가해보세요
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onStartNow();
            }
          }}
          placeholder="예: 밀린 강의 자료 정리하기"
          className="h-14 w-full rounded-2xl border-2 border-orange-300 bg-orange-50 px-4 text-zinc-900 outline-none transition focus:border-orange-500"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onStartNow}
            disabled={!canSubmit}
            className="h-12 rounded-2xl bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-45"
          >
            지금 바로 시작 →
          </button>
          <button
            type="button"
            onClick={onAddToList}
            disabled={!canSubmit}
            className="h-12 rounded-2xl bg-zinc-800 px-4 text-sm font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-45"
          >
            할 일 목록에 추가
          </button>
        </div>

        <p className="text-center text-xs text-zinc-500 sm:text-left">
          Enter 키를 눌러 바로 시작하세요
        </p>
      </div>
    </section>
  );
}

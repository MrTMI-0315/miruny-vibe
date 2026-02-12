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
    <section>
      <header className="text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-orange-200 bg-orange-50 text-orange-500">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M13 2 6 13h5l-1 9 8-12h-5z" />
          </svg>
        </div>
        <p className="mt-3 text-[20px] font-semibold leading-[26px] tracking-tight text-zinc-900">
          MIRUNY 2.1
        </p>
      </header>

      <div className="mt-8 space-y-3 text-center">
        <h1 className="text-[28px] font-bold leading-[34px] tracking-tight text-zinc-900">
          지금 바로 시작하고 싶은 일을{" "}
          <span className="text-orange-500">적으세요</span>
        </h1>
        <p className="text-base font-medium leading-6 text-zinc-700">
          오늘 꼭 시작하고 싶은 일을
          <br />
          할 일 목록에 모두 추가해보세요
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onStartNow();
            }
          }}
          placeholder="예: 밀린 강의 자료 정리하기"
          className="h-14 w-full rounded-[14px] border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onStartNow}
            disabled={!canSubmit}
            className="h-12 rounded-[14px] bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-500 active:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            지금 바로 시작 →
          </button>
          <button
            type="button"
            onClick={onAddToList}
            disabled={!canSubmit}
            className="h-12 rounded-[14px] bg-zinc-600 px-4 text-sm font-semibold text-white transition hover:bg-zinc-500 active:bg-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            할 일 목록에 추가
          </button>
        </div>

        <p className="pt-6 text-center text-sm text-zinc-700">
          Enter 키를 눌러 바로 시작하세요
        </p>
      </div>
    </section>
  );
}

import { Task } from "@/lib/types";

type TodoListProps = {
  tasks: Task[];
  onStartFromList: (taskText: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteCompleted: () => void;
  onDeleteAll: () => void;
};

export function TodoList({
  tasks,
  onStartFromList,
  onToggle,
  onDelete,
  onDeleteCompleted,
  onDeleteAll,
}: TodoListProps) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-[20px] font-semibold leading-[26px] text-zinc-900">
        <span className="text-[20px]" aria-hidden>
          📋
        </span>
        오늘의 할 일 목록
      </h2>

      <ul className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <li className="rounded-[14px] border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
            아직 추가된 할 일이 없습니다.
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="rounded-[14px] border border-zinc-200 bg-white"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => onStartFromList(task.text)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onStartFromList(task.text);
                  }
                }}
                className="flex cursor-pointer items-center gap-3 rounded-[14px] bg-white p-4 transition hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2"
                aria-label={`${task.text} 실행 시작`}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle(task.id);
                  }}
                  aria-label={`${task.text} 완료 토글`}
                  aria-pressed={task.completed}
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 ${
                    task.completed
                      ? "border-orange-300 bg-orange-100 text-orange-500"
                      : "border-zinc-300 bg-white text-transparent hover:border-orange-300"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                    <path d="M9.5 16.2 4.8 11.5l1.4-1.4 3.3 3.3 8.3-8.3 1.4 1.4z" />
                  </svg>
                </button>
                <span
                  className={`flex-1 text-base leading-6 ${
                    task.completed ? "text-zinc-500 line-through" : "text-zinc-800"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="text-sm font-medium text-zinc-500 transition hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
                  aria-label={`${task.text} 삭제`}
                >
                  X
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm">
        <button
          type="button"
          onClick={onDeleteCompleted}
          className="font-medium text-zinc-700 underline underline-offset-2 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
        >
          완료된 항목 삭제하기
        </button>
        <span className="text-zinc-300">/</span>
        <button
          type="button"
          onClick={onDeleteAll}
          className="font-medium text-zinc-700 underline underline-offset-2 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
        >
          전체 삭제하기
        </button>
      </div>
    </section>
  );
}

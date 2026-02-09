import { Task } from "@/lib/types";

type TodoListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteCompleted: () => void;
  onDeleteAll: () => void;
};

export function TodoList({
  tasks,
  onToggle,
  onDelete,
  onDeleteCompleted,
  onDeleteAll,
}: TodoListProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
      <h2 className="text-xl font-bold text-zinc-900">오늘의 할 일 목록</h2>

      <ul className="mt-4 space-y-2">
        {tasks.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-5 text-sm text-zinc-500">
            아직 추가된 할 일이 없습니다.
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="h-4 w-4 accent-orange-500"
              />
              <span
                className={`flex-1 text-sm ${
                  task.completed ? "text-zinc-400 line-through" : "text-zinc-800"
                }`}
              >
                {task.text}
              </span>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="text-sm font-semibold text-zinc-400 transition hover:text-zinc-700"
                aria-label={`${task.text} 삭제`}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <button
          type="button"
          onClick={onDeleteCompleted}
          className="font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          완료된 항목 삭제하기
        </button>
        <span className="text-zinc-300">/</span>
        <button
          type="button"
          onClick={onDeleteAll}
          className="font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          전체 삭제하기
        </button>
      </div>
    </section>
  );
}

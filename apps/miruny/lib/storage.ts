import { Task } from "@/lib/types";

export const TASKS_STORAGE_KEY = "miruny.tasks";

function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Task;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.text === "string" &&
    typeof candidate.createdAt === "number" &&
    typeof candidate.completed === "boolean"
  );
}

export function loadTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const parsed = safeParseJSON<unknown>(
    window.localStorage.getItem(TASKS_STORAGE_KEY),
    [],
  );

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(isTask);
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

import { CurrentRun, Step, Task } from "@/lib/types";

export const TASKS_STORAGE_KEY = "miruny.tasks";
export const CURRENT_RUN_STORAGE_KEY = "miruny.currentRun";

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

function isStep(value: unknown): value is Step {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Step;

  return (
    typeof candidate.title === "string" &&
    (candidate.detail === undefined || typeof candidate.detail === "string") &&
    typeof candidate.durationSec === "number"
  );
}

function isCurrentRun(value: unknown): value is CurrentRun {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as CurrentRun;

  return (
    typeof candidate.taskText === "string" &&
    Array.isArray(candidate.steps) &&
    candidate.steps.every(isStep) &&
    typeof candidate.currentStepIndex === "number" &&
    typeof candidate.stepStartedAt === "number" &&
    typeof candidate.totalStartedAt === "number" &&
    Array.isArray(candidate.completedStepIndexes) &&
    candidate.completedStepIndexes.every((index) => typeof index === "number")
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

export function loadCurrentRun(): CurrentRun | null {
  if (typeof window === "undefined") {
    return null;
  }

  const parsed = safeParseJSON<unknown>(
    window.localStorage.getItem(CURRENT_RUN_STORAGE_KEY),
    null,
  );

  if (!isCurrentRun(parsed)) {
    return null;
  }

  return parsed;
}

export function saveCurrentRun(currentRun: CurrentRun): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CURRENT_RUN_STORAGE_KEY,
    JSON.stringify(currentRun),
  );
}

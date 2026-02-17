"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InputCard } from "@/components/InputCard";
import { SessionMetaSlot } from "@/components/SessionMetaSlot";
import { TodoList } from "@/components/TodoList";
import { createThreeSteps } from "@/lib/chunking";
import { loadTasks, saveCurrentRun, saveTasks } from "@/lib/storage";
import { CurrentRun, Task } from "@/lib/types";

function createTask(text: string): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    createdAt: Date.now(),
    completed: false,
  };
}

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const canSubmit = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTaskFromInput = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setInputError(true);
      return null;
    }

    const newTask = createTask(trimmed);
    setInputError(false);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setInputValue("");
    return newTask;
  };

  const startRunWithTask = (taskText: string) => {
    const now = Date.now();
    const currentRun: CurrentRun = {
      taskText,
      steps: createThreeSteps(taskText),
      currentStepIndex: 0,
      stepStartedAt: now,
      totalStartedAt: now,
      completedStepIndexes: [],
    };

    saveCurrentRun(currentRun);
    router.push("/prepare");
  };

  const handleStartNow = () => {
    const task = addTaskFromInput();

    if (!task) {
      setInputError(true);
      return;
    }

    startRunWithTask(task.text);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (inputError) {
      setInputError(false);
    }
  };

  const handleInvalidSubmit = () => {
    setInputError(true);
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10 sm:py-12">
      <main className="mx-auto w-full max-w-[560px] space-y-8">
        <SessionMetaSlot className="px-1" />

        <section className="rounded-[18px] border border-orange-200 bg-white p-4 shadow-sm sm:p-6">
          <InputCard
            value={inputValue}
            canSubmit={canSubmit}
            onChange={handleInputChange}
            onAddToList={addTaskFromInput}
            onStartNow={handleStartNow}
            onInvalidSubmit={handleInvalidSubmit}
            showInputError={inputError}
          />
        </section>

        <section className="rounded-[18px] border border-zinc-200 bg-zinc-50 p-4 sm:p-6">
          <TodoList
            tasks={tasks}
            onStartFromList={(taskText) => {
              setInputError(false);
              startRunWithTask(taskText);
            }}
            onToggle={(id) => {
              setTasks((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === id ? { ...task, completed: !task.completed } : task,
                ),
              );
            }}
            onDelete={(id) => {
              setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            }}
            onDeleteCompleted={() => {
              setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
            }}
            onDeleteAll={() => {
              setTasks([]);
            }}
          />
        </section>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { InputCard } from "@/components/InputCard";
import { TodoList } from "@/components/TodoList";
import { loadTasks, saveTasks } from "@/lib/storage";
import { Task } from "@/lib/types";

function createTask(text: string): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    createdAt: Date.now(),
    completed: false,
  };
}

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const canSubmit = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTaskFromInput = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return null;
    }

    const newTask = createTask(trimmed);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setInputValue("");
    return newTask;
  };

  const handleStartNow = () => {
    const task = addTaskFromInput();

    if (!task) {
      return;
    }

    // Execution flow (/prepare) will be connected in the next commit.
    window.alert("실행 플로우(/prepare)는 다음 커밋에서 연결됩니다.");
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-8 sm:px-6 sm:py-10">
      <main className="mx-auto w-full max-w-3xl space-y-5">
        <InputCard
          value={inputValue}
          canSubmit={canSubmit}
          onChange={setInputValue}
          onAddToList={addTaskFromInput}
          onStartNow={handleStartNow}
        />
        <TodoList
          tasks={tasks}
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
      </main>
    </div>
  );
}

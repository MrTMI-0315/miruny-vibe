export type Task = {
  id: string;
  text: string;
  createdAt: number;
  completed: boolean;
};

export type Step = {
  title: string;
  detail?: string;
  durationSec: number;
};

export type CurrentRun = {
  taskText: string;
  steps: Step[];
  currentStepIndex: number;
  stepStartedAt: number;
  totalStartedAt: number;
  completedStepIndexes: number[];
  finishedAt?: number;
  totalElapsedSec?: number;
};

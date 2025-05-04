import type { TaskState } from "./tasksSlice";

const STORAGE_KEY = "taskFlowState";

export const loadState = (): TaskState | undefined => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized) as TaskState;
  } catch (err) {
    console.warn("Can't load state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state: TaskState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn("Can't save state to localStorage", err);
  }
};

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { TaskState } from './tasksSlice';
import { loadState, saveState } from './localStorage';

const persistedTasks: TaskState | undefined = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: persistedTasks ? { tasks: persistedTasks } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

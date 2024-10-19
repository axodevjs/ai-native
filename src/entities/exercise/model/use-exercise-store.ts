import { create } from "zustand";

interface Workout {
  name: string;
  description: string;
  points: number;
  colories: string;
  durations: number; // Изменяем тип с string на number
}

interface ExerciseStore {
  exercises: Workout[];
  currentExerciseIndex: number;
  timeLeft: number;
  isRunning: boolean;
  setExercises: (exercises: Workout[]) => void;
  startExercise: () => void;
  nextExercise: () => void;
  tick: () => void;
  reset: () => void;
}

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: [],
  currentExerciseIndex: 0,
  timeLeft: 0,
  isRunning: false,
  setExercises: (exercises) => set({ exercises }),
  startExercise: () =>
    set((state) => ({
      isRunning: true,
      timeLeft: state.exercises[state.currentExerciseIndex]?.durations || 0,
    })),
  nextExercise: () =>
    set((state) => {
      const nextIndex = state.currentExerciseIndex + 1;
      if (nextIndex < state.exercises.length) {
        return {
          currentExerciseIndex: nextIndex,
          timeLeft: state.exercises[nextIndex].durations,
          isRunning: false,
        };
      } else {
        // Если все упражнения выполнены, сбрасываем состояние
        return {
          isRunning: false,
          timeLeft: 0,
          currentExerciseIndex: state.exercises.length, // Индекс устанавливается за пределы массива
        };
      }
    }),

  tick: () =>
    set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 })),
  reset: () =>
    set({
      currentExerciseIndex: 0,
      timeLeft: 0,
      isRunning: false,
    }),
}));

import { create } from "zustand";
import { addAchievement } from "../api/get-workouts.api";

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
  nextExercise: async () => {
    set((state) => {
      const currentExercise = state.exercises[state.currentExerciseIndex];

      // Если текущего упражнения нет, ничего не делаем
      if (!currentExercise) {
        return {};
      }

      return {};
    });

    try {
      // Выполняем асинхронный вызов addAchievement
      const currentExercise =
        useExerciseStore.getState().exercises[
          useExerciseStore.getState().currentExerciseIndex
        ];
      await addAchievement(
        currentExercise.points,
        parseInt(currentExercise.colories, 10)
      );
    } catch (error) {
      console.error("Ошибка при добавлении достижения:", error);
    }

    // Переход к следующему упражнению после завершения запроса
    set((state) => {
      const nextIndex = state.currentExerciseIndex + 1;

      if (nextIndex < state.exercises.length) {
        return {
          currentExerciseIndex: nextIndex,
          timeLeft: state.exercises[nextIndex].durations,
          isRunning: false,
        };
      } else {
        return {
          isRunning: false,
          timeLeft: 0,
          currentExerciseIndex: state.exercises.length,
        };
      }
    });
  },
  tick: () =>
    set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 })),
  reset: () =>
    set({
      currentExerciseIndex: 0,
      timeLeft: 0,
      isRunning: false,
    }),
}));

import { create } from "zustand";
import { getSpecialWorkouts } from "../api/get-workouts.api";

interface Workout {
  name: string;
  description: string;
  points: number;
  colories: string;
  durations: number;
}

interface ExerciseStore {
  exercises: Workout[];
  currentExerciseIndex: number;
  timeLeft: number;
  isRunning: boolean;
  loading: boolean;
  setExercises: (exercises: Workout[]) => void;
  startExercise: () => void;
  nextExercise: () => void;
  tick: () => void;
  reset: () => void;
  fetchExercises: (workoutType: string) => void;
}

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: [],
  currentExerciseIndex: 0,
  timeLeft: 0,
  isRunning: false,
  loading: false,
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
        return {
          isRunning: false,
          timeLeft: 0,
          currentExerciseIndex: state.exercises.length,
        };
      }
    }),
  tick: () =>
    set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 })),
  reset: () =>
    set({
      exercises: [],
      currentExerciseIndex: 0,
      timeLeft: 0,
      isRunning: false,
      loading: false,
    }),
  fetchExercises: async (workoutType: string) => {
    set({ loading: true });
    try {
      const { workouts } = await getSpecialWorkouts(workoutType);

      const parsedWorkouts = workouts.map((workout) => ({
        ...workout,
        durations: parseInt(workout.durations, 10),
      }));

      set({ exercises: parsedWorkouts, loading: false });
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
      set({ loading: false });
    }
  },
}));

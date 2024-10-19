import { create } from "zustand";

interface Exercise {
  name: string;
  description: string;
  duration: number; // продолжительность в секундах
}

interface ExerciseState {
  exercises: Exercise[];
  currentExerciseIndex: number;
  timeLeft: number;
  isRunning: boolean;
  startExercise: () => void;
  nextExercise: () => void;
  tick: () => void;
  reset: () => void;
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  // Тестовый массив с упражнениями
  exercises: [
    {
      name: "Crunches",
      description:
        "Лягте на спину, согните колени, руки за головой. Поднимайте верхнюю часть туловища к коленям, напрягая пресс.",
      duration: 2,
    },
    {
      name: "Push-Ups",
      description:
        "Примите упор лёжа. Опускайтесь, сгибая руки, пока грудь почти не коснётся пола, затем поднимайтесь, выпрямляя руки.",
      duration: 3,
    },
    {
      name: "Plank",
      description:
        "Удерживайте тело в прямой линии от головы до пят, опираясь на предплечья и пальцы ног. Держите пресс напряжённым.",
      duration: 2,
    },
  ],
  currentExerciseIndex: 0,
  timeLeft: 0,
  isRunning: false,

  startExercise: () => {
    const { exercises, currentExerciseIndex } = get();
    const currentExercise = exercises[currentExerciseIndex];
    set({ timeLeft: currentExercise.duration, isRunning: true });
  },

  nextExercise: () => {
    const { currentExerciseIndex, exercises } = get();
    if (currentExerciseIndex < exercises.length - 1) {
      set({
        currentExerciseIndex: currentExerciseIndex + 1,
        timeLeft: exercises[currentExerciseIndex + 1].duration,
        isRunning: false,
      });
    } else {
      // Завершаем тренировку
      set({
        isRunning: false,
        timeLeft: 0,
        currentExerciseIndex: exercises.length,
      });
    }
  },

  tick: () => {
    const { timeLeft, isRunning, nextExercise } = get();
    if (isRunning && timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
    } else if (isRunning && timeLeft === 0) {
      nextExercise();
    }
  },

  reset: () => set({ currentExerciseIndex: 0, timeLeft: 0, isRunning: false }),
}));

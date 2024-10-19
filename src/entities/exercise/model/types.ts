// Интерфейс для описания структуры одного упражнения
export interface Workout {
  name: string;
  description: string;
  points: number;
  colories: string;
  durations: string;
}

// Интерфейс для описания ответа от сервера
export interface GetWorkoutsResponse {
  workouts: Workout[];
}

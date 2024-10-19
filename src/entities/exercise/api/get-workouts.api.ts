import { apiClient } from "../../../shared/api/apiClient";
import { GetWorkoutsResponse } from "../model/types";

// Функция для получения списка тренировок
export const getWorkouts = async (): Promise<GetWorkoutsResponse> => {
  try {
    // Отправляем GET-запрос на конечную точку /user/get-workouts
    const response = await apiClient.get<GetWorkoutsResponse>(
      "/user/get-workouts"
    );

    // Возвращаем данные из ответа
    return response.data;
  } catch (error) {
    // Логируем ошибку, если запрос не удался
    console.error("Ошибка при получении тренировок:", error);
    throw error;
  }
};

export const addAchievement = async (points: number, colories: number) => {
  try {
    const response = await apiClient.post("/user/add-achievement", {
      points: points, // Преобразуем в строку, чтобы соответствовать требуемому формату
      colories: colories, // Преобразуем в строку, чтобы соответствовать требуемому формату
    });

    console.log({ points, colories });

    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении достижения:", error);
    throw error;
  }
};

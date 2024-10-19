import { apiClient } from "../../../shared/api/apiClient";

// Функция для получения списка тренировок
export const getWorkouts = async () => {
  try {
    // Отправляем GET-запрос на конечную точку /user/get-workouts
    const response = await apiClient.get("/user/get-workouts");

    // Возвращаем данные из ответа
    return response.data;
  } catch (error) {
    // Логируем ошибку, если запрос не удался
    console.error("Ошибка при получении тренировок:", error);
    throw error;
  }
};

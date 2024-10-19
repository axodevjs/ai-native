import { apiClient } from "../../../../shared/api/apiClient";
import {
  LoginUserDto,
  LoginUserRdo,
  RegisterUserDto,
  RegisterUserRdo,
} from "./auth.dto";

export const login = async (data: LoginUserDto): Promise<LoginUserRdo> => {
  try {
    const result = await apiClient.post<LoginUserRdo>("/user/login", data);
    return result.data;
  } catch (error: any) {
    if (error.response) {
      // Сервер вернул ответ с ошибкой
      console.error("Ошибка запроса:", error.response.data);
      console.error("Статус код:", error.response.status);
      console.error("Заголовки:", error.response.headers);
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error("Ошибка запроса, ответа не получено:", error.request);
    } else {
      // Другие ошибки
      console.error("Произошла ошибка:", error.message);
    }
    throw error; // Повторно выбрасываем ошибку, чтобы она могла быть обработана выше
  }
};

export const registerUser = async (
  data: RegisterUserDto
): Promise<RegisterUserRdo> => {
  try {
    const result = await apiClient.post<RegisterUserRdo>(
      "/user/register",
      data
    );
    console.log("result", result);
    return result.data;
  } catch (error: any) {
    if (error.response) {
      // Сервер вернул ответ с ошибкой
      console.error("Ошибка запроса:", error.response.data);
      console.error("Статус код:", error.response.status);
      console.error("Заголовки:", error.response.headers);
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error("Ошибка запроса, ответа не получено:", error.request);
    } else {
      // Другие ошибки
      console.error("Произошла ошибка:", error.message);
    }
    throw error; // Повторно выбрасываем ошибку, чтобы она могла быть обработана выше
  }
};

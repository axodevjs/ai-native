// Интерфейс для регистрации пользователя (Data Transfer Object)
export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  age: number;
  height: number;
  weight: number;
}

// Интерфейс для описания пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  level: number | null;
  points: number | null;
}

// Интерфейс для ответа сервера при успешной регистрации (Response Data Object)
export interface RegisterUserRdo {
  message: string;
  user: User;
}

// Интерфейс для входа пользователя (Data Transfer Object)
export interface LoginUserDto {
  email: string;
  password: string;
}

// Интерфейс для ответа сервера при успешном входе (Response Data Object)
export interface LoginUserRdo {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

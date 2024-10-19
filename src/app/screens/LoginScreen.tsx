import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { LoginForm } from "../../widgets/login-form";
import { login } from "../entities/auth/api/auth.api";
import { useAuthStore } from "../entities/auth/model/use-auth-store";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const formSubmitRef = useRef<() => void>(() => {}); // Сохраняем ссылку на функцию отправки формы

  // Обработчик успешной отправки формы
  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      console.log("Данные формы:", data);
      const loginResponse = await login(data);
      setToken(loginResponse.accessToken);
      console.log(loginResponse);
      setIsLoading(false);
      // Выполнить навигацию или другие действия после успешного входа
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <QuestionLayout
      title="Вход в систему"
      buttonDisabled={isLoading}
      onBack={() => navigation.goBack()}
      onContinue={() => formSubmitRef.current()} // Вызываем сохранённую функцию отправки формы
      continueText="Войти"
    >
      <LoginForm
        onSubmit={handleSubmit}
        setSubmitFunction={(submitFn) => {
          formSubmitRef.current = submitFn;
        }}
      />
    </QuestionLayout>
  );
};

export default LoginScreen;

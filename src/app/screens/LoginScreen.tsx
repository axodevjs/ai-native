import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import { IUserData } from "../../shared/hooks/useUserData";
import { LoginForm } from "../../widgets/login-form";
import { login } from "../entities/auth/api/auth.api";
import { useAuthStore } from "../entities/auth/model/use-auth-store";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setToken, setUserData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const formSubmitRef = useRef<() => void>(() => {}); // Сохраняем ссылку на функцию отправки формы

  // Обработчик успешной отправки формы
  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      console.log("Submitted form data:", formData);

      // Call the login function and get the response
      const loginResponse = await login(formData);
      console.log("Login Response:", loginResponse);

      // Destructure the response
      const { user, accessToken, refreshToken } = loginResponse;
      // Map the response to the IUserData structure
      const userData: IUserData = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: accessToken || null,
        },
      };

      // Save token and user data in the auth store
      await setToken(accessToken);
      await setUserData(userData);

      console.log("User data and token saved successfully:", userData);

      // Navigate to the Home screen
      navigation.navigate("Home" as never);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
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

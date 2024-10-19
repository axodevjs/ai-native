import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useOnboardingStore } from "../../features/onboarding/model/use-onboarding-store";
import { RegistrationForm } from "../../widgets/registration-form/ui/registration-form";
import { registerUser } from "../entities/auth/api/auth.api";
import { useAuthStore } from "../entities/auth/model/use-auth-store";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const { setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const formSubmitRef = useRef<() => void>(() => {}); // Сохраняем ссылку на функцию отправки формы
  const { age, height, weight } = useOnboardingStore();

  // Обработчик успешной отправки формы
  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      console.log("Данные формы:", data);
      const registerResponse = await registerUser({
        ...data,
        age,
        height,
        weight,
        passwordConfirmation: data.password,
      });
      console.log(registerResponse);
      setToken(registerResponse.accessToken);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <QuestionLayout
      title="Завершение регистрации"
      buttonDisabled={isLoading}
      onBack={() => navigation.goBack()}
      onContinue={() => formSubmitRef.current()} // Вызываем сохранённую функцию отправки формы
      continueText="Готово!"
    >
      <RegistrationForm
        onSubmit={handleSubmit}
        setSubmitFunction={(submitFn) => {
          formSubmitRef.current = submitFn;
        }}
      />
    </QuestionLayout>
  );
};

export default RegistrationScreen;

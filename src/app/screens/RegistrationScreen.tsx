import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { RegistrationForm } from "../../widgets/registration-form/ui/registration-form";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const formSubmitRef = useRef<() => void>(() => {}); // Сохраняем ссылку на функцию отправки формы

  // Обработчик успешной отправки формы
  const handleSubmit = (data: any) => {
    console.log("Данные формы:", data);
    // Логика перехода на следующий экран после успешной регистрации
    // navigation.navigate("NextScreen" as never); // Замените "NextScreen" на имя нужного экрана
  };

  return (
    <QuestionLayout
      title="Заполните поля"
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

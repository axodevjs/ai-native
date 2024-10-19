import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import Input from "../../../shared/ui/Input/Input";

// Схема валидации с использованием zod
const schema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

type FormData = z.infer<typeof schema>;

interface LoginFormProps {
  onSubmit: (data: FormData) => void;
  setSubmitFunction: (submitFn: () => void) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  setSubmitFunction,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Устанавливаем функцию отправки формы в родительском компоненте через setSubmitFunction
  useEffect(() => {
    setSubmitFunction(handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, setSubmitFunction]);

  return (
    <View className="w-full">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите ваш email"
            style={errors.email ? { borderColor: "#EBAFB0" } : {}}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            classNameContainer="mt-4"
            label="Пароль"
            type="password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите пароль"
            style={errors.password ? { borderColor: "#EBAFB0" } : {}}
          />
        )}
      />
    </View>
  );
};

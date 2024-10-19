import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";

export const useRegister = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const register = async () => {
    setLoading(true);

    const data = {
      email,
      username,
      password,
      passwordConfirmation,
    };

    try {
      const response = await axios.post(
        "https://ai-express-production-f8e8.up.railway.app/api/user/register",
        data
      );

      const { id, email, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          id,
          email,
          username,
          accessToken,
          refreshToken,
        })
      );

      Alert.alert("Успешно", "Регистрация завершена");

      navigation.navigate("Login" as never);
    } catch (error: any) {
      console.error("Ошибка при регистрации:", error.message);
      Alert.alert("Ошибка", "Ошибка при регистрации, проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    register,
  };
};

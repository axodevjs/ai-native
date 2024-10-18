import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const login = async () => {
    setLoading(true);

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://goida-fuck-them-all.up.railway.app/api/user/login",
        data
      );

      const { accessToken, refreshToken, userId, email } = response.data;

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          accessToken,
          refreshToken,
          userId,
          email,
        })
      );

      const userData = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
      };
      AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log(userData);

      navigation.navigate("Main" as never);
    } catch (error: any) {
      console.error("Ошибка при входе:", error.message);
      Alert.alert("Ошибка", "Ошибка при входе, проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    login,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { IUserData } from "./useUserData"; // Import IUserData interface

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
        "https://ai-express-production-f8e8.up.railway.app/api/user/login",
        data
      );

      const { accessToken, refreshToken, user } = response.data;

      // Create user data structure according to IUserData
      const userData: IUserData = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: accessToken,
          statuses: user.statuses || [], // Handle statuses if available
        },
      };

      // Save user data to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      console.log("data saved successfully", JSON.stringify(userData));

      // Navigate to Home screen
      navigation.navigate("Home" as never);
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

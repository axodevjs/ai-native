import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

interface IUserData {
  username: string | null;
  email: string | null;
  accessToken: string | null;
  id: number | null;
}

interface UserDataHookResult {
  userData: IUserData;
  isLoading: boolean;
  updateUserData: (newData: IUserData) => Promise<void>;
}

export const useUserData = (): UserDataHookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUserData>({
    username: null,
    email: null,
    accessToken: null,
    id: null,
  });

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const parsedData = data
        ? JSON.parse(data)
        : { username: null, email: null, accessToken: null, id: null };
      setUserData(parsedData);
    } catch (error) {
      console.error(
        "Ошибка при чтении данных пользователя из AsyncStorage",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const updateUserData = async (newData: IUserData) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem("userData", JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error(
        "Ошибка при сохранении данных пользователя в AsyncStorage",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, isLoading, updateUserData };
};

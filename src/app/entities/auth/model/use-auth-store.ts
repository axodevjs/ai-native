import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { IUserData } from "../../../../shared/hooks/useUserData"; // Import IUserData interface

interface IAuthStore {
  token: string | null | undefined;
  userData: any;
  setToken: (token: string | null) => void;
  setUserData: (data: IUserData | null) => Promise<void>;
  logout: () => Promise<void>;
  loadAuthData: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  token: undefined,
  userData: null,

  // Save token securely in SecureStore
  setToken: async (token) => {
    if (!token) {
      await SecureStore.deleteItemAsync("authToken");
      return set({ token: null });
    }
    await SecureStore.setItemAsync("authToken", token);
    set({ token });
  },

  // Save userData to AsyncStorage
  setUserData: async (data) => {
    if (!data) {
      await AsyncStorage.removeItem("userData");
      return set({ userData: null });
    }
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    console.log("data is here:", data);
    set({ userData: data });
  },

  // Logout: Clear token and userData
  logout: async () => {
    await SecureStore.deleteItemAsync("authToken");
    await AsyncStorage.removeItem("userData");
    set({ token: null, userData: null });
  },

  // Load token and userData from storage
  loadAuthData: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    set({ token, userData });
  },
}));

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { IUserData } from "../../../../shared/hooks/useUserData"; // Import IUserData interface

interface IAuthStore {
  token: string | null | undefined;
  userData: IUserData | null;
  setToken: (token: string | null) => Promise<void>;
  setUserData: (data: IUserData | null) => Promise<void>;
  logout: () => Promise<void>;
  loadAuthData: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  token: undefined,
  userData: null,

  // Save token securely in SecureStore
  setToken: async (token) => {
    if (!token) {
      await SecureStore.deleteItemAsync("authToken");
      set({ token: null });
    } else {
      await SecureStore.setItemAsync("authToken", token);
      set({ token });
    }
  },

  // Save userData to AsyncStorage
  setUserData: async (data) => {
    if (!data) {
      await AsyncStorage.removeItem("userData");
      set({ userData: null });
    } else {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      console.log("User data saved:", data);
      set({ userData: data });
    }
  },

  // Logout: Clear token and userData
  logout: async () => {
    await SecureStore.deleteItemAsync("authToken");
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("mealHistory");
    set({ token: null, userData: null });
  },

  // Load token and userData from storage
  loadAuthData: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    set({ token, userData });
  },

  // Load only the token from SecureStore
  loadToken: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      set({ token });
    } else {
      set({ token: null });
    }
  },
}));

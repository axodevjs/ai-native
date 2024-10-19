import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface IAuthStore {
  token: string | null | undefined;
  setToken: (token: string | null) => void;
  logout: () => void;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  token: undefined,
  loginPhone: null,

  setToken: async (token) => {
    if (!token) return set({ token: null });
    await SecureStore.setItemAsync("authToken", token);
    set({ token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("authToken");
    set({ token: null });
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      set({ token });
    }
  },
}));

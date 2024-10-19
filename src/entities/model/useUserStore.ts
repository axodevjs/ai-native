// src/store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  age: number | null;
  weight: number | null;
  height: number | null;
  setAge: (age: number) => void;
  setWeight: (weight: number) => void;
  setHeight: (height: number) => void;
}

// Create Zustand store
export const useUserStore = create<UserState>((set) => ({
  age: null,
  weight: null,
  height: null,
  setAge: (age) => set({ age }),
  setWeight: (weight) => set({ weight }),
  setHeight: (height) => set({ height }),
}));

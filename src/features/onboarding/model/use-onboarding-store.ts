import { create } from "zustand";

interface IOnboardingStore {
  age: number;
  height: number;
  weight: number;

  setAge: (age: number) => void;
  setHeight: (age: number) => void;
  setWeight: (age: number) => void;
}

export const useOnboardingStore = create<IOnboardingStore>((set) => ({
  age: 18,
  height: 180,
  weight: 80,

  setAge: (age) => {
    set({ age });
  },
  setHeight: (height) => {
    set({ height });
  },
  setWeight: (weight) => {
    set({ weight });
  },
}));

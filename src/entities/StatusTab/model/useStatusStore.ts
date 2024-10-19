// src/store/usePageStore.ts
import { create } from "zustand"; // Ensure correct import

interface StatusState {
  isVisible: boolean;
  status: string;
  icon: string;
  setIcon: (name: string) => void;
  setStatus: (string: string) => void;
  setStatusTabVisible: (visible: boolean) => void;
}

// Create the Zustand store
export const useStatusStore = create<StatusState>((set) => ({
  isVisible: false, // Default visibility state
  status: "Chill",
  icon: "bolt-lightning",
  setIcon: (name: string) => set(() => ({ icon: name })),
  setStatus: (string: string) => set(() => ({ status: string })),
  setStatusTabVisible: (visible: boolean) =>
    set(() => ({ isVisible: visible })),
}));

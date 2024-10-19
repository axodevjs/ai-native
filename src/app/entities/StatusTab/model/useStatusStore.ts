// src/store/usePageStore.ts
import { create } from "zustand"; // Ensure correct import

interface StatusState {
  isVisible: boolean;
  setStatusTabVisible: (visible: boolean) => void;
}

// Create the Zustand store
export const useStatusStore = create<StatusState>((set) => ({
  isVisible: false, // Default visibility state

  setStatusTabVisible: (visible: boolean) =>
    set(() => ({ isVisible: visible })),
}));

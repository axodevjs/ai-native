// src/store/usePageStore.ts
import { create } from "zustand"; // Ensure correct import

interface PageState {
  activePage: string;
  setActivePage: (page: string) => void;
}

// Create the Zustand store
export const usePageStore = create<PageState>((set) => ({
  activePage: "home", // Default active page
  setActivePage: (page) => set({ activePage: page }),
}));

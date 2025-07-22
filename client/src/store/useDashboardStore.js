import { create } from "zustand";
import useAuthStore from "./useAuthStore"; // Import the main auth store

const useDashboardStore = create((set) => ({
  // --- UI State ---
  isSidebarOpen: false,
  activePage: "Dashboard",

  // --- Actions for UI ---
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setActivePage: (page) => set({ activePage: page, isSidebarOpen: false }),

  // --- Delegated Logout Action ---
  // This logout function now calls the real logout function from our auth store.
  logout: () => {
    useAuthStore.getState().logout();
  },
}));

export default useDashboardStore;

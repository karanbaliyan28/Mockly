import { create } from "zustand";

const useDashboardStore = create((set) => ({
  isSidebarOpen: false,
  activePage: "Dashboard",
  user: {
    name: "Karan",
    avatarUrl: "https://placehold.co/40x40/6366f1/ffffff?text=K",
  },
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActivePage: (page) => set({ activePage: page, isSidebarOpen: false }), // Close sidebar on page change
  logout: () => {
    console.log("Logging out...");
    // In a real app, you would redirect to /login here
  },
}));

export default useDashboardStore;

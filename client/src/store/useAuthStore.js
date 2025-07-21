import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // For demonstration, we assume the user is logged in.
  // In a real app, this would be null initially and set after login.
  user: { name: 'Karan' },
  isAuthenticated: true,

  // The logout function clears user data and sets isAuthenticated to false.
  logout: () => {
    set({ user: null, isAuthenticated: false });
    // In a real app, you would also clear any tokens from localStorage/cookies here.
    console.log('User logged out');
  },

  // A dummy login function to simulate logging in
  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
  }
}));

export default useAuthStore;

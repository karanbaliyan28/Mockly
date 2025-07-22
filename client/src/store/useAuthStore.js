// import { create } from 'zustand';

// // Get user info from local storage if it exists
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const useAuthStore = create((set) => ({
//   // The user state is now initialized from local storage
//   user: userInfoFromStorage,

//   // isAuthenticated is now a derived value, not a separate state.
//   // This is safer because the auth status always matches the user data.
//   isAuthenticated: !!userInfoFromStorage,

//   // The logout function now clears local storage and resets the state.
//   logout: () => {
//     localStorage.removeItem('userInfo');
//     set({ user: null, isAuthenticated: false });
//     console.log('User logged out and session cleared.');
//   },
// }));





import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('userInfo'), // Check localStorage on init
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
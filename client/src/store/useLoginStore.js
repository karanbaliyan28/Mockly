import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore"; // Auth store ko import karein

export const useLoginStore = create((set, get) => ({
  userInput: {
    email: "",
    password: "",
  },
  loading: false,
  error: null,
  success: false,

  // Action to update a specific field in the userInput state
  setLoginInput: (field, value) => {
    set((state) => ({
      userInput: { ...state.userInput, [field]: value },
      error: null, // Clear error on new input
    }));
  },

  // Action to handle the entire login process
  loginUser: async () => {
    set({ loading: true, error: null, success: false });
    const { userInput, resetForm } = get();

    // --- Basic Validation ---
    if (!userInput.email || !userInput.password) {
      set({ loading: false, error: `Email and Password cannot be empty.` });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      set({ loading: false, error: "Please enter a valid email address." });
      return;
    }

    try {
      // --- START OF CHANGE ---
      // setTimeout ko real axios call se replace kiya gaya hai
      const response = await axios.post("/api/auth/login", userInput);

      // Successful login ke baad, auth store mein user data set karein
      const { user, token } = response.data; // Maan lijiye backend user aur token bhejta hai
      useAuthStore.getState().login(user); // Update global auth state

      // Agar token milta hai to use save karein (optional, but good practice)
      if (token) {
        localStorage.setItem("authToken", token);
      }
      // --- END OF CHANGE ---

      console.log("Login successful for:", user.email);
      set({ loading: false, success: true });

      // Reset the form after a short delay to show the success message
      setTimeout(() => {
        resetForm();
        // Ab user automatically dashboard par redirect ho jayega
        // kyunki ProtectedRoute isAuthenticated state ko check karega.
      }, 2000);
    } catch (apiError) {
      // Handle actual API errors
      const errorMessage =
        apiError.response?.data?.message ||
        "Invalid credentials. Please try again.";
      set({ loading: false, error: errorMessage });
    }
  },

  // Action to reset the form state
  resetForm: () => {
    set({
      userInput: { email: "", password: "" },
      loading: false,
      error: null,
      success: false,
    });
  },
}));

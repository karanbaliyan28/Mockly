import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore"; // Import your auth store

export const useLoginStore = create((set, get) => ({
  userInput: {
    email: "",
    password: "",
  },
  loading: false,
  error: null,
  success: false,

  setLoginInput: (field, value) => {
    set((state) => ({
      userInput: { ...state.userInput, [field]: value },
      error: null,
    }));
  },

  loginUser: async () => {
    set({ loading: true, error: null, success: false });
    const { userInput, resetForm } = get();

    // Basic Validation
    if (!userInput.email || !userInput.password) {
      set({ loading: false, error: "Email and Password cannot be empty." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      set({ loading: false, error: "Please enter a valid email address." });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        userInput,
        config
      );

      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // ✅ UPDATE AUTH STORE - This is what was missing!
      useAuthStore.getState().setAuthenticated(true);
      useAuthStore.getState().setUser(data); // If you have a setUser action

      console.log("Login successful. User info saved to local storage.");
      set({ loading: false, success: true });

      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message ||
        "Invalid email or password. Please try again.";
      set({ loading: false, error: errorMessage });
    }
  },

  resetForm: () => {
    set({
      userInput: { email: "", password: "" },
      loading: false,
      error: null,
      success: false,
    });
  },
}));

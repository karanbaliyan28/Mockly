import { create } from "zustand";
import axios from "axios";

// Assume your backend is running on the same server, or configure a base URL
// axios.defaults.baseURL = 'http://localhost:5000'; // Example for local development

const useSignupStore = create((set, get) => ({
  userInput: {
    username: "",
    fullName: "",
    email: "",
    graduationYear: "",
    password: "",
  },
  loading: false,
  error: null,
  success: false,

  setUserInput: (field, value) => {
    set((state) => ({
      userInput: { ...state.userInput, [field]: value },
      error: null, // Clear error on input
    }));
  },

  signupUser: async () => {
    set({ loading: true, error: null, success: false });
    const { userInput, resetForm } = get();

    // --- Validation (remains the same) ---
    for (const key in userInput) {
      if (!userInput[key]) {
        set({
          loading: false,
          error: `${key.replace(/([A-Z])/g, " $1")} cannot be empty.`,
        });
        return;
      }
    }

    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      set({ loading: false, error: "Please enter a valid email address." });
      return;
    }

    try {
      // --- START OF CHANGE ---
      // setTimeout ko real axios call se replace kiya gaya hai
      const response = await axios.post("/api/auth/signup", userInput);
      // --- END OF CHANGE ---

      console.log("Signup successful:", response.data); // Log the actual response from backend
      set({ loading: false, success: true });

      // Assuming you are using a library like react-hot-toast
      // toast.success("Signup successful!");

      setTimeout(() => {
        resetForm();
        // Optionally, redirect the user here
      }, 2000);
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || "An unexpected error occurred.";
      set({ loading: false, error: errorMessage });
    }
  },

  // 🔄 Reset Form
  resetForm: () => {
    set({
      userInput: {
        username: "",
        fullName: "",
        email: "",
        graduationYear: "",
        password: "",
      },
      loading: false,
      error: null,
      success: false,
    });
  },
}));

export default useSignupStore;

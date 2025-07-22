import { create } from "zustand";
import api from "../api/api"; // Import our new authenticated api client

const useSignupStore = create((set, get) => ({
  userInput: {
    // The backend doesn't use a 'username', so we can remove it for now
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

    // --- Validation ---
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
      // Use our configured 'api' client to make the request
      const { data } = await api.post("/auth/signup", userInput);

      // --- KEY CHANGE ---
      // On successful signup, automatically log the user in
      // by saving their info and token to local storage.
      localStorage.setItem("userInfo", JSON.stringify(data));

      console.log("Signup successful, user is now logged in:", data);
      set({ loading: false, success: true });

      setTimeout(() => {
        resetForm();
        // The app will now see the user as logged in and can redirect them.
      }, 2000);
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || "An unexpected error occurred.";
      set({ loading: false, error: errorMessage });
    }
  },

  resetForm: () => {
    set({
      userInput: {
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

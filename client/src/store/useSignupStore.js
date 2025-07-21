import {create} from 'zustand';
import axios from 'axios';

const useSignupStore = create((set, get) => ({
  userInput: {
    username: '',
    fullName: '',
    email: '',
    graduationYear: '',
    password: '',
  },
  loading: false,
  error: null,
  success: false,

  // ✅ Update a specific input field
  setUserInput: (field, value) => {
    set(state => ({
      userInput: { ...state.userInput, [field]: value },
      error: null, // Clear error on input
    }));
  },

  // ✅ Handle Signup Logic
  signupUser: async () => {
    set({ loading: true, error: null, success: false });
    const { userInput, resetForm } = get();

    // 🚨 Basic Validation
    for (const key in userInput) {
      if (!userInput[key]) {
        set({
          loading: false,
          error: `${key.replace(/([A-Z])/g, ' $1')} cannot be empty.`,
        });
        return;
      }
    }

    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      set({ loading: false, error: 'Please enter a valid email address.' });
      return;
    }

    try {
      // 🧪 Simulated API Call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Signup successful:', userInput);
      set({ loading: false, success: true });

      // Optional: show toast notification here
      // toast.success("Signup successful!");

      // 🧹 Reset form after success
      setTimeout(() => {
        resetForm();
      }, 2000);

    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || 'An unexpected error occurred.';
      set({ loading: false, error: errorMessage });
    }
  },

  // 🔄 Reset Form
  resetForm: () => {
    set({
      userInput: {
        username: '',
        fullName: '',
        email: '',
        graduationYear: '',
        password: '',
      },
      loading: false,
      error: null,
      success: false,
    });
  },
}));

export default useSignupStore;

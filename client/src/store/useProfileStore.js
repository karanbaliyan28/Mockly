import { create } from "zustand";
import api from "../api/api";

const useProfileStore = create((set, get) => ({
  profile: null,
  loading: true,
  isUpdating: false,
  isUploadingPhoto: false,
  error: null,
  success: false,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/user/profile");
      set({ profile: data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile.";
      set({ loading: false, error: errorMessage });
    }
  },

  setProfileField: (field, value) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, [field]: value } : null,
    }));
  },

  uploadProfilePicture: async (file) => {
    if (!file) return;
    set({ isUploadingPhoto: true, error: null, success: false });
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const { data } = await api.post("/user/profile/picture", formData);

      // --- THIS IS THE FIX ---
      // 1. Update the local storage so the whole app sees the new photo
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.photoURL = data.photoURL;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // 2. Update the local state for the profile page
      set((state) => ({
        profile: state.profile
          ? { ...state.profile, photoURL: data.photoURL }
          : { photoURL: data.photoURL },
        isUploadingPhoto: false,
        success: true,
      }));

      // Force a refresh of the auth store if needed, or simply reload
      window.dispatchEvent(new Event("storage")); // Notifies other tabs/stores of the change
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Photo upload failed.";
      set({ isUploadingPhoto: false, error: errorMessage });
    }
  },

  updateProfile: async () => {
    set({ isUpdating: true, error: null, success: false });
    const { profile } = get();
    // ... validation logic ...

    try {
      const { data } = await api.put("/user/profile", {
        fullName: profile.fullName,
        email: profile.email,
        graduationYear: profile.graduationYear,
      });

      // --- ALSO UPDATE LOCALSTORAGE HERE ---
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.fullName = data.fullName;
      userInfo.email = data.email;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      set({ isUpdating: false, success: true, profile: data });
      window.dispatchEvent(new Event("storage"));
    } catch (apiError) {
      // ... error handling
    }
  },
}));

export default useProfileStore;

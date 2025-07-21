import { create } from "zustand";
import axios from "axios";

const useProfileStore = create((set, get) => ({
  profile: null,
  loading: true,
  isUpdating: false,
  isUploadingPhoto: false, // <-- Naya state photo upload ke liye
  error: null,
  success: false,

  fetchProfile: async () => {
    set({ loading: true, profile: null });
    try {
      const response = await axios.get('/api/user/profile');
      set({ profile: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch profile." });
    }
  },

  setProfileField: (field, value) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, [field]: value } : null,
      error: null,
      success: false,
    }));
  },

  // --- NAYA FUNCTION PHOTO UPLOAD KE LIYE ---
  uploadProfilePicture: async (file) => {
    if (!file) return;

    set({ isUploadingPhoto: true });

    // Step 1: Immediate UI update for better UX
    // Hum file ka ek temporary local URL banakar turant photo preview dikha denge
    const localPhotoURL = URL.createObjectURL(file);
    set(state => ({
        profile: state.profile ? { ...state.profile, photoURL: localPhotoURL } : null,
    }));

    // Step 2: File ko backend par upload karein
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
        // API call ko simulate karein
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Photo uploaded successfully");
        // In a real app, the backend might return a new permanent URL.
        // For now, the local URL is enough for the demo.
        set({ isUploadingPhoto: false });
    } catch (error) {
        console.error("Photo upload failed:", error);
        // Agar fail hota hai to purani photo wapas dikha sakte hain (optional)
        set({ isUploadingPhoto: false });
    }
  },

  updateProfile: async () => {
    set({ isUpdating: true, error: null, success: false });
    const { profile } = get();

    if (!profile.fullName || !profile.email || !profile.graduationYear) {
      set({ isUpdating: false, error: "All fields are required." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(profile.email)) {
      set({ isUpdating: false, error: "Please enter a valid email address." });
      return;
    }

    try {
      const response = await axios.put('/api/user/profile', profile);
      console.log("Profile updated successfully:", response.data);
      set({ isUpdating: false, success: true });
    } catch (apiError) {
      const errorMessage = apiError.response?.data?.message || "Failed to update profile.";
      set({ isUpdating: false, error: errorMessage });
    }
  },

  resetStatus: () => {
    set({
      error: null,
      success: false,
      isUpdating: false,
    });
  },
}));

export default useProfileStore;

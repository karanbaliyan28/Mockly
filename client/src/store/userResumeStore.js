import { create } from "zustand";
import axios from "axios";

const useResumeStore = create((set, get) => ({
  file: null,
  error: null,
  success: false,
  isUploading: false,
  isAnalyzing: false,
  aiFeedback: null,

  handleFileSelect: (selectedFile) => {
    set({ error: null, success: false, aiFeedback: null });
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      set({ error: "Invalid file type. Please upload a PDF or DOCX file." });
      return;
    }

    set({ file: selectedFile });
    get().uploadFile(selectedFile);
  },

  uploadFile: async (fileToUpload) => {
    set({ isUploading: true });

    // FormData object banayein file ko send karne ke liye
    const formData = new FormData();
    formData.append("resume", fileToUpload); // 'resume' backend mein expected field name hai

    try {
      // --- START OF CHANGE ---
      // setTimeout ko real axios POST request se replace kiya gaya hai
      const response = await axios.post("/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // --- END OF CHANGE ---

      console.log("File uploaded:", response.data);
      set({ isUploading: false, success: true });
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || "File upload failed.";
      set({ isUploading: false, error: errorMessage });
    }
  },

  analyzeResume: async () => {
    set({ isAnalyzing: true, aiFeedback: null });
    const { file } = get();

    if (!file) {
      set({ isAnalyzing: false, error: "No file found to analyze." });
      return;
    }

    // File ko FormData mein daalein, ya fir pehle se uploaded file ki ID bhej sakte hain
    const formData = new FormData();
    formData.append("resume", file);

    try {
      // --- START OF CHANGE ---
      // setTimeout ko real axios POST request se replace kiya gaya hai
      const response = await axios.post("/api/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // --- END OF CHANGE ---

      set({ isAnalyzing: false, aiFeedback: response.data });
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || "AI analysis failed.";
      set({ isAnalyzing: false, error: errorMessage });
    }
  },

  removeFile: () => {
    set({
      file: null,
      error: null,
      success: false,
      isUploading: false,
      isAnalyzing: false,
      aiFeedback: null,
    });
  },
}));

export default useResumeStore;

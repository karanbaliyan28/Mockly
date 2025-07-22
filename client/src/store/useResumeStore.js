import { create } from "zustand";
import api from "../api/api"; // Assumes api already sends JWT token

const useResumeStore = create((set, get) => ({
  file: null,
  error: null,
  success: false,
  isUploading: false,
  uploadPath: "",

  // AI analysis
  isAnalyzing: false,
  analysisResult: null,

  handleFileSelect: (selectedFile) => {
    // Reset state before selecting new file
    set({
      file: null,
      error: null,
      success: false,
      uploadPath: "",
      analysisResult: null,
    });

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

    // Auto-upload
    get().uploadFile(selectedFile);
  },

  uploadFile: async (fileToUpload) => {
    set({ isUploading: true, analysisResult: null });

    const formData = new FormData();
    formData.append("resume", fileToUpload);

    try {
      const { data } = await api.post("/resume/upload", formData);
      set({
        isUploading: false,
        success: true,
        uploadPath: data.resumePath,
      });
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || "File upload failed.";
      set({ isUploading: false, error: errorMessage });
    }
  },

  analyzeResume: async () => {
    set({ isAnalyzing: true, error: null, analysisResult: null });

    try {
      const { data } = await api.post("/resume/analyze");
      set({ isAnalyzing: false, analysisResult: data });
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
      uploadPath: "",
      isAnalyzing: false,
      analysisResult: null,
    });
  },
}));

export default useResumeStore;

import { create } from "zustand";
import axios from "axios";

const useInterviewStore = create((set, get) => ({
  questions: [], // Questions ab backend se aayenge
  currentQuestionIndex: 0,
  userAnswer: "",
  aiFeedback: null,
  interviewState: "not_started", // 'not_started', 'in_progress', 'awaiting_feedback', 'finished'
  isLoadingNextQuestion: false,
  isProcessingAnswer: false,

  startInterview: async () => {
    set({ interviewState: 'loading', isLoadingNextQuestion: true }); // Start with a loading state
    try {
      // --- START OF CHANGE ---
      // Backend se interview questions fetch karein
      const response = await axios.get('/api/interview/start');
      // --- END OF CHANGE ---
      
      set({
        questions: response.data.questions, // Backend se aaye questions ko save karein
        interviewState: "in_progress",
        currentQuestionIndex: 0,
        userAnswer: "",
        aiFeedback: null,
        isLoadingNextQuestion: false,
      });
    } catch (error) {
        console.error("Failed to start interview:", error);
        set({ interviewState: 'error', isLoadingNextQuestion: false, error: "Could not start the interview. Please try again." });
    }
  },

  setUserAnswer: (answer) => {
    set({ userAnswer: answer });
  },

  submitAnswer: async () => {
    const { userAnswer, questions, currentQuestionIndex } = get();
    if (!userAnswer) return;

    set({ isProcessingAnswer: true, aiFeedback: null });

    try {
      // --- START OF CHANGE ---
      // User ka answer AI feedback ke liye backend ko bhejein
      const response = await axios.post('/api/interview/feedback', {
        question: questions[currentQuestionIndex],
        answer: userAnswer,
      });
      // --- END OF CHANGE ---

      set({
        isProcessingAnswer: false,
        interviewState: "awaiting_feedback",
        aiFeedback: response.data, // Backend se aaye real feedback ko save karein
      });

    } catch (apiError) {
        const errorMessage = apiError.response?.data?.message || "Failed to get AI feedback.";
        set({ isProcessingAnswer: false, error: errorMessage });
    }
  },

  getNextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    set({ isLoadingNextQuestion: true, aiFeedback: null, userAnswer: "" });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          interviewState: "in_progress",
          isLoadingNextQuestion: false,
        }));
      } else {
        set({ interviewState: "finished", isLoadingNextQuestion: false });
      }
    }, 1000); // Transition ke liye thoda delay rakha hai
  },

  skipQuestion: () => {
    get().getNextQuestion();
  },

  togglePause: () => {
    set((state) => ({
      interviewState:
        state.interviewState === "paused" ? "in_progress" : "paused",
    }));
  },

  endInterview: () => {
    set({ interviewState: "finished" });
  },
}));

export default useInterviewStore;

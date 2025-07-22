import { create } from "zustand";
import api from "../api/api"; // Authenticated API client

const useInterviewStore = create((set, get) => ({
  // --- Common Interview State ---
  role: "",
  interviewState: "not_started", // 'not_started', 'in_progress', 'finished', 'loading', 'error'
  loading: false,
  error: null,

  // --- For New Gemini-style Conversation Flow ---
  conversation: [], // [{ question, answer, feedback }]

  // --- For Old History + Fixed Question Flow ---
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  history: [],
  historyLoading: false,
  selectedInterview: null,
  selectedInterviewLoading: false,
  
  // --- Set Role ---
  setRole: (role) => set({ role }),

  // --- Fetch Interview History ---
  fetchInterviewById: async (id) => {
    set({ selectedInterviewLoading: true, error: null });
    try {
      const { data } = await api.get(`/interview/history/${id}`);
      set({ selectedInterview: data, selectedInterviewLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Could not fetch interview details.";
      set({ selectedInterviewLoading: false, error: errorMessage });
    }
  },
  fetchHistory: async () => {
    set({ historyLoading: true, error: null });
    try {
      const { data } = await api.get("/interview/history");
      set({ history: data, historyLoading: false });
    } catch (error) {
      console.error("Failed to fetch interview history:", error);
      const errorMessage =
        error.response?.data?.message || "Could not fetch history.";
      set({ historyLoading: false, error: errorMessage });
    }
  },

  // --- Start Conversational Interview (Gemini Style) ---
  startInterviewConversation: async () => {
    const { role } = get();
    set({ loading: true, error: null, conversation: [] });
    try {
      const { data } = await api.post("/interview/start", { role });
      set({
        conversation: [
          { question: data.firstQuestion, answer: "", feedback: "" },
        ],
        interviewState: "in_progress",
        loading: false,
      });
    } catch (error) {
      set({
        interviewState: "error",
        loading: false,
        error: "Could not start interview.",
      });
    }
  },

  submitAnswer: async (currentAnswer) => {
    const { role, conversation } = get();
    set({ loading: true });

    // Update last answer
    const updatedConversation = [...conversation];
    updatedConversation[conversation.length - 1].answer = currentAnswer;
    set({ conversation: updatedConversation });

    // Format for backend
    const apiHistory = updatedConversation.flatMap((turn) => [
      { role: "user", parts: [{ text: turn.question }] },
      { role: "model", parts: [{ text: turn.answer }] },
    ]);

    try {
      const { data } = await api.post("/interview/turn", {
        role,
        history: apiHistory,
      });

      const finalConversation = [...updatedConversation];
      finalConversation[conversation.length - 1].feedback = data.feedback;
      finalConversation.push({
        question: data.nextQuestion,
        answer: "",
        feedback: "",
      });

      set({ conversation: finalConversation, loading: false });
    } catch (error) {
      console.error("Error submitting answer:", error);
      set({ loading: false, error: "Error processing your answer." });
    }
  },

  // --- Start Static Question Interview (Old Style) ---
  startFixedInterview: async (role) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/interview/start", { role });
      set({
        questions: data.questions,
        userAnswers: Array(data.questions.length).fill(""),
        interviewState: "in_progress",
        currentQuestionIndex: 0,
        loading: false,
        role,
      });
    } catch (error) {
      console.error("Failed to start fixed interview:", error);
      set({
        loading: false,
        interviewState: "error",
        error: "Could not start the interview.",
      });
    }
  },

  setUserAnswer: (answer) => {
    const { currentQuestionIndex } = get();
    set((state) => {
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
      return { userAnswers: updatedAnswers };
    });
  },

  goToNextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      get().endInterview();
    }
  },

  endInterview: async () => {
    const { conversation, questions, userAnswers, role } = get();

    set({ interviewState: "finished", loading: true });

    // Support both modes
    const sessionData =
      conversation.length > 0
        ? {
            role,
            // --- THIS IS THE FIX ---
            // We filter the conversation to only include turns that have a valid answer.
            // This removes the final, unanswered question before saving.
            questions: conversation
              .filter(turn => turn.answer && turn.answer.trim() !== '')
              .map((turn) => ({
                questionText: turn.question,
                userAnswer: turn.answer,
                aiFeedback: turn.feedback || "Pending",
              })),
          }
        : {
            role,
            questions: questions.map((q, i) => ({
              questionText: q,
              userAnswer: userAnswers[i],
              aiFeedback: "Feedback will be generated later.",
            })),
          };

    try {
      await api.post("/interview/save", sessionData);
      console.log("Interview session saved successfully.");
      set({ loading: false });
    } catch (error) {
      console.error("Failed to save interview session:", error);
      set({ loading: false, error: "Could not save your session." });
    }
  },

  resetInterview: () => {
    set({
      role: "",
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      conversation: [],
      interviewState: "not_started",
      loading: false,
      error: null,
    });
  },
}));

export default useInterviewStore;
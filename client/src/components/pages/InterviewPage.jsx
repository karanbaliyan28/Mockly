import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useInterviewStore from "../../store/useInterviewStore";
import Button from "../../components/ui/Button";

// --- Icons ---
const MicIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SendIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparklesIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L9.65 9.65L3 12l6.65 2.35L12 21l2.35-6.65L21 12l-6.65-2.35L12 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- User Avatar Component ---
const UserAvatar = ({ user, size = "default" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-10 h-10",
  };

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name || "User"}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200 dark:border-gray-600`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0`}
    >
      <UserIcon className="w-1/2 h-1/2 text-white" />
    </div>
  );
};

// --- AI Avatar Component ---
const AIAvatar = ({ size = "default" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0`}
    >
      <SparklesIcon className="w-1/2 h-1/2 text-white" />
    </div>
  );
};

// --- Conversation Turn Component ---
const ConversationTurn = ({ turn, user }) => {
  return (
    <div className="space-y-4">
      {/* AI's Question */}
      <div className="flex gap-3 items-start">
        <AIAvatar />
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl rounded-tl-md shadow-sm max-w-[85%] lg:max-w-[75%]">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {turn.question}
          </p>
        </div>
      </div>

      {/* User's Answer */}
      {turn.answer && (
        <div className="flex gap-3 items-start flex-row-reverse">
          <UserAvatar user={user} />
          <div className="bg-blue-600 dark:bg-blue-700 p-4 rounded-2xl rounded-tr-md shadow-sm max-w-[85%] lg:max-w-[75%]">
            <p className="text-white leading-relaxed">{turn.answer}</p>
          </div>
        </div>
      )}

      {/* AI's Feedback */}
      {turn.feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 items-start ml-11"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800 max-w-[85%] lg:max-w-[75%]">
            <span className="font-medium text-amber-700 dark:text-amber-400">
              💡 Feedback:{" "}
            </span>
            <span>{turn.feedback}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const InterviewPage = () => {
  // Store selectors
  const interviewState = useInterviewStore((state) => state.interviewState);
  const loading = useInterviewStore((state) => state.loading);
  const error = useInterviewStore((state) => state.error);
  const conversation = useInterviewStore((state) => state.conversation);
  const role = useInterviewStore((state) => state.role);

  // Actions
  const setRole = useInterviewStore((state) => state.setRole);
  const startInterviewConversation = useInterviewStore(
    (state) => state.startInterviewConversation
  );
  const submitAnswer = useInterviewStore((state) => state.submitAnswer);
  const endInterview = useInterviewStore((state) => state.endInterview);

  const [currentAnswer, setCurrentAnswer] = useState("");
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Mock user data - replace with actual user data from your auth system
  const currentUser = {
    name: "John Doe",
    avatar: null, // Set to actual avatar URL if available
  };

  // Auto-scroll to bottom of chat container only
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  }, [currentAnswer]);

  const handleStart = () => {
    if (role) {
      startInterviewConversation();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAnswer.trim() && !loading) {
      submitAnswer(currentAnswer);
      setCurrentAnswer("");
    }
  };

  // --- Render different states ---

  if (interviewState === "not_started") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Start Interview</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Select a role to begin your mock interview session.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a Role...</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                </select>
              </div>

              <Button
                onClick={handleStart}
                disabled={!role || loading}
                className="w-full h-12 text-base font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Starting Interview...
                  </div>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (interviewState === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Preparing your interview...
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }

  if (interviewState === "error") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "We encountered an unexpected error. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (interviewState === "finished") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-green-500 text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-4">
            Interview Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Great job! Your interview session has been completed successfully.
          </p>
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Saving your results...
            </div>
          ) : (
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full"
            >
              View Results
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Active interview state - NO FULL SCREEN LAYOUT
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Fixed Header - Always visible */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Interview Session
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Role:{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {role}
              </span>
            </p>
          </div>
          <Button onClick={endInterview} variant="danger" size="sm">
            End Interview
          </Button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Scrollable Chat Container - Only this scrolls */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {conversation.length === 0 ? (
            <div className="text-center py-12">
              <AIAvatar size="lg" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                Ready to start your interview?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                I'll ask you questions about {role} role. Answer as best as you
                can!
              </p>
            </div>
          ) : (
            conversation.map((turn, index) => (
              <ConversationTurn key={index} turn={turn} user={currentUser} />
            ))
          )}
        </div>
      </div>

      {/* Fixed Input Area - Always visible */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder={
                    loading ? "AI is thinking..." : "Type your answer here..."
                  }
                  disabled={loading}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[60px] max-h-[120px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  rows={2}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !currentAnswer.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-4 rounded-xl transition-colors flex-shrink-0 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Press Enter to send • Shift + Enter for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;

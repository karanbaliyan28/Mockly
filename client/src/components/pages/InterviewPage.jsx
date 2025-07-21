import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useInterviewStore from "../../store/useInterviewStore";
import Button from "../../components/ui/Button"; // Assuming you have this
import { SkeletonCard } from "../../components/ui/Skeletons"; // Assuming you have this
import Header from "../layout/Header";

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

// Fixed ThumbsUpIcon with proper SVG path
const ThumbsUpIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Fixed ThumbsDownIcon with proper SVG path
const ThumbsDownIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PauseIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4h4v16H6zM14 4h4v16h-4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PlayIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m5 3 14 9-14 9V3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const SkipForwardIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m5 4 10 8-10 8V4zM19 5v14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const StopCircleIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M9 9h6v6H9z" fill="currentColor" />
  </svg>
);

// --- UI Sub-Components ---

const QuestionViewer = ({ question, questionNumber, totalQuestions }) => (
  <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-lg">
    <p className="text-sm font-medium text-indigo-400 mb-2">
      Question {questionNumber} of {totalQuestions}
    </p>
    <AnimatePresence mode="wait">
      <motion.h2
        key={question}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-white"
      >
        {question}
      </motion.h2>
    </AnimatePresence>
  </div>
);

const AnswerInput = () => {
  const {
    userAnswer,
    setUserAnswer,
    submitAnswer,
    isProcessingAnswer,
    interviewState,
  } = useInterviewStore();
  const isDisabled = isProcessingAnswer || interviewState !== "in_progress";

  return (
    <div className="relative">
      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={isDisabled}
        className="w-full h-40 p-4 pr-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-800 dark:text-slate-200 disabled:opacity-50"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button onClick={submitAnswer} disabled={isDisabled} className="!p-3">
          {isProcessingAnswer ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </Button>
        <Button variant="outline" disabled={isDisabled} className="!p-3">
          <MicIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const AIFeedback = () => {
  const { aiFeedback, getNextQuestion } = useInterviewStore();
  if (!aiFeedback) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20"
    >
      <h3 className="font-bold text-lg text-green-300">AI Feedback</h3>
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <p>
          <strong className="text-slate-300">Score:</strong>{" "}
          <span className="font-semibold text-white">
            {aiFeedback.score}/10
          </span>
        </p>
        <p>
          <strong className="text-slate-300">Clarity:</strong>{" "}
          <span className="font-semibold text-white">{aiFeedback.clarity}</span>
        </p>
        <p>
          <strong className="text-slate-300">Relevance:</strong>{" "}
          <span className="font-semibold text-white">
            {aiFeedback.relevance}
          </span>
        </p>
      </div>
      <p className="mt-4 text-slate-300 text-sm">
        <strong className="text-white">Suggestion:</strong>{" "}
        {aiFeedback.suggestion}
      </p>
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <Button variant="outline" className="!p-2">
            <ThumbsUpIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="!p-2">
            <ThumbsDownIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={getNextQuestion}>Next Question</Button>
      </div>
    </motion.div>
  );
};

const InterviewController = () => {
  const { interviewState, togglePause, skipQuestion, endInterview } =
    useInterviewStore();
  const isPaused = interviewState === "paused";

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        onClick={togglePause}
        className="!p-3 !rounded-full"
      >
        {isPaused ? (
          <PlayIcon className="w-5 h-5" />
        ) : (
          <PauseIcon className="w-5 h-5" />
        )}
      </Button>
      <Button
        variant="outline"
        onClick={skipQuestion}
        className="!p-3 !rounded-full"
      >
        <SkipForwardIcon className="w-5 h-5" />
      </Button>
      <Button
        variant="danger"
        onClick={endInterview}
        className="!p-3 !rounded-full bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
      >
        <StopCircleIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

const InterviewFinished = () => {
  const { startInterview } = useInterviewStore();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700"
    >
      <h2 className="text-3xl font-bold text-white">Interview Complete!</h2>
      <p className="mt-4 text-slate-300">
        Great job! You can view your full report in your Interview History.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <Button>View Full Report</Button>
        <Button variant="outline" onClick={startInterview}>
          Start Another Interview
        </Button>
      </div>
    </motion.div>
  );
};

const InterviewPage = () => {
  const {
    questions,
    currentQuestionIndex,
    interviewState,
    isLoadingNextQuestion,
    startInterview,
  } = useInterviewStore();

  useEffect(() => {
    startInterview();
  }, [startInterview]);

  // Add safety check for questions array and current index
  const currentQuestion =
    questions && questions.length > 0 && currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
      {/* <Header/> */}
      <div className="w-full max-w-3xl mx-auto">
        {interviewState === "finished" ? (
          <InterviewFinished />
        ) : (
          <div className="space-y-8">
            {isLoadingNextQuestion || !currentQuestion ? (
              <SkeletonCard />
            ) : (
              <QuestionViewer
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            )}

            {interviewState === "awaiting_feedback" ? (
              <AIFeedback />
            ) : (
              <AnswerInput />
            )}

            {interviewState !== "awaiting_feedback" && <InterviewController />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;

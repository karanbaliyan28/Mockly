import React from "react";
import { motion } from "framer-motion";
import { PageContent } from "../../components/ui/PageContent";

// --- Icons ---
const LightbulbIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18h6m-3-3v3m-3-13a6 6 0 0 1 6 0v2a6 6 0 0 1-6 0V5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15a3 3 0 0 1-3-3V9h6v3a3 3 0 0 1-3 3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TagIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const SavedFeedbackPage = () => {
  // Dummy data for demonstration
  const dummyFeedback = [
    {
      id: 1,
      question: "Tell me about a challenging project...",
      suggestion:
        "Could provide a more specific example to strengthen your answer.",
      tag: "STAR Method",
    },
    {
      id: 2,
      question: "What are your biggest weaknesses?",
      suggestion:
        "Frame your weakness in a positive light by showing how you are actively working on it.",
      tag: "Self-awareness",
    },
    {
      id: 3,
      question: "Why do you want to work here?",
      suggestion:
        "Mention specific company values or projects that align with your personal goals.",
      tag: "Company Research",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }, // Corrected y-value for animation
  };

  return (
    <PageContent title="Saved Feedback">
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Here are the key insights and suggestions you've saved from your past
        interviews.
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {dummyFeedback.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mt-1">
                <LightbulbIcon className="w-6 h-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  "{item.question}"
                </p>
                <p className="mt-2 font-medium text-slate-800 dark:text-white">
                  {item.suggestion}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-indigo-500 dark:text-indigo-400">
                  <TagIcon className="w-4 h-4" />
                  <span>{item.tag}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </PageContent>
  );
};

export default SavedFeedbackPage;

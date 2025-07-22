import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "../../store/useResumeStore";
import Button from "../../components/ui/Button";
import { PageContent } from "../../components/ui/PageContent";
import { SkeletonCard } from "../../components/ui/Skeletons";

// --- Icons (These are your components, unchanged) ---
const UploadCloudIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 16l-4-4-4 4m4-4v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const FileTextIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v6h6M16 13H8m8 4H8m4-8H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m9 11 3 3L22 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const XCircleIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m15 9-6 6m0-6 6 6"
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

const DragDropZone = () => {
  const { handleFileSelect, error } = useResumeStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };
  const onFileChange = (e) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={() => fileInputRef.current.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`w-full p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-slate-300 dark:border-slate-700 hover:border-indigo-400"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept=".pdf,.docx"
          className="hidden"
        />
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <UploadCloudIcon
            className={`w-8 h-8 transition-colors ${
              isDragging
                ? "text-indigo-500"
                : "text-slate-500 dark:text-slate-400"
            }`}
          />
        </div>
        <p className="font-semibold text-slate-700 dark:text-slate-200">
          <span className="text-indigo-500">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          PDF or DOCX (max. 5MB)
        </p>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-sm text-red-500 flex items-center gap-2"
          >
            <XCircleIcon className="w-4 h-4" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilePreview = () => {
  const { file, isUploading, success, removeFile, analyzeResume, isAnalyzing } =
    useResumeStore();
  if (!file) return null;
  const fileSize = (file.size / 1024).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col gap-4"
    >
      <div className="p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-lg">
            <FileTextIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {fileSize} KB
            </p>
          </div>
          <button
            onClick={removeFile}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <XCircleIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="mt-3">
          {isUploading && (
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-indigo-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Upload successful! Ready for analysis.</span>
            </div>
          )}
        </div>
      </div>
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={analyzeResume}
            className="w-full flex justify-center"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Analyze Resume with AI
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

const AIFeedbackDisplay = () => {
  const { isAnalyzing, analysisResult } = useResumeStore();

  if (isAnalyzing)
    return (
      <div className="mt-8">
        <SkeletonCard />
      </div>
    );
  if (!analysisResult) return null;

  // --- THIS IS THE FIX ---
  // The component is now updated to only display the data that our
  // current backend simulation provides ('summary' and 'analysis' stats).
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8"
    >
      <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-indigo-500" />
        AI Analysis Report
      </h3>
      <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div>
          <h4 className="font-semibold text-slate-700 dark:text-slate-200">
            Summary
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
            {analysisResult.summary}
          </p>
          <div className="text-xs mt-2 text-slate-400">
            (Pages: {analysisResult.analysis.pages}, Words:{" "}
            {analysisResult.analysis.words})
          </div>
        </div>
        {/* The sections for 'strengths' and 'improvements' that caused the crash are removed for now. */}
      </div>
    </motion.div>
  );
};

const ResumeUploaderPage = () => {
  const { file } = useResumeStore();
  return (
    <PageContent title="Resume Uploader">
      <div className="max-w-xl mx-auto">
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Upload your resume to get personalized feedback and tailored interview
          questions from our AI.
        </p>
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div key="preview" className="w-full">
              <FilePreview />
            </motion.div>
          ) : (
            <motion.div key="uploader" className="w-full">
              <DragDropZone />
            </motion.div>
          )}
        </AnimatePresence>
        <AIFeedbackDisplay />
      </div>
    </PageContent>
  );
};

export default ResumeUploaderPage;

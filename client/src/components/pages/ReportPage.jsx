import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useInterviewStore from "../../store/useInterviewStore";
import useAuthStore from "../../store/useAuthStore"; // We need this to get 
import {
  DownloadIcon,
  UserIcon,
  CalendarIcon,
  BriefcaseIcon,
} from "../../components/ui/Icons";

import api from "../../api/api"; // Import the authenticated api client

const ReportPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const {
    selectedInterview,
    selectedInterviewLoading,
    error,
    fetchInterviewById,
  } = useInterviewStore();

  useEffect(() => {
    if (id) {
      fetchInterviewById(id);
    }
  }, [id, fetchInterviewById]);

  // --- THIS IS THE FIX FOR THE DOWNLOAD ---
  const handleDownload = async () => {
    try {
      const response = await api.get(`/interview/history/${id}/download`, {
        responseType: "blob", // Important: tells axios to expect binary data
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Interview-Report-${id}.pdf`);

      // Append to the document, click, and then remove
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Failed to download PDF:", err);
      // You could show an error message to the user here
    }
  };

  if (selectedInterviewLoading)
    return <div className="text-center p-10">Loading Report...</div>;
  if (error)
    return <div className="text-red-500 text-center p-10">Error: {error}</div>;
  if (!selectedInterview)
    return <div className="text-center p-10">Report not found.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Interview Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            A detailed summary of your interview session.
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          Download PDF
        </button>
      </div>

      {/* --- DETAILS CARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <UserIcon className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Candidate
            </p>
            <p className="font-semibold text-slate-700 dark:text-white">
              {user?.fullName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
            <p className="font-semibold text-slate-700 dark:text-white">
              {selectedInterview.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
            <p className="font-semibold text-slate-700 dark:text-white">
              {new Date(selectedInterview.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* --- Q&A SECTION --- */}
      <div className="space-y-6">
        {selectedInterview.questions.map((turn, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden"
          >
            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-3">
                Question {index + 1}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {turn.questionText}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 border-t border-b border-slate-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-300">
                {turn.userAnswer}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5">
              <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                <strong>AI Feedback:</strong> {turn.aiFeedback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;

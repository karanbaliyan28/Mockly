import React, { useEffect, useState } from "react";
import useInterviewStore from "../../store/useInterviewStore";
import { Link } from "react-router-dom";
const InterviewHistoryPage = () => {
  const { history, historyLoading, error, fetchHistory } = useInterviewStore();
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchHistory();
    // fetchHistory is stable from zustand; no need to include it in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return "Invalid date";
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (historyLoading)
    return (
      <div className="text-lg font-medium">
        Loading your interview history...
      </div>
    );
  if (error)
    return <div className="text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        Interview History
      </h1>

      {history.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">
          You haven't completed any interviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((interview) => (
            <div
              key={interview._id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between md:items-center gap-3"
            >
              <div>
                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {interview.role}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Taken on: {formatDate(interview.createdAt)}
                </p>
              </div>
              <Link to={`/history/${interview._id}`}>
                <button className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded">
                  View Report
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* --- Report Preview --- */}
      {selectedReport && (
        <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-900 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Interview Report Preview
            </h2>
            <button
              onClick={() => setSelectedReport(null)}
              className="font-bold text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
          <pre className="bg-white dark:bg-black p-4 rounded-md text-sm text-left overflow-auto max-h-[500px]">
            <code>{JSON.stringify(selectedReport, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default InterviewHistoryPage;

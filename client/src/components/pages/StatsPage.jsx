import React from "react";
import { motion } from "framer-motion";
import { PageContent } from "../../components/ui/PageContent";

// --- Icons ---
const TrendingUpIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 6 23 6 23 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TargetIcon = (props) => (
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
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ClipboardListIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="2"
      width="8"
      height="4"
      rx="1"
      ry="1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11h4m-4 4h4m-8-4h.01v.01H8V11zm0 4h.01v.01H8V15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
    <div className="flex items-center gap-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-500" />
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const StatsPage = () => {
 
  const barChartData = [
    { month: "Jan", score: 7.5 },
    { month: "Feb", score: 8.0 },
    { month: "Mar", score: 7.8 },
    { month: "Apr", score: 8.5 },
    { month: "May", score: 8.9 },
    { month: "Jun", score: 9.2 },
  ];

  return (
    <PageContent title="Performance Stats">
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Visualize your progress and identify areas for improvement based on your
        interview history.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={ClipboardListIcon}
          title="Total Interviews"
          value="12"
        />
        <StatCard icon={TargetIcon} title="Average Score" value="8.4 / 10" />
        <StatCard
          icon={TrendingUpIcon}
          title="Highest Score"
          value="9.2 / 10"
        />
      </div>

      {/* Score Over Time Chart */}
      <div className="mt-8 bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
          Score Over Time
        </h3>
        <div className="flex items-end h-64 gap-4 border-l border-b border-slate-200 dark:border-slate-700 p-4">
          {barChartData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${data.score * 10}%`, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full bg-indigo-500 rounded-t-md flex items-end justify-center"
            >
              <span className="text-xs font-bold text-white -mb-5">
                {data.month}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContent>
  );
};

export default StatsPage;

import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import InterviewHistoryPage from "./InterviewHistoryPage";
import useDashboardStore from "../../store/userDashboardStore";
import { Icons } from "../../components/ui/Icons";
import { PageContent } from "../../components/ui/PageContent";
import SettingsPage from "./SettingsPage";
import { cn } from "../../utils/cn";
import ResumeUploaderPage from "./ResumeUploaderPage";
import InterviewPage from "./InterviewPage";
import SavedFeedbackPage from "./SavedFeedbackPage";
import StatsPage from "./StatsPage";
const pages = {
  Dashboard: () => <PageContent title="Dashboard" />,
  "Interview History": () => <InterviewHistoryPage />,
  "Saved Feedback": () => <SavedFeedbackPage />,
  "Resume Uploader": () => <ResumeUploaderPage />,
  "Start Interview": () => <InterviewPage />,
  Stats: () => <StatsPage />,
  Settings: () => <SettingsPage />,
};

// --- LAYOUT COMPONENTS ---
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, activePage, setActivePage } =
    useDashboardStore();

  const navItems = [
    { name: "Dashboard", icon: "Home" },
    { name: "Interview History", icon: "Clock" },
    { name: "Saved Feedback", icon: "BookOpen" },
    { name: "Resume Uploader", icon: "FileText" },
    { name: "Start Interview", icon: "Play" },
    { name: "Stats", icon: "BarChart3" },
    { name: "Settings", icon: "Settings" },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Icons.Home className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-slate-800 dark:text-white">
            IntellectHire
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Icons.X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8 flex-1 px-2 space-y-1">
        <LayoutGroup>
          {navItems.map((item) => {
            const Icon = Icons[item.icon];
            const isActive = activePage === item.name;

            if (!Icon) {
              console.error(
                `Icon "${item.icon}" not found in Icons object. Available icons:`,
                Object.keys(Icons)
              );
              // Return a fallback icon or skip this item
              return (
                <div
                  key={item.name}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500"
                >
                  <span>⚠️</span>
                  <span>{item.name} (Icon Missing)</span>
                </div>
              );
            }

            return (
              <motion.button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium relative",
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-indigo-500 rounded-lg"
                    style={{ borderRadius: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </motion.button>
            );
          })}
        </LayoutGroup>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-42 flex-shrink-0">
        <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function DashboardPage() {
  const { activePage } = useDashboardStore();
  const CurrentPage = pages[activePage];

  // Add error handling for missing pages
  if (!CurrentPage) {
    console.error(`Page "${activePage}" not found in pages object`);
    return <div>Page not found</div>;
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-100 dark:bg-slate-950">
      <Sidebar /> {/* fixed sidebar with width w-64 or w-40 */}
      <div className="flex-1 overflow-y-auto md:ml-64">
        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <CurrentPage key={activePage} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

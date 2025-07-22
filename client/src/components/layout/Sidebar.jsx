import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import useDashboardStore from '../../store/useDashboardStore';
import { Icons } from '../ui/Icons';
import { cn } from '../../utils/cn';

const navItems = [
    { name: "Dashboard", icon: "Home", path: "/dashboard" },
    { name: "Interview History", icon: "Clock", path: "/interviews" },
    { name: "Saved Feedback", icon: "BookOpen", path: "/saved-feedback" },
    { name: "Resume Uploader", icon: "FileText", path: "/resume-uploader" },
    { name: "Start Interview", icon: "Play", path: "/interview" },
    { name: "Stats", icon: "BarChart3", path: "/stats" },
];

const SidebarContent = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 flex items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Icons.Sparkles className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-slate-800 dark:text-white">
            IntellectHire
          </span>
        </Link>
      </div>
      <nav className="mt-8 flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = Icons[item.icon];
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          <SidebarContent />
        </div>
      </aside>
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
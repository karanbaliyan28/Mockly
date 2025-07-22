import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ---
import useAuthStore from "../../store/useAuthStore";

import useDashboardStore from "../../store/useDashboardStore";
import { useTheme } from "../../context/ThemeContext";

import {
  MenuIcon,
  LogOutIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon, 
} from "../../components/ui/Icons";

export const Topbar = ({ setIsSidebarOpen }) => {
  const { user } = useAuthStore();
  const { logout } = useDashboardStore(); // logout is handled by dashboard store
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsDropdownOpen(false); // --- CHANGE: Close dropdown on logout
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-600"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1" /> {/* Spacer */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? (
                    <MoonIcon className="h-5 w-5 text-slate-700" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2"
              >
                {/* --- CHANGE: Display user's profile picture --- */}
                {user?.photoURL ? (
                  <img
                    src={`http://localhost:5000/${user.photoURL}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-slate-500" />
                )}

                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  {/* --- CHANGE: Use user.fullName from the auth store --- */}
                  Welcome, {user?.fullName || "User"}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

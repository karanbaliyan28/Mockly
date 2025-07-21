
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import useAuthStore from "./store/useAuthStore";

// Pages
import SettingsPage from "./components/pages/SettingsPage";
import LandingPage from "./components/pages/LandingPage";
import SignupPage from "./components/pages/SignupPage";
import InterviewPage from "./components/pages/InterviewPage";
import LoginPage from "./components/pages/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./components/pages/DashboardPage";
import ResumeUploaderPage from "./components/pages/ResumeUploaderPage";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    // User ko /login page par bhej dein
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes inside Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Naya Interview Route (yeh DashboardLayout ke bahar hai full-screen experience ke liye) */}
          <Route
            path="/interview"
            element={
              <ProtectedRoute>
                <InterviewPage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/resume-uploader"
            element={
              <ProtectedRoute>
                <ResumeUploaderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

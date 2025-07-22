import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DashboardPage from "./components/pages/DashboardPage";
import InterviewHistoryPage from "./components/pages/InterviewHistoryPage";
import ReportPage from "./components/pages/ReportPage";
import ResumeUploaderPage from "./components/pages/ResumeUploaderPage";
import InterviewPage from "./components/pages/InterviewPage";
// --- ADD THESE IMPORTS ---
import StatsPage from "./components/pages/StatsPage";
import SavedFeedbackPage from "./components/pages/SavedFeedbackPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* --- Protected Routes with Shared Layout --- */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* All routes defined here will render INSIDE the DashboardLayout */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/interviews" element={<InterviewHistoryPage />} />
        <Route path="/history/:id" element={<ReportPage />} />
        <Route path="/resume-uploader" element={<ResumeUploaderPage />} />

        {/* --- ADD THESE ROUTES --- */}
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/saved-feedback" element={<SavedFeedbackPage />} />
      </Route>

      {/* --- Protected Route without the main layout (for full-screen) --- */}
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

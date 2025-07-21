import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/auth/SignupPage";

export default function App() {
  const [page, setPage] = useState('landing');

  const CurrentPage = () => {
    switch (page) {
      case 'signup':
        return <SignupPage setPage={setPage} />;
      case 'landing':
      default:
        return <LandingPage setPage={setPage} />;
    }
  };

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentPage />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

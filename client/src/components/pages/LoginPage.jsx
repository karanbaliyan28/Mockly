import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import LoginForm from "../auth/LoginForm";
import { useLoginStore } from "../../store/useLoginStore";
import useAuthStore from "../../store/useAuthStore"; // Import the main auth store
import Button from "../ui/Button";

export default function LoginPage() {
  const resetForm = useLoginStore((state) => state.resetForm);
  const navigate = useNavigate(); // Hook for navigation
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); //
  // This effect will run whenever the user's authentication status changes.
  useEffect(() => {
    if (isAuthenticated) {
      // If the user is authenticated, redirect them to the dashboard.
      // { replace: true } prevents them from going back to the login page.
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // This effect resets the form when the component first loads.
  // It remains unchanged.
  useEffect(() => {
    resetForm();
    return () => resetForm();
  }, [resetForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}

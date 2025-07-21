import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangleIcon, CheckCircleIcon } from "lucide-react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import useSignupStore from "../../store/useSignupStore";

const SignupForm = () => {
  const { userInput, setUserInput, signupUser, loading, error, success } =
    useSignupStore();

  const handleChange = (e) => {
    setUserInput(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        className="bg-white dark:bg-slate-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create your Account
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            to start your AI interview journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="username"
            label="Username"
            type="text"
            value={userInput.username}
            onChange={handleChange}
          />
          <FormInput
            id="fullName"
            label="Full Name"
            type="text"
            value={userInput.fullName}
            onChange={handleChange}
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={userInput.email}
            onChange={handleChange}
          />
          <FormInput
            id="graduationYear"
            label="Graduation Year"
            type="number"
            value={userInput.graduationYear}
            onChange={handleChange}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            value={userInput.password}
            onChange={handleChange}
          />

          <div className="h-12 pt-2">
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-2 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <AlertTriangleIcon className="h-4 w-4" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 p-2 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Signup successful! Welcome to Mockly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center"
              disabled={loading || success}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : success ? (
                <CheckCircleIcon className="h-6 w-6" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;

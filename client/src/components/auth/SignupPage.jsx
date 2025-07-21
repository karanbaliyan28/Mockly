import { useEffect } from "react";
import Button from "../ui/Button";
import SignupForm from "./SignupForm";
import useSignupStore from "../../store/useSignupStore";

const SignupPage = ({ setPage }) => {
  const resetForm = useSignupStore(state => state.resetForm);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Button variant="outline" onClick={() => setPage('landing')}>Back to Home</Button>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;

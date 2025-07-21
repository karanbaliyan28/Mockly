import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import Button from "../ui/Button";
import SignupForm from "../auth/SignupForm";
import useSignupStore from "../../store/useSignupStore";


const SignupPage = () => {
  const resetForm = useSignupStore((state) => state.resetForm);

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        {/* Button ko Link se wrap kiya gaya hai */}
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;

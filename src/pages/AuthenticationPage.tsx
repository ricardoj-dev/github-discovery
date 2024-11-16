import SignInForm from "../components/SignInForm";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { Toaster } from "react-hot-toast";

export default function AuthenticationPage() {
  const [isSignInPage, setIsSignInPage] = useState(true);

  const toggleSignInPage = () => {
    setIsSignInPage((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-5">GitHub Discovery</h1>

      {isSignInPage === true ? <SignInForm /> : <SignUpForm />}

      {isSignInPage === true ? (
        <>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <button
              className="text-blue-600 underline"
              onClick={toggleSignInPage}
            >
              Click here to sign up.
            </button>
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm">
            Have already an account?{" "}
            <span
              className="text-blue-600 underline"
              onClick={toggleSignInPage}
            >
              Click here to sign in.
            </span>
          </p>
        </>
      )}

      <Toaster position="top-center" />
    </div>
  );
}

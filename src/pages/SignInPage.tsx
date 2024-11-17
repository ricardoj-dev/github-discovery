import { Link, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignInForm from "../components/SignInForm";
import { useAuth } from "@/lib/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignInPage() {
  const { isAuthenticated, isLoadingUser } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/discovery" />;
  }

  if (!isAuthenticated && isLoadingUser) {
    return (
      <LoadingSpinner
        classesContainer="fixed top-0 left-0 w-full h-full flex-grow min-h-screen flex flex-col justify-items-center bg-gray-400 z-50"
        classesSpinner="border-black"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-5">GitHub Discovery</h1>

      <SignInForm />

      <p className="mt-2 text-sm">
        Don't have an account?{" "}
        <Link className="text-blue-600 underline" to={"/sign-up"}>
          Click here to sign up.
        </Link>
      </p>

      <Toaster position="top-center" />
    </div>
  );
}

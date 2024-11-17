import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-5">GitHub Discovery</h1>

      <SignUpForm />

      <p className="mt-2 text-sm">
        Have already an account?{" "}
        <Link className="text-blue-600 underline" to={"/sign-in"}>
          Click here to sign in.
        </Link>
      </p>

      <Toaster position="top-center" />
    </div>
  );
}

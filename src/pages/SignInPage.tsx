import { Link, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignInForm from '@/components/SignInForm';
import { useAuth } from '@/lib/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SignInPage() {
  const { isAuthenticated, isLoadingUser } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/discovery" />;
  }

  if (!isAuthenticated && isLoadingUser) {
    return <LoadingSpinner variant="overlay" size="large" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-5">GitHub Discovery</h1>

      <SignInForm />

      <p className="mt-2 text-sm">
        Don't have an account?{' '}
        <Link className="text-blue-600 underline" to={'/sign-up'}>
          Click here to sign up.
        </Link>
      </p>

      <Toaster position="top-center" />
    </div>
  );
}

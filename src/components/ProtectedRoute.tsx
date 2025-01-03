import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoadingUser } = useAuthStore();

  if (isLoadingUser) {
    return <LoadingSpinner variant="overlay" size="large" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;

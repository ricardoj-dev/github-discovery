import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/hooks";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

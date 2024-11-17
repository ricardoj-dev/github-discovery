import { useAuth } from "@/lib/hooks";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/discovery" />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default App;

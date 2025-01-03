import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Navigate to="/discovery" />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default App;

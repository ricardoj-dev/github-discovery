import React from "react";
import { Navigate } from "react-router-dom";

const App: React.FC = () => {
  // const isLoggedIn = false;
  const isLoggedIn = true;

  return isLoggedIn ? (
    <Navigate to="/discovery" />
  ) : (
    <Navigate to="/authentication" />
  );
};

export default App;

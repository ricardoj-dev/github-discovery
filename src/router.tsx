import { createBrowserRouter } from "react-router-dom";

import App from "./components/App.tsx";
import AuthenticationPage from "./pages/AuthenticationPage.tsx";
import DiscoveryPage from "./pages/DiscoveryPage.tsx";
import MyAccountPage from "./pages/MyAccountPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/authentication",
    element: <AuthenticationPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/discovery",
        element: <DiscoveryPage />,
      },
      {
        path: "/my-account",
        element: <MyAccountPage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';

import App from './components/App.tsx';
import DiscoveryPage from './pages/DiscoveryPage.tsx';
import MyAccountPage from './pages/MyAccountPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Layout from './components/Layout.tsx';
import SignInPage from './pages/SignInPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/discovery',
            element: <DiscoveryPage />,
          },
          {
            path: '/my-account',
            element: <MyAccountPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

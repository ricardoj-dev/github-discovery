import { useAuth } from '@/lib/hooks';
import { Toaster } from 'react-hot-toast';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-400 shadow-md text-white py-4 px-8 z-50">
      <nav className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to="/discovery">
            <h1 className="text-lg font-bold">GitHub Discovery</h1>
          </Link>
          <Link
            to="/discovery"
            className={`${
              location.pathname === '/discovery' ? 'underline' : null
            }`}
          >
            <h3 className="text-lg">Discovery</h3>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            to="/my-account"
            className={`${
              location.pathname === '/my-account' ? 'underline' : null
            }`}
          >
            <h3 className="text-lg">{user?.username}</h3>
          </Link>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

const Content = () => {
  return (
    <main className="p-8 mt-16">
      <Outlet />
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-400 shadow-md text-white p-4 text-center">
      All Rights Reserved ® GitHub Discovery 2024
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col">
        <Content />
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;

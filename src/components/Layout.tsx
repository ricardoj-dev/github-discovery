import React from "react";
import { Outlet, Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold">GitHub Discovery</h1>
        <div>
          <Link to="/discovery" className="mx-2">
            Discovery
          </Link>
          <Link to="/my-account" className="mx-2">
            My Account
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Content: React.FC = () => {
  return (
    <main className="flex-grow p-8">
      <Outlet />
    </main>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      All Rights Reserved ® Ricardo 2024
    </footer>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Layout;

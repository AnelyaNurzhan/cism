
import React from 'react';
import { Outlet } from "react-router-dom";
import { Navbar } from '../Navbar';
import { useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Hide extra UI on test pages
  const isTestPage = location.pathname.includes('/test/');
  
  return (
    <div className="min-h-screen bg-light-gray">
      {!isTestPage && <Navbar />}
      <main className={`container mx-auto p-4 md:p-8 ${!isTestPage ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

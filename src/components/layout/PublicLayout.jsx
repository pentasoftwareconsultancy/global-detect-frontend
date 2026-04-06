import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../public/Navbar';
import Footer from '../public/Footer';
import useResponsive from '../../hooks/useResponsive';

const PublicLayout = () => {
  const { isMobile } = useResponsive();
  const location = useLocation();

  const hideNavbar = ['/login', '/signup', '/otp'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default PublicLayout;
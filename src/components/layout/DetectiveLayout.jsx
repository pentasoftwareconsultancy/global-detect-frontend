import React from 'react';
import { Outlet } from 'react-router-dom';
import DetectiveNavbar from '../public/DetectiveNavbar';
import DetectiveSidbar from '../public/DetectiveSidbar';
import Footer from '../public/Footer';

const DetectiveLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DetectiveNavbar />
      <div className="flex">
        <DetectiveSidbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    <Footer />
    </div>
  );
};

export default DetectiveLayout;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DetectiveNavbar from '../public/DetectiveNavbar';
import DetectiveSidbar from '../public/DetectiveSidbar';
 
const DetectiveLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121F27]">
      <DetectiveNavbar onMenuClick={() => setSidebarOpen(o => !o)} />

      {/* Mobile overlay — closes sidebar on tap */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar wrapper — hidden off-screen on mobile, always visible on lg+ */}
      <div
        className={`fixed top-3 left-12 h-full z-40 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <DetectiveSidbar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content — offset by sidebar width on desktop only */}
      <main className="lg:ml-[235px] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DetectiveLayout;

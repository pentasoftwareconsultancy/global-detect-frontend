import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Bell, User, Settings, LogOut, Menu } from 'lucide-react';
import GlobalLogo from '../../assets/Global-logo.png';
import { ROUTES } from '../../core/constants/routes.constant';
import Footer from '../public/Footer';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile default closed
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: ROUTES.USER_DASHBOARD },
    { id: 'profile', label: 'Profile', icon: User, path: ROUTES.USER_PROFILE },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: ROUTES.USER_NOTIFICATION },
    { id: 'settings', label: 'Settings', icon: Settings, path: ROUTES.USER_SETTINGS },
  ];

  const isActive = (path) => location.pathname === path;
  const isRequestInvestigation = location.pathname === ROUTES.REQUEST_INVESTIGATION;

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex h-screen bg-[#0b1120] overflow-hidden">

      {/* OVERLAY (MOBILE) */}
      {sidebarOpen && !isRequestInvestigation && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      {!isRequestInvestigation && (
      <div
        className={`
          fixed lg:relative z-40 h-full 
          w-[260px] sm:w-[280px] 
          bg-[#111827] border-r border-white/10
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6 sm:p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <img src={GlobalLogo} alt="Logo" className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-white leading-tight">Universal Detective</h1>
              <p className="text-[10px] text-gray-400">PVT LTD</p>
            </div>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm sm:text-base ${
                    active ? 'bg-[#D92B3A] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button onClick={handleLogout} className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/10 transition-all text-sm sm:text-base">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col w-full">

        {/* NAVBAR */}
        <div className="bg-[#111827] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {!isRequestInvestigation && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg">
                <Menu size={22} />
              </button>
            )}

            <h2 className="text-white font-semibold text-sm sm:text-lg">
              Universal Detective
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-4">

            <button
              onClick={() => navigate(ROUTES.USER_NOTIFICATION)}
              className="relative text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => navigate(ROUTES.USER_PROFILE)}
              className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
            >
              <User size={18} />
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
          {!isRequestInvestigation && <div />}
        </div>

      </div>
    </div>
  );
};

export default UserLayout;
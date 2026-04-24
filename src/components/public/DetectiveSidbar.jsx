import React from 'react';
import { Home, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';

const DetectiveSidbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', route: ROUTES.DETECTIVE_DASHBOARD },
    { icon: User, label: 'Profile', route: ROUTES.DETECTIVE_PROFILE },
    { icon: Settings, label: 'Settings', route: ROUTES.DETECTIVE_SETTING },
  ];

  const isActive = (route) => location.pathname === route;

  return (
    <div className="
      w-full md:w-20 lg:w-64 
      bg-[#121F27] text-white 
      fixed md:sticky bottom-0 md:top-0 
      h-auto md:h-screen 
      flex md:flex-col 
      border-t md:border-t-0 md:border-r border-white/10
      z-50
    ">
      
      {/* Top Section */}
      <div className="p-2 md:p-4 lg:p-6 flex flex-row md:flex-col w-full justify-between md:justify-between h-full">
        
        {/* Menu Items */}
        <div className="flex md:flex-col w-full justify-around md:justify-start md:space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg text-center md:text-left transition-all w-full ${
                isActive(item.route)
                  ? 'bg-[#D92B3A] text-white shadow-md'
                  : 'text-gray-300 hover:bg-[#3a4651] hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs md:text-sm lg:text-base font-medium hidden sm:block md:block">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Logout Bottom */}
        <div className="hidden md:block pt-6">
  <button
    onClick={() => navigate('/login')}
    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#3a4651] hover:text-white rounded-lg transition-all"
  >
    <LogOut size={20} />
    <span className="font-medium hidden lg:block">Log out</span>
  </button>
</div>

      </div>
    </div>
  );
};

export default DetectiveSidbar;
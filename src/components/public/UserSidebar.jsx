// import React, { useState } from 'react';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { LayoutGrid, Bell, User, Settings, LogOut, Menu, Search, LayoutDashboard, X } from 'lucide-react';
// import GlobalLogo from '../../assets/Global-logo.png';
// import { ROUTES } from '../../core/constants/routes.constant';
// // import Footer from '../public/Footer';




// const SidebarLayout = () => {
//   const [open, setOpen] = useState(false);

//   // const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Read directly from localStorage to avoid DEV_MODE override in AuthContext
//   const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
//   const isLoggedIn = !!(storedUser && storedUser.token);
//   const userName = storedUser?.name || storedUser?.fullName || 'Profile name';

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: ROUTES.USER_DASHBOARD },
//     { id: 'profile', label: 'Profile', icon: User, path: ROUTES.USER_PROFILE },

//     { id: 'settings', label: 'Settings', icon: Settings, path: ROUTES.USER_SETTINGS },
//   ];

//   const isActive = (path) => location.pathname === path;
//   const isRequestInvestigation = location.pathname === ROUTES.REQUEST_INVESTIGATION;
//   const isUserDashboard = location.pathname === ROUTES.USER_DASHBOARD;

//   const handleLogout = () => {
//     navigate(ROUTES.LOGIN);
//   };


//   return (
//     <div className="flex h-screen bg-[#0b141c]">

//   {/* OVERLAY (Mobile) */}
//   {open && (
//     <div
//       className="fixed inset-0 bg-black/50 z-40 md:hidden"
//       onClick={() => setOpen(false)}
//     />
//   )}

//   {/* SIDEBAR */}
//   <div
//     className={`fixed md:static top-4 left-4 bottom-4 w-56 sm:w-60 
//     bg-[#1c2b33] text-white z-50 
//     rounded-2xl shadow-xl border border-white/10
//     transform transition-transform duration-300
//     ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//   >

//     {/* CLOSE (Mobile) */}
//     <div className="flex justify-end md:hidden p-4">
//       <X onClick={() => setOpen(false)} className="cursor-pointer" />
//     </div>

//     {/* CONTENT */}
//     <div className="flex flex-col h-full p-4">

//       {/* MENU (Scrollable) */}
//       <div className="flex-1 overflow-y-auto space-y-4 pr-1">

//         <div className="flex items-center gap-3 bg-red-500 px-4 py-2 rounded-lg cursor-pointer">
//           <LayoutDashboard size={18} />
//           <span>Dashboard</span>
//         </div>

//         <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
//           <User size={18} />
//           <span>Profile</span>
//         </div>

//         <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
//           <Settings size={18} />
//           <span>Settings</span>
//         </div>

//         <div className="pt-3 border-t border-white/10">
//         <div
//           onClick={handleLogout}
//           className="bg-[#2a3b44] px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#344954]"
//         >
//           <LogOut size={18} />
//           <span>Log out</span>  
//         </div>
//       </div>

//       </div>

//       {/* LOGOUT (ALWAYS VISIBLE) */}
      

//     </div>
//   </div>

 

// </div>
//   );
// };

// export default SidebarLayout;


import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Settings, LogOut, X } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: ROUTES.USER_DASHBOARD },
    { label: "Profile", icon: User, path: ROUTES.USER_PROFILE },
    { label: "Settings", icon: Settings, path: ROUTES.USER_SETTINGS },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed md:static top-4 left-4 bottom-4 mt-3 ml-2 mb-1
      w-52 sm:w-56 md:w-60 
      bg-[#1c2b33] text-white z-50 
      rounded-2xl shadow-xl border border-white/10
      transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Close (mobile) */}
      <div className="flex justify-end p-4 md:hidden">
        <X onClick={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col h-full p-4">

        {/* Menu */}
        <div className="flex-1 overflow-y-auto space-y-4">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
                ${isActive(item.path) ? "bg-red-500" : "hover:bg-white/10"}`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </div>
            );
          })}

        </div>

        {/* Logout */}
        <div className="pt-3 border-t border-white/10">
          <div
            onClick={() => navigate(ROUTES.LOGIN)}
            className="bg-[#2a3b44] px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#344954]"
          >
            <LogOut size={18} />
            <span className="text-sm">Log out</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserSidebar;
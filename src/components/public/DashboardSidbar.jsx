import React from "react";
import {
  FiGrid, FiFolder, FiUser, FiUsers,
  FiClock, FiFileText, FiSettings, FiLogOut,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { useAuth } from "../../core/contexts/AuthContext";
import GlobalLogo from "../../assets/Global-logo.png";

const DashboardSidbar = ({ role, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const mainMenu = [
    { name: "Dashboard",            path: ROUTES.ADMIN_DASHBOARD,            icon: FiGrid },
    { name: "Case Management",      path: ROUTES.ADMIN_ALL_CASE_MANAGEMENT,  icon: FiFolder },
    { name: "Detective Management", path: ROUTES.ADMIN_DETECTIVE_MANAGEMENT, icon: FiUser },
    { name: "User Management",      path: ROUTES.ADMIN_USER_MANAGEMENT,      icon: FiUsers },
    { name: "Activity History",     path: ROUTES.ADMIN_HISTORY,              icon: FiClock },
  ];

  const secondMenu = [
    { name: "Blogs",     path: ROUTES.ADMIN_BLOG,     icon: FiFileText },
    { name: "Profile",   path: ROUTES.ADMIN_PROFILE,  icon: FiUser },
    { name: "Settings",  path: ROUTES.ADMIN_SETTINGS, icon: FiSettings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleNav = (path) => {
    navigate(path);
    handleDrawerToggle && handleDrawerToggle();
  };

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <div
        onClick={() => handleNav(item.path)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
          active ? "bg-[#D92B3A]" : "hover:bg-white/5"
        }`}
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          active ? "bg-white/20" : "bg-white/10"
        }`}>
          <Icon size={14} />
        </div>
        <span className={`font-['Montserrat'] text-[13px] leading-5 tracking-normal truncate ${
          active ? "font-semibold text-white" : "font-normal text-[#CFCFCF]"
        }`}>
          {item.name}
        </span>
      </div>
    );
  };

  const Divider = () => <div className="h-px bg-white/10 mx-3 my-2" />;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* ── SIDEBAR CARD ── */}
      <div
        className={`
          fixed lg:static top-0 left-0 lg:left-auto
          w-[226px] flex-shrink-0
          bg-[#232E34] text-white z-50
          rounded-[32px] shadow-xl border border-white/10
          flex flex-col
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}
        `}
        style={{ margin: '8px 8px 8px 16px', height: 'calc(100vh - 90px)', overflow: 'hidden' }}
      >

        {/* ── LOGO ── */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3" style={{ borderBottom: '0.67px solid #FFFFFF1A' }}>
          <img
            src={GlobalLogo}
            alt="Logo"
            className="flex-shrink-0 rounded-full"
            style={{ width: '32px', height: '41px', objectFit: 'cover' }}
          />
          <div>
            <p className="font-['Montserrat'] font-bold text-[18px] leading-7 text-white">
              Universal<br />Detective
            </p>
          </div>
        </div>

        {/* ── MAIN MENU ── */}
        <div className="flex flex-col gap-0.5 px-3 pt-1" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          {mainMenu.map((item) => <NavItem key={item.path} item={item} />)}
        </div>

        {/* ── SECOND MENU ── */}
        <div className="flex flex-col gap-0.5 px-3" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          {secondMenu.map((item) => <NavItem key={item.path} item={item} />)}
        </div>

        {/* ── ADMIN PROFILE + LOGOUT ── */}
        <div className="px-4 pb-4 mt-auto flex flex-col gap-3" style={{ borderTop: '0.67px solid #FFFFFF1A', paddingTop: '12px' }}>

          {/* Admin info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF4959] flex items-center justify-center flex-shrink-0">
              <span className="font-['Montserrat'] font-bold text-sm text-white">A</span>
            </div>
            <div className="min-w-0">
              <p className="font-['Montserrat'] font-medium text-[14px] leading-5 text-white truncate">
                Admin Director
              </p>
              <p className="font-['Montserrat'] font-normal text-[11px] leading-4 text-[#9CA3AF] truncate">
                admin@detectiveagency.com
              </p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full h-9 rounded-md font-['Montserrat'] font-normal text-sm text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            style={{ border: '0.67px solid #FFFFFF1A' }}
          >
            <FiLogOut size={14} />
            Log out
          </button>

        </div>
      </div>
    </>
  );
};

export default DashboardSidbar;

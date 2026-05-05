import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";
import { useAuth } from "../../core/contexts/AuthContext";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: ROUTES.USER_DASHBOARD },
    { label: "Profile",   icon: User,            path: ROUTES.USER_PROFILE },
    { label: "Settings",  icon: Settings,         path: ROUTES.USER_SETTINGS },
  ];

  const isActive = (path) => location.pathname === path;
  const { logout } = useAuth();

  const handleNav = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div
      onMouseLeave={() => setSidebarOpen(false)}
      className={`
        fixed md:static top-4 left-2
        w-[200px] sm:w-[216px] md:w-[226px] flex-shrink-0
        bg-[#232E34] text-white z-50
        rounded-[32px] shadow-xl border border-white/10
        flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-[110%] md:translate-x-0"}
      `}
      style={{ margin: '8px 8px 8px 16px', height: 'calc(100vh - 90px)' }}
    >
      {/* ── MENU ITEMS ── */}
      <div className="flex-1 flex flex-col gap-1.5 px-5 pt-6 pb-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <div
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-colors ${
                active ? "bg-[#D92B3A]" : "hover:bg-white/5"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                active ? "bg-white/20" : "bg-white/10"
              }`}>
                <Icon size={15} />
              </div>
              <span className={`font-['Montserrat'] text-[17px] leading-[21px] tracking-normal ${
                active ? "font-semibold" : "font-normal"
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── LOGOUT ── */}
      <div className="px-5 pb-5">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 w-full h-[50px] rounded-[20px] cursor-pointer bg-[#33444E] hover:bg-[#3d5060] transition-colors"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
            <LogOut size={15} />
          </div>
          <span className="font-['Montserrat'] font-normal text-[17px] leading-[21px] tracking-normal">
            Log out
          </span>
        </div>
      </div>

    </div>
  );
};

export default UserSidebar;

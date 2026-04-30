
import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import {
  FiGrid,
  FiFolder,
  FiUser,
  FiUsers,
  FiClock,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { useAuth } from "../../core/contexts/AuthContext";

const drawerWidth = 260;

const DashboardSidbar = ({ role, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const isAdmin = role === "ADMIN";

  const handleLogout = async () => {
    await logout(); // Call backend API and clear storage
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const adminMenu = [
    { name: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: <FiGrid /> },
    {
      name: "Case Management",
      path: ROUTES.ADMIN_ALL_CASE_MANAGEMENT,
      icon: <FiFolder />,
    },
    {
      name: "Detective Management",
      path: ROUTES.ADMIN_DETECTIVE_MANAGEMENT,
      icon: <FiUser />,
    },
    {
      name: "User Management",
      path: ROUTES.ADMIN_USER_MANAGEMENT,
      icon: <FiUsers />,
    },
    { name: "Activity History", path: ROUTES.ADMIN_HISTORY, icon: <FiClock /> },
    { name: "Blogs", path: ROUTES.ADMIN_BLOG, icon: <FiFileText /> },
    { name: "Profile", path: ROUTES.ADMIN_PROFILE, icon: <FiUser /> },
    { name: "Settings", path: ROUTES.ADMIN_SETTINGS, icon: <FiSettings /> },
  ];

  const drawer = (
    <Box className="h-[calc(100vh-64px)] flex flex-col bg-gradient-to-b from-[#0B1220] to-[#060A13] text-white px-3 py-3">
      {/* 🔴 TOP (FIXED) */}
      <div>
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-[#590202] flex items-center justify-center">
            {/* ADD IMAGE HERE */}
          </div>
          <p className="font-semibold leading-5">
            Universal <br /> Detective
          </p>
        </div>

        <Divider sx={{ borderColor: "#1f2f3a" }} />
      </div>

      {/* 🔥 SCROLLABLE MENU */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1 custom-scroll">
        <List>
          {isAdmin &&
            adminMenu.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <ListItem key={index} disablePadding sx={{ px: 0 }}>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      handleDrawerToggle && handleDrawerToggle();
                    }}
                    className={`flex items-center gap-3 mb-2 w-full px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive ? "bg-[#F84555] text-white" : "text-[#CFCFCF] hover:bg-[#1a1a1a]"
    }
  `}
                  >
                    <span
                      className={`text-[18px] ${
                        isActive ? "text-white" : "text-[#CFCFCF]"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: isActive ? "#FFFFFF" : "#CFCFCF",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </div>
      {/* 🔻 BOTTOM */}
      <div className="mt-auto pt-4 pb-4">
        <Divider sx={{ borderColor: "#1f2f3a", mb: 2 }} />

        {/* PROFILE */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="w-10 h-10 rounded-full bg-[#FF4B5C] flex items-center justify-center font-semibold">
            A
          </div>

          <div>
            <p className="text-sm">Admin Director</p>
            <p className="text-xs text-[#909090]">admin@detectiveagency.com</p>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="mx-1 mb-2">
          <div 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 border border-[#1f2f3a] rounded-xl py-2.5 cursor-pointer hover:bg-[#1a1a1a] transition"
          >
            <FiLogOut />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            mt: "64px",
            height: "calc(100vh - 64px)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            mt: "64px",
            height: "calc(100vh - 64px)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSidbar;




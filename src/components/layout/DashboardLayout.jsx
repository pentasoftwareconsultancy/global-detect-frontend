import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import DashboardNavbar from "../public/DashboardNavbar";
import DashboardSidebar from "../public/DashboardSidbar";
import useResponsive from "../../hooks/useResponsive";

const drawerWidth = 260;

const DashboardLayout = ({ role, title, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRoleTitle = () => {
    switch (role) {
      case "USER":
        return "User Dashboard";
      case "DETECTIVE":
        return "Detective Dashboard";
      case "ADMIN":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", 
        overflow: "hidden", 
        backgroundColor: "#0d0d0d",
      }}
    >
      <CssBaseline />

      {/* 🔝 NAVBAR */}
      <DashboardNavbar
        title={title || getRoleTitle()}
        onMenuClick={handleDrawerToggle}
        role={role}
      />

      {/* 📌 SIDEBAR */}
      <DashboardSidebar
        role={role}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* 📄 MAIN CONTENT */}
      <Box
        component="main"
        className="no-scrollbar"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            sm: `calc(100% - ${drawerWidth}px)`,
          },

          mt: "70px", 

          height: "calc(100vh - 70px)", 
          overflowY: "auto",

          px: isMobile ? 1.5 : 3,
          py: isMobile ? 2 : 3,

          background: "linear-gradient(to bottom right, #0B1220, #060A13)",
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
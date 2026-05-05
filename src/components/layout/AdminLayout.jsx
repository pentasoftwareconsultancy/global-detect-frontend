import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import AdminNavbar from "../public/AdminNavbar";
import DashboardSidebar from "../public/DashboardSidbar";
import useResponsive from "../../hooks/useResponsive";

const drawerWidth = 260;

const AdminLayout = ({ role, title, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0b1120",
      }}
    >
      <CssBaseline />

      {/* NAVBAR */}
      <AdminNavbar onMenuClick={handleDrawerToggle} />

      {/* SIDEBAR + CONTENT */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <DashboardSidebar
          role={role}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          className="no-scrollbar"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: isMobile ? 1.5 : 3,
            py: isMobile ? 2 : 3,
            background: "linear-gradient(to bottom right, #0B1220, #060A13)",
          }}
        >
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
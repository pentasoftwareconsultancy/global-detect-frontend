import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";
import { ROUTES } from "../core/constants/routes.constant";

const PublicRoute = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  // Wait for auth load
  if (isLoading) return null;

  // If already logged in → redirect to dashboard
  if (isLoggedIn && user) {
    if (user.role === "admin")
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;

    if (user.role === "detective")
      return <Navigate to={ROUTES.DETECTIVE_DASHBOARD} replace />;

    if (user.role === "user")
      return <Navigate to={ROUTES.USER_DASHBOARD} replace />;

    return <Navigate to="/" replace />;
  }

  // Not logged in → allow access
  return <Outlet />;
};

export default PublicRoute;
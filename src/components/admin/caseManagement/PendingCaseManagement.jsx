import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

// Pending Cases lives inside AllCaseManagement under ?tab=pending
const PendingCaseManagement = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?tab=pending`, { replace: true });
  }, []);
  return null;
};

export default PendingCaseManagement;

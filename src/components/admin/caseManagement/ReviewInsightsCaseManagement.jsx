import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

// Review Insights lives inside AllCaseManagement under ?tab=review
const ReviewInsightsCaseManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const action = searchParams.get("action");
    const dest = action
      ? `${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?tab=review&action=${action}`
      : `${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?tab=review`;
    navigate(dest, { replace: true });
  }, []);
  return null;
};

export default ReviewInsightsCaseManagement;

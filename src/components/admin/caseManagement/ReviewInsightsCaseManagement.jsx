import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { casesData } from "./caseManagementData";
import { FiFileText } from "react-icons/fi";

const ReviewInsightsCaseManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "All Cases", path: "/all-cases" },
    { name: "Pending Cases", path: "/admin-pending-case-management" },
    { name: "Review Insights", path: "/admin-review-insights" },
  ];

  const insightsCases = casesData.filter(
    (item) => item.status === "Insights Submitted"
  );

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Case Management</h1>
        <p className="text-lightGray text-sm">Review submitted insights</p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`px-4 py-2 rounded-lg text-sm ${
              location.pathname === tab.path
                ? "bg-red"
                : "bg-[#1a1a1a] text-lightGray"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {insightsCases.map((item) => (
          <div
            key={item.id}
            className="bg-[#16232d] border border-[#1f2f3a] rounded-xl p-4 hover:border-[#2a3a45] transition"
          >
            <h3 className="font-semibold mb-2">{item.type}</h3>

            <p className="text-sm text-lightGray">Client: {item.client}</p>
            <p className="text-xs text-gray mb-3">
              Detective: {item.detective}
            </p>

            <div className="bg-[#0f1a1f] p-3 rounded-lg text-xs text-lightGray mb-3">
              {item.insight}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#1a1a1a] py-2 rounded-lg text-xs">
                View Details
              </button>

              <button className="flex-1 bg-red py-2 rounded-lg text-xs flex items-center justify-center gap-1">
                <FiFileText /> Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewInsightsCaseManagement;
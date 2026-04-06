import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { casesData } from "./caseManagementData";
import { getPriorityStyle } from "./caseUtils";

const PendingCaseManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pendingCases = casesData.filter(
    (item) => item.status === "Pending"
  );

  const tabs = [
    { name: "All Cases", path: "/all-cases" },
    { name: "Pending Cases", path: "/admin-pending-case-management" },
    { name: "Review Insights", path: "/admin-review-insights" },
  ];

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Case Management</h1>
        <p className="text-lightGray text-sm">Pending investigation cases</p>
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

      {/* TABLE */}
      <div className="bg-[#16232d] border border-[#1f2f3a] rounded-xl overflow-x-auto">
        <div className="min-w-[700px]">

          <div className="grid grid-cols-6 px-4 py-3 text-xs text-lightGray border-b border-[#1f2f3a]">
            <div>ID</div>
            <div>Client</div>
            <div>Type</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Detective</div>
          </div>

          {pendingCases.map((item) => (
            <div key={item.id} className="grid grid-cols-6 px-4 py-3 border-b border-[#1f2f3a] text-sm">
              <div>{item.id}</div>
              <div>{item.client}</div>
              <div>{item.type}</div>

              <div>
                <span className={`px-2 py-1 text-xs rounded ${getPriorityStyle(item.priority)}`}>
                  {item.priority}
                </span>
              </div>

              <div className="text-lightGray">{item.status}</div>
              <div className="text-lightGray">{item.detective || "Unassigned"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingCaseManagement;
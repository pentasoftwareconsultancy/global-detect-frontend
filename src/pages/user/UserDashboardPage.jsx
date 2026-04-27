import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { authService } from "../../core/services/auth.service";

const UserDashboardPage = () => {
  const navigate = useNavigate();

  const [investigations, setInvestigations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ ON LOAD
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [casesRes, statsRes] = await Promise.all([
        authService.getMyCases(),
        authService.getCaseStats(),
      ]);

      setInvestigations(casesRes?.data || []);
      setStats(statsRes?.data || {});
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CASE DETAILS (only when needed)
  const fetchCaseDetails = async (id) => {
    try {
      const res = await authService.getCaseDetails(id);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const activeCount = stats.activeCases || 0;
  const totalCount = stats.totalCases || investigations.length;
  // const totalCount = investigations.length;

  return (
    <div className="text-white montserrat w-full">

      {/* HEADER */}
      <h1 className="font-['Montserrat'] font-medium text-2xl leading-[21px] tracking-normal text-white mb-6">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8">

        <div className="dashboard-stats-container bg-[#2b3a42] border-white border-opacity-50 hover:border-opacity-100 transition" style={{minHeight: 'unset'}}>
          <p className="investigation-label">Active Investigations</p>
          <div className="stat-number-container bg-[rgba(217,43,58,0.48)]">{activeCount}</div>
        </div>

        {/* Total */}
        <div className="dashboard-stats-container bg-[#2b3a42] border-white border-opacity-50 hover:border-opacity-100 transition" style={{minHeight: 'unset'}}>
          <p className="investigation-label">Total Investigations</p>
          <div className="stat-number-container bg-[rgba(217,43,58,0.48)]">{totalCount}</div>
        </div>

        {/* Request Investigation */}
        <div
          onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl cursor-pointer p-3 flex flex-col justify-between transition hover:shadow-lg"
          style={{minHeight: 'unset'}}
        >
          <p className="investigation-label">Request investigation</p>
          <div className="flex items-center gap-2">
            <div className="request-investigation-icon">
              <Plus className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-white/80 hidden sm:block">Request your new investigation now</p>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="active-investigations-title" style={{ marginBottom: '24px' }}>
        Active Investigations
      </h2>

      {/* CARDS */}
     <div className="space-y-6">
  {Array.isArray(investigations) && investigations.length > 0 ? (
    investigations.map((item, index) => (
      <div key={item.id || index} className="investigation-card">

        {/* IMAGE */}
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.title || "No title"}
          className="investigation-image"
        />

        {/* CONTENT */}
        <div className="investigation-content">

          <div className="investigation-priority-case">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded">
                  {item.priority || "High"} Priority
                </span>
                <p className="text-[11px] text-gray-400">
                  Case ID: #{item.id || "N/A"}
                </p>
              </div>
              <h3 className="font-semibold text-white text-lg">
                {item.title || "No Title"}
              </h3>
            </div>

            <img
              src="https://i.pravatar.cc/32"
              alt="user"
              className="investigation-avatar"
            />
          </div>

          {/* PROGRESS */}
          <div className="investigation-progress">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-300">
                Investigation Progress
              </p>
              <p className="text-sm text-white font-semibold">
                {item.progress || 0}%
              </p>
            </div>

            <div className="bg-gray-600 h-2 rounded w-full">
              <div
                className="bg-red-500 h-2 rounded"
                style={{ width: `${item.progress || 0}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {item.status || "No status"}
            </p>
          </div>

          {/* FOOTER */}
          <div className="investigation-footer">
            <p className="text-xs text-gray-400">
              {item.daysRemaining || "N/A"}
            </p>

            <button
              onClick={() =>
                navigate(`${ROUTES.USER_DASHBOARD_DETAILS}/${item.id}`)
              }
              className="view-full-case-btn"
            >
              View Full Case
            </button>
          </div>
        </div>

        {/* FILES */}
        <div className="investigation-files">
          {Array.isArray(item.files) &&
            item.files.map((file, i) => (
              <div key={i} className="files-card">
                <div className="files-card-name">{file.name}</div>
                <div className="files-card-date">{file.date}</div>
              </div>
            ))}
        </div>

      </div>
    ))
  ) : (
    <p className="text-gray-400">No investigations found</p>
  )}
</div>
    </div>
  );
};

export default UserDashboardPage;
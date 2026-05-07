import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuFileText, LuActivity, LuUserCheck, LuClipboardList, LuClock, LuCircleCheck, LuSend, LuClipboardCheck, LuTriangleAlert, LuChartBar, LuTrendingUp } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import AdminDashboardIcon from "../../assets/admindashboard-icon.png";
import { ROUTES } from "../../core/constants/routes.constant";
import adminDashboardService from "../../core/services/adminDashboard.service";

/* ─────────────────────────────────────────────
   STAT CARD
   API-ready: just pass { title, value, subtitle, icon, iconBg }
───────────────────────────────────────────── */
const StatCard = ({ title, value, subtitle, icon, iconBg, iconColor }) => (
  <div className="bg-[#1A2832] border border-[#1f2f3a] rounded-2xl p-4 flex flex-col justify-between min-h-[140px] hover:border-[#2a3a45] transition-colors">
    <div className="flex items-start justify-between gap-2">
      <p className="font-['Montserrat'] font-medium text-[14px] leading-5 text-white">
        {title}
      </p>
      {/* Icon circle — 40x40, low-opacity bg, colored icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
    </div>
    <div className="mt-4 space-y-1.5">
      {/* value — replace with API data later */}
      <h2 className="font-['Montserrat'] font-bold text-[32px] leading-8 text-white">
        {value ?? '—'}
      </h2>
      <p className="font-['Montserrat'] font-normal text-[12px] leading-4 text-[#9CA3AF]">
        {subtitle}
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION HEADER
   Reusable for all cards
───────────────────────────────────────────── */
const SectionHeader = ({ title, subtitle, icon }) => (
  <div className="mb-4">
    <h2 className="font-['Montserrat'] font-medium text-base leading-4 text-[#F9FAFB] flex items-center gap-1.5">
      {icon && icon}
      {title}
    </h2>
    <p className="font-['Montserrat'] font-normal text-base leading-6 text-[#9CA3AF] mt-1">
      {subtitle}
    </p>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const modalRef = useRef(null);

  // State for dashboard data
  const [statistics, setStatistics] = useState({
    totalCases: '—',
    activeInvestigations: '—',
    pendingDetectiveKYC: '—',
    pendingReviews: '—',
    avgCompletionDays: '—',
    closedCases: '—',
  });

  const [caseStatusCounts, setCaseStatusCounts] = useState({
    newRequests: '—',
    assigned: '—',
    inProgress: '—',
    insightsSubmitted: '—',
    changesRequested: '—',
    completed: '—',
  });

  const [priorityAlerts, setPriorityAlerts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchDashboardData();
    }, 300000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Check cache first (valid for 2 minutes)
      const cachedData = sessionStorage.getItem('dashboardData');
      const cacheTimestamp = sessionStorage.getItem('dashboardDataTimestamp');
      
      if (cachedData && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < 120000) { // 2 minutes
          const parsed = JSON.parse(cachedData);
          setStatistics(parsed.statistics);
          setCaseStatusCounts(parsed.caseStatusCounts);
          setPriorityAlerts(parsed.priorityAlerts);
          setRecentActivity(parsed.recentActivity);
          setLoading(false);
          return;
        }
      }

      // Fetch all dashboard data in parallel
      const [statsRes, overviewRes, priorityRes, activityRes] = await Promise.all([
        adminDashboardService.getDashboardStatistics(),
        adminDashboardService.getCaseStatusOverview(),
        adminDashboardService.getPriorityCases(),
        adminDashboardService.getRecentActivity(),
      ]);

      // Update statistics
      if (statsRes.success) {
        setStatistics(statsRes.data);
      }

      // Update case status overview
      if (overviewRes.success) {
        setCaseStatusCounts(overviewRes.data);
      }

      // Update priority cases
      if (priorityRes.success) {
        setPriorityAlerts(priorityRes.data);
      }

      // Update recent activity
      if (activityRes.success) {
        setRecentActivity(activityRes.data);
      }

      // Cache the data
      const dataToCache = {
        statistics: statsRes.success ? statsRes.data : statistics,
        caseStatusCounts: overviewRes.success ? overviewRes.data : caseStatusCounts,
        priorityAlerts: priorityRes.success ? priorityRes.data : priorityAlerts,
        recentActivity: activityRes.success ? activityRes.data : recentActivity,
      };
      sessionStorage.setItem('dashboardData', JSON.stringify(dataToCache));
      sessionStorage.setItem('dashboardDataTimestamp', Date.now().toString());
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ── STATS DATA ── now using real API data
  const stats = [
    { title: "Total Cases",           value: statistics.totalCases,      subtitle: "All time",  icon: <LuFileText size={18} /> },
    { title: "Active Investigations", value: statistics.activeInvestigations,      subtitle: "Ongoing",   icon: <LuActivity size={18} /> },
    { title: "Pending Detective KYC", value: statistics.pendingDetectiveKYC,      subtitle: "Approvals", icon: <LuUserCheck size={18} /> },
    { title: "Pending Reviews",       value: statistics.pendingReviews,      subtitle: "To review", icon: <LuClipboardList size={18} /> },
    { title: "Avg Completion",        value: statistics.avgCompletionDays ? `${statistics.avgCompletionDays} days` : '—', subtitle: "Per case",  icon: <LuClock size={18} /> },
    { title: "Closed Cases",          value: statistics.closedCases,      subtitle: "Completed", icon: <LuCircleCheck size={18} /> },
  ];

  // ── CASE STATUS DATA ── now using real API data with navigation
  const caseStatuses = [
    { 
      name: "New Requests",       
      subtitle: "Awaiting assignment",  
      count: caseStatusCounts.newRequests, 
      iconColor: "#6A7282", 
      iconBg: "#6A72821A", 
      icon: <LuClock size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?tab=pending`)
    },
    { 
      name: "Assigned",           
      subtitle: "Detective assigned",   
      count: caseStatusCounts.assigned, 
      iconColor: "#2B7FFF", 
      iconBg: "#2B7FFF1A", 
      icon: <LuSend size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?status=assigned`)
    },
    { 
      name: "In Progress",        
      subtitle: "Active investigation", 
      count: caseStatusCounts.inProgress, 
      iconColor: "#A855F7", 
      iconBg: "#A855F71A", 
      icon: <LuActivity size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?status=in_progress`)
    },
    { 
      name: "Insights Submitted", 
      subtitle: "Pending review",       
      count: caseStatusCounts.insightsSubmitted, 
      iconColor: "#EAB308", 
      iconBg: "#EAB3081A", 
      icon: <LuClipboardCheck size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?tab=review`)
    },
    { 
      name: "Changes Requested",  
      subtitle: "Needs revision",       
      count: caseStatusCounts.changesRequested, 
      iconColor: "#F97316", 
      iconBg: "#F973161A", 
      icon: <LuTriangleAlert size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?status=changes_requested`)
    },
    { 
      name: "Completed",          
      subtitle: "Report delivered",     
      count: caseStatusCounts.completed, 
      iconColor: "#22C55E", 
      iconBg: "#22C55E1A", 
      icon: <LuCircleCheck size={14} />,
      onClick: () => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?status=completed`)
    },
  ];

  // ── QUICK ACTIONS ── tab query params ready for when pages implement tab switching
  const quickActions = [
    { label: "Assign Detective", icon: <LuSend size={16} />,          onClick: () => navigate(ROUTES.ADMIN_PENDING_CASE_MANAGEMENT) },
    { label: "Review Insight",   icon: <LuClipboardList size={16} />, onClick: () => navigate(ROUTES.ADMIN_REVIEW_INSIGHTS) },
    { label: "Approve KYC",      icon: <LuUserCheck size={16} />,     onClick: () => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT}?tab=Pending KYC`) },
    { label: "Create Report",    icon: <LuFileText size={16} />,      onClick: () => setShowReportModal(true) },
  ];

  return (
    <div className="bg-[#0b1120] min-h-screen p-4 sm:p-6 font-['Montserrat'] text-white">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <img src={AdminDashboardIcon} alt="Admin Dashboard" className="w-8 h-8 flex-shrink-0" />
            <h1 className="font-['Montserrat'] font-bold text-[30px] leading-9 tracking-[-0.75px] text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="font-['Montserrat'] font-normal text-[16px] leading-6 text-[#9CA3AF] ml-11">
            Overview of all cases, detectives, and investigations
          </p>
        </div>

        <button
          onClick={() => navigate(ROUTES.ADMIN_ALL_CASE_MANAGEMENT)}
          className="flex items-center justify-center gap-1.5 bg-[#D92B3A] hover:bg-[#b0222f] transition-colors text-white font-['Montserrat'] font-medium text-[14px] leading-5 rounded-[6px] px-4 h-9 flex-shrink-0 self-start sm:self-center"
        >
          View All Cases
          <FiArrowUpRight size={14} />
        </button>
      </div>

      {/* Show loading skeleton on first load */}
      {loading ? (
        <>
          {/* STATS GRID SKELETON */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#1A2832] border border-[#1f2f3a] rounded-2xl p-4 min-h-[140px] animate-pulse">
                <div className="h-4 bg-[#2a3a44] rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-[#2a3a44] rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-[#2a3a44] rounded w-2/3"></div>
              </div>
            ))}
          </div>

          {/* MAIN GRID SKELETON */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1A2832] rounded-xl p-5 h-[400px] animate-pulse">
              <div className="h-4 bg-[#2a3a44] rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-[#2a3a44] rounded"></div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A2832] rounded-xl p-5 h-[400px] animate-pulse">
              <div className="h-4 bg-[#2a3a44] rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-[#2a3a44] rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ── STATS GRID ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>

          {/* ── MAIN GRID: 2 cols on desktop, stacked on mobile ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '24px' }}>

        {/* LEFT: Case Status Overview */}
        <div
          className="bg-[#1A2832] rounded-[12px] p-5 flex flex-col"
          style={{ border: '0.67px solid #FFFFFF1A', minHeight: '400px' }}
        >
          <SectionHeader
            title="Case Status Overview"
            subtitle="Current distribution of cases across workflow stages"
            icon={<LuChartBar size={16} className="text-[#9CA3AF]" />}
          />
          <div className="flex flex-col flex-1" style={{ gap: '10px' }}>
            {caseStatuses.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between px-4 py-3 lg:py-0 rounded-xl transition-colors lg:flex-1 cursor-pointer hover:bg-[#1f2f3a]" 
                style={{ border: '0.67px solid #FFFFFF1A', minHeight: '60px' }}
                onClick={item.onClick}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <span style={{ color: item.iconColor }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-['Montserrat'] font-medium text-[16px] leading-6 text-[#F9FAFB]">
                      {item.name}
                    </p>
                    <p className="font-['Montserrat'] font-normal text-[12px] leading-5 text-[#9CA3AF]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-white flex-shrink-0">
                  <span className="font-['Montserrat'] font-normal text-[14px]">{item.count ?? '—'}</span>
                  <FiArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Quick Actions + Priority Alerts stacked */}
        <div className="flex flex-col" style={{ gap: '24px' }}>

          {/* Quick Actions */}
          <div
            className="bg-[#1A2832] rounded-[12px] flex flex-col"
            style={{ border: '0.67px solid #FFFFFF1A', padding: '24px 24.5px' }}
          >
            <div className="mb-4">
              <h2 className="font-['Montserrat'] font-medium text-[16px] leading-4 text-white flex items-center gap-1.5">
                <LuTrendingUp size={16} className="text-[#9CA3AF]" />
                Quick Actions
              </h2>
              <p className="font-['Montserrat'] font-normal text-[14px] leading-6 text-[#9CA3AF] mt-1">
                Common administrative tasks
              </p>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '10px' }}>
              {quickActions.map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center rounded-[6px] text-white hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ height: '78px', border: '0.67px solid #FFFFFF1A', backgroundColor: '#FFFFFF08', gap: '8px' }}
                >
                  <span style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </span>
                  <span className="font-['Montserrat'] font-medium text-[14px] leading-5 text-center">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Alerts */}
          <div
            className="bg-[#1A2832] rounded-[12px] flex flex-col"
            style={{ border: '0.67px solid #FFFFFF1A', borderTop: '0.67px solid #FF690033' }}
          >
            <div className="p-6 pb-4">
              <SectionHeader
                title="Priority & Alerts"
                subtitle="High priority cases and warnings"
                icon={<LuTriangleAlert className="text-yellow-400" size={16} />}
              />
            </div>
            <div className="flex flex-col px-6 pb-6" style={{ gap: '12px' }}>
              <div className="flex flex-col" style={{ gap: '8px' }}>
                {priorityAlerts.length === 0 ? (
                  <p className="text-[#9CA3AF] text-sm text-center py-4">No high priority cases at this time</p>
                ) : (
                  priorityAlerts.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-center px-4 hover:opacity-90 transition-opacity"
                      style={{
                        minHeight: '66.67px',
                        borderRadius: '8px',
                        border: '0.67px solid #FF690033',
                        backgroundColor: '#FF69000D',
                        padding: '12px 16px',
                      }}
                    >
                      <p className="font-['Montserrat'] font-medium text-[14px] leading-5 text-white">
                        {item.title}
                      </p>
                      <p className="font-['Montserrat'] font-normal text-[12px] leading-4 text-[#9CA3AF] mt-0.5">
                        {item.form_number} • {item.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => navigate(`${ROUTES.ADMIN_ALL_CASE_MANAGEMENT}?priority=high`)}
                className="w-full bg-transparent hover:bg-white/5 transition-colors font-['Montserrat'] font-medium text-[14px] leading-5 text-white"
                style={{ height: '36px', borderRadius: '6px', border: '0.67px solid #FFFFFF1A' }}
              >
                View All Priority Cases
              </button>
            </div>
          </div>

        </div>
      </div>
        </>
      )}

      {/* ── RECENT ACTIVITY ── API-ready: swap recentActivity array with API response */}
      <div
        className="bg-[#1A2832] rounded-[12px] mt-6 flex flex-col"
        style={{ border: '0.67px solid #FFFFFF1A' }}
      >
        <div className="px-6 pt-6 pb-4">
          <h2 className="font-['Montserrat'] font-medium text-[15px] leading-5 text-white flex items-center gap-1.5">
            <LuActivity size={16} className="text-[#9CA3AF]" />
            Recent Activity
          </h2>
          <p className="font-['Montserrat'] font-normal text-[12px] leading-4 text-[#9CA3AF] mt-1">
            Latest system updates and actions
          </p>
        </div>
        <div
          className="flex flex-col"
          style={{ gap: '0', padding: '0 20.67px 20px 20.67px' }}
        >
          {recentActivity.length === 0 ? (
            <p className="text-[#9CA3AF] text-sm text-center py-4">No recent activity</p>
          ) : (
            recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-4"
                style={{ borderBottom: '0.67px solid #FFFFFF1A' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#D92B3A] flex-shrink-0" />
                <div className="flex flex-col justify-center gap-0.5">
                  <p className="font-['Montserrat'] font-medium text-[16px] leading-6 text-white">
                    {item.title}
                  </p>
                  <p className="font-['Montserrat'] font-normal text-[14px] leading-5 text-[#9CA3AF]">
                    {item.description}
                  </p>
                  <p className="font-['Montserrat'] font-medium text-[12px] leading-4 text-white">
                    {item.user}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── GENERATE REPORT MODAL ── */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            onMouseLeave={() => setShowReportModal(false)}
            className="w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A2832] border border-[#22313d] rounded-xl p-6 relative"
          >
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <h2 className="font-['Montserrat'] font-semibold text-[18px] text-white mb-1">
              Generate Comprehensive Case Report
            </h2>
            <p className="font-['Montserrat'] font-normal text-[12px] text-[#9CA3AF] mb-6">
              Create a detailed investigation report with findings, evidence, and supporting documents
            </p>
            <div className="space-y-5">
              {[
                { label: "Executive Summary *",  placeholder: "Provide a high-level overview..." },
                { label: "Key Findings *",        placeholder: "• Finding 1..." },
                { label: "Evidence Collected",    placeholder: "Document all evidence..." },
                { label: "Recommendations",       placeholder: "" },
                { label: "Next Steps",            placeholder: "" },
                { label: "Conclusion *",          placeholder: "" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="font-['Montserrat'] font-medium text-[14px] text-white mb-2">{field.label}</p>
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm text-white placeholder-[#9CA3AF] outline-none resize-none"
                  />
                </div>
              ))}
              <div className="bg-[#1f2f3a] border border-[#2a3a44] rounded-lg p-4">
                <p className="font-['Montserrat'] font-medium text-[14px] text-white mb-2">Supporting Documents</p>
                <button className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white hover:bg-[#243643] transition">
                  Choose Files
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white font-['Montserrat'] font-medium hover:bg-[#243643] transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#D92B3A] hover:bg-[#b0222f] rounded-lg text-sm text-white font-['Montserrat'] font-medium transition">
                Generate & Send Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

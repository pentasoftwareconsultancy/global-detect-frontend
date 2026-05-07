import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';
import { LuSend } from "react-icons/lu";
import * as detectiveDashboardService from '../../core/services/detectiveDashboard.service';
import { toast } from 'react-toastify';


const DetectiveDashboardPage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [search, setSearch] = useState('');
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({
    totalInvestigations: 0,
    activeInvestigations: 0,
    adminChangesRequested: 0
  });
  const [loading, setLoading] = useState(true);
  const [casesLoading, setCasesLoading] = useState(false);
  const [adminFeedbackCount, setAdminFeedbackCount] = useState(0);

  // Add pulse animation style
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    fetchDashboardStats();
    
    // Poll for admin feedback every 30 seconds
    const pollInterval = setInterval(() => {
      fetchDashboardStats(true); // Silent refresh
    }, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  // Fetch assigned cases
  useEffect(() => {
    fetchAssignedCases();
  }, [statusFilter, priorityFilter, search]);

  const fetchDashboardStats = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const response = await detectiveDashboardService.getDashboardStats();
      if (response.success) {
        const newAdminChangesCount = response.data.adminChangesRequested;
        
        // Show notification if admin feedback count increased
        if (silent && adminFeedbackCount > 0 && newAdminChangesCount > adminFeedbackCount) {
          toast.info(`You have ${newAdminChangesCount - adminFeedbackCount} new admin feedback(s)!`, {
            autoClose: 5000,
            position: 'top-right'
          });
        }
        
        setStats(response.data);
        setAdminFeedbackCount(newAdminChangesCount);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      if (!silent) toast.error('Failed to load dashboard statistics');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchAssignedCases = async () => {
    setCasesLoading(true);
    try {
      const filters = {
        status: statusFilter !== 'All Status' ? statusFilter : undefined,
        priority: priorityFilter !== 'All Priority' ? priorityFilter : undefined,
        search: search || undefined,
        limit: 100 // Get all cases for now
      };

      const response = await detectiveDashboardService.getAssignedCases(filters);
      if (response.success) {
        setCases(response.data.cases || []);
      }
    } catch (error) {
      console.error('Error fetching assigned cases:', error);
      toast.error('Failed to load assigned cases');
    } finally {
      setCasesLoading(false);
    }
  };

  const filteredCases = cases;

  const selectCls = {
    background: '#1C2B35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    color: '#fff', fontSize: '13px', outline: 'none', cursor: 'pointer',
    padding: '7px 32px 7px 10px', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
  };


  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-5 md:px-8 py-4 sm:py-6 montserrat">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Card 1 */}
        <div style={{ borderRadius: '20px', border: '0.67px solid #F3F4F6', background: '#FFFFFF24', padding: '16px 20px' }}>
          <p className="text-gray-300 text-sm mb-3 font-medium">Total Investigations</p>
          <div style={{ background: '#D92B3A7A', borderRadius: '19px', width: '102px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '42px', fontWeight: '700', color: '#ffffff' }}>
              {loading ? '...' : String(stats.totalInvestigations).padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Card 2 */}
        <div style={{ borderRadius: '20px', border: '0.67px solid #F3F4F6', background: '#FFFFFF24', padding: '16px 20px' }}>
          <p className="text-gray-300 text-sm mb-3 font-medium">Active Investigation</p>
          <div style={{ background: '#D92B3A7A', borderRadius: '19px', width: '102px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '42px', fontWeight: '700', color: '#ffffff' }}>
              {loading ? '...' : String(stats.activeInvestigations).padStart(2, '0')}
            </span>
          </div>
        </div>
        {/* Card 3 */}
        <div style={{ borderRadius: '20px', border: '0.67px solid #FF4959', background: '#FF495918', padding: '16px 20px', position: 'relative' }}>
          {stats.adminChangesRequested > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px', 
              background: '#dc3545', 
              borderRadius: '50%', 
              width: '24px', 
              height: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '700',
              color: '#fff',
              animation: 'pulse 2s infinite'
            }}>
              {stats.adminChangesRequested}
            </div>
          )}
          <p className="text-red-400 text-sm font-medium mb-3">Admin Changes requested</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ background: '#D92B3A7A', borderRadius: '19px', width: '102px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '42px', fontWeight: '700', color: '#ffffff' }}>
                {loading ? '...' : String(stats.adminChangesRequested).padStart(2, '0')}
              </span>
            </div>
            <p className="text-xs text-gray-400 ">Require resubmission</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ borderRadius: '12px', border: '0.67px solid rgba(255,255,255,0.12)', background: '#1C2B35', padding: '20px 24px', marginBottom: '32px' }}>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-[#dc3545]" />
          <h2 className="text-base font-semibold text-white">Current Location</h2>
        </div>
        <p className="text-sm text-gray-300 mb-4">Your real-time location for case tracking</p>
        <div className="w-full overflow-hidden" style={{ borderRadius: '8px', height: 'clamp(200px, 40vw, 340px)' }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7589&layer=mapnik"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="Current Location Map"
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Lat: 40.7128 &nbsp; Lng: -74.0060 &nbsp; Last updated: 1/31/2026, 10:30:00 AM
        </p>
      </div>

      {/* Assigned Cases */}
      <div className="mb-8">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Assigned Cases</h2>
          <p className="text-sm text-gray-400">
            {casesLoading ? 'Loading...' : `${filteredCases.length} case${filteredCases.length !== 1 ? 's' : ''} assigned`}
          </p>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by case number, title, or client name..."
              className="bg-[#121F27] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm w-full focus:outline-none text-white placeholder:text-gray-400"
            />
          </div>
          <div className="relative flex items-center">
            <Filter size={13} className="absolute left-3 text-gray-400 pointer-events-none z-10" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...selectCls, paddingLeft: '28px' }}>
              <option>All Status</option>
              <option>Insights Submitted</option>
              <option>Report Ready</option>
              <option>In Progress</option>
            </select>
          </div>
          <div className="relative flex items-center">
            <Filter size={13} className="absolute left-3 text-gray-400 pointer-events-none z-10" />
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ ...selectCls, paddingLeft: '28px' }}>
              <option>All Priority</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {casesLoading ? (
            <p className="text-sm text-gray-400 col-span-2 text-center py-8">Loading cases...</p>
          ) : filteredCases.length === 0 ? (
            <p className="text-sm text-gray-400 col-span-2 text-center py-8">No cases assigned yet.</p>
          ) : filteredCases.map((caseItem) => (
            <div key={caseItem.id} style={{ background: '#1C2B35', borderRadius: '16px', padding: '20px', border: '0.67px solid rgba(255,255,255,0.12)' }}>

              {/* Title + badge */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <h3 className="text-base font-semibold text-white">{caseItem.title}</h3>
                <span style={{ 
                  background: caseItem.priority === 'Urgent' ? '#dc3545' : 
                              caseItem.priority === 'High' ? '#ff6b35' : 
                              caseItem.priority === 'Medium' ? '#ffa500' : '#6c757d',
                  borderRadius: '6px', 
                  padding: '2px 10px', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#fff', 
                  whiteSpace: 'nowrap' 
                }}>
                  {caseItem.priority}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-5 leading-relaxed">{caseItem.description}</p>

              {/* Client */}
              <div className="mb-1">
                <p className="text-xs text-gray-400 mb-0.5">Client:</p>
                <p className="text-sm font-semibold text-white">{caseItem.client}</p>
              </div>

              {/* Status + Admin Feedback inline */}
              <div className="flex items-end gap-8 mt-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status:</p>
                  <span style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#fff' }}>
                    {caseItem.status}
                  </span>
                </div>
                {caseItem.adminFeedback && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Admin Feedback:</p>
                    <span style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#fff' }}>
                      {caseItem.feedbackStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* Insights Submitted button */}
              {caseItem.insightsSubmittedAt && (
                <button className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-lg mb-3" style={{ background: '#dc3545' }}>
                  <LuSend size={14} /> Insights Submitted
                </button>
              )}

              {/* View Details */}
              <button onClick={() => navigate(ROUTES.DETECTIVE_CASE_DETAILS, { state: { caseId: caseItem.id } })} className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-lg" style={{ background: '#1e2d38', border: '1px solid rgba(255,255,255,0.1)' }}>
                <FileText size={14} /> View Details
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetectiveDashboardPage;
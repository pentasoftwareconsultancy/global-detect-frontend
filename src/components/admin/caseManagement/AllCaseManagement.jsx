import React, { useState, useMemo, useEffect } from "react";
import { casesData } from "./caseManagementData";
import { Eye, Search } from "lucide-react";
import { FiFileText, FiClock, FiClipboard } from "react-icons/fi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const CaseManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [priority, setPriority] = useState("All");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedDetective, setSelectedDetective] = useState("");
  const [dateSort, setDateSort] = useState("All");
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "pending") setActiveTab("pending");
    else if (tab === "review") setActiveTab("review");
    const action = searchParams.get("action");
    if (action === "generate-report") { setActiveTab("review"); setShowReportModal(true); }
  }, [searchParams]);

  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem("cases");
    return saved ? JSON.parse(saved) : casesData;
  });

  useEffect(() => {
    localStorage.setItem("cases", JSON.stringify(cases));
  }, [cases]);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setType("All");
    setPriority("All");
    setDateSort("All");
  };

  const detectivesList = [
    "Detective Emma Watson",
    "Detective James Bond",
    "Detective Olivia Martinez",
    "Detective Suraj Mohite",
    "Detective Aditi Jadhav",
    "Detective Aditya Pathak",
    "Detective Rutuja Katke",
  ];

  const assignedDetectives = cases
    .map((c) => c.detective)
    .filter(Boolean);

  const availableDetectives = detectivesList.filter(
    (d) => !assignedDetectives.includes(d)
  );



  const tabs = [
    { name: "All Cases",      key: "all",     icon: <FiFileText size={14} /> },
    { name: "Pending Cases",  key: "pending", icon: <FiClock size={14} /> },
    { name: "Review Insights",key: "review",  icon: <FiClipboard size={14} /> },
  ];

  // 🔥 DATA CONTROL
  const filteredData = useMemo(() => {
    let data = [...cases];

    if (activeTab === "pending") {
      data = data.filter((i) => i.status === "Pending");
    }

    if (search) {
      data = data.filter((item) =>
        `${item.id} ${item.client} ${item.type}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (status !== "All") data = data.filter((i) => i.status === status);
    if (type !== "All") data = data.filter((i) => i.type === type);

    //  FIX PRIORITY (case-insensitive)
    if (priority !== "All") {
      data = data.filter(
        (i) => i.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    //  ADD DATE SORTING (MISSING PART)
    if (dateSort === "Newest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateSort === "Oldest") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return data;
  }, [cases,activeTab, search, status, type, priority, dateSort]);

  return (
    <div className="text-white bg-[#121F27] p-4 font-monserrat ">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <FiFileText className="text-red-500" />
          Case Management
        </h1>
        <p className="text-lightGray text-sm">
          View and manage all investigation cases
        </p>
      </div>

      {/* TABS */}
      <div className="mb-6">
        <div className="inline-flex gap-1 p-1 border border-[#2a3a44] rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 text-sm rounded-lg font-medium transition whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-red text-white"
                  : "text-[#8FA3B0] hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ FILTERS ONLY FOR ALL TAB */}
      {activeTab === "all" && (
        <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5 mb-6">

          {/* 🔍 SEARCH */}
          <div className="flex items-center bg-[#1A2832] px-4 py-3 rounded-lg border border-white/50 mb-5">
            <Search size={16} className="text-[#8FA3B0]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by case number, title, client name, or investigation type..."
              className="ml-3 bg-transparent outline-none w-full text-sm text-white placeholder-[#8FA3B0]"
            />
          </div>

          {/* 🔽 FILTER GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">

            {/* STATUS */}
            <div>
              <p className="text-sm text-white mb-2">Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option value="All">All Status</option>
                <option>Pending</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Insights Submitted</option>
                <option>Report Ready</option>

              </select>
            </div>

            {/* TYPE */}
            <div>
              <p className="text-sm text-white mb-2">Investigation Type</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Types</option>
                <option>Financial Fraud</option>
                <option>Cybercrime</option>
                <option>Homicide</option>
                <option>Insurance Fraud</option>
                <option>Missing Person</option>
                <option>Workplace Investigation</option>
                <option>Corporate Investigation</option>
                <option>Personal Investigation</option>
                <option>Asset Recovery</option>
                <option>Background Check</option>

              </select>
            </div>

            {/* PRIORITY */}
            <div>
              <p className="text-sm text-white mb-2">Priority</p>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Priorities</option>
                <option>urgent</option>
                <option>high</option>
                <option>medium</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <p className="text-sm text-white mb-2">Date Range</p>
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Time</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-5">
            <p className="text-sm text-[#8FA3B0]">
              Showing {filteredData.length} of {cases.length} cases
            </p>

            <button
              onClick={clearFilters}
              className="text-sm px-4 py-2 border border-white/50 rounded-lg text-white hover:bg-[#22313d]"
            >
              Clear Filters
            </button>
          </div>
        </div>

      )}

      {/* ✅ TABLE (changes based on tab) */}
      {activeTab !== "review" && (
        <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-4">

          {/* TITLE */}
          <div className="mb-4">
            <p className="text-sm text-white">Cases</p>
            <p className="text-xs text-[#8FA3B0]">
              All investigation cases with details and actions
            </p>
          </div>

          {/* HEADER */}
          <div className="bg-[#243643] rounded-lg border border-[#22313d] px-4 py-3 text-xs text-[#8FA3B0] grid grid-cols-[120px_260px_220px_120px_140px_180px_100px]">
            <div>Case ID</div>
            <div>Client Name</div>
            <div>Investigation Type</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Detective</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          <div className="mt-3 space-y-3">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[120px_260px_220px_120px_140px_180px_100px] items-center px-4 py-4 bg-[#1A2832] border border-[#243642] rounded-xl hover:bg-[#1b2a35] transition"
              >
                {/* CASE ID */}
                <div>
                  <p className="text-white text-sm">{item.id}</p>
                  <p className="text-xs text-[#8FA3B0] mt-1">{item.date}</p>
                </div>

                {/* CLIENT */}
                <div>
                  <p className="text-white text-sm">{item.client}</p>
                  <p className="text-xs text-[#8FA3B0]">
                    {item.description || `${item.type} Investigation`}
                  </p>
                </div>

                {/* TYPE */}
                <div className="text-sm">{item.type}</div>

                {/* PRIORITY */}
                <div>
                  <span className={`
            px-2 py-1 text-xs rounded-md font-medium
            ${item.priority === "urgent" && "bg-red-500/20 text-red-400"}
            ${item.priority === "high" && "bg-orange-500/20 text-orange-400"}
            ${item.priority === "medium" && "bg-yellow-400/20 text-yellow-300"}
          `}>
                    {item.priority}
                  </span>
                </div>

                {/* STATUS */}
                <div>
                  <span className={`
            px-3 py-1 text-xs rounded-md font-medium
            ${item.status === "Pending" && "bg-gray-500/20 text-gray-300"}
            ${item.status === "Assigned" && "bg-blue-500/20 text-blue-300"}
            ${item.status === "In Progress" && "bg-purple-500/20 text-purple-300"}
            ${item.status === "Insights Submitted" && "bg-yellow-400/20 text-yellow-300"}
            ${item.status === "Report Ready" && "bg-green-500/20 text-green-300"}
          `}>
                    {item.status}
                  </span>
                </div>

                {/* DETECTIVE */}
                <div className="text-sm text-[#8FA3B0] italic">
                  {item.detective || "Unassigned"}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">

                  {/* ✅ SHOW ONLY IF UNASSIGNED */}
                  {(!item.detective || item.detective === "Unassigned") && (
                    <button
                      onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_UNASSIGNED, { state: { caseItem: item } })}
                      className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      <MdOutlinePersonAddAlt />
                    </button>
                  )}

                  <button
                    onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: item } })}
                    className="p-2 border border-[#243642] rounded-lg hover:bg-[#223544]">
                    <Eye size={16} />
                  </button>


                </div>
              </div>
            ))}
          </div>
        </div>

      )}

      {/* ✅ REVIEW TAB CONTENT */}
      <div className="max-w-5xl px-6">
        {activeTab === "review" && (
          <div className="max-w-4xl">

            {/* TITLE */}
            <p className="text-sm text-white mb-4">
              Cases with Submitted Insights
            </p>

            {/* CARD */}
            <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5">

              <p className="text-white font-medium mb-2">
                Corporate Embezzlement Investigation
              </p>

              <p className="text-xs text-[#8FA3B0] mb-3">
                Client: John Smith
              </p>

              <p className="text-xs text-[#8FA3B0]">Detective:</p>
              <p className="text-sm text-white mb-4">
                Detective Emma Watson
              </p>

              {/* INSIGHT BOX */}
              <div className="bg-[#243643] border border-[#2a3a44] rounded-lg p-4 mb-4">
                <p className="text-xs text-[#8FA3B0] mb-1">Insights:</p>
                <p className="text-sm text-white leading-relaxed">
                  Initial investigation reveals suspicious wire transfers totaling $250,000 to offshore accounts.
                  Found discrepancies in ledger entries during October-December period.
                  Recommend forensic accounting audit.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg border border-[#2a3a44] text-sm text-white hover:bg-[#243643]">
                  View Full Details
                </button>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-6 py-2 rounded-lg bg-red text-white text-sm hover:bg-red-600"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto bg-[#121F27] border border-white/10 rounded-2xl p-6 relative">

            {/* CLOSE */}
            <button onClick={() => setShowReportModal(false)} className="absolute top-4 right-4 text-[#8FA3B0] hover:text-white text-lg leading-none">✕</button>

            {/* HEADER */}
            <h2 className="text-base font-bold text-white mb-1">Generate Comprehensive Case Report</h2>
            <p className="text-xs text-[#8FA3B0] mb-6">Create a detailed investigation report with findings, evidence, and supporting documents</p>

            <div className="space-y-5">

              {/* Executive Summary */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span className="text-sm font-semibold text-white">Executive Summary</span>
                  <span className="text-[#dc3545] text-sm">*</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none"
                  
                />
                <p className="text-xs text-[#8FA3B0] mt-1">Brief overview of the entire investigation</p>
              </div>

              {/* Key Findings */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm font-semibold text-white">Key Findings</span>
                  <span className="text-[#dc3545] text-sm">*</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none font-mono"
                  
                />
                <p className="text-xs text-[#8FA3B0] mt-1">List all critical discoveries and observations (one per line)</p>
              </div>

              {/* Evidence Collected */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  <span className="text-sm font-semibold text-white">Evidence Collected</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none"
                   
                />
                <p className="text-xs text-[#8FA3B0] mt-1">Detail all evidence types and their relevance to the case</p>
              </div>

              {/* Recommendations */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span className="text-sm font-semibold text-white">Recommendations</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none"
                  
                />
                <p className="text-xs text-[#8FA3B0] mt-1">Suggest next steps and preventive measures</p>
              </div>

              {/* Next Steps */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span className="text-sm font-semibold text-white">Next Steps</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none"
                />
                <p className="text-xs text-[#8FA3B0] mt-1">Define clear action items for the client</p>
              </div>

              {/* Conclusion */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm font-semibold text-white">Conclusion</span>
                  <span className="text-[#dc3545] text-sm">*</span>
                </div>
                <textarea rows={2} className="w-full bg-[#1A2832] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#8FA3B0] outline-none focus:border-white/30 resize-none"
                />
                <p className="text-xs text-[#8FA3B0] mt-1">Final summary and case resolution</p>
              </div>

              {/* Supporting Documents */}
              <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span className="text-sm font-semibold text-white">Supporting Documents</span>
                </div>
                <p className="text-xs text-[#8FA3B0] mb-3">Upload photos, videos, PDFs, or other evidence files to include with the report</p>
                <label className="flex items-center gap-2 w-fit cursor-pointer bg-[#243643] border border-white/10 rounded-lg px-4 py-2 text-sm text-white hover:bg-[#2d4050] transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Choose Files
                  <input type="file" multiple className="hidden" />
                </label>
                <p className="text-xs text-[#8FA3B0] mt-2">0 file(s) selected</p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowReportModal(false)} className="px-5 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition">Cancel</button>
              <button className="px-5 py-2 bg-[#dc3545] hover:bg-[#b82231] rounded-lg text-sm text-white font-semibold transition">Generate & Send Report</button>
            </div>

          </div>
        </div>
      )}

    </div>



  );
};

export default CaseManagement;


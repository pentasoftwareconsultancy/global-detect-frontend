import React, { useState, useMemo } from "react";
import { casesData } from "./caseManagementData";
import { Eye, Search } from "lucide-react";
import { FiFileText } from "react-icons/fi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useEffect } from "react";

const CaseManagement = () => {
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
    { name: " All Cases", key: "all" },
    { name: "Pending Cases", key: "pending" },
    { name: "Review Insights", key: "review" },
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

    // ✅ FIX PRIORITY (case-insensitive)
    if (priority !== "All") {
      data = data.filter(
        (i) => i.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    // ✅ ADD DATE SORTING (MISSING PART)
    if (dateSort === "Newest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateSort === "Oldest") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return data;
  }, [cases,activeTab, search, status, type, priority, dateSort]);

  return (
    <div className="text-white  p-4">

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
        <div className="flex gap-2 p-1 border-2 border-[#2a3a44] rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm rounded-lg ${activeTab === tab.key
                ? "bg-red text-white"
                : "text-lightGray hover:text-white"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ FILTERS ONLY FOR ALL TAB */}
      {activeTab === "all" && (
        <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5 mb-6">

          {/* 🔍 SEARCH */}
          <div className="flex items-center bg-[#0f1a1f] px-4 py-3 rounded-lg border border-[#22313d] mb-5">
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
              <p className="text-xs text-[#8FA3B0] mb-2">Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0f1a1f] border border-[#22313d] px-3 py-2.5 rounded-lg text-sm text-white"
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
              <p className="text-xs text-[#8FA3B0] mb-2">Investigation Type</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#0f1a1f] border border-[#22313d] px-3 py-2.5 rounded-lg text-sm text-white"
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
              <p className="text-xs text-[#8FA3B0] mb-2">Priority</p>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#0f1a1f] border border-[#22313d] px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Priorities</option>
                <option>urgent</option>
                <option>high</option>
                <option>medium</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <p className="text-xs text-[#8FA3B0] mb-2">Date Range</p>
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="w-full bg-[#0f1a1f] border border-[#22313d] px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Time</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-5">
            <p className="text-xs text-[#8FA3B0]">
              Showing {filteredData.length} of {cases.length} cases
            </p>

            <button
              onClick={clearFilters}
              className="text-xs px-4 py-2 border border-[#22313d] rounded-lg text-white hover:bg-[#22313d]"
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
                      onClick={() => {
                        setSelectedCase(item);
                        setShowAssignModal(true);
                      }}
                      className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      <MdOutlinePersonAddAlt />
                    </button>
                  )}

                  <button className="p-2 border border-[#243642] rounded-lg hover:bg-[#223544]">
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

      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-[90%] max-w-3xl bg-[#1A2832] border border-[#22313d] rounded-xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowAssignModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* HEADER */}
            <h2 className="text-lg font-semibold">
              Assign Detective to Case
            </h2>
            <p className="text-xs text-[#8FA3B0] mb-4">
              Select a detective to assign to this case
            </p>

            {/* SEARCH (optional for now static) */}
            <div className="bg-[#0f1a1f] border border-[#22313d] rounded-lg px-4 py-2 mb-5">
              <input
                placeholder="Search detective..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* DETECTIVE GRID */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {availableDetectives.map((det) => (
                <div
                  key={det}
                  onClick={() => setSelectedDetective(det)}
                  className={`p-4 rounded-lg border cursor-pointer transition 
              ${selectedDetective === det
                      ? "bg-red-500/20 border-red-500"
                      : "border-[#243642] hover:bg-[#223544]"
                    }`}
                >
                  {det}
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!selectedDetective) return;

                  setCases((prev) =>
                    prev.map((c) =>
                      c.id === selectedCase.id
                        ? {
                          ...c,
                          detective: selectedDetective,
                          status: "Assigned", // ✅ update status also
                        }
                        : c
                    )
                  );

                  setSelectedDetective("");
                  setShowAssignModal(false); // temp update
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 bg-red rounded-lg text-sm"
              >
                Assign Case
              </button>
            </div>

          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A2832] border border-[#22313d] rounded-xl p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-8 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* HEADER */}
            <h2 className="text-lg font-semibold mb-1">
              Generate Comprehensive Case Report
            </h2>
            <p className="text-xs text-[#8FA3B0] mb-6">
              Create a detailed investigation report with findings, evidence, and supporting documents
            </p>

            {/* FORM */}
            <div className="space-y-5">

              {/* Executive Summary */}
              <div>
                <p className="text-sm mb-2">Executive Summary *</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                  placeholder="Provide a high-level overview..."
                />
              </div>

              {/* Key Findings */}
              <div>
                <p className="text-sm mb-2">Key Findings *</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                  placeholder="• Finding 1..."
                />
              </div>

              {/* Evidence */}
              <div>
                <p className="text-sm mb-2">Evidence Collected</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                  placeholder="Document all evidence..."
                />
              </div>

              {/* Recommendations */}
              <div>
                <p className="text-sm mb-2">Recommendations</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                />
              </div>

              {/* Next Steps */}
              <div>
                <p className="text-sm mb-2">Next Steps</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                />
              </div>

              {/* Conclusion */}
              <div>
                <p className="text-sm mb-2">Conclusion *</p>
                <textarea
                  className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm"
                />
              </div>

              {/* FILE UPLOAD */}
              <div className="bg-[#1f2f3a] border border-[#2a3a44] rounded-lg p-4">
                <p className="text-sm mb-2">Supporting Documents</p>
                <button className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm">
                  Choose Files
                </button>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-red rounded-lg text-sm">
                Generate & Send Report
              </button>
            </div>

          </div>
        </div>



      )}

    </div>



  );
};

export default CaseManagement;


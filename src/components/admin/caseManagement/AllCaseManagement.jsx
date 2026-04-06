import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { casesData } from "./caseManagementData";
import { Eye, Search } from "lucide-react";
import { getPriorityStyle, getStatusStyle } from "./caseUtils";

const AllCaseManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [priority, setPriority] = useState("All");
  const [dateSort, setDateSort] = useState("All");

  const tabs = [
    { name: "All Cases", path: "/all-cases" },
    { name: "Pending Cases", path: "/admin-pending-case-management" },
    { name: "Review Insights", path: "/admin-review-insights" },
  ];

  /* ================= UNIQUE VALUES ================= */
  const types = ["All", ...new Set(casesData.map((c) => c.type))];
  const priorities = ["All", ...new Set(casesData.map((c) => c.priority))];
  const statuses = ["All", ...new Set(casesData.map((c) => c.status))];

  /* ================= FILTER LOGIC ================= */
  const filteredData = useMemo(() => {
    let data = [...casesData];

    // 🔍 SEARCH
    if (search) {
      data = data.filter((item) =>
        `${item.id} ${item.client} ${item.type} ${item.detective}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // 📌 STATUS
    if (status !== "All") {
      data = data.filter((item) => item.status === status);
    }

    // 📂 TYPE
    if (type !== "All") {
      data = data.filter((item) => item.type === type);
    }

    // 🚨 PRIORITY
    if (priority !== "All") {
      data = data.filter((item) => item.priority === priority);
    }

    // 📅 DATE SORT
    if (dateSort === "Newest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateSort === "Oldest") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return data;
  }, [search, status, type, priority, dateSort]);

  /* ================= UI ================= */
  return (
    <div className="text-white montserrat">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          📄 Case Management
        </h1>
        <p className="text-lightGray text-sm">
          View and manage all investigation cases
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              location.pathname === tab.path
                ? "bg-red text-white"
                : "bg-[#1a1a1a] text-lightGray hover:bg-[#2a2a2a]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* FILTER */}
      <div className="bg-[#16232d] border border-[#1f2f3a] rounded-xl p-4 mb-5">

        {/* SEARCH */}
        <div className="flex items-center bg-[#0f1a1f] px-3 py-2 rounded-lg mb-3">
          <Search size={16} className="text-lightGray" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case ID, client, type..."
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#0f1a1f] border border-[#1f2f3a] p-2 rounded-lg text-sm"
          >
            {statuses.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>

          {/* TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-[#0f1a1f] border border-[#1f2f3a] p-2 rounded-lg text-sm"
          >
            {types.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>

          {/* PRIORITY */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-[#0f1a1f] border border-[#1f2f3a] p-2 rounded-lg text-sm"
          >
            {priorities.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </select>

          {/* DATE */}
          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="bg-[#0f1a1f] border border-[#1f2f3a] p-2 rounded-lg text-sm"
          >
            <option>All</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* RESULT COUNT */}
        <p className="text-xs text-lightGray mt-3">
          Showing {filteredData.length} of {casesData.length} cases
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#16232d] border border-[#1f2f3a] rounded-xl overflow-x-auto">
        <div className="min-w-[900px]">

          {/* HEADER */}
          <div className="grid grid-cols-7 px-4 py-3 text-xs text-lightGray border-b border-[#1f2f3a]">
            <div>Case ID</div>
            <div>Client Name</div>
            <div>Investigation Type</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Detective</div>
            <div>Actions</div>
          </div>

          {/* ROWS */}
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-7 px-4 py-3 text-sm border-b border-[#1f2f3a] hover:bg-[#1a1a1a] transition"
            >
              <div>
                <p>{item.id}</p>
                <p className="text-xs text-gray">{item.date}</p>
              </div>

              <div>{item.client}</div>
              <div>{item.type}</div>

              <div>
                <span className={`px-2 py-1 text-xs rounded ${getPriorityStyle(item.priority)}`}>
                  {item.priority}
                </span>
              </div>

              <div>
                <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="text-lightGray">
                {item.detective || "Unassigned"}
              </div>

              <div>
                <button className="p-2 border border-[#1f2f3a] rounded-lg hover:bg-[#1a1a1a] transition">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {filteredData.length === 0 && (
            <div className="text-center py-10 text-lightGray text-sm">
              No cases found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCaseManagement;
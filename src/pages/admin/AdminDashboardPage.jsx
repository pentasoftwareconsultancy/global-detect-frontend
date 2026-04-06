import React from "react";
import {
  FiArrowUpRight,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";

/* ===================== STAT CARD ===================== */
const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-[#16232d] border border-[#1f2f3a] rounded-2xl p-4 flex flex-col justify-between hover:border-[#2a3a45] transition">
      
      <div className="flex justify-between items-start">
        <p className="text-xs text-[#909090]">{title}</p>
        <span className="text-[#909090]">{icon}</span>
      </div>

      <div className="mt-2">
        <h2 className="text-xl font-semibold text-white">{value}</h2>
        <p className="text-xs text-[#6b7280]">{subtitle}</p>
      </div>

    </div>
  );
};

/* ===================== MAIN ===================== */
const AdminDashboard = () => {
  return (

    // ✅ FIXED (NO INTERNAL SCROLL)
<div className="bg-gradient-to-br from-[#0B1220] to-[#060A13] min-h-screen p-4 sm:p-6 text-white">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span className="text-[#FF4B5C]">▢▢</span>
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#909090]">
            Overview of all cases, detectives, and investigations
          </p>
        </div>

        <button className="bg-[#FF4B5C] hover:bg-[#e43b4b] transition px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2">
          View All Cases
          <FiArrowUpRight />
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Cases" value="5" subtitle="All time" icon={<FiActivity />} />
        <StatCard title="Active Investigations" value="2" subtitle="Ongoing" icon={<FiClock />} />
        <StatCard title="Pending Detective KYC" value="2" subtitle="Approvals" icon={<FiAlertTriangle />} />
        <StatCard title="Pending Reviews" value="1" subtitle="To review" icon={<FiClock />} />
        <StatCard title="Avg Completion" value="2 days" subtitle="Per case" icon={<FiCheckCircle />} />
        <StatCard title="Closed Cases" value="1" subtitle="Completed" icon={<FiCheckCircle />} />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* ===== CASE STATUS ===== */}
        <div className="lg:col-span-2 bg-[#16232d] border border-[#1f2f3a] rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1">Case Status Overview</h2>
          <p className="text-xs text-[#909090] mb-4">
            Current distribution of cases across workflow stages
          </p>

          <div className="space-y-3">
            {[
              { name: "New Requests", color: "bg-gray-500" },
              { name: "Assigned", color: "bg-blue-500" },
              { name: "In Progress", color: "bg-purple-500" },
              { name: "Insights Submitted", color: "bg-yellow-500" },
              { name: "Changes Requested", color: "bg-orange-500" },
              { name: "Completed", color: "bg-green-500" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#0f1a1f] px-4 py-3 rounded-xl border border-[#1f2f3a] hover:border-[#2a3a45] transition"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  <span className="text-sm text-[#CFCFCF]">{item.name}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-white">
                  1 <FiArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="bg-[#16232d] border border-[#1f2f3a] rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1">Quick Actions</h2>
          <p className="text-xs text-[#909090] mb-4">
            Common administrative tasks
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              "Assign Detective",
              "Review Insight",
              "Approve KYC",
              "Create Report",
            ].map((item, i) => (
              <button
                key={i}
                className="bg-[#0f1a1f] border border-[#1f2f3a] py-3 rounded-xl text-xs hover:bg-[#1f2f3a] hover:border-[#2a3a45] transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== RECENT ACTIVITY ===== */}
        <div className="lg:col-span-2 bg-[#16232d] border border-[#1f2f3a] rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1">Recent Activity</h2>
          <p className="text-xs text-[#909090] mb-4">
            Latest system updates and actions
          </p>

          <div className="space-y-4 text-sm">
            {[
              "Admin Director logged into the system",
              "System backup completed successfully",
              "Detective updated location",
              "Location updated again",
              "Report generated successfully",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 border-b border-[#1f2f3a] pb-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-[#FF4B5C]"></span>
                <p className="text-[#CFCFCF] text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== ALERTS ===== */}
        <div className="bg-[#16232d] border border-[#1f2f3a] rounded-2xl p-5">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-1">
            <AiOutlineWarning className="text-yellow-500" />
            Priority & Alerts
          </h2>

          <p className="text-xs text-[#909090] mb-4">
            High priority cases and warnings
          </p>

          <div className="space-y-3">
            {[
              "Corporate Embezzlement Investigation",
              "Asset Recovery Investigation",
              "Missing Person Investigation",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#0f1a1f] border border-[#1f2f3a] p-3 rounded-xl hover:border-[#2a3a45] transition"
              >
                <p className="text-xs text-white">{item}</p>
                <p className="text-[10px] text-[#6b7280]">
                  Case ID • Assigned
                </p>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-[#0f1a1f] border border-[#1f2f3a] py-2 rounded-lg text-xs hover:bg-[#1f2f3a] transition">
            View All Priority Cases
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
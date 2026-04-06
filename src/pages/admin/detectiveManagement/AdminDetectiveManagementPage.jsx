import React, { useState } from "react";

const tabs = [
  { label: "All Detectives" },
  { label: "Live Tracking", count: 4 },
  { label: "Pending KYC", count: 3 },
  { label: "Approved" },
  { label: "Available" },
  { label: "On Case", count: 2 },
];

const detectives = [
  {
    name: "Emma Watson",
    email: "e.watson@detectiveagency.com",
    specialization: "Corporate Fraud",
    status: "On Case",
    kyc: "Approved",
    cases: "Active: 2 Completed: 5",
    rating: 4.8,
    date: "Nov 01, 2025",
    isOnline: true,
  },
  {
    name: "James Bond",
    email: "j.bond@detectiveagency.com",
    specialization: "Personal Investigation",
    status: "On Case",
    kyc: "Approved",
    cases: "Active: 1 Completed: 3",
    rating: 4.5,
    date: "Nov 05, 2025",
    isOnline: true,
  },
  {
    name: "Olivia Martinez",
    email: "o.martinez@detectiveagency.com",
    specialization: "Missing Persons",
    status: "Available",
    kyc: "Approved",
    cases: "Active: 0 Completed: 4",
    rating: 4.7,
    date: "Nov 10, 2025",
    isOnline: false,
  },
  {
    name: "David Lee",
    email: "d.lee@detectiveagency.com",
    specialization: "Cyber Crime",
    status: "Available",
    kyc: "Approved",
    cases: "Active: 0 Completed: 2",
    rating: 4.6,
    date: "Nov 15, 2025",
    isOnline: false,
  },
  {
    name: "Sophia Anderson",
    email: "s.anderson@detectiveagency.com",
    specialization: "Insurance Fraud",
    status: "Offline",
    kyc: "Pending",
    cases: "Active: 0 Completed: 0",
    rating: "No rating",
    date: "Feb 01, 2026",
    isOnline: false,
  },
];

const getStatusStyle = (status) => {
  if (status === "On Case") return "bg-blue-500/20 text-blue-400";
  if (status === "Available") return "bg-green-500/20 text-green-400";
  return "bg-gray-500/20 text-gray-400";
};

const getKYCStyle = (kyc) => {
  if (kyc === "Approved") return "bg-green-500/20 text-green-400";
  if (kyc === "Pending") return "bg-yellow-500/20 text-yellow-400";
  return "bg-red-500/20 text-red-400";
};

const AdminDetectiveManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All Detectives");

  const filtered = detectives.filter((d) => {
    switch (activeTab) {
      case "Live Tracking":
        return d.isOnline;
      case "Pending KYC":
        return d.kyc === "Pending";
      case "Approved":
        return d.kyc === "Approved";
      case "Available":
        return d.status === "Available";
      case "On Case":
        return d.status === "On Case";
      default:
        return true;
    }
  });

  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">Detective Management</h1>
          <p className="text-xs lightGray">
            Manage all detectives, review KYC documents, and monitor performance
          </p>
        </div>  
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Detectives" value="7" />
        <Stat title="Pending KYC" value="3" color="text-yellow-400" />
        <Stat title="Approved" value="4" color="text-green-400" />
        <Stat title="Currently on Cases" value="2" color="text-blue-400" />
      </div>

      {/* TABLE CARD */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl">

        {/* TITLE */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium">{activeTab}</h2>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-4 flex-wrap overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-full flex items-center gap-1 ${
                activeTab === t.label
                  ? "bg-red text-white"
                  : "bg-[#132735] text-lightGray"
              }`}
            >
              {t.label}
              {t.count && (
                <span className="text-[10px]">({t.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-lightGray border-b border-gray/20">
              <tr>
                <th className="text-left py-3">Detective</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>KYC Status</th>
                <th>Cases</th>
                <th>Rating</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="border-b border-gray/10 hover:bg-[#132735]">
                  <td className="py-3">
                    <p className="font-medium">{d.name}</p>
                    <p className="text-xs lightGray">{d.email}</p>
                  </td>

                  <td>
                    <span className="bg-[#132735] px-2 py-1 text-xs rounded-full">
                      {d.specialization}
                    </span>
                  </td>

                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(d.status)}`}>
                      {d.status}
                    </span>
                  </td>

                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${getKYCStyle(d.kyc)}`}>
                      {d.kyc}
                    </span>
                  </td>

                  <td className="text-xs">{d.cases}</td>

                  <td className="text-yellow-400">★ {d.rating}</td>

                  <td className="text-lightGray text-xs">{d.date}</td>

                  <td className="flex gap-2 justify-center">
                    <button className="px-2 py-1 text-xs border border-gray rounded">Track</button>
                    <button className="px-2 py-1 text-xs border border-gray rounded">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

const Stat = ({ title, value, color }) => (
  <div className="bg-[#0E1F2B] p-4 rounded-xl w-full">
    <p className="text-xs lightGray">{title}</p>
    <h2 className={`text-lg font-semibold ${color || ""}`}>{value}</h2>
  </div>
);

export default AdminDetectiveManagementPage;
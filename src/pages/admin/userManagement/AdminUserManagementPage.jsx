import React, { useState } from "react";

const tabs = [
  { label: "All Users" },
  { label: "Active", count: 5 },
  { label: "Inactive", count: 1 },
  { label: "Blocked", count: 2 },
];

const users = [
  {
    name: "John Smith",
    id: "user-1",
    email: "john.smith@email.com",
    phone: "+1-555-0101",
    status: "Active",
    joined: "Dec 01, 2025",
    cases: 2,
  },
  {
    name: "Sarah Johnson",
    id: "user-2",
    email: "sarah.j@email.com",
    phone: "+1-555-0102",
    status: "Active",
    joined: "Dec 05, 2025",
    cases: 2,
  },
  {
    name: "Michael Chen",
    id: "user-3",
    email: "michael.c@email.com",
    phone: "+1-555-0103",
    status: "Active",
    joined: "Dec 10, 2025",
    cases: 1,
  },
  {
    name: "Emily Davis",
    id: "user-4",
    email: "emily.d@email.com",
    phone: "+1-555-0104",
    status: "Active",
    joined: "Dec 15, 2025",
    cases: 0,
  },
  {
    name: "Robert Wilson",
    id: "user-5",
    email: "robert.w@email.com",
    phone: "+1-555-0105",
    status: "Blocked",
    joined: "Nov 20, 2025",
    cases: 1,
  },
  {
    name: "Jessica Martinez",
    id: "user-6",
    email: "j.martinez@email.com",
    phone: "+1-555-0106",
    status: "Inactive",
    joined: "Oct 10, 2025",
    cases: 0,
  },
  {
    name: "David Brown",
    id: "user-7",
    email: "d.brown@email.com",
    phone: "+1-555-0107",
    status: "Active",
    joined: "Jan 05, 2026",
    cases: 1,
  },
  {
    name: "Linda Garcia",
    id: "user-8",
    email: "linda.g@email.com",
    phone: "+1-555-0108",
    status: "Blocked",
    joined: "Nov 01, 2025",
    cases: 0,
  },
];

const getStatusStyle = (status) => {
  if (status === "Active") return "bg-green-500/20 text-green-400";
  if (status === "Inactive") return "bg-gray-500/20 text-gray-400";
  if (status === "Blocked") return "bg-red-500/20 text-red-400";
};

const getActionButton = (status) => {
  if (status === "Active") return { label: "Block", style: "bg-red text-white" };
  if (status === "Blocked") return { label: "Unblock", style: "bg-red text-white" };
  if (status === "Inactive") return { label: "Activate", style: "bg-red text-white" };
};

const AdminUserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All Users");

  const filtered = users.filter((u) => {
    if (activeTab === "Active") return u.status === "Active";
    if (activeTab === "Inactive") return u.status === "Inactive";
    if (activeTab === "Blocked") return u.status === "Blocked";
    return true;
  });

  return (
    <div className="p-4 sm:p-6 montserrat text-white bg-[#08141B] min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">User Management</h1>
        <p className="text-xs lightGray">
          Manage all users, view activity, and control access
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Users" value="8" />
        <Stat title="Active Users" value="5" color="text-green-400" />
        <Stat title="Inactive Users" value="1" />
        <Stat title="Blocked Users" value="2" color="text-red" />
      </div>

      {/* TABLE CARD */}
      <div className="bg-[#0E1F2B] p-4 rounded-xl overflow-x-auto">

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-sm font-medium">{activeTab}</h2>

          <input
            placeholder="Search users..."
            className="bg-[#132735] px-3 py-1 text-xs rounded-lg outline-none w-full sm:w-auto"
          />
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-4 flex-wrap overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                activeTab === t.label
                  ? "bg-red text-white"
                  : "bg-[#132735] text-lightGray"
              }`}
            >
              {t.label} {t.count && `(${t.count})`}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <table className="w-full text-sm min-w-[700px]">
          <thead className="text-lightGray border-b border-gray/20">
            <tr>
              <th className="text-left py-3">User</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Total Cases</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u, i) => {
              const action = getActionButton(u.status);

              return (
                <tr key={i} className="border-b border-gray/10 hover:bg-[#132735]">

                  {/* USER */}
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{u.name}</p>
                      <p className="text-xs lightGray">ID: {u.id}</p>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="text-xs break-all">
                    <p>{u.email}</p>
                    <p className="lightGray">{u.phone}</p>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(u.status)}`}>
                      {u.status}
                    </span>
                  </td>

                  {/* JOINED */}
                  <td className="text-xs lightGray whitespace-nowrap">{u.joined}</td>

                  {/* CASES */}
                  <td>
                    <span className="font-semibold">{u.cases}</span>
                    <span className="text-xs lightGray"> cases</span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2 justify-center flex-wrap">
                    <button className={`px-2 py-1 text-xs rounded ${action.style}`}>
                      {action.label}
                    </button>

                    <button className="px-2 py-1 text-xs border border-gray rounded">
                      👁
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
};

const Stat = ({ title, value, color }) => (
  <div className="bg-[#0E1F2B] p-4 rounded-xl w-full">
    <p className="text-xs lightGray">{title}</p>
    <h2 className={`text-base sm:text-lg font-semibold ${color || ""}`}>{value}</h2>
  </div>
);

export default AdminUserManagementPage;
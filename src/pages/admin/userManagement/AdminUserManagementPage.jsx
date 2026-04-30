import React, { useState } from "react";
import { Search, CheckCircle, XCircle, MinusCircle, Ban, UserCheck, RefreshCw, Eye, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import { casesData } from "../../../components/admin/caseManagement/caseManagementData";

// Profile details mapped per client name from casesData
const USER_PROFILES = {
  "John Smith":       { id: "user-1", email: "john.smith@email.com",  phone: "+1-555-0101", status: "Active",   joined: "Dec 01, 2025" },
  "Sarah Johnson":    { id: "user-2", email: "sarah.j@email.com",     phone: "+1-555-0102", status: "Active",   joined: "Dec 05, 2025" },
  "Michael Chen":     { id: "user-3", email: "michael.c@email.com",   phone: "+1-555-0103", status: "Active",   joined: "Dec 10, 2025" },
  "Emily Davis":      { id: "user-4", email: "emily.davis@email.com", phone: "+1-555-0104", status: "Active",   joined: "Dec 15, 2025" },
  "Robert Wilson":    { id: "user-5", email: "robert.w@email.com",    phone: "+1-555-0105", status: "Blocked",  joined: "Nov 20, 2025" },
  "Jessica Martinez": { id: "user-6", email: "j.martinez@email.com",  phone: "+1-555-0106", status: "Inactive", joined: "Oct 10, 2025" },
  "David Brown":      { id: "user-7", email: "d.brown@email.com",     phone: "+1-555-0107", status: "Active",   joined: "Jan 05, 2026" },
  "Linda Garcia":     { id: "user-8", email: "linda.g@email.com",     phone: "+1-555-0108", status: "Blocked",  joined: "Nov 01, 2025" },
};

// Build unique user list from casesData clients + include users with no cases
const clientsInCases = [...new Set(casesData.map(c => c.client))];
const allClientNames = [...new Set([...clientsInCases, ...Object.keys(USER_PROFILES)])];

const ALL_USERS = allClientNames
  .filter(name => USER_PROFILES[name])
  .map(name => {
    const profile = USER_PROFILES[name];
    const userCases = casesData.filter(c => c.client === name);
    return {
      name,
      id: profile.id,
      email: profile.email,
      phone: profile.phone,
      status: profile.status,
      joined: profile.joined,
      cases: userCases.length,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const activeCount   = ALL_USERS.filter(u => u.status === "Active").length;
const inactiveCount = ALL_USERS.filter(u => u.status === "Inactive").length;
const blockedCount  = ALL_USERS.filter(u => u.status === "Blocked").length;

const TABS = [
  { key: "All Users", label: "All Users",  icon: null,                       count: null },
  { key: "Active",    label: "Active",     icon: <CheckCircle size={11} />,  count: activeCount },
  { key: "Inactive",  label: "Inactive",   icon: <MinusCircle size={11} />,  count: inactiveCount },
  { key: "Blocked",   label: "Blocked",    icon: <Ban size={11} />,          count: blockedCount },
];

const StatusBadge = ({ status }) => {
  const map = {
    Active:   { cls: "bg-[#00C9501A] text-green-400 border border-green-500/30 rounded-md", icon: <CheckCircle size={10} /> },
    Inactive: { cls: "bg-[#6A72821A] text-gray-400 border border-white/10 rounded-md",       icon: <MinusCircle size={10} /> },
    Blocked:  { cls: "bg-[#FB2C361A] text-red-400 border border-red-500/30 rounded-md",       icon: <XCircle size={10} /> },
  };
  const s = map[status] || map.Inactive;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${s.cls}`}>
      {s.icon} {status}
    </span>
  );
};

const ActionButton = ({ status }) => {
  if (status === "Active")   return <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#DC262699] hover:bg-[#b82231] text-white transition font-medium"><Ban size={11} /> Block</button>;
  if (status === "Blocked")  return <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#FF4959] hover:bg-[#b82231] text-white transition font-medium"><UserCheck size={11} /> Unblock</button>;
  return <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#D92B3A] hover:bg-[#b82231] text-white transition font-medium"><RefreshCw size={11} /> Activate</button>;
};

const AdminUserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All Users");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = ALL_USERS.filter(u => {
    const matchTab =
      activeTab === "All Users" ? true :
      activeTab === "Active"    ? u.status === "Active" :
      activeTab === "Inactive"  ? u.status === "Inactive" :
      activeTab === "Blocked"   ? u.status === "Blocked" : true;
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabLabel = activeTab === "All Users" ? "All Users" : activeTab === "Active" ? "Active Users" : activeTab;

  return (
    <div className="p-4 sm:p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage all users, view activity, and control access</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Users",    value: ALL_USERS.length,  color: "text-white"     },
          { title: "Active Users",   value: activeCount,       color: "text-green-400" },
          { title: "Inactive Users", value: inactiveCount,     color: "text-white"     },
          { title: "Blocked Users",  value: blockedCount,      color: "text-red-400"   },
        ].map(s => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-5 py-5">
            <p className="text-sm text-gray-400 mb-4">{s.title}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold">{tabLabel}</h2>
          <div className="flex items-center gap-2 bg-[#1A2832] border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-auto">
            <Search size={13} className="text-gray-500 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full sm:w-40"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {TABS.map(t => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition font-medium border border-white/10 ${
                  active ? "bg-[#FF4959] text-white border-[#D92B3A]" : "bg-[#1A2832] text-gray-300 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label}{t.count != null ? ` (${t.count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {filtered.map((u, i) => (
            <div key={i} className="bg-[#132735] border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF4959] flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{u.name}</p>
                    <p className="text-xs text-gray-400">ID: {u.id}</p>
                  </div>
                </div>
                <StatusBadge status={u.status} />
              </div>
              <div className="space-y-1 mb-3">
                <p className="text-xs text-gray-300 flex items-center gap-1.5"><Mail size={11} className="text-gray-500" /> {u.email}</p>
                <p className="text-xs text-gray-300 flex items-center gap-1.5"><Phone size={11} className="text-gray-500" /> {u.phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{u.joined}</span>
                  <span className="text-xs"><span className="font-bold text-white">{u.cases}</span><span className="text-gray-400"> cases</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <ActionButton status={u.status} />
                  <button onClick={() => navigate(`/admin-user-management-detail/${u.id}`)} className="text-white hover:text-white transition">
                    <Eye size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No users found.</p>}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-white text-xs">
                <th className="text-left py-3 font-medium w-[22%]">User</th>
                <th className="text-left py-3 font-medium w-[22%]">Contact</th>
                <th className="text-left py-3 font-medium w-[12%]">Status</th>
                <th className="text-left py-3 font-medium w-[14%]">Joined</th>
                <th className="text-left py-3 font-medium w-[14%]">Total Cases</th>
                <th className="text-left py-3 font-medium w-[16%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FF4959] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{u.name}</p>
                        <p className="text-xs text-gray-400">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <p className="text-xs text-gray-300 flex items-center gap-1.5 mb-1"><Mail size={11} className="text-gray-500" /> {u.email}</p>
                    <p className="text-xs text-gray-300 flex items-center gap-1.5"><Phone size={11} className="text-gray-500" /> {u.phone}</p>
                  </td>
                  <td className="py-3.5"><StatusBadge status={u.status} /></td>
                  <td className="py-3.5 text-xs text-gray-400">{u.joined}</td>
                  <td className="py-3.5 text-sm">
                    <span className="font-bold text-white">{u.cases}</span>
                    <span className="text-gray-400 text-xs"> cases</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-[90px]"><ActionButton status={u.status} /></div>
                      <button
                        onClick={() => navigate(`/admin-user-management-detail/${u.id}`)}
                        className="text-white hover:text-white transition"
                      >
                        <Eye size={15} />
                      </button>
                    </div>
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

export default AdminUserManagementPage;

import React, { useState } from "react";
import { Search, CheckCircle, XCircle, MinusCircle, Ban, UserCheck, RefreshCw, Eye, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const ALL_USERS = [
  { name: "John Smith",       id: "user-1", email: "john.smith@email.com",  phone: "+1-555-0101", status: "Active",   joined: "Dec 01, 2025", cases: 2 },
  { name: "Sarah Johnson",    id: "user-2", email: "sarah.j@email.com",     phone: "+1-555-0102", status: "Active",   joined: "Dec 05, 2025", cases: 2 },
  { name: "Michael Chen",     id: "user-3", email: "michael.c@email.com",   phone: "+1-555-0103", status: "Active",   joined: "Dec 10, 2025", cases: 1 },
  { name: "Emily Davis",      id: "user-4", email: "emily.davis@email.com", phone: "+1-555-0104", status: "Active",   joined: "Dec 15, 2025", cases: 0 },
  { name: "Robert Wilson",    id: "user-5", email: "robert.w@email.com",    phone: "+1-555-0105", status: "Blocked",  joined: "Nov 20, 2025", cases: 1 },
  { name: "Jessica Martinez", id: "user-6", email: "j.martinez@email.com",  phone: "+1-555-0106", status: "Inactive", joined: "Oct 10, 2025", cases: 0 },
  { name: "David Brown",      id: "user-7", email: "d.brown@email.com",     phone: "+1-555-0107", status: "Active",   joined: "Jan 05, 2026", cases: 1 },
  { name: "Linda Garcia",     id: "user-8", email: "linda.g@email.com",     phone: "+1-555-0108", status: "Blocked",  joined: "Nov 01, 2025", cases: 0 },
];

const TABS = [
  { key: "All Users",  label: "All Users",    icon: null,                        count: null },
  { key: "Active",     label: "Active",       icon: <CheckCircle size={11} />,   count: 5 },
  { key: "Inactive",   label: "Inactive",     icon: <MinusCircle size={11} />,   count: 1 },
  { key: "Blocked",    label: "Blocked",      icon: <Ban size={11} />,           count: 2 },
];

const StatusBadge = ({ status }) => {
  const map = {
    Active:   { cls: "bg-[#00C9501A] text-green-400 rounded-lg border border-green-400/30",  icon: <CheckCircle size={10} /> },
    Inactive: { cls: "bg-[#6A72821A] text-gray-400 rounded-lg border border-gray-400/30",    icon: <MinusCircle size={10} /> },
    Blocked:  { cls: "bg-[#FB2C361A] text-red-400 rounded-lg border border-red-400/30",      icon: <XCircle size={10} /> },
  };
  const s = map[status] || map.Inactive;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${s.cls}`}>
      {s.icon} {status}
    </span>
  );
};

const ActionButton = ({ status }) => {
  if (status === "Active") return (
    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#D92B3A] hover:bg-[#b82231] text-white transition font-medium">
      <Ban size={11} /> Block
    </button>
  );
  if (status === "Blocked") return (
    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#D92B3A] hover:bg-[#b82231] text-white transition font-medium">
      <UserCheck size={11} /> Unblock
    </button>
  );
  return (
    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#D92B3A] hover:bg-[#b82231] text-white transition font-medium">
      <RefreshCw size={11} /> Activate
    </button>
  );
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

  const tabLabel = activeTab === "All Users" ? "All Users" :
    activeTab === "Active" ? "Active Users" :
    activeTab === "Inactive" ? "Inactive" : "Blocked";

  return (
    <div className="p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-gray-400 mt-1">Manage all users, view activity, and control access</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Users",    value: "8", color: "text-white"      },
          { title: "Active Users",   value: "5", color: "text-green-400"  },
          { title: "Inactive Users", value: "1", color: "text-white"      },
          { title: "Blocked Users",  value: "2", color: "text-red-400"    },
        ].map(s => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-5 py-5">
            <p className="text-sm text-gray-400 mb-4">{s.title}</p>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5">

        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">{tabLabel}</h2>
          <div className="flex items-center gap-2 bg-[#1A2832] border border-white/10 rounded-lg px-3 py-1.5">
            <Search size={13} className="text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-40"
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-[#F9FAFB] text-xs">
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
                <tr key={i} className="border-b border-white/5 ">

                  {/* User */}
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

                  {/* Contact */}
                  <td className="py-3.5">
                    <p className="text-xs text-gray-300 flex items-center gap-1.5 mb-1">
                      <Mail size={11} className="text-gray-500" /> {u.email}
                    </p>
                    <p className="text-xs text-gray-300 flex items-center gap-1.5">
                      <Phone size={11} className="text-gray-500" /> {u.phone}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-3.5"><StatusBadge status={u.status} /></td>

                  {/* Joined */}
                  <td className="py-3.5 text-xs text-gray-400">{u.joined}</td>

                  {/* Cases */}
                  <td className="py-3.5 text-sm">
                    <span className="font-bold text-white">{u.cases}</span>
                    <span className="text-gray-400 text-xs"> cases</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-[90px]">
                        <ActionButton status={u.status} />
                      </div>
                      <button
                        onClick={() => navigate(ROUTES.ADMIN_USER_MANAGEMENT_DETAIL)}
                        className="text-gray-400 hover:text-white transition"
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

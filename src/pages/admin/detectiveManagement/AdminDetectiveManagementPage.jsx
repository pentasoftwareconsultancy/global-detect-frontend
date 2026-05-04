import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock, CheckCircle, Users, Eye, Navigation, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const ALL_DETECTIVES = [
  { name: "Detective Emma Watson",     email: "e.watson@detectiveagency.com",   specialization: "Corporate Fraud",        status: "On Case",   kyc: "Approved", activeCases: 2, completedCases: 5, rating: 4.8, date: "Nov 01, 2025", isOnline: true  },
  { name: "Detective James Bond",      email: "j.bond@detectiveagency.com",     specialization: "Personal Investigation", status: "On Case",   kyc: "Approved", activeCases: 1, completedCases: 3, rating: 4.5, date: "Nov 05, 2025", isOnline: true  },
  { name: "Detective Olivia Martinez", email: "o.martinez@detectiveagency.com", specialization: "Missing Persons",        status: "Available", kyc: "Approved", activeCases: 0, completedCases: 4, rating: 4.7, date: "Nov 10, 2025", isOnline: true  },
  { name: "Detective David Lee",       email: "d.lee@detectiveagency.com",      specialization: "Cyber Crime",            status: "Available", kyc: "Approved", activeCases: 0, completedCases: 2, rating: 4.6, date: "Nov 15, 2025", isOnline: true  },
  { name: "Detective Sophia Anderson", email: "s.anderson@detectiveagency.com", specialization: "Insurance Fraud",        status: "Offline",   kyc: "Pending",  activeCases: 0, completedCases: 0, rating: null, date: "Feb 01, 2026", isOnline: false },
  { name: "Detective Marcus Thompson", email: "m.thompson@detectiveagency.com", specialization: "Background Checks",      status: "Offline",   kyc: "Pending",  activeCases: 0, completedCases: 0, rating: null, date: "Feb 02, 2026", isOnline: false },
  { name: "Detective Rachel Kim",      email: "r.kim@detectiveagency.com",      specialization: "Surveillance",           status: "Offline",   kyc: "Pending",  activeCases: 0, completedCases: 0, rating: null, date: "Feb 03, 2026", isOnline: false },
  
];


const TABS = [
  { key: "All Detectives", label: "All Detectives", icon: null },
  { key: "Live Tracking",  label: "Live Tracking",  icon: <MapPin size={11} />,      count: 4 },
  { key: "Pending KYC",    label: "Pending KYC",    icon: <Clock size={11} />,       count: 3 },
  { key: "Approved",       label: "Approved",       icon: <CheckCircle size={11} />, count: null },
  { key: "Available",      label: "Available",      icon: <Users size={11} />,       count: null },
  { key: "On Case",        label: "On Case",        icon: null,                      count: 2 },
];

const filterDetectives = (tab, search) => {
  let list = ALL_DETECTIVES;
  switch (tab) {
    case "Live Tracking": list = list.filter(d => d.isOnline); break;
    case "Pending KYC":   list = list.filter(d => d.kyc === "Pending"); break;
    case "Approved":      list = list.filter(d => d.kyc === "Approved"); break;
    case "Available":     list = list.filter(d => d.status === "Available"); break;
    case "On Case":       list = list.filter(d => d.status === "On Case"); break;
    default: break;
  }
  if (search) list = list.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );
  return list;
};

const StatusBadge = ({ status }) => {
  const map = {
    "On Case":   "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
    "Available": "bg-[#00C9501A] text-green-400 border border-[#00C95033]",
    "Offline":   "bg-[#6A72821A] text-gray-400 border border-[#6A72821A]",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-lg ${map[status] || "bg-gray-500/20 text-gray-400"}`}>
      {status}
    </span>
  );
};


const KYCBadge = ({ kyc }) => {
  if (kyc === "Approved") return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
      <CheckCircle size={10} /> Approved
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
      <Clock size={10} /> Pending
    </span>
  );
};

const AdminDetectiveManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All Detectives");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && TABS.find(t => t.key === tab)) setActiveTab(tab);
  }, [searchParams]);

  const filtered = filterDetectives(activeTab, search);

  return (
    <div className="p-3 sm:p-6 text-white bg-[#08141B] min-h-screen font-[Montserrat]">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Detective Management</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage all detectives, review KYC documents, and monitor performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Detectives",   value: "7", color: "text-white"       },
          { title: "Pending KYC",        value: "3", color: "text-yellow-400"  },
          { title: "Approved",           value: "4", color: "text-green-400"   },
          { title: "Currently on Cases", value: "2", color: "text-blue-400"    },
        ].map(s => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-5 py-5">
            <p className="text-sm text-gray-400 mb-4">{s.title}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5">

        {/* Card top row: title + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-white">{activeTab}</h2>
          <div className="flex items-center gap-2 bg-[#1A2832] border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-auto">
            <Search size={13} className="text-[#9CA3AF]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search detectives..."
              className="bg-transparent text-xs text-white placeholder:text-[#9CA3AF] outline-none w-full sm:w-40"
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/20 whitespace-nowrap transition font-medium ${
                  active
                    ? "bg-[#FF4959] text-white"
                    : "bg-[#FFFFFF08] text-white"
                }`}
              >
                {t.icon}
                {t.label}{t.count != null ? ` (${t.count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Table — hidden on mobile, shown on md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10 text-white text-sm">
                <th className="text-left py-3 font-medium w-[22%]">Detective</th>
                <th className="text-left py-3 font-medium w-[16%]">Specialization</th>
                <th className="text-left py-3 font-medium w-[9%]">Status</th>
                <th className="text-left py-3 font-medium w-[12%]">KYC Status</th>
                <th className="text-left py-3 font-medium w-[12%]">Cases</th>
                <th className="text-left py-3 font-medium w-[8%]">Rating</th>
                <th className="text-left py-3 font-medium w-[10%]">Submitted</th>
                <th className="text-left py-3 font-medium w-[11%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">

                  {/* Detective */}
                  <td className="py-3.5">
                    <p className="font-medium text-sm text-white">{d.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <span>✉</span> {d.email}
                    </p>
                  </td>

                  {/* Specialization */}
                  <td className="py-3.5">
                    <span className="text-xs text-white border border-white/10 rounded-lg px-3 py-1">{d.specialization}</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5"><StatusBadge status={d.status} /></td>

                  {/* KYC */}
                  <td className="py-3.5"><KYCBadge kyc={d.kyc} /></td>

                  {/* Cases */}
                  <td className="py-3.5 text-xs text-gray-300 leading-5">
                    <p><span className="text-[#F9FAFB] font-semibold">Active: {d.activeCases}</span></p>
                    <p><span className="text-[#9CA3AF] font-semibold">Completed: {d.completedCases}</span></p>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 text-sm">
                    {d.rating != null
                      ? <span className="flex items-center gap-1"><span className="text-yellow-400">★</span> {d.rating}</span>
                      : <span className="text-gray-500 text-xs">No rating</span>
                    }
                  </td>

                  {/* Submitted */}
                  <td className="py-3.5 text-xs text-gray-400">{d.date}</td>

                  {/* Actions */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      {/* Track or approve/reject — fixed width so Eye stays aligned */}
                      <div className="w-[90px] flex items-center gap-1.5">
                        {d.kyc === "Pending" ? (
                          <>
                            <button
                              onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${i}`)}
                              className="w-7 h-7 rounded-md bg-[#FF4959] flex items-center justify-center hover:bg-[#b82231] transition" title="Approve">
                              <CheckCircle size={13} className="text-white" />
                            </button>
                            <button
                              onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${i}`)}
                              className="w-7 h-7 rounded-md bg-[#DC262699] flex items-center justify-center hover:bg-[#b82231] transition" title="Reject">
                              <X size={13} className="text-white" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${i}`)}
                            className="flex items-center gap-1 text-xs text-white border border-white/20 hover:border-white/50 rounded px-2 py-1 transition bg-[#FFFFFF08]">
                            <MapPin size={11} className="text-[#F9FAFB]" /> Track
                          </button>
                        )}
                      </div>
                      {/* Eye — always in same column */}
                      <button
                        onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${i}`)}
                        className="text-white transition"
                        title="View"
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

        {/* Mobile card list — shown only on small screens */}
        <div className="md:hidden flex flex-col gap-2">
          {filtered.map((d, i) => (
            <div key={i} className="bg-[#132735] rounded-xl p-3 border border-white/5">

              {/* Row 1: name + status */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold text-sm text-white truncate">{d.name}</p>
                <StatusBadge status={d.status} />
              </div>

              {/* Row 2: email */}
              <p className="text-xs text-gray-400 mb-2 truncate">{d.email}</p>

              {/* Row 3: specialization + KYC */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs text-white border border-white/10 rounded-md px-2 py-0.5">{d.specialization}</span>
                <KYCBadge kyc={d.kyc} />
              </div>

              {/* Row 4: cases + rating + date in one line */}
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>Active: <span className="text-white font-medium">{d.activeCases}</span></span>
                <span>Done: <span className="text-white font-medium">{d.completedCases}</span></span>
                {d.rating != null
                  ? <span className="flex items-center gap-0.5"><span className="text-yellow-400">★</span>{d.rating}</span>
                  : <span>—</span>}
                <span className="ml-auto">{d.date}</span>
              </div>

              {/* Row 5: actions */}
              <div className="flex items-center gap-2">
                {d.kyc === "Pending" ? (
                  <>
                    <button onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${i}`)} className="flex items-center gap-1 text-xs bg-[#FF4959] text-white rounded-md px-2.5 py-1">
                      <CheckCircle size={11} /> Approve
                    </button>
                    <button onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${i}`)} className="flex items-center gap-1 text-xs bg-[#DC262699] text-white rounded-md px-2.5 py-1">
                      <X size={11} /> Reject
                    </button>
                  </>
                ) : (
                  <button onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${i}`)} className="flex items-center gap-1 text-xs text-white border border-white/20 rounded-md px-2.5 py-1 bg-[#FFFFFF08]">
                    <Navigation size={11} /> Track
                  </button>
                )}
                <button onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${i}`)} className="flex items-center gap-1 text-xs text-white border border-white/20 rounded-md px-2.5 py-1 bg-[#FFFFFF08]">
                  <Eye size={11} /> View
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDetectiveManagementPage;

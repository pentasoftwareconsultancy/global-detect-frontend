import React, { useState, useEffect, useCallback } from "react";
import {
  Search, MapPin, Clock, CheckCircle, Users, Eye,
  X, Loader2, AlertCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../../core/constants/routes.constant";
import { authService } from "../../../core/services/auth.service";

/* ─── helpers ─── */
const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};
const fmt = (v, fallback = "0") =>
  v !== undefined && v !== null ? String(v) : fallback;

/* ─── badges ─── */
const StatusBadge = ({ status }) => {
  const map = {
    on_case:   "bg-[#2B7FFF1A] text-blue-400 border-[#2B7FFF33]",
    available: "bg-[#00C9501A] text-green-400 border-[#00C95033]",
    offline:   "bg-[#6A72821A] text-gray-400 border-[#6A72821A]",
  };
  const labels = { on_case: "On Case", available: "Available", offline: "Offline" };
  return (
    <span className={`px-3 py-1 text-xs rounded-lg border ${map[status] ?? map.offline}`}>
      {labels[status] ?? status}
    </span>
  );
};

const KYCBadge = ({ kycStatus }) => {
  if (kycStatus === "approved")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
        <CheckCircle size={10} /> Approved
      </span>
    );
  if (kycStatus === "rejected")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
        <X size={10} /> Rejected
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
      <Clock size={10} /> Pending
    </span>
  );
};

/* ─── skeletons ─── */
const SkeletonRow = () => (
  <tr className="border-b border-white/5 animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="py-4 pr-4">
        <div className="h-3 bg-white/5 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const SkeletonCard = () => (
  <div className="bg-[#132735] rounded-xl p-3 border border-white/5 animate-pulse space-y-2">
    <div className="h-4 bg-white/5 rounded w-2/3" />
    <div className="h-3 bg-white/5 rounded w-full" />
    <div className="h-3 bg-white/5 rounded w-1/2" />
  </div>
);

/* ─── tab config ─── */
const TABS = [
  { key: "all",       label: "All Detectives", icon: null                      },
  { key: "on_case",   label: "On Case",        icon: <MapPin size={11} />      },
  { key: "available", label: "Available",      icon: <Users size={11} />       },
  { key: "pending",   label: "Pending KYC",    icon: <Clock size={11} />       },
  { key: "approved",  label: "Approved",       icon: <CheckCircle size={11} /> },
];

const tabToFilters = (tab) => {
  switch (tab) {
    case "on_case":   return { status: "on_case" };
    case "available": return { status: "available" };
    case "pending":   return { kycStatus: "pending" };
    case "approved":  return { kycStatus: "approved" };
    default:          return {};
  }
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const AdminDetectiveManagementPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab") ?? "all";
  const [activeTab, setActiveTab] = useState(
    TABS.find((t) => t.key === tabFromUrl) ? tabFromUrl : "all"
  );

  const [stats, setStats]               = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [detectives, setDetectives]     = useState([]);
  const [pagination, setPagination]     = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [listLoading, setListLoading]   = useState(true);

  const [searchInput, setSearchInput]   = useState("");
  const [search, setSearch]             = useState("");

  /* ── fetch stats ── */
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await authService.getDetectiveStats();
      setStats(res?.data?.data ?? res?.data ?? null);
    } catch {
      // non-critical
    } finally {
      setStatsLoading(false);
    }
  }, []);

  /* ── fetch list ── */
  const fetchDetectives = useCallback(async (page = 1) => {
    setListLoading(true);
    try {
      const res = await authService.getAllDetectives({
        page,
        limit: pagination.limit,
        search,
        ...tabToFilters(activeTab),
      });
      const data = res?.data?.data ?? res?.data ?? {};
      setDetectives(data.detectives ?? []);
      setPagination((p) => ({
        ...p,
        page:       data.pagination?.page       ?? page,
        total:      data.pagination?.total      ?? 0,
        totalPages: data.pagination?.totalPages ?? 1,
      }));
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to load detectives");
    } finally {
      setListLoading(false);
    }
  }, [activeTab, search, pagination.limit]); // eslint-disable-line

  /* ── effects ── */
  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchDetectives(1); }, [activeTab, search]); // eslint-disable-line

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  /* ── tab change ── */
  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchParams(key !== "all" ? { tab: key } : {});
  };

  /* ── stat cards ── */
  const statCards = [
    { title: "Total Detectives",   value: fmt(stats?.totalDetectives),  color: "text-white"      },
    { title: "Pending KYC",        value: fmt(stats?.pendingKyc),       color: "text-yellow-400" },
    { title: "Approved",           value: fmt(stats?.approved),         color: "text-green-400"  },
    { title: "Currently on Cases", value: fmt(stats?.currentlyOnCases), color: "text-blue-400"   },
  ];

  const tabCount = (key) => {
    if (!stats) return null;
    switch (key) {
      case "on_case":   return stats.currentlyOnCases;
      case "available": return stats.available;
      case "pending":   return stats.pendingKyc;
      case "approved":  return stats.approved;
      default:          return null;
    }
  };

  /* ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="p-3 sm:p-6 text-white bg-[#08141B] min-h-screen font-[Montserrat]">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Detective Management</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage all detectives, review KYC documents, and monitor performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-5 py-5">
            <p className="text-sm text-gray-400 mb-4">{s.title}</p>
            {statsLoading ? (
              <div className="h-8 w-16 bg-white/5 rounded animate-pulse" />
            ) : (
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-white">
            {TABS.find((t) => t.key === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-2 bg-[#08141B] border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-auto">
            <Search size={13} className="text-[#9CA3AF] shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search detectives..."
              className="bg-transparent text-xs text-white placeholder:text-[#9CA3AF] outline-none w-full sm:w-44"
            />
            {searchInput && (
              <button onClick={() => setSearchInput("")}>
                <X size={12} className="text-gray-500 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {TABS.map((t) => {
            const active = activeTab === t.key;
            const count  = tabCount(t.key);
            return (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/20 whitespace-nowrap transition font-medium ${
                  active ? "bg-[#FF4959] text-white" : "bg-[#FFFFFF08] text-white hover:bg-white/10"
                }`}
              >
                {t.icon}
                {t.label}
                {count != null ? ` (${count})` : ""}
              </button>
            );
          })}
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="border-b border-white/10 text-white text-sm">
                <th className="text-left py-3 font-medium w-[22%]">Detective</th>
                <th className="text-left py-3 font-medium w-[16%]">Specialization</th>
                <th className="text-left py-3 font-medium w-[10%]">Status</th>
                <th className="text-left py-3 font-medium w-[12%]">KYC Status</th>
                <th className="text-left py-3 font-medium w-[12%]">Cases</th>
                <th className="text-left py-3 font-medium w-[10%]">Joined</th>
                <th className="text-left py-3 font-medium w-[18%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : detectives.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <AlertCircle size={28} className="opacity-40" />
                      <span className="text-sm">No detectives found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                detectives.map((d) => (
                  <tr key={d.id} className="border-b border-white/5 hover:bg-[#132735] transition">

                    <td className="py-3.5 pr-3">
                      <p className="font-medium text-sm text-white">{d.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">✉ {d.email}</p>
                      {d.city && <p className="text-xs text-gray-500 mt-0.5">{d.city}</p>}
                    </td>

                    <td className="py-3.5 pr-3">
                      {d.specialization ? (
                        <span className="text-xs text-white border border-white/10 rounded-lg px-3 py-1">
                          {d.specialization}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>

                    <td className="py-3.5 pr-3">
                      <StatusBadge status={d.status} />
                    </td>

                    <td className="py-3.5 pr-3">
                      <KYCBadge kycStatus={d.kycStatus} />
                    </td>

                    <td className="py-3.5 pr-3 text-xs leading-5">
                      <p className="text-white font-semibold">Active: {d.activeCases ?? 0}</p>
                      <p className="text-gray-400">Done: {d.completedCases ?? 0}</p>
                    </td>

                    <td className="py-3.5 pr-3 text-xs text-gray-400">
                      {fmtDate(d.joinedAt)}
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        {d.kycStatus === "pending" ? (
                          <>
                            <button
                              onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${d.id}`)}
                              className="w-7 h-7 rounded-md bg-[#FF4959] flex items-center justify-center hover:bg-[#b82231] transition"
                              title="Review KYC"
                            >
                              <CheckCircle size={13} className="text-white" />
                            </button>
                            <button
                              onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${d.id}`)}
                              className="w-7 h-7 rounded-md bg-[#DC262699] flex items-center justify-center hover:bg-[#b82231] transition"
                              title="Reject KYC"
                            >
                              <X size={13} className="text-white" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${d.id}`)}
                            className="flex items-center gap-1 text-xs text-white border border-white/20 hover:border-white/50 rounded px-2 py-1 transition bg-[#FFFFFF08]"
                          >
                            <MapPin size={11} /> Track
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${d.id}`)}
                          className="text-white hover:text-gray-300 transition"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden flex flex-col gap-2">
          {listLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : detectives.length === 0 ? (
            <div className="py-10 flex flex-col items-center gap-2 text-gray-500">
              <AlertCircle size={28} className="opacity-40" />
              <span className="text-sm">No detectives found</span>
            </div>
          ) : (
            detectives.map((d) => (
              <div key={d.id} className="bg-[#132735] rounded-xl p-3 border border-white/5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-white truncate">{d.name}</p>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-xs text-gray-400 mb-2 truncate">{d.email}</p>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {d.specialization && (
                    <span className="text-xs text-white border border-white/10 rounded-md px-2 py-0.5">
                      {d.specialization}
                    </span>
                  )}
                  <KYCBadge kycStatus={d.kycStatus} />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span>Active: <span className="text-white font-medium">{d.activeCases ?? 0}</span></span>
                  <span>Done: <span className="text-white font-medium">{d.completedCases ?? 0}</span></span>
                  <span className="ml-auto">{fmtDate(d.joinedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {d.kycStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${d.id}`)}
                        className="flex items-center gap-1 text-xs bg-[#FF4959] text-white rounded-md px-2.5 py-1"
                      >
                        <CheckCircle size={11} /> Approve
                      </button>
                      <button
                        onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_KYC}/${d.id}`)}
                        className="flex items-center gap-1 text-xs bg-[#DC262699] text-white rounded-md px-2.5 py-1"
                      >
                        <X size={11} /> Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${d.id}`)}
                      className="flex items-center gap-1 text-xs text-white border border-white/20 rounded-md px-2.5 py-1 bg-[#FFFFFF08]"
                    >
                      <MapPin size={11} /> Track
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`${ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL}/${d.id}`)}
                    className="flex items-center gap-1 text-xs text-white border border-white/20 rounded-md px-2.5 py-1 bg-[#FFFFFF08]"
                  >
                    <Eye size={11} /> View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Pagination ── */}
        {!listLoading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 text-sm text-gray-400">
            <span>
              Showing {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchDetectives(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-white font-medium px-1">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchDetectives(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDetectiveManagementPage;

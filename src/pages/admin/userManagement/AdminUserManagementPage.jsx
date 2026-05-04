import React, { useState } from "react";
import { Search, CheckCircle, XCircle, MinusCircle, Ban, UserCheck, RefreshCw, Eye, Mail, Phone, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import { useUserManagement } from "../../../hooks/useUserManagement";

const TABS = [
  { key: "", label: "All Users", icon: null },
  { key: "active", label: "Active", icon: <CheckCircle size={11} /> },
  { key: "inactive", label: "Inactive", icon: <MinusCircle size={11} /> },
  { key: "blocked", label: "Blocked", icon: <Ban size={11} /> },
];

const StatusBadge = ({ status }) => {
  const map = {
    active: { cls: "bg-[#00C9501A] text-green-400 border border-green-500/30 rounded-md", icon: <CheckCircle size={10} /> },
    inactive: { cls: "bg-[#6A72821A] text-gray-400 border border-white/10 rounded-md", icon: <MinusCircle size={10} /> },
    blocked: { cls: "bg-[#FB2C361A] text-red-400 border border-red-500/30 rounded-md", icon: <XCircle size={10} /> },
  };
  const s = map[status?.toLowerCase()] || map.inactive;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${s.cls}`}>
      {s.icon} {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

const ActionButton = ({ user, onBlock, onUnblock, loading }) => {
  if (user.isBlocked) {
    return (
      <button
        onClick={() => onUnblock(user.id)}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#FF4959] hover:bg-[#b82231] text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={11} className="animate-spin" /> : <UserCheck size={11} />}
        Unblock
      </button>
    );
  }
  
  return (
    <button
      onClick={() => onBlock(user.id)}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[#DC262699] hover:bg-[#b82231] text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={11} className="animate-spin" /> : <Ban size={11} />}
      Block
    </button>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 size={32} className="animate-spin text-[#FF4959]" />
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-4">
    <AlertCircle size={48} className="text-red-400" />
    <p className="text-gray-400 text-sm">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4959] hover:bg-[#b82231] text-white rounded-lg text-sm transition"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    )}
  </div>
);

const AdminUserManagementPage = () => {
  const navigate = useNavigate();
  const {
    users,
    stats,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
    blockUser,
    unblockUser,
    refresh,
  } = useUserManagement();

  const [searchInput, setSearchInput] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleSearch = (value) => {
    setSearchInput(value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      updateFilters({ search: value });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleTabChange = (status) => {
    updateFilters({ status });
  };

  const handleBlockUser = async (userId) => {
    setActionLoadingId(userId);
    await blockUser(userId, "Blocked by admin");
    setActionLoadingId(null);
  };

  const handleUnblockUser = async (userId) => {
    setActionLoadingId(userId);
    await unblockUser(userId);
    setActionLoadingId(null);
  };

  const getTabLabel = () => {
    const tab = TABS.find((t) => t.key === filters.status);
    return tab ? tab.label : "All Users";
  };

  const getTabCount = (key) => {
    if (key === "") return stats.totalUsers;
    if (key === "active") return stats.activeUsers;
    if (key === "inactive") return stats.inactiveUsers;
    if (key === "blocked") return stats.blockedUsers;
    return 0;
  };

  return (
    <div className="p-4 sm:p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Manage all users, view activity, and control access
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Users", value: stats.totalUsers, color: "text-white" },
          { title: "Active Users", value: stats.activeUsers, color: "text-green-400" },
          { title: "Inactive Users", value: stats.inactiveUsers, color: "text-white" },
          { title: "Blocked Users", value: stats.blockedUsers, color: "text-red-400" },
        ].map((s) => (
          <div key={s.title} className="bg-[#1A2832] border border-white/5 rounded-xl px-5 py-5">
            <p className="text-sm text-gray-400 mb-4">{s.title}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold">{getTabLabel()}</h2>
          <div className="flex items-center gap-2 bg-[#1A2832] border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-auto">
            <Search size={13} className="text-gray-500 flex-shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full sm:w-40"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {TABS.map((t) => {
            const active = filters.status === t.key;
            const count = getTabCount(t.key);
            return (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition font-medium border border-white/10 ${
                  active
                    ? "bg-[#FF4959] text-white border-[#D92B3A]"
                    : "bg-[#1A2832] text-gray-300 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && <ErrorMessage message={error} onRetry={refresh} />}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No users found.</p>
        )}

        {/* Mobile Cards */}
        {!loading && !error && users.length > 0 && (
          <div className="flex flex-col gap-3 md:hidden">
            {users.map((u) => (
              <div key={u.id} className="bg-[#132735] border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FF4959] flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">ID: {u.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <StatusBadge status={u.status} />
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Mail size={11} className="text-gray-500" /> {u.email}
                  </p>
                  <p className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Phone size={11} className="text-gray-500" /> {u.phone}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {new Date(u.joinedAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs">
                      <span className="font-bold text-white">{u.totalCases}</span>
                      <span className="text-gray-400"> cases</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ActionButton
                      user={u}
                      onBlock={handleBlockUser}
                      onUnblock={handleUnblockUser}
                      loading={actionLoadingId === u.id}
                    />
                    <button
                      onClick={() => navigate(ROUTES.ADMIN_USER_MANAGEMENT_DETAIL.replace(':userId', u.id))}
                      className="text-white hover:text-white transition"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && !error && users.length > 0 && (
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
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-[#132735] transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FF4959] flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white">{u.name}</p>
                          <p className="text-xs text-gray-400">ID: {u.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <p className="text-xs text-gray-300 flex items-center gap-1.5 mb-1">
                        <Mail size={11} className="text-gray-500" /> {u.email}
                      </p>
                      <p className="text-xs text-gray-300 flex items-center gap-1.5">
                        <Phone size={11} className="text-gray-500" /> {u.phone}
                      </p>
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="py-3.5 text-xs text-gray-400">
                      {new Date(u.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 text-sm">
                      <span className="font-bold text-white">{u.totalCases}</span>
                      <span className="text-gray-400 text-xs"> cases</span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-[90px]">
                          <ActionButton
                            user={u}
                            onBlock={handleBlockUser}
                            onUnblock={handleUnblockUser}
                            loading={actionLoadingId === u.id}
                          />
                        </div>
                        <button
                          onClick={() => navigate(ROUTES.ADMIN_USER_MANAGEMENT_DETAIL.replace(':userId', u.id))}
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
        )}

        {/* Pagination */}
        {!loading && !error && users.length > 0 && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/5">
            <p className="text-xs text-gray-400">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changePage(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1.5 text-xs rounded-md bg-[#1A2832] border border-white/10 text-white hover:bg-[#132735] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => changePage(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1.5 text-xs rounded-md bg-[#1A2832] border border-white/10 text-white hover:bg-[#132735] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MinusCircle,
  Ban,
  User,
  Shield,
  Briefcase,
  Eye,
  Phone,
  Mail,
  Loader2,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { ROUTES } from "../../../core/constants/routes.constant";
import { useUserDetails } from "../../../hooks/useUserDetails";

const StatusBadge = ({ status }) => {
  const map = {
    active: {
      cls: "bg-[#00C9501A] text-green-400 border border-green-500/30",
      icon: <CheckCircle size={10} />,
    },
    inactive: {
      cls: "bg-gray-500/20 text-gray-400 border border-white/10",
      icon: <MinusCircle size={10} />,
    },
    blocked: {
      cls: "bg-red-500/20 text-red-400 border border-red-500/30",
      icon: <XCircle size={10} />,
    },
  };
  const s = map[status?.toLowerCase()] || map.inactive;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md ${s.cls}`}>
      {s.icon} {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

const PriorityBadge = ({ p }) => {
  const map = {
    urgent: "bg-[#FB2C361A] text-red-400 border border-red-500/30",
    high: "bg-[#FF69001A] text-orange-400 border border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    low: "bg-green-500/20 text-green-400 border border-green-500/30",
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-md ${map[p?.toLowerCase()] || map.low}`}>
      {p}
    </span>
  );
};

const CaseStatusBadge = ({ s }) => {
  const val = s?.toLowerCase();
  const map = {
    "insights submitted": "bg-[#F0B1001A] text-yellow-400 border border-yellow-500/30",
    "report ready": "bg-[#00C9501A] text-green-400 border border-green-500/30",
    "in progress": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    completed: "bg-green-500/20 text-green-400 border border-green-500/30",
    pending: "bg-gray-500/20 text-gray-400 border border-white/10",
    assigned: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-md ${map[val] || "bg-gray-500/20 text-gray-400"}`}>
      {s}
    </span>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 size={48} className="animate-spin text-[#FF4959]" />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-4">
    <AlertCircle size={48} className="text-red-400" />
    <p className="text-gray-400 text-sm">{message}</p>
  </div>
);

const AdminUserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error, actionLoading, blockUser, unblockUser } = useUserDetails(userId);
  const [blockReason, setBlockReason] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);

  const handleBlock = async () => {
    const success = await blockUser(blockReason || "Blocked by admin");
    if (success) {
      setShowBlockModal(false);
      setBlockReason("");
    }
  };

  const handleUnblock = async () => {
    await unblockUser();
  };

  if (loading) {
    return (
      <div className="p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">
        <ErrorMessage message={error || "User not found"} />
      </div>
    );
  }

  const cardCls = "bg-[#1A2832] border border-white/5 rounded-xl p-5";

  return (
    <div className="p-4 sm:p-6 text-white  min-h-screen font-[Montserrat]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate(ROUTES.ADMIN_USER_MANAGEMENT)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition flex-shrink-0"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
            <p className="text-xs sm:text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        {user.isBlocked ? (
          <button
            onClick={handleUnblock}
            disabled={actionLoading}
            className="flex items-center gap-2 bg-[#FF4959] hover:bg-[#b82231] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <UserCheck size={13} />
            )}
            Unblock User
          </button>
        ) : (
          <button
            onClick={() => setShowBlockModal(true)}
            disabled={actionLoading}
            className="flex items-center gap-2 bg-[#DC262699] hover:bg-[#b82231] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? <Loader2 size={13} className="animate-spin" /> : <Ban size={13} />}
            Block User
          </button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Account Status</p>
          <StatusBadge status={user.status} />
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Total Cases</p>
          <p className="text-2xl sm:text-3xl font-bold">{user.caseStats?.total || 0}</p>
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Pending Cases</p>
          <p className="text-2xl sm:text-3xl font-bold">{user.caseStats?.pending || 0}</p>
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Completed Cases</p>
          <p className="text-2xl sm:text-3xl font-bold">{user.caseStats?.completed || 0}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Personal Info */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <User size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Phone</p>
              <p className="text-sm flex items-center gap-1">
                <Phone size={11} className="text-white" /> {user.phone}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Email</p>
              <p className="text-sm flex items-center gap-1">
                <Mail size={11} className="text-white" /> {user.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">City</p>
              <p className="text-sm">{user.city}</p>
            </div>
            {user.aadharNumber && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Aadhar Card Number</p>
                <p className="text-sm">{user.aadharNumber}</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Account Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Account Status</p>
              <StatusBadge status={user.status} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Online Status</p>
              <span
                className={`px-3 py-1 text-xs rounded-md font-medium ${
                  user.isOnline
                    ? "bg-[#00C9501A] text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-white/10"
                }`}
              >
                {user.isOnline ? "Online" : "Offline"}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Joined Date</p>
              <p className="text-sm">{new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
            {user.lastLogin && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Last Login</p>
                <p className="text-sm">{new Date(user.lastLogin).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Block Info (if blocked) */}
        {user.isBlocked && (
          <div className={`${cardCls} lg:col-span-2`}>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={15} className="text-red-400" />
              <h3 className="text-sm font-semibold text-red-400">Block Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Blocked At</p>
                <p className="text-sm">{new Date(user.blockedAt).toLocaleString()}</p>
              </div>
              {user.blockedBy && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Blocked By</p>
                  <p className="text-sm">{user.blockedBy.name}</p>
                </div>
              )}
              {user.blockReason && (
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 mb-0.5">Reason</p>
                  <p className="text-sm">{user.blockReason}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Case History */}
      <div className={cardCls}>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={15} className="text-white" />
          <h3 className="text-sm font-semibold">
            Case History ({user.recentCases?.length || 0} of {user.caseStats?.total || 0})
          </h3>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {!user.recentCases || user.recentCases.length === 0 ? (
            <p className="py-8 text-center text-white text-sm">No cases present</p>
          ) : (
            user.recentCases.map((c, i) => (
              <div key={i} className="bg-[#132735] border border-white/5 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-400">{c.form_number}</p>
                    <p className="text-sm text-white font-medium">{c.investigation_type || "Case"}</p>
                  </div>
                  <CaseStatusBadge s={c.status} />
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <PriorityBadge p={c.priority} />
                  <span className="text-xs text-gray-400">
                    {new Date(c.submitted_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {c.assigned_at ? "Assigned" : "Unassigned"}
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: { id: c.id } } })}
                    className="flex items-center gap-1 text-xs text-white hover:text-white transition"
                  >
                    <Eye size={13} /> View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-white text-xs">
                <th className="text-left py-3 font-medium">Case Number</th>
                <th className="text-left py-3 font-medium">Status</th>
                <th className="text-left py-3 font-medium">Priority</th>
                <th className="text-left py-3 font-medium">Submitted</th>
                <th className="text-left py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!user.recentCases || user.recentCases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white text-sm">
                    No cases present
                  </td>
                </tr>
              ) : (
                user.recentCases.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">
                    <td className="py-3 text-xs text-gray-300">{c.form_number}</td>
                    <td className="py-3">
                      <CaseStatusBadge s={c.status} />
                    </td>
                    <td className="py-3">
                      <PriorityBadge p={c.priority} />
                    </td>
                    <td className="py-3 text-xs text-white">
                      {new Date(c.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: { id: c.id } } })}
                        className="flex items-center gap-1 text-xs text-white hover:text-white transition"
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Block User</h3>
            <p className="text-sm text-gray-400 mb-4">
              Are you sure you want to block {user.name}? They will not be able to log in.
            </p>
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-2 block">Reason (optional)</label>
              <textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Enter reason for blocking..."
                className="w-full bg-[#132735] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#FF4959] resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setBlockReason("");
                }}
                className="flex-1 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-white rounded-lg text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-[#DC262699] hover:bg-[#b82231] text-white rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Blocking..." : "Block User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetailsPage;
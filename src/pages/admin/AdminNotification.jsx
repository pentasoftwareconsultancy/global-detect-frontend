import React, { useState } from "react";
import { Bell, Filter, Clock, Trash2, FileText, UserPlus, MapPin, AlertCircle, CheckCircle, Download } from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1, title: "Case Updated", unread: true, type: "cases",
    desc: "Detective Watson submitted new insights for Case #1234",
    icon: "file-red", actions: ["View Case", "Mark as Read", "Delete"],
  },
  {
    id: 2, title: "New Case Assigned", unread: true, type: "cases",
    desc: "You have been assigned to Case #1235 - Insurance Fraud Investigation",
    icon: "user-purple", actions: ["View Details", "Mark as Read", "Delete"],
  },
  {
    id: 3, title: "Report Ready", unread: false, type: "system",
    desc: "Final investigation report for Case #1232 is ready for download",
    icon: "check-green", actions: ["Download Report", "Delete"],
  },
  {
    id: 4, title: "Location Update Required", unread: true, type: "system",
    desc: "Please update your location for active investigation Case #1234",
    icon: "map-blue", actions: ["Mark as Read", "Delete"],
  },
  {
    id: 5, title: "Case Priority Changed", unread: false, type: "cases",
    desc: "Case #1236 priority has been upgraded to Urgent",
    icon: "file-blue", actions: ["View Case", "Delete"],
  },
  {
    id: 6, title: "Deadline Approaching", unread: true, type: "cases",
    desc: "Case #1237 deadline is in 24 hours",
    icon: "alert-orange", actions: ["View Case", "Mark as Read", "Delete"],
  },
  {
    id: 7, title: "New Team Member", unread: false, type: "team",
    desc: "Detective Johnson has joined the agency",
    icon: "file-blue", actions: ["Delete"],
  },
  {
    id: 8, title: "Evidence Uploaded", unread: false, type: "cases",
    desc: "New evidence has been uploaded to Case #1234",
    icon: "check-green", actions: ["View Evidence", "Delete"],
  },
  {
    id: 9, title: "Case Status Changed", unread: false, type: "cases",
    desc: "Case #1238 status updated to Report Ready",
    icon: "file-red", actions: ["View Case", "Delete"],
  },
  {
    id: 10, title: "System Maintenance", unread: false, type: "system",
    desc: "Scheduled maintenance on Saturday 10 PM - 2 AM",
    icon: "file-blue", actions: ["Delete"],
  },
];

const TABS = [
  { key: "all",    label: "All" },
  { key: "cases",  label: "Cases" },
  { key: "system", label: "System" },
  { key: "team",   label: "Team" },
];

const NotifIcon = ({ type }) => {
  const base = "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0";
  if (type === "file-red")    return <div className={`${base} bg-red-500/20`}><FileText size={15} className="text-red-400" /></div>;
  if (type === "user-purple") return <div className={`${base} bg-purple-500/20`}><UserPlus size={15} className="text-purple-400" /></div>;
  if (type === "check-green") return <div className={`${base} bg-green-500/20`}><CheckCircle size={15} className="text-green-400" /></div>;
  if (type === "map-blue")    return <div className={`${base} bg-blue-500/20`}><MapPin size={15} className="text-blue-400" /></div>;
  if (type === "file-blue")   return <div className={`${base} bg-blue-500/20`}><FileText size={15} className="text-blue-400" /></div>;
  if (type === "alert-orange")return <div className={`${base} bg-orange-500/20`}><AlertCircle size={15} className="text-orange-400" /></div>;
  return <div className={`${base} bg-gray-500/20`}><Bell size={15} className="text-gray-400" /></div>;
};

const ActionBtn = ({ label, onMarkRead, onDelete }) => {
  const isPrimary = label.startsWith("View") || label.startsWith("Download");
  if (isPrimary) {
    return (
      <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md bg-[#FF4959] hover:bg-[#b82231] text-white font-medium transition">
        {label === "Download Report" && <Download size={11} />}
        {label}
      </button>
    );
  }
  if (label === "Delete") {
    return (
      <button onClick={onDelete} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md text-white hover:text-white transition">
        <Trash2 size={11} /> Delete
      </button>
    );
  }
  // Mark as Read
  return (
    <button onClick={onMarkRead} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md text-white hover:text-white transition border border-gray-200/20 hover:border-gray-200/50">
      <Clock size={11} /> {label}
    </button>
  );
};

const AdminNotification = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = activeTab === "all"
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const clearAll    = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-[#121F27] text-white p-4 sm:p-6 font-[Montserrat]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-[#FF4959]" />
            <h1 className="text-xl sm:text-2xl font-bold">Notifications</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">{unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-white hover:text-white hover:border-white/30 px-3 py-1.5 rounded-lg transition whitespace-nowrap"
          >
            <Clock size={12} /> Mark All Read
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs border border-white/10 text-white hover:text-white hover:border-white/30 px-3 py-1.5 rounded-lg transition whitespace-nowrap"
          >
            <Trash2 size={12} /> Clear All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A2832] border border-white/5 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={13} className="text-white" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => {
            const isActive = activeTab === t.key;
            const count = t.key === "all" ? notifications.length : notifications.filter(n => n.type === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition ${
                  isActive
                    ? "bg-[#FF4959] text-white"
                    : "bg-[#1A2832] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                {t.label}
                {isActive && <span className="bg-[#2D3E4D] text-white text-[10px] px-1.5 py-0.5 rounded-md">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="bg-[#1A2832] border border-white/5 rounded-xl p-8 text-center text-gray-400 text-sm">
            No notifications
          </div>
        )}
        {filtered.map(n => (
          <div
            key={n.id}
            className={`bg-[#1A2832] border rounded-xl p-4 ${n.unread ? " bg-[#FF49590D] border-[#D92B3A]/30" : "border-white/5"}`}
          >
            <div className="flex items-start gap-3">
              <NotifIcon type={n.icon} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#FF4959] flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-400 mb-3">{n.desc}</p>
                <div className="flex items-center flex-wrap gap-1.5">
                  {n.actions.map((act, i) => (
                    <ActionBtn
                      key={i}
                      label={act}
                      onMarkRead={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                      onDelete={() => setNotifications(prev => prev.filter(x => x.id !== n.id))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotification;

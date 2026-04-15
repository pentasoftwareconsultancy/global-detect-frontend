import React, { useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrash,
  FaEye,
  FaCheck,
  FaRegCheckCircle,
} from "react-icons/fa";

const initialNotifications = [
  {
    id: 1,
    title: "Case Updated",
    desc: "Detective Watson submitted new insights for Case #1234",
    time: "5 min ago",
    type: "alert",
    category: "Cases",
    read: false,
    link: "/cases/1234",
  },
  {
    id: 2,
    title: "New Case Assigned",
    desc: "You have been assigned Case #5678",
    time: "1 hour ago",
    type: "info",
    category: "Cases",
    read: false,
    link: "/cases/5678",
  },
  {
    id: 3,
    title: "Report Ready",
    desc: "Final investigation report is ready",
    time: "2 hours ago",
    type: "success",
    category: "System",
    read: false,
    link: "/reports",
  },
  {
    id: 5,
    title: "New Team Member",
    desc: "John joined your team",
    time: "1 day ago",
    type: "info",
    category: "Team",
    read: false,
    link: "/team",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheckCircle className="text-green-400" />;
    case "warning":
      return <FaExclamationCircle className="text-yellow-400" />;
    case "alert":
      return <FaExclamationCircle className="text-red-400" />;
    default:
      return <FaBell className="text-blue-400" />;
  }
};

const UserNotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  // ✅ MARK AS READ
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // ✅ DELETE
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ✅ MARK ALL READ
  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  // ✅ CLEAR ALL
  const clearAll = () => {
    setNotifications([]);
  };

  // ✅ VIEW ACTION (IMPORTANT 🔥)
  const handleView = (note) => {
    markAsRead(note.id);

    // 👉 If using react-router
    window.location.href = note.link;

    // OR use this if using react-router-dom:
    // navigate(note.link)
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-4 sm:p-6">

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
    <div className="mb-2 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 sm:gap-3">

        {/* Bell Icon */}
        <span className="text-red-500 text-xl sm:text-2xl">
          <FaBell />
        </span>

        Notifications
      </h1>

      {/* Sub text */}
      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        {unreadCount} unread notification{unreadCount !== 1 && "s"}
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
      <button
        onClick={markAllRead}
        className="flex items-center justify-center gap-2 bg-[#1e293b] px-3 py-2 rounded hover:bg-blue-500 w-full sm:w-auto text-sm"
      >
         <FaRegCheckCircle />  Mark All Read
      </button>

      <button
        onClick={clearAll}
        className="flex items-center justify-center gap-2 bg-[#1e293b] px-3 py-2 rounded hover:bg-red-500 w-full sm:w-auto text-sm"
      >
        <FaTrash /> Clear All
      </button>
    </div>
  </div>

  {/* FILTERS */}
  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
    {["All", "Cases", "System", "Team"].map((item) => (
      <button
        key={item}
        onClick={() => setFilter(item)}
        className={`px-3 sm:px-4 py-1 text-sm rounded-full ${
          filter === item
            ? "bg-red-500"
            : "bg-[#1e293b] hover:bg-blue-500"
        }`}
      >
        {item}
      </button>
    ))}
  </div>

  {/* LIST */}
  <div className="space-y-4">
    {filteredNotifications.map((note) => (
      <div
        key={note.id}
        className={`p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between gap-3 ${
          note.read
            ? "bg-[#1e293b]/60"
            : "bg-[#1e293b] border border-red-500/40"
        }`}
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="text-lg sm:text-xl mt-1">{getIcon(note.type)}</div>

          <div>
            <h2 className="font-semibold text-sm sm:text-base">{note.title}</h2>
            <p className="text-xs sm:text-sm text-gray-400">{note.desc}</p>

            <div className="flex gap-2 sm:gap-3 mt-2 flex-wrap">
              {/* VIEW */}
              <button
                onClick={() => handleView(note)}
                className="flex items-center gap-1 bg-red-500 px-3 py-1 text-xs sm:text-sm rounded hover:bg-red-600"
              >
                <FaEye /> View
              </button>

              {!note.read && (
                <button
                  onClick={() => markAsRead(note.id)}
                  className="flex items-center gap-1 text-xs sm:text-sm hover:text-green-400"
                >
                  <FaRegCheckCircle /> Mark as Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(note.id)}
                className="flex items-center gap-1 text-xs sm:text-sm hover:text-red-400"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* TIME */}
        <span className="text-xs text-gray-400 sm:text-right">
          {note.time}
        </span>
      </div>
    ))}
  </div>
</div>
  );
};

export default UserNotificationPage;
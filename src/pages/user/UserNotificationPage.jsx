import React, { useState } from "react";
import {
  MdNotifications, MdCheckCircle, MdError, MdInfo,
  MdDelete, MdVisibility, MdTaskAlt, MdFilterList,
  MdClear, MdLocationOn, MdPerson, MdDescription,
  MdWarning,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";

const initialNotifications = [
  { id: 1, title: "Case Updated", desc: "Detective Watson submitted new insights for Case #1234", time: "5 min ago", type: "doc", category: "Cases", read: false, link: "/cases/1234" },
  { id: 2, title: "New Case Assigned", desc: "You have been assigned Case #1235 - Insurance Fraud Investigation", time: "1 hour ago", type: "person", category: "Cases", read: false, link: "/cases/1235" },
  { id: 3, title: "Report Ready", desc: "Final investigation report for Case #1232 is ready for download", time: "2 hours ago", type: "success", category: "System", read: true, link: "/reports" },
  { id: 4, title: "Location Update Required", desc: "Please update your location for active investigation Case #1234", time: "3 hours ago", type: "location", category: "System", read: false, link: "/cases/1234" },
  { id: 5, title: "Case Priority Changed", desc: "Case #1236 priority has been upgraded to Urgent", time: "5 hours ago", type: "doc", category: "Cases", read: true, link: "/cases/1236" },
  { id: 6, title: "Deadline Approaching", desc: "Case #1237 deadline is in 24 hours", time: "6 hours ago", type: "warning", category: "Cases", read: false, link: "/cases/1237" },
  { id: 7, title: "New Team Member", desc: "Detective Johnson has joined the agency", time: "1 day ago", type: "person", category: "Team", read: true, link: "/team" },
  { id: 8, title: "Evidence Uploaded", desc: "New evidence has been uploaded to Case #6054", time: "1 day ago", type: "doc", category: "Cases", read: true, link: "/cases/6054" },
  { id: 9, title: "Case Status Changed", desc: "Case #3821 status changed to In Report Review", time: "2 days ago", type: "info", category: "Cases", read: true, link: "/cases/3821" },
  { id: 10, title: "System Maintenance", desc: "Scheduled maintenance on Saturday 10 PM - 2 AM", time: "3 days ago", type: "system", category: "System", read: true, link: "/system" },
];

const TypeIcon = ({ type }) => {
  const cls = "text-xl flex-shrink-0 mt-0.5";
  const map = {
    success: <MdCheckCircle className={`${cls} text-green-400`} />,
    warning: <MdWarning className={`${cls} text-orange-400`} />,
    alert: <MdError className={`${cls} text-red-400`} />,
    system: <MdInfo className={`${cls} text-gray-400`} />,
    location: <MdLocationOn className={`${cls} text-purple-400`} />,
    person: <MdPerson className={`${cls} text-pink-400`} />,
    doc: <MdDescription className={`${cls} text-blue-400`} />,
    info: <FaBell className={`${cls} text-blue-400`} />,
  };
  return map[type] ?? map.info;
};

const viewLabel = { Cases: "View Case", System: "Download Report", Team: "View Details" };
const catColor = { Cases: "text-blue-400", System: "text-purple-400", Team: "text-green-400" };

const UserNotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");
  const [unreadOnly, setUnreadOnly] = useState(false);

  // handlers — swap body with API calls for backend integration
  const markAsRead = (id) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id) => setNotifications((p) => p.filter((n) => n.id !== id));
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);
  const handleView = (n) => { markAsRead(n.id); window.location.href = n.link; };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  const filtered = notifications
    .filter((n) => filter === "All" || n.category === filter)
    .filter((n) => !unreadOnly || !n.read);

  const headerBtn = "flex items-center gap-2 border border-[#2a3a48] text-white text-[13px] font-medium font-['Montserrat'] px-4 py-2 rounded-lg hover:bg-[#1A2832] transition-colors duration-200 whitespace-nowrap";

  return (
    <div className="w-full font-['Montserrat'] p-0 m-0">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-['Montserrat'] font-medium text-2xl leading-[21px] tracking-normal text-white flex items-center gap-2.5">
            <MdNotifications className="text-red-500 flex-shrink-0" size={26} />
            Notifications
          </h1>
          <p className="text-[#9CA3AF] text-sm font-normal leading-5 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={markAllRead} className={headerBtn}>
            <MdTaskAlt size={15} className="text-gray-400" /> Mark All Read
          </button>
          <button onClick={clearAll} className={headerBtn}>
            <MdClear size={15} className="text-gray-400" /> Clear All
          </button>
        </div>
      </div>

      {/* FILTERS CARD */}
      <div className="bg-[#1A2832] border border-[#2a3a48] rounded-xl px-5 py-5 mb-5 w-full">        {/* Filter label */}
        <p className="flex items-center gap-2 text-[#9CA3AF] text-[18px] leading-[28px] font-medium mb-4"> <MdFilterList size={16} /> Filters
        </p>
        {/* Pills row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Cases", "System", "Team"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium font-['Montserrat'] border transition-colors duration-200 ${filter === item
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-transparent border-[#2a3a48] text-[#9CA3AF] hover:border-gray-500 hover:text-white"
                  }`}
              >
                {item}
                {item === "All" && (
                  <span className="bg-[#1A2832] text-white text-[10px] font-bold rounded-full w-6 h-5 flex items-center justify-center leading-none border border-white/20">
                    {totalCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Unread Only */}
          <button
            onClick={() => setUnreadOnly((p) => !p)}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium font-['Montserrat'] border transition-colors duration-200 ${unreadOnly
              ? "bg-red-500 border-red-500 text-white"
              : "bg-transparent border-[#2a3a48] text-[#9CA3AF] hover:border-gray-500 hover:text-white"
              }`}
          >
            <FaBell size={12} /> Unread Only
          </button>
        </div>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-center text-[#9CA3AF] text-sm py-16">No notifications found.</p>
        )}

        {filtered.map((note) => (
          <div
            key={note.id}
            className={`rounded-xl border transition-all duration-200 px-3 py-3 ${(note.title === "Deadline Approaching" || note.title === "Case Updated")
              ? "bg-[#1f0f14] border-red-500/40"
              : "bg-[#1A2832] border-0"
              }`}
          >
            <div className="flex items-start gap-3">
              {/* Type icon */}
              <TypeIcon type={note.type} />

              {/* Content */}
              <div className="flex-1 min-w-0">

                {/* Title + category + time */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <p className="text-white font-semibold text-[15px] leading-[22px] tracking-normal flex items-center gap-2 flex-wrap">
                    {note.title}
                    {!note.read && (
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    )}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-medium ${catColor[note.category] ?? "text-gray-400"}`}>
                      {note.category.toLowerCase()}
                    </span>
                    <span className="text-[#9CA3AF] text-xs whitespace-nowrap">{note.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#9CA3AF] text-[12px] leading-5 mt-0.5">{note.desc}</p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {/* View — filled red */}
                  <button
                    onClick={() => handleView(note)}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium font-['Montserrat'] h-8 px-3 rounded-md transition-colors duration-200 whitespace-nowrap"
                  >
                    <MdVisibility size={14} />
                    {viewLabel[note.category] ?? "View"}
                  </button>

                  {/* Mark as Read — ghost with whitish border */}
                  {!note.read && (
                    <button
                      onClick={() => markAsRead(note.id)}
                      className="flex items-center gap-1.5 border border-white/20 text-[#9CA3AF] hover:text-white hover:border-white/40 text-[13px] font-medium font-['Montserrat'] h-8 px-3 rounded-md transition-colors duration-200 whitespace-nowrap"
                    >
                      <MdTaskAlt size={14} /> Mark as Read
                    </button>
                  )}

                  {/* Delete — ghost */}
                  <button
                    onClick={() => remove(note.id)}
                    className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-red-400 text-[13px] font-medium font-['Montserrat'] h-8 px-3 rounded-md transition-colors duration-200 whitespace-nowrap"
                  >
                    <MdDelete size={14} /> Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotificationPage;
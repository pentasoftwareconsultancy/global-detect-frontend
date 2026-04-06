import React, { useState } from "react";

const AdminNotification = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      title: "Case Updated",
      desc: "Detective Watson submitted new insights for Case #1234",
      type: "case",
      highlight: true,
      actions: ["View Case", "Mark as Read", "Delete"]
    },
    {
      title: "New Case Assigned",
      desc: "You have been assigned to Case #1235 - Insurance Fraud Investigation",
      type: "case",
      highlight: true,
      actions: ["View Details", "Mark as Read", "Delete"]
    },
    {
      title: "Report Ready",
      desc: "Final investigation report for Case #1236 is ready for download",
      type: "system",
      actions: ["Download Report", "Delete"]
    },
    {
      title: "Location Update Required",
      desc: "Please update your location for active investigation Case #1234",
      type: "system",
      highlight: true,
      actions: ["Mark as Read", "Delete"]
    },
    {
      title: "Case Priority Changed",
      desc: "Case #1235 priority has been updated to Urgent",
      type: "case",
      actions: ["View Case", "Delete"]
    },
    {
      title: "Deadline Approaching",
      desc: "Case #1237 deadline in 24 hours",
      type: "case",
      highlight: true,
      actions: ["View Case", "Mark as Read", "Delete"]
    },
    {
      title: "New Team Member",
      desc: "Detective Johnson has joined the agency",
      type: "team",
      actions: ["Delete"]
    },
    {
      title: "Evidence Uploaded",
      desc: "New evidence has been uploaded for Case #1238",
      type: "case",
      actions: ["View Evidence", "Delete"]
    },
    {
      title: "Case Status Changed",
      desc: "Case #1236 status updated to Report Ready",
      type: "case",
      actions: ["View Case", "Delete"]
    },
    {
      title: "System Maintenance",
      desc: "Scheduled maintenance on Saturday 10 PM - 2 AM",
      type: "system",
      actions: ["Delete"]
    }
  ];

  const filteredData =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(90deg, #0d0d0d, #0f1a1f)",
        minHeight: "100vh",
        color: "white"
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          🔔 Notifications
        </h2>
        <p style={{ fontSize: "12px", color: "#909090" }}>
          4 unread notifications
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "15px" }}>
        <button style={btnStyle}>Mark All Read</button>
        <button style={btnStyle}>Clear All</button>
      </div>

      {/* FILTER BOX */}
      <div style={filterBox}>
        <p style={{ fontSize: "13px", marginBottom: "10px" }}>Filters</p>

        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "case", "system", "team"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...chip,
                background: filter === f ? "#D92B3A" : "#0f1a1f"
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredData.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#16232d",
              border: item.highlight
                ? "1px solid #D92B3A"
                : "1px solid #1f2f3a",
              borderRadius: "10px",
              padding: "14px"
            }}
          >
            {/* TITLE */}
            <p style={{ fontWeight: "500" }}>{item.title}</p>

            {/* DESC */}
            <p style={{ fontSize: "12px", color: "#909090", marginBottom: "10px" }}>
              {item.desc}
            </p>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {item.actions.map((act, idx) => (
                <button
                  key={idx}
                  style={{
                    padding: "4px 10px",
                    fontSize: "11px",
                    borderRadius: "6px",
                    border: "none",
                    background:
                      act.includes("View") || act.includes("Download")
                        ? "#D92B3A"
                        : "#0f1a1f",
                    color: "white"
                  }}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotification;

/* 🔥 STYLES */
const btnStyle = {
  background: "#0f1a1f",
  border: "1px solid #1f2f3a",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "white",
  fontSize: "12px"
};

const filterBox = {
  background: "#16232d",
  border: "1px solid #1f2f3a",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "20px"
};

const chip = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  color: "white",
  fontSize: "11px"
};
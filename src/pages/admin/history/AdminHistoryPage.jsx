import React, { useState } from "react";

const AdminHistoryPage = () => {
  const [selectedRole, setSelectedRole] = useState("all");

  const activities = [
    {
      title: "Location Updated",
      desc: "Detective James Bond updated location to Hollywood Blvd, Los Angeles",
      time: "4 days ago • 1/3/2026, 11:50 AM",
      role: "detective",
      color: "#a855f7",
      name: "Detective James Bond"
    },
    {
      title: "Location Updated",
      desc: "Detective Emma Watson updated location to Wall Street, New York",
      time: "4 days ago • 1/3/2026, 10:30 AM",
      role: "detective",
      color: "#a855f7",
      name: "Detective Emma Watson"
    },
    {
      title: "Investigation Insights Submitted",
      desc: "Detective Emma Watson submitted insights",
      time: "Jan 28 • 4:30 PM",
      role: "detective",
      color: "#facc15",
      name: "Detective Emma Watson"
    },
    {
      title: "Case Status Updated",
      desc: "Case status changed from in_progress to insights_submitted",
      time: "Jan 28 • 4:30 PM",
      role: "detective",
      color: "#3b82f6",
      name: "Detective Emma Watson"
    },
    {
      title: "New Case Created",
      desc: "Missing Person Investigation case submitted",
      time: "3 days ago",
      role: "user",
      color: "#22c55e",
      name: "Sarah Johnson"
    },
    {
      title: "Document Uploaded",
      desc: "Evidence document uploaded to case",
      time: "2 days ago",
      role: "user",
      color: "#f97316",
      name: "John Smith"
    }
  ];

  const filteredActivities =
    selectedRole === "all"
      ? activities
      : activities.filter((item) => item.role === selectedRole);

  return (
    <div
      style={{
        padding: "16px",
        color: "white",
        background: "linear-gradient(90deg, #0d0d0d, #0f1a1f)",
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#D92B3A" }}>⟳</span> Activity History
        </h2>
        <p style={{ fontSize: "13px", color: "#909090" }}>
          Complete audit trail of all system activities
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "20px"
        }}
      >
        {[
          { title: "Total Activities", value: "20", sub: "All time" },
          { title: "Today", value: "2", sub: "Last 24 hours" },
          { title: "This Week", value: "10", sub: "Last 7 days" }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#16232d",
              border: "1px solid #1f2f3a",
              borderRadius: "12px",
              padding: "16px"
            }}
          >
            <p style={{ fontSize: "12px", color: "#909090" }}>
              {item.title}
            </p>
            <h2>{item.value}</h2>
            <p style={{ fontSize: "12px", color: "#575757" }}>
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div
        style={{
          background: "#16232d",
          border: "1px solid #1f2f3a",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="Search activities by title, user, case number..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #1f2f3a",
            background: "#0f1a1f",
            color: "white",
            marginBottom: "10px"
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap"
          }}
        >
          {["All Time", "Today", "This Week", "This Month"].map((t) => (
            <button
              key={t}
              style={{
                background: t === "All Time" ? "#D92B3A" : "#0f1a1f",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                color: "white",
                fontSize: "12px"
              }}
            >
              {t}
            </button>
          ))}

          {["All Roles", "Detective", "User"].map((r) => {
            const value = r === "All Roles" ? "all" : r.toLowerCase();

            return (
              <button
                key={r}
                onClick={() => setSelectedRole(value)}
                style={{
                  background:
                    selectedRole === value ? "#D92B3A" : "#0f1a1f",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "12px"
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* TIMELINE */}
      <div
        style={{
          background: "#16232d",
          border: "1px solid #1f2f3a",
          borderRadius: "12px",
          padding: "16px"
        }}
      >
        <h3>Activity Timeline ({filteredActivities.length})</h3>
        <p style={{ fontSize: "12px", color: "#909090", marginBottom: "10px" }}>
          Chronological history of all system events and actions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredActivities.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                background: "#0f1a1f",
                border: "1px solid #1f2f3a",
                borderRadius: "10px",
                padding: "12px",
                alignItems: "flex-start"
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  marginTop: "6px",
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0
                }}
              />

              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "500" }}>{item.title}</p>
                <p style={{ fontSize: "12px", color: "#909090" }}>
                  {item.desc}
                </p>

                <span
                  style={{
                    background: "rgba(144, 202, 249, 0.1)",
                    color: "#90caf9",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    fontSize: "10px",
                    display: "inline-block",
                    marginTop: "4px"
                  }}
                >
                  {item.name}
                </span>

                <p style={{ fontSize: "10px", color: "#575757" }}>
                  {item.time}
                </p>
              </div>

              <div style={{ color: "#575757", flexShrink: 0 }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHistoryPage;
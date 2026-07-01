// src/components/AnnouncementCard.jsx
import { AlertCircle, Info } from "lucide-react";

export default function AnnouncementCard({ announcement, onRead, isRead }) {
  const isHigh = announcement.priority === "high";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 14,
      padding: 16,
      marginBottom: 10,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      borderLeft: `4px solid ${isHigh ? "#EF4444" : "#6C3CE1"}`,
      opacity: isRead ? 0.7 : 1,
      cursor: "pointer"
    }}
      onClick={() => onRead && onRead(announcement.id)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isHigh
            ? <AlertCircle size={15} color="#EF4444" />
            : <Info size={15} color="#6C3CE1" />
          }
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>
            {announcement.title}
          </h4>
        </div>
        {!isRead && (
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#6C3CE1", flexShrink: 0, marginTop: 4
          }} />
        )}
      </div>
      <p style={{ margin: "0 0 8px", fontSize: 13, color: "#555", lineHeight: 1.5 }}>
        {announcement.body}
      </p>
      <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>
        {announcement.school} · {announcement.date}
      </p>
    </div>
  );
}

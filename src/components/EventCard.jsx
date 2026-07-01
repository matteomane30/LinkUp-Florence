// src/components/EventCard.jsx
import { Calendar, MapPin, Users } from "lucide-react";

const CATEGORY_COLORS = {
  social:   { bg: "#EDE9FF", text: "#6C3CE1" },
  culture:  { bg: "#FEF3C7", text: "#D97706" },
  language: { bg: "#D1FAE5", text: "#059669" },
  travel:   { bg: "#DBEAFE", text: "#2563EB" },
  food:     { bg: "#FFE4E6", text: "#E11D48" },
  sport:    { bg: "#F0FDF4", text: "#16A34A" },
};

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function EventCard({ event, isJoined, onJoin, onClick }) {
  const colors = CATEGORY_COLORS[event.category] || { bg: "#F3F4F6", text: "#6B7280" };
  const spotsLeft = event.maxAttendees - event.attendees;
  const isFull = spotsLeft <= 0;

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer",
        border: isJoined ? "2px solid #6C3CE1" : "2px solid transparent",
        transition: "all 0.2s"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{
          background: colors.bg,
          color: colors.text,
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: 20,
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          {event.category}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#6C3CE1" }}>
          {event.price}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>
        {event.title}
      </h3>

      {/* Info row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13 }}>
          <Calendar size={13} />
          <span>{formatDate(event.date)} · {event.time}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13 }}>
          <MapPin size={13} />
          <span>{event.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13 }}>
          <Users size={13} />
          <span>{event.attendees} going · {isFull ? "Full" : `${spotsLeft} spots left`}</span>
        </div>
      </div>

      {/* Join button */}
      <button
        onClick={e => { e.stopPropagation(); onJoin && onJoin(event.id); }}
        disabled={isFull && !isJoined}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 12,
          border: "none",
          fontWeight: 600,
          fontSize: 14,
          cursor: isFull && !isJoined ? "not-allowed" : "pointer",
          background: isJoined ? "#EDE9FF" : isFull ? "#f3f4f6" : "#6C3CE1",
          color: isJoined ? "#6C3CE1" : isFull ? "#9ca3af" : "#fff",
          transition: "all 0.2s"
        }}
      >
        {isJoined ? "✓ Joined" : isFull ? "Full" : "Join Event"}
      </button>
    </div>
  );
}

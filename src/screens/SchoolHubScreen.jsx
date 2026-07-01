// src/screens/SchoolHubScreen.jsx
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { getAnnouncements } from "../api/announcements";
import AnnouncementCard from "../components/AnnouncementCard";

export default function SchoolHubScreen() {
  const { currentUser, setNotifications } = useApp();
  const [announcements, setAnnouncements] = useState([]);
  const [readIds, setReadIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncements(currentUser?.school)
      .then(anns => { setAnnouncements(anns); setLoading(false); });
  }, [currentUser]);

  function handleRead(id) {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setNotifications(0);
  }

  const unread = announcements.filter(a => !readIds.has(a.id)).length;

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 20 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>School Hub</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#888" }}>
          {currentUser?.school || "Your school"} · {unread > 0 ? `${unread} unread` : "All read"}
        </p>
      </div>

      {/* School card */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e, #6C3CE1)",
        borderRadius: 16, padding: "18px 20px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 16
      }}>
        <span style={{ fontSize: 36 }}>🏛️</span>
        <div>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 700 }}>
            {currentUser?.school || "ISI Florence"}
          </h3>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
            Official announcements and updates
          </p>
        </div>
      </div>

      {/* Announcements */}
      <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>
        📢 Announcements
      </h2>

      {loading && <p style={{ color: "#aaa", textAlign: "center", padding: 30 }}>Loading...</p>}

      {!loading && announcements.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>📭</p>
          <p>No announcements yet</p>
        </div>
      )}

      {announcements.map(ann => (
        <AnnouncementCard
          key={ann.id}
          announcement={ann}
          isRead={readIds.has(ann.id)}
          onRead={handleRead}
        />
      ))}

      {unread > 0 && (
        <button
          onClick={() => {
            const allIds = new Set(announcements.map(a => a.id));
            setReadIds(allIds);
            setNotifications(0);
          }}
          style={{
            width: "100%", padding: "12px", marginTop: 8,
            borderRadius: 12, border: "1.5px solid #6C3CE1",
            background: "transparent", color: "#6C3CE1",
            fontWeight: 600, fontSize: 14, cursor: "pointer"
          }}
        >
          Mark all as read
        </button>
      )}
    </div>
  );
}

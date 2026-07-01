// src/screens/HomeScreen.jsx
import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getEvents } from "../api/events";
import { getAnnouncements } from "../api/announcements";
import EventCard from "../components/EventCard";

export default function HomeScreen({ onTabChange }) {
  const { currentUser, joinEvent, leaveEvent, isJoined, notifications } = useApp();
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getEvents(),
      getAnnouncements(currentUser?.school)
    ]).then(([evts, anns]) => {
      setEvents(evts.slice(0, 3));
      setAnnouncements(anns.slice(0, 2));
      setLoading(false);
    });
  }, [currentUser]);

  const firstName = currentUser?.name?.split(" ")[0] || "Student";

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", paddingTop: 56, paddingBottom: 20
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, color: "#888" }}>Ciao,</p>
          <h1 style={{ margin: "2px 0 0", fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>
            {firstName} 👋
          </h1>
        </div>
        <button style={{
          width: 42, height: 42, borderRadius: "50%",
          background: "#f5f3ff", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative"
        }} onClick={() => onTabChange("hub")}>
          <Bell size={20} color="#6C3CE1" />
          {notifications > 0 && (
            <span style={{
              position: "absolute", top: 6, right: 6,
              width: 8, height: 8, borderRadius: "50%",
              background: "#EF4444"
            }} />
          )}
        </button>
      </div>

      {/* School badge */}
      <div style={{
        background: "linear-gradient(135deg, #6C3CE1, #9b6dff)",
        borderRadius: 16, padding: "14px 18px", marginBottom: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Your School</p>
          <p style={{ margin: "4px 0 0", color: "#fff", fontSize: 15, fontWeight: 700 }}>{currentUser?.school || "Not set"}</p>
        </div>
        {/* School logo placeholder — shows first letter until real logos are uploaded */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 18, color: "#fff", flexShrink: 0
        }}>
          {(currentUser?.school || "?").charAt(0)}
        </div>
      </div>

      {/* Quick actions — photo-style gradient cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
        {[
          {
            label: "Find Events", tab: "events",
            gradient: "linear-gradient(160deg, #FF6B6B, #C9184A)",
            icon: (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="2" />
                <path d="M3 9h18" stroke="white" strokeWidth="2" />
                <path d="M8 3v4M16 3v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
          },
          {
            label: "Meet Students", tab: "connect",
            gradient: "linear-gradient(160deg, #4D96FF, #1B4DB1)",
            icon: (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3.2" stroke="white" strokeWidth="2" />
                <circle cx="17" cy="9" r="2.6" stroke="white" strokeWidth="2" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M15 14.3c2.3.4 4 2.3 4 4.7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
          },
          {
            label: "School Hub", tab: "hub",
            gradient: "linear-gradient(160deg, #FFB627, #E8590C)",
            icon: (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 18V9l9-5 9 5v9" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="M8 18v-6h8v6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
          },
          {
            label: "Explore Florence", tab: "explore",
            gradient: "linear-gradient(160deg, #2DD4BF, #0F766E)",
            icon: (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                <path d="M15 9l-2 6-6 2 2-6 6-2z" fill="white" />
              </svg>
            )
          },
        ].map(({ label, tab, gradient, icon }) => (
          <button
            key={label}
            onClick={() => onTabChange(tab)}
            style={{
              position: "relative",
              background: gradient,
              border: "none",
              borderRadius: 16,
              padding: "18px 14px",
              height: 92,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              cursor: "pointer", textAlign: "left",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              overflow: "hidden"
            }}
          >
            {/* decorative circle */}
            <div style={{
              position: "absolute", top: -20, right: -20,
              width: 70, height: 70, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)"
            }} />
            {icon}
            <span style={{ position: "relative", color: "#fff", fontWeight: 700, fontSize: 13.5 }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Upcoming events */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>Upcoming Events</h2>
          <button onClick={() => onTabChange("events")} style={{
            background: "none", border: "none", color: "#6C3CE1",
            fontSize: 13, fontWeight: 600, cursor: "pointer"
          }}>See all →</button>
        </div>

        {loading ? (
          <p style={{ color: "#aaa", textAlign: "center", padding: 20 }}>Loading...</p>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isJoined={isJoined(event.id)}
              onJoin={(id) => isJoined(id) ? leaveEvent(id) : joinEvent(id)}
            />
          ))
        )}
      </div>

      {/* School announcements */}
      {announcements.length > 0 && (
        <div>
          <h2 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
            📢 School Announcements
          </h2>
          {announcements.map(ann => (
            <div key={ann.id} style={{
              background: "#fff", borderRadius: 14, padding: 14,
              marginBottom: 10, borderLeft: "4px solid #6C3CE1",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{ann.title}</h4>
              <p style={{ margin: 0, fontSize: 12, color: "#777", lineHeight: 1.5 }}>{ann.body.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

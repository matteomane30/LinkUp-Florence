// src/screens/EventsScreen.jsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getEvents, EVENT_CATEGORIES } from "../api/events";
import EventCard from "../components/EventCard";

export default function EventsScreen() {
  const { joinEvent, leaveEvent, isJoined } = useApp();
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEvents({ category: activeCategory, search: searchQuery })
      .then(evts => { setEvents(evts); setLoading(false); });
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 16 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>Events</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#888" }}>Discover what's happening in Florence</p>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#f5f5f5", borderRadius: 14, padding: "10px 14px", marginBottom: 16
      }}>
        <Search size={16} color="#aaa" />
        <input
          placeholder="Search events..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 14, color: "#1a1a2e" }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 8, scrollbarWidth: "none" }}>
        {EVENT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              flexShrink: 0, padding: "7px 14px",
              borderRadius: 20, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              background: activeCategory === cat.id ? "#6C3CE1" : "#f3f4f6",
              color: activeCategory === cat.id ? "#fff" : "#555"
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        {loading ? "Loading..." : `${events.length} event${events.length !== 1 ? "s" : ""} found`}
      </p>

      {/* Events list */}
      {!loading && events.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>No events found</p>
          <p style={{ fontSize: 13 }}>Try a different category or search term</p>
        </div>
      )}

      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          isJoined={isJoined(event.id)}
          onJoin={(id) => isJoined(id) ? leaveEvent(id) : joinEvent(id)}
        />
      ))}
    </div>
  );
}

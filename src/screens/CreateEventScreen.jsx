// src/screens/CreateEventScreen.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { EVENT_CATEGORIES } from "../api/events";

export default function CreateEventScreen({ onClose, onCreated }) {
  const { currentUser } = useApp();
  const [form, setForm] = useState({
    title: "", description: "", date: "", time: "",
    location: "", category: "social", price: "Free", maxAttendees: 30
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    if (!form.title || !form.date || !form.location) return;
    // In production this would POST to the backend.
    // The eventType field distinguishes student-created from school-official events,
    // which can later be used to require approval for school events.
    const newEvent = {
      ...form,
      id: `evt_${Date.now()}`,
      organizer: currentUser?.name || "A student",
      eventType: currentUser?.school ? "school" : "student",
      attendees: 0
    };
    setSubmitted(true);
    setTimeout(() => {
      onCreated && onCreated(newEvent);
      onClose();
    }, 1200);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "56px 20px 16px", background: "#fff",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <button onClick={onClose} style={{
          background: "#f5f3ff", border: "none", borderRadius: "50%",
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer"
        }}>
          <ArrowLeft size={18} color="#6C3CE1" />
        </button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
          Create Event
        </h1>
      </div>

      <div style={{ padding: 20 }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>🎉</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>Event created!</p>
            <p style={{ fontSize: 14, color: "#888" }}>Redirecting...</p>
          </div>
        ) : (
          <>
            <label style={labelStyle}>Event title</label>
            <input
              placeholder="e.g. Aperitivo at Piazza Santo Spirito"
              value={form.title}
              onChange={e => update("title", e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Tell people what to expect..."
              value={form.description}
              onChange={e => update("description", e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => update("date", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => update("time", e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <label style={labelStyle}>Location</label>
            <input
              placeholder="e.g. Piazza della Repubblica, Firenze"
              value={form.location}
              onChange={e => update("location", e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle}>Category</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {EVENT_CATEGORIES.filter(c => c.id !== "all").map(cat => (
                <button
                  key={cat.id}
                  onClick={() => update("category", cat.id)}
                  style={{
                    padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                    fontWeight: 600, fontSize: 13,
                    background: form.category === cat.id ? "#6C3CE1" : "#f3f4f6",
                    color: form.category === cat.id ? "#fff" : "#555"
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Price</label>
                <input
                  placeholder="Free or €10"
                  value={form.price}
                  onChange={e => update("price", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Max attendees</label>
                <input
                  type="number"
                  value={form.maxAttendees}
                  onChange={e => update("maxAttendees", Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {currentUser?.school && (
              <div style={{
                background: "#f5f3ff", borderRadius: 12, padding: "10px 14px",
                fontSize: 12, color: "#6C3CE1", marginBottom: 16
              }}>
                🏛️ This event will be marked as organized by <strong>{currentUser.school}</strong>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!form.title || !form.date || !form.location}
              style={{
                width: "100%", padding: 15, borderRadius: 14, border: "none",
                background: (!form.title || !form.date || !form.location) ? "#d8cdfb" : "#6C3CE1",
                color: "#fff", fontWeight: 700, fontSize: 16,
                cursor: (!form.title || !form.date || !form.location) ? "not-allowed" : "pointer"
              }}
            >
              Publish Event
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: 12, fontWeight: 600,
  color: "#888", marginBottom: 6, marginTop: 14
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1.5px solid #e5e7eb",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  color: "#1a1a2e"
};

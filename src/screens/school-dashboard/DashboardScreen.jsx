// src/screens/school-dashboard/DashboardScreen.jsx
// Web dashboard per i coordinatori delle scuole

import { useState } from "react";
import { Users, Calendar, Bell, BarChart2, Plus, LogOut } from "lucide-react";
import { MOCK_EVENTS } from "../../api/events";
import { MOCK_STUDENTS } from "../../api/students";
import { MOCK_ANNOUNCEMENTS } from "../../api/announcements";

const SIDEBAR_ITEMS = [
  { id: "overview", label: "Overview", Icon: BarChart2 },
  { id: "students", label: "Students", Icon: Users },
  { id: "events", label: "Events", Icon: Calendar },
  { id: "announcements", label: "Announcements", Icon: Bell },
];

export default function DashboardScreen({ school = "ISI Florence", onLogout }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [announcements, setAnnouncements] = useState(
    MOCK_ANNOUNCEMENTS.filter(a => a.school === school)
  );
  const [showNewAnn, setShowNewAnn] = useState(false);
  const [newAnn, setNewAnn] = useState({ title: "", body: "", priority: "normal" });

  const schoolStudents = MOCK_STUDENTS.filter(s => s.school === school);
  const schoolEvents = MOCK_EVENTS.filter(e => e.organizer === school);

  function publishAnnouncement() {
    if (!newAnn.title || !newAnn.body) return;
    const ann = {
      id: `ann_${Date.now()}`,
      school,
      ...newAnn,
      date: new Date().toISOString().split("T")[0],
      readBy: []
    };
    setAnnouncements(prev => [ann, ...prev]);
    setNewAnn({ title: "", body: "", priority: "normal" });
    setShowNewAnn(false);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", background: "#f8f7ff" }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: "#1a1a2e", padding: "24px 0",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 16, fontWeight: 800 }}>LinkUp Florence</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 12 }}>School Dashboard</p>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {SIDEBAR_ITEMS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveSection(id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 10, border: "none",
              cursor: "pointer", fontWeight: 500, fontSize: 14, marginBottom: 4,
              background: activeSection === id ? "rgba(108,60,225,0.3)" : "transparent",
              color: activeSection === id ? "#c4b5fd" : "rgba(255,255,255,0.6)"
            }}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <button onClick={onLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10, border: "none",
            cursor: "pointer", background: "transparent",
            color: "rgba(255,255,255,0.4)", fontSize: 14
          }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {/* Overview */}
        {activeSection === "overview" && (
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>
              Welcome, {school}
            </h1>
            <p style={{ margin: "0 0 28px", color: "#888" }}>Here's what's happening today</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Students", value: schoolStudents.length, Icon: Users, color: "#6C3CE1" },
                { label: "Active Events", value: schoolEvents.length + 3, Icon: Calendar, color: "#059669" },
                { label: "Announcements", value: announcements.length, Icon: Bell, color: "#D97706" },
              ].map(({ label, value, Icon, color }) => (
                <div key={label} style={{
                  background: "#fff", borderRadius: 16, padding: "20px 24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ margin: "0 0 6px", fontSize: 13, color: "#888" }}>{label}</p>
                      <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#1a1a2e" }}>{value}</p>
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${color}18`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <Icon size={20} color={color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Recent Announcements</h2>
            {announcements.slice(0, 3).map(ann => (
              <div key={ann.id} style={{
                background: "#fff", borderRadius: 12, padding: "14px 18px",
                marginBottom: 10, borderLeft: `4px solid ${ann.priority === "high" ? "#EF4444" : "#6C3CE1"}`,
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
              }}>
                <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{ann.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: "#777" }}>{ann.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}

        {/* Students */}
        {activeSection === "students" && (
          <div>
            <h1 style={{ margin: "0 0 20px", fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>
              Students ({schoolStudents.length})
            </h1>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f7ff" }}>
                    {["Name", "Nationality", "Program", "Languages"].map(col => (
                      <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schoolStudents.map((s, i) => (
                    <tr key={s.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1a1a2e", fontSize: 14 }}>{s.name}</td>
                      <td style={{ padding: "12px 16px", color: "#666", fontSize: 13 }}>{s.nationality}</td>
                      <td style={{ padding: "12px 16px", color: "#666", fontSize: 13 }}>{s.program}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          {s.languages.map(l => (
                            <span key={l} style={{ background: "#ede9ff", color: "#6C3CE1", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{l}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements */}
        {activeSection === "announcements" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>Announcements</h1>
              <button onClick={() => setShowNewAnn(true)} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#6C3CE1", color: "#fff", border: "none",
                borderRadius: 12, padding: "10px 18px", cursor: "pointer",
                fontWeight: 600, fontSize: 14
              }}>
                <Plus size={16} />
                New Announcement
              </button>
            </div>

            {showNewAnn && (
              <div style={{
                background: "#fff", borderRadius: 16, padding: 24,
                marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
              }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>New Announcement</h3>
                <input
                  placeholder="Title"
                  value={newAnn.title}
                  onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", marginBottom: 10, fontSize: 14, boxSizing: "border-box", outline: "none" }}
                />
                <textarea
                  placeholder="Message..."
                  value={newAnn.body}
                  onChange={e => setNewAnn(p => ({ ...p, body: e.target.value }))}
                  rows={3}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", marginBottom: 10, fontSize: 14, boxSizing: "border-box", outline: "none", resize: "none", fontFamily: "inherit" }}
                />
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <select
                    value={newAnn.priority}
                    onChange={e => setNewAnn(p => ({ ...p, priority: e.target.value }))}
                    style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none" }}
                  >
                    <option value="normal">Normal priority</option>
                    <option value="high">High priority</option>
                  </select>
                  <button onClick={publishAnnouncement} style={{
                    background: "#6C3CE1", color: "#fff", border: "none", borderRadius: 10,
                    padding: "9px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14
                  }}>Publish</button>
                  <button onClick={() => setShowNewAnn(false)} style={{
                    background: "#f3f4f6", color: "#555", border: "none", borderRadius: 10,
                    padding: "9px 20px", cursor: "pointer", fontSize: 14
                  }}>Cancel</button>
                </div>
              </div>
            )}

            {announcements.map(ann => (
              <div key={ann.id} style={{
                background: "#fff", borderRadius: 14, padding: 18,
                marginBottom: 12, borderLeft: `4px solid ${ann.priority === "high" ? "#EF4444" : "#6C3CE1"}`,
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{ann.title}</h4>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    background: ann.priority === "high" ? "#FEE2E2" : "#EDE9FF",
                    color: ann.priority === "high" ? "#EF4444" : "#6C3CE1",
                    padding: "2px 10px", borderRadius: 20
                  }}>
                    {ann.priority}
                  </span>
                </div>
                <p style={{ margin: "0 0 8px", fontSize: 14, color: "#555", lineHeight: 1.6 }}>{ann.body}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>{ann.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Events */}
        {activeSection === "events" && (
          <div>
            <h1 style={{ margin: "0 0 20px", fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>Events</h1>
            <p style={{ color: "#888" }}>Events organized by {school} and others in Florence.</p>
            {MOCK_EVENTS.map(event => (
              <div key={event.id} style={{
                background: "#fff", borderRadius: 14, padding: 16,
                marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{event.title}</h4>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: "#888" }}>{event.date} · {event.location}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#6C3CE1", fontWeight: 600 }}>{event.attendees}/{event.maxAttendees} attendees</p>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 600,
                  background: "#ede9ff", color: "#6C3CE1",
                  padding: "4px 12px", borderRadius: 20
                }}>
                  {event.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

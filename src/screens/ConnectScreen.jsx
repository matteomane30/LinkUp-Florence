// src/screens/ConnectScreen.jsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getStudents } from "../api/students";
import StudentCard from "../components/StudentCard";

const INTERESTS = ["all", "art", "cooking", "photography", "language", "architecture", "fashion", "soccer"];

export default function ConnectScreen() {
  const { connect, isConnected } = useApp();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInterest, setActiveInterest] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStudents({
      search: searchQuery,
      interest: activeInterest === "all" ? null : activeInterest
    }).then(s => { setStudents(s); setLoading(false); });
  }, [searchQuery, activeInterest]);

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 16 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>Connect</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#888" }}>Meet international students in Florence</p>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#f5f5f5", borderRadius: 14, padding: "10px 14px", marginBottom: 14
      }}>
        <Search size={16} color="#aaa" />
        <input
          placeholder="Search by name, school, program..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 14, color: "#1a1a2e" }}
        />
      </div>

      {/* Interest filter */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 8, scrollbarWidth: "none" }}>
        {INTERESTS.map(interest => (
          <button
            key={interest}
            onClick={() => setActiveInterest(interest)}
            style={{
              flexShrink: 0, padding: "6px 14px",
              borderRadius: 20, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 12, textTransform: "capitalize",
              background: activeInterest === interest ? "#6C3CE1" : "#f3f4f6",
              color: activeInterest === interest ? "#fff" : "#555"
            }}
          >
            {interest}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        {loading ? "Loading..." : `${students.length} student${students.length !== 1 ? "s" : ""}`}
      </p>

      {students.map(student => (
        <StudentCard
          key={student.id}
          student={student}
          isConnected={isConnected(student.id)}
          onConnect={connect}
        />
      ))}

      {!loading && students.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>👥</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>No students found</p>
        </div>
      )}
    </div>
  );
}

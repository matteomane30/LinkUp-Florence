// src/components/StudentCard.jsx
import { UserPlus, Check } from "lucide-react";

export default function StudentCard({ student, isConnected, onConnect }) {
  const initials = student.name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      alignItems: "center",
      gap: 14
    }}>
      {/* Avatar */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #6C3CE1, #9b6dff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 18,
        flexShrink: 0
      }}>
        {initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>
              {student.name}
            </h3>
            <p style={{ margin: "2px 0", fontSize: 12, color: "#888" }}>
              {student.nationality} · {student.school}
            </p>
            <p style={{ margin: "2px 0", fontSize: 12, color: "#6C3CE1", fontWeight: 500 }}>
              {student.program}
            </p>
          </div>
          <button
            onClick={() => onConnect && onConnect(student.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 12,
              background: isConnected ? "#EDE9FF" : "#6C3CE1",
              color: isConnected ? "#6C3CE1" : "#fff",
              flexShrink: 0
            }}
          >
            {isConnected ? <><Check size={12} /> Connected</> : <><UserPlus size={12} /> Connect</>}
          </button>
        </div>

        {/* Languages */}
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {student.languages.map(lang => (
            <span key={lang} style={{
              background: "#f5f3ff",
              color: "#7c3aed",
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 10
            }}>
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

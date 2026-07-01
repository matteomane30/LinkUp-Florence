// src/screens/ProfileScreen.jsx
import { useState } from "react";
import { LogOut, Edit3, Calendar, Users, Globe } from "lucide-react";
import { useApp } from "../context/AppContext";
import { LANGUAGES } from "../i18n/translations";

export default function ProfileScreen({ onLogout, onOpenConnect }) {
  const { currentUser, logout, joinedEvents, connections, language, setLanguage, t } = useApp();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [showLangPicker, setShowLangPicker] = useState(false);

  const initials = currentUser?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "?";

  function handleLogout() {
    logout();
    onLogout();
  }

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", paddingTop: 56, paddingBottom: 20
      }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>{t("navProfile")}</h1>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#fff1f1", border: "none", borderRadius: 20,
          padding: "8px 14px", cursor: "pointer", color: "#EF4444", fontWeight: 600, fontSize: 13
        }}>
          <LogOut size={14} />
          {t("logOut")}
        </button>
      </div>

      {/* Avatar & name */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #6C3CE1, #9b6dff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 28
        }}>
          {initials}
        </div>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
            {currentUser?.name}
          </h2>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#888" }}>{currentUser?.email}</p>
          <p style={{ margin: 0, fontSize: 13, color: "#6C3CE1", fontWeight: 600 }}>{currentUser?.school}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { Icon: Calendar, label: t("events"), value: joinedEvents.length },
          { Icon: Users, label: t("friends"), value: connections.length },
          { Icon: Globe, label: t("languages"), value: currentUser?.languages?.length || 1 }
        ].map(({ Icon, label, value }) => (
          <div key={label} style={{
            background: "#fff", borderRadius: 14, padding: "14px 10px",
            textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
          }}>
            <Icon size={18} color="#6C3CE1" style={{ marginBottom: 4 }} />
            <p style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>{value}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Meet Students — moved here from bottom nav */}
      <button
        onClick={onOpenConnect}
        style={{
          width: "100%", background: "linear-gradient(135deg, #4D96FF, #1B4DB1)",
          border: "none", borderRadius: 16, padding: "16px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", marginBottom: 24
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Users size={22} color="#fff" />
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: 14 }}>{t("meetStudents")}</p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 12 }}>Connect with international students</p>
          </div>
        </div>
        <span style={{ color: "#fff", fontSize: 18 }}>→</span>
      </button>

      {/* Bio */}
      <div style={{
        background: "#fff", borderRadius: 16, padding: 18,
        marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{t("aboutMe")}</h3>
          <button onClick={() => setEditing(!editing)} style={{
            background: "none", border: "none", cursor: "pointer", color: "#6C3CE1"
          }}>
            <Edit3 size={16} />
          </button>
        </div>
        {editing ? (
          <>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10,
                border: "1.5px solid #6C3CE1", outline: "none",
                fontSize: 14, fontFamily: "inherit", resize: "none",
                boxSizing: "border-box", color: "#1a1a2e"
              }}
            />
            <button
              onClick={() => setEditing(false)}
              style={{
                marginTop: 8, padding: "8px 20px", borderRadius: 10,
                background: "#6C3CE1", color: "#fff", border: "none",
                fontWeight: 600, cursor: "pointer", fontSize: 13
              }}
            >
              Save
            </button>
          </>
        ) : (
          <p style={{ margin: 0, fontSize: 14, color: "#555", lineHeight: 1.6 }}>
            {bio || "No bio yet. Tap the edit button to add one!"}
          </p>
        )}
      </div>

      {/* Language selector */}
      <button
        onClick={() => setShowLangPicker(true)}
        style={{
          width: "100%", background: "#fff", borderRadius: 16, padding: "16px 18px",
          border: "none", display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Globe size={20} color="#6C3CE1" />
          <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{t("language")}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>{LANGUAGES.find(l => l.code === language)?.flag}</span>
          <span style={{ fontSize: 13, color: "#888" }}>{LANGUAGES.find(l => l.code === language)?.label}</span>
        </div>
      </button>

      {/* Language picker modal */}
      {showLangPicker && (
        <div
          onClick={() => setShowLangPicker(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "flex-end"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "24px 24px 0 0",
              padding: "24px 20px 32px", width: "100%"
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 16, textAlign: "center" }}>
              {t("chooseLanguage")}
            </p>
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); setShowLangPicker(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px", borderRadius: 12, border: "none",
                  background: language === l.code ? "#f5f3ff" : "transparent",
                  marginBottom: 4, cursor: "pointer", textAlign: "left"
                }}
              >
                <span style={{ fontSize: 22 }}>{l.flag}</span>
                <span style={{ fontSize: 15, fontWeight: language === l.code ? 700 : 500, color: "#1a1a2e" }}>
                  {l.label}
                </span>
                {language === l.code && <span style={{ marginLeft: "auto", color: "#6C3CE1" }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{t("details")}</h3>
        {[
          { label: t("program"), value: currentUser?.program },
          { label: t("nationality"), value: currentUser?.nationality },
          { label: t("memberSince"), value: currentUser?.joinedDate }
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "8px 0", borderBottom: "1px solid #f5f5f5"
          }}>
            <span style={{ fontSize: 13, color: "#888" }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{value || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

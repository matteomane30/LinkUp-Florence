// src/components/BottomNav.jsx
import { Home, Calendar, Bell, User, Plus } from "lucide-react";

const TABS = [
  { id: "home",    label: "Home",    Icon: Home },
  { id: "events",  label: "Events",  Icon: Calendar },
  { id: "create",  label: "",        Icon: Plus, isCenter: true },
  { id: "hub",     label: "Hub",     Icon: Bell },
  { id: "profile", label: "Profile", Icon: User },
];

export default function BottomNav({ active, onChange, notificationCount = 0 }) {
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff",
      borderTop: "1px solid #f0f0f0",
      display: "flex",
      padding: "8px 0 20px",
      zIndex: 100,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.06)"
    }}>
      {TABS.map(({ id, label, Icon, isCenter }) => {
        const isActive = active === id;
        const showBadge = id === "hub" && notificationCount > 0;

        if (isCenter) {
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, #6C3CE1, #9b6dff)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: -22,
                boxShadow: "0 4px 14px rgba(108,60,225,0.4)"
              }}>
                <Icon size={24} color="#fff" strokeWidth={2.5} />
              </div>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              position: "relative"
            }}
          >
            <div style={{ position: "relative" }}>
              <Icon
                size={22}
                color={isActive ? "#6C3CE1" : "#aaa"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {showBadge && (
                <span style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  background: "#EF4444",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700
                }}>
                  {notificationCount}
                </span>
              )}
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#6C3CE1" : "#aaa"
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// src/App.jsx
import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import ConnectScreen from "./screens/ConnectScreen";
import SchoolHubScreen from "./screens/SchoolHubScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ExploreScreen from "./screens/ExploreScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import DashboardScreen from "./screens/school-dashboard/DashboardScreen";
import BottomNav from "./components/BottomNav";
import { ArrowLeft } from "lucide-react";

function AppContent() {
  const { notifications, currentUser } = useApp();
  const [screen, setScreen] = useState(currentUser ? "app" : "login"); // login | app | dashboard
  const [activeTab, setActiveTab] = useState("home");
  const [showExplore, setShowExplore] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  if (screen === "login") {
    return (
      <div>
        <LoginScreen onLogin={() => setScreen("app")} />
        {/* Dev shortcut to dashboard */}
        <button
          onClick={() => setScreen("dashboard")}
          style={{
            position: "fixed", bottom: 20, right: 20,
            background: "rgba(255,255,255,0.2)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 20, padding: "6px 14px",
            cursor: "pointer", fontSize: 12, fontWeight: 600
          }}
        >
          🏛️ School Dashboard
        </button>
      </div>
    );
  }

  if (screen === "dashboard") {
    return <DashboardScreen school="ISI Florence" onLogout={() => setScreen("login")} />;
  }

  function handleTabChange(tab) {
    if (tab === "explore") {
      setShowExplore(true);
    } else if (tab === "create") {
      setShowCreate(true);
    } else if (tab === "connect") {
      setShowConnect(true);
    } else {
      setShowExplore(false);
      setShowCreate(false);
      setShowConnect(false);
      setActiveTab(tab);
    }
  }

  const SCREENS = {
    home: <HomeScreen onTabChange={handleTabChange} />,
    events: <EventsScreen />,
    connect: <ConnectScreen />,
    hub: <SchoolHubScreen />,
    profile: <ProfileScreen onLogout={() => setScreen("login")} onOpenConnect={() => setShowConnect(true)} />
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#fafafa", position: "relative" }}>
      {showCreate ? (
        <CreateEventScreen onClose={() => setShowCreate(false)} />
      ) : showConnect ? (
        <div>
          <button
            onClick={() => setShowConnect(false)}
            style={{
              position: "fixed", top: 14, left: 14, zIndex: 50,
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.95)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <ArrowLeft size={18} color="#1a1a2e" />
          </button>
          <ConnectScreen />
        </div>
      ) : showExplore ? (
        <div>
          <button
            onClick={() => setShowExplore(false)}
            style={{
              position: "fixed", top: 14, left: 14, zIndex: 50,
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.95)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <ArrowLeft size={18} color="#1a1a2e" />
          </button>
          <ExploreScreen />
        </div>
      ) : (
        SCREENS[activeTab] || SCREENS.home
      )}
      <BottomNav
        active={activeTab}
        onChange={handleTabChange}
        notificationCount={notifications}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

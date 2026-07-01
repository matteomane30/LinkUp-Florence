// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { t as translate } from "../i18n/translations";

const AppContext = createContext(null);
const STORAGE_KEY = "linkup_florence_session";

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSession(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}

function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function AppProvider({ children }) {
  const saved = loadSession();

  const [currentUser, setCurrentUser] = useState(saved?.currentUser || null);
  const [joinedEvents, setJoinedEvents] = useState(saved?.joinedEvents || []);
  const [connections, setConnections] = useState(saved?.connections || []);
  const [notifications, setNotifications] = useState(saved?.notifications ?? 2);
  const [language, setLanguage] = useState(saved?.language || "en");

  // Persist whenever any of the session-relevant state changes
  useEffect(() => {
    if (currentUser) {
      saveSession({ currentUser, joinedEvents, connections, notifications, language });
    } else {
      // Persist language choice even before login (selected on login screen)
      saveSession({ language });
    }
  }, [currentUser, joinedEvents, connections, notifications, language]);

  function login(userData) {
    setCurrentUser(userData);
  }

  function logout() {
    setCurrentUser(null);
    setJoinedEvents([]);
    setConnections([]);
    clearSession();
  }

  function joinEvent(eventId) {
    if (!joinedEvents.includes(eventId)) {
      setJoinedEvents(prev => [...prev, eventId]);
    }
  }

  function leaveEvent(eventId) {
    setJoinedEvents(prev => prev.filter(id => id !== eventId));
  }

  function isJoined(eventId) {
    return joinedEvents.includes(eventId);
  }

  function connect(studentId) {
    if (!connections.includes(studentId)) {
      setConnections(prev => [...prev, studentId]);
    }
  }

  function isConnected(studentId) {
    return connections.includes(studentId);
  }

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      logout,
      joinedEvents,
      joinEvent,
      leaveEvent,
      isJoined,
      connections,
      connect,
      isConnected,
      notifications,
      setNotifications,
      language,
      setLanguage,
      t: (key) => translate(language, key)
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

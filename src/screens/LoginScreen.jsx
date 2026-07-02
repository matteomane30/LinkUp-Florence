// src/screens/LoginScreen.jsx
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { LANGUAGES } from "../i18n/translations";

const SCHOOLS = [
  "ISI Florence", "Lorenzo de' Medici", "British Institute",
  "SACI Florence", "Marist Florence", "Florence University of the Arts",
  "Accademia Italiana", "Kent State University Florence",
  "NYU Florence", "Syracuse University Florence",
  "Gonzaga in Florence", "Other / Not listed"
];

const SLIDE_KEYS = [
  { key: "findPeople" },
  { key: "doThings" },
  { key: "enjoyFlorence" }
];

// Free-to-use Duomo photo from Unsplash
const DUOMO_IMAGE = "/duomo.jpg";

function LogoPin() {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      {/* Pin icon */}
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" style={{ display: "block", margin: "0 auto 6px" }}>
        <path d="M18 0C8 0 0 8 0 18C0 30 18 44 18 44C18 44 36 30 36 18C36 8 28 0 18 0Z" fill="white"/>
        <circle cx="18" cy="18" r="7" fill="#6C3CE1"/>
      </svg>
      {/* LINKUP text */}
      <div style={{ color: "#fff", fontSize: 34, fontWeight: 900, letterSpacing: 6, lineHeight: 1 }}>
        LINKUP
      </div>
      {/* FLORENCE text */}
      <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 400, letterSpacing: 8, marginTop: 4 }}>
        FLORENCE
      </div>
    </div>
  );
}

export default function LoginScreen({ onLogin }) {
  const { login, language, setLanguage, t } = useApp();
  const [step, setStep] = useState("landing"); // landing | signup | login
  const [form, setForm] = useState({ name: "", email: "", password: "", school: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setError("");
  }

  async function handleSubmit() {
    if (!form.email || !form.password) { setError("Fill in email and password."); return; }
    if (step === "signup" && !form.name) { setError("Enter your name."); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    login({
      id: "stu_me",
      name: form.name || "Student",
      email: form.email,
      school: form.school || null,
      nationality: "🌍 International",
      program: "Study Abroad",
      languages: ["EN"],
      bio: "New to Florence!",
      interests: [],
      joinedDate: new Date().toISOString().split("T")[0]
    });
    setLoading(false);
    onLogin();
  }

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column",
      background: "#1a1a2e", overflow: "hidden"
    }}>
      {/* Background Duomo photo */}
      <img
        src={DUOMO_IMAGE}
        alt="Florence Duomo"
        onLoad={() => setImgLoaded(true)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center top",
          opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s"
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.92) 100%)"
      }} />

      {/* Language button top right */}
      <button
        onClick={() => setShowLangPicker(true)}
        style={{
          position: "absolute", top: 16, right: 16, zIndex: 10,
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.25)", borderRadius: 20,
          padding: "6px 12px", display: "flex", alignItems: "center", gap: 6,
          cursor: "pointer"
        }}
      >
        <span style={{ fontSize: 15 }}>{currentLang.flag}</span>
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{currentLang.code.toUpperCase()}</span>
      </button>

      {/* Language picker modal */}
      {showLangPicker && (
        <div onClick={() => setShowLangPicker(false)} style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end"
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff", borderRadius: "24px 24px 0 0",
            padding: "24px 20px 32px", width: "100%"
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 16, textAlign: "center" }}>
              {t("chooseLanguage")}
            </p>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangPicker(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 12, border: "none",
                background: language === l.code ? "#f5f3ff" : "transparent",
                marginBottom: 4, cursor: "pointer", textAlign: "left"
              }}>
                <span style={{ fontSize: 22 }}>{l.flag}</span>
                <span style={{ fontSize: 15, fontWeight: language === l.code ? 700 : 500, color: "#1a1a2e" }}>{l.label}</span>
                {language === l.code && <span style={{ marginLeft: "auto", color: "#6C3CE1" }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── LANDING STEP ── */}
      {step === "landing" && (
        <div style={{
          position: "relative", zIndex: 2, flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "60px 28px 48px"
        }}>
          {/* Logo */}
          <div style={{ marginTop: 20 }}>
            <LogoPin />
          </div>

          {/* 3 phrases + buttons at bottom */}
          <div>
            {/* Phrases */}
            <div style={{ marginBottom: 36 }}>
              {SLIDE_KEYS.map(({ key }, i) => (
                <div key={key} style={{
                  fontSize: 30, fontWeight: 800, color: "#fff",
                  lineHeight: 1.25, marginBottom: 2,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)"
                }}>
                  {t(key)}.
                </div>
              ))}
            </div>

            {/* Buttons */}
            <button onClick={() => setStep("signup")} style={{
              width: "100%", padding: "16px", borderRadius: 50, border: "none",
              background: "#6C3CE1", color: "#fff", fontWeight: 700, fontSize: 17,
              cursor: "pointer", marginBottom: 12,
              boxShadow: "0 4px 20px rgba(108,60,225,0.5)"
            }}>
              Get Started
            </button>
            <button onClick={() => setStep("login")} style={{
              width: "100%", padding: "15px", borderRadius: 50,
              border: "1.5px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)",
              color: "#fff", fontWeight: 600, fontSize: 17, cursor: "pointer"
            }}>
              {t("logIn")}
            </button>
          </div>
        </div>
      )}

      {/* ── SIGN UP / LOGIN STEP ── */}
      {(step === "signup" || step === "login") && (
        <div style={{
          position: "relative", zIndex: 2, flex: 1,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 0 0"
        }}>
          {/* Back button */}
          <button onClick={() => setStep("landing")} style={{
            position: "absolute", top: 16, left: 16,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50%",
            width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff", fontSize: 18
          }}>
            ←
          </button>

          {/* Form card */}
          <div style={{
            background: "#fff", borderRadius: "28px 28px 0 0",
            padding: "28px 24px 40px",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>
              {step === "signup" ? t("signUp") : t("logIn")}
            </h2>

            {step === "signup" && (
              <input placeholder={t("fullName")} value={form.name}
                onChange={e => update("name", e.target.value)} style={inputStyle} />
            )}
            <input placeholder={t("email")} type="email" value={form.email}
              onChange={e => update("email", e.target.value)} style={inputStyle} />
            <input placeholder={t("password")} type="password" value={form.password}
              onChange={e => update("password", e.target.value)} style={inputStyle} />
            {step === "signup" && (
              <>
                <select value={form.school} onChange={e => update("school", e.target.value)}
                  style={{ ...inputStyle, color: form.school ? "#1a1a2e" : "#aaa" }}>
                  <option value="">{t("schoolOptional")}</option>
                  {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <p style={{ fontSize: 11, color: "#aaa", margin: "-6px 0 12px 2px" }}>
                  {t("schoolHelp")}
                </p>
              </>
            )}

            {error && <p style={{ color: "#EF4444", fontSize: 13, textAlign: "center", margin: "0 0 12px" }}>{error}</p>}

            <button onClick={handleSubmit} disabled={loading} style={{
              width: "100%", padding: "15px", borderRadius: 14, border: "none",
              background: loading ? "#c4b5fd" : "#6C3CE1", color: "#fff",
              fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "..." : step === "login" ? t("logIn") : t("createAccount")}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 14, marginBottom: 0 }}>
              {t("termsAgree")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "13px 14px", borderRadius: 12,
  border: "1.5px solid #e5e7eb", fontSize: 15, marginBottom: 12,
  outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: "#1a1a2e"
};

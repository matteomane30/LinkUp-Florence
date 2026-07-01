// server/index.js
// Backend Express per produzione — da configurare con Supabase o altro DB

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ═══════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════
app.get("/api/events", (req, res) => {
  const { category, search } = req.query;
  // TODO: query Supabase
  // const { data } = await supabase.from("Event").select("*")
  res.json({ message: "Connect to Supabase to fetch events", category, search });
});

app.get("/api/events/:id", (req, res) => {
  res.json({ message: `Event ${req.params.id}` });
});

app.post("/api/events/:id/join", (req, res) => {
  const { userId } = req.body;
  // TODO: add userId to attendees list
  res.json({ success: true, eventId: req.params.id, userId });
});

// ═══════════════════════════════════════
// STUDENTS
// ═══════════════════════════════════════
app.get("/api/students", (req, res) => {
  res.json({ message: "Fetch students from DB" });
});

app.get("/api/students/:id", (req, res) => {
  res.json({ message: `Student ${req.params.id}` });
});

// ═══════════════════════════════════════
// ANNOUNCEMENTS
// ═══════════════════════════════════════
app.get("/api/announcements", (req, res) => {
  const { school } = req.query;
  res.json({ message: "Fetch announcements", school });
});

app.post("/api/announcements", (req, res) => {
  const { title, body, priority, school } = req.body;
  if (!title || !body || !school) {
    return res.status(400).json({ error: "title, body, school required" });
  }
  // TODO: insert into DB
  res.json({ success: true, announcement: { title, body, priority, school } });
});

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, school } = req.body;
  // TODO: hash password, create user in Supabase auth
  res.json({ success: true, message: "User registered (implement with Supabase auth)" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  // TODO: verify with Supabase auth
  res.json({ success: true, token: "jwt-token-here" });
});

// ═══════════════════════════════════════
app.listen(PORT, () => {
  console.log(`✅ LinkUp Florence API running on port ${PORT}`);
});

module.exports = app;

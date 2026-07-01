// src/api/events.js
// Mock API per gli eventi — in produzione sostituire con chiamate a Supabase/backend

export const MOCK_EVENTS = [
  {
    id: "evt_001",
    title: "Aperitivo Internazionale",
    description: "Incontro informale per studenti internazionali nel cuore di Firenze. Vieni a conoscere persone da tutto il mondo!",
    date: "2026-07-05",
    time: "19:00",
    location: "Piazza della Repubblica, Firenze",
    category: "social",
    attendees: 34,
    maxAttendees: 60,
    image: null,
    organizer: "LinkUp Florence",
    price: "Free",
    languages: ["EN", "IT", "ES"],
    tags: ["networking", "social", "aperitivo"]
  },
  {
    id: "evt_002",
    title: "Tour: Uffizi After Dark",
    description: "Visita guidata speciale agli Uffizi in serata, riservata agli studenti internazionali. Ingresso ridotto.",
    date: "2026-07-08",
    time: "20:30",
    location: "Galleria degli Uffizi",
    category: "culture",
    attendees: 18,
    maxAttendees: 25,
    image: null,
    organizer: "British Institute Florence",
    price: "€8",
    languages: ["EN", "IT"],
    tags: ["arte", "cultura", "museo"]
  },
  {
    id: "evt_003",
    title: "Language Exchange — Italiano/English",
    description: "Pratica italiano con madrelingua e aiutali con l'inglese. Un'ora a testa!",
    date: "2026-07-10",
    time: "18:00",
    location: "Biblioteca delle Oblate",
    category: "language",
    attendees: 22,
    maxAttendees: 40,
    image: null,
    organizer: "ISI Florence",
    price: "Free",
    languages: ["EN", "IT"],
    tags: ["lingua", "exchange", "studio"]
  },
  {
    id: "evt_004",
    title: "Escursione a Siena",
    description: "Gita di un giorno a Siena con guida turistica. Partenza da Piazza Santa Maria Novella.",
    date: "2026-07-12",
    time: "08:30",
    location: "Siena, Tuscany",
    category: "travel",
    attendees: 27,
    maxAttendees: 45,
    image: null,
    organizer: "Lorenzo de' Medici Institute",
    price: "€25",
    languages: ["EN", "IT", "FR"],
    tags: ["escursione", "toscana", "storia"]
  },
  {
    id: "evt_005",
    title: "Pasta Making Workshop",
    description: "Impara a fare la pasta fresca con uno chef fiorentino. Include cena con vino.",
    date: "2026-07-15",
    time: "17:00",
    location: "Oltrarno, Firenze",
    category: "food",
    attendees: 12,
    maxAttendees: 15,
    image: null,
    organizer: "Florence Culinary School",
    price: "€35",
    languages: ["EN", "IT"],
    tags: ["cucina", "pasta", "food"]
  }
];

// Simula una chiamata asincrona al backend
export async function getEvents(filters = {}) {
  await delay(300);
  let events = [...MOCK_EVENTS];

  if (filters.category && filters.category !== "all") {
    events = events.filter(e => e.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    events = events.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some(t => t.includes(q))
    );
  }

  return events;
}

export async function getEventById(id) {
  await delay(200);
  return MOCK_EVENTS.find(e => e.id === id) || null;
}

export async function joinEvent(eventId, userId) {
  await delay(400);
  // In produzione: POST /api/events/:id/join
  return { success: true, eventId, userId };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const EVENT_CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "social", label: "Social", emoji: "🎉" },
  { id: "culture", label: "Culture", emoji: "🎨" },
  { id: "language", label: "Language", emoji: "💬" },
  { id: "travel", label: "Travel", emoji: "🚌" },
  { id: "food", label: "Food", emoji: "🍕" },
  { id: "sport", label: "Sport", emoji: "⚽" }
];

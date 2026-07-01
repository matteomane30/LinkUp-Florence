// src/api/announcements.js

export const MOCK_ANNOUNCEMENTS = [
  {
    id: "ann_001",
    school: "ISI Florence",
    title: "Modifica orario lezioni — Luglio",
    body: "A partire dal 7 luglio le lezioni del mattino inizieranno alle 9:30 invece che alle 9:00. Aggiornate i vostri calendari!",
    date: "2026-06-28",
    priority: "high",
    category: "schedule",
    readBy: []
  },
  {
    id: "ann_002",
    school: "ISI Florence",
    title: "Gita scolastica a Siena — iscrizioni aperte",
    body: "Ci sono ancora posti disponibili per la gita del 12 luglio. Iscrivetevi entro il 5 luglio presso la segreteria.",
    date: "2026-06-27",
    priority: "normal",
    category: "event",
    readBy: []
  },
  {
    id: "ann_003",
    school: "ISI Florence",
    title: "Benvenuti — Orientamento Luglio 2026",
    body: "L'orientamento per i nuovi studenti si terrà lunedì 1 luglio alle 10:00 in Aula Magna. Presenza obbligatoria.",
    date: "2026-06-25",
    priority: "high",
    category: "general",
    readBy: []
  },
  {
    id: "ann_004",
    school: "British Institute",
    title: "Library closing hours — Summer",
    body: "The library will close at 6 PM instead of 8 PM during July and August. Plan your study sessions accordingly.",
    date: "2026-06-26",
    priority: "normal",
    category: "schedule",
    readBy: []
  }
];

export async function getAnnouncements(school = null) {
  await delay(300);
  if (school) {
    return MOCK_ANNOUNCEMENTS.filter(a => a.school === school);
  }
  return MOCK_ANNOUNCEMENTS;
}

export async function markAsRead(announcementId, userId) {
  await delay(150);
  return { success: true };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// src/utils/helpers.js

/**
 * Formatta una data in formato leggibile
 * @param {string} dateStr - "2026-07-05"
 * @returns {string} - "5 July 2026"
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Restituisce le iniziali da un nome completo
 * @param {string} name
 * @returns {string} - "MS"
 */
export function getInitials(name = "") {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

/**
 * Tronca un testo a un certo numero di caratteri
 */
export function truncate(text = "", maxLength = 80) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Genera un colore da un testo (per avatar senza immagine)
 */
export function colorFromString(str = "") {
  const colors = ["#6C3CE1", "#059669", "#D97706", "#2563EB", "#E11D48", "#7C3AED"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Calcola quanti posti rimangono per un evento
 */
export function spotsLeft(event) {
  return Math.max(0, event.maxAttendees - event.attendees);
}

/**
 * Simula un delay asincrono (utile per mock API)
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

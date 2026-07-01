# 🎓 LinkUp Florence

App mobile per studenti internazionali a Firenze — scopri eventi, connettiti con altri studenti e rimani aggiornato con la tua scuola.

---

## 📱 Funzionalità

### Per gli studenti
- **Events** — scopri eventi locali, universitari e culturali
- **Connect** — connettiti con studenti internazionali
- **School Hub** — annunci e comunicazioni dalla tua scuola
- **Profile** — gestisci il tuo profilo e le tue preferenze

### Per le scuole (Dashboard)
- Pubblica annunci e comunicazioni
- Gestisci gli eventi della scuola
- Monitora l'engagement degli studenti

---

## 🛠️ Stack tecnico

| Layer | Tecnologia |
|-------|-----------|
| Frontend | React 18, React Router 6 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend (MVP) | Mock API in-memory |
| Backend (prod) | Node.js + Express + Supabase |
| No-code | Bubble.io (prototipo parallelo) |

---

## 🚀 Avvio rapido

```bash
# Clona il repo
git clone https://github.com/TUO-USERNAME/linkup-florence.git
cd linkup-florence

# Installa dipendenze
npm install

# Avvia in sviluppo
npm start
```

L'app sarà disponibile su `http://localhost:3000`

---

## 📁 Struttura del progetto

```
linkup-florence/
├── public/
│   └── index.html
├── src/
│   ├── api/            # Chiamate API e mock data
│   │   ├── events.js
│   │   ├── students.js
│   │   └── announcements.js
│   ├── components/     # Componenti riutilizzabili
│   │   ├── BottomNav.jsx
│   │   ├── EventCard.jsx
│   │   ├── StudentCard.jsx
│   │   └── AnnouncementCard.jsx
│   ├── context/        # Stato globale
│   │   └── AppContext.jsx
│   ├── screens/        # Schermate principali
│   │   ├── LoginScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── EventsScreen.jsx
│   │   ├── ConnectScreen.jsx
│   │   ├── SchoolHubScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── school-dashboard/
│   │       └── DashboardScreen.jsx
│   ├── utils/          # Funzioni helper
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
└── server/             # Backend Express (per produzione)
    ├── index.js
    ├── routes/
    └── data/
```

---

## 🎨 Brand

- **Colore primario:** `#6C3CE1` (viola LinkUp)
- **Font:** Inter (system font stack)
- **Target:** Studenti internazionali 18-30 anni

---

## 🗺️ Roadmap MVP

- [x] Login / Sign Up
- [x] Home feed
- [x] Events discovery
- [x] Connect con studenti
- [x] School Hub (annunci)
- [x] Profilo studente
- [ ] Dashboard scuola (web)
- [ ] Notifiche push
- [ ] Chat tra studenti
- [ ] Mappa eventi

---

## 📄 Licenza

MIT — Matteo, 2026

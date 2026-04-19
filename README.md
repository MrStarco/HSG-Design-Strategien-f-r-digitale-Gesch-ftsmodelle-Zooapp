# Walter Zoo – Mein Tierfreund

High-Fidelity Prototyp (localhost) für den Kurskontext: eine mobile Lern-App für Kinder und Jugendliche (10–16), die Artenschutz emotional, spielerisch und interaktiv vermittelt.

Inspiration und Kontext zum Zoo: [walterzoo.ch](https://www.walterzoo.ch)

## Voraussetzungen

- Node.js 20+
- npm 10+

## Setup

1. Dependencies installieren:

```bash
npm install
```

2. API-Key in `.env.secrets` setzen:

```env
OPENAI_API_KEY="dein_openai_key"
```

3. Optional Ports in `.env` anpassen:

```env
BACKEND_PORT=3001
```

## Starten (Frontend + Backend)

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Healthcheck: `http://localhost:3001/api/health`

## Build / Checks

```bash
npm run build
npm run lint
```

## Enthaltene Prototype-Features

- Onboarding mit **10** Tierbegleitern (je mit eigener Begrüßung mit Artenschutz-Bezug und festen Demo-Chat-Vorschlägen)
- Companion Home mit Happiness-System, Füttern mit Cooldown, Action-Buttons und Chat
- OpenAI-Companion-Chat (Artenschutz im Fokus; Chat-Verlauf in `localStorage`)
- Daily Challenge und XP
- **Quiz:** pro Öffnung eine Frage; bis zu **drei** richtige Antworten pro 15-Minuten-Zyklus (Happiness/XP anteilig); erste Frage bevorzugt zum gewählten Begleiter; Timer läuft ab erstem Quiz-Klick und wird erst nach der dritten richtigen Antwort sichtbar (Details in `AppContext` / `QuizModal`)
- Zoo-Karte mit Events und knappen Artenschutz-Facts
- Tierprofile im Instagram-Stil mit Video-Overlay und Abschnitt **Schutzstatus** (Label + kurze Erklärung)
- Floating Companion auf Nicht-Home-Screens
- Desktop-Präsentationsmodus mit Phone-Frame; optional **Controller** + **Mirror** für Demos (siehe unten)

## Präsentationsmodus (Laptop)

Die App ist mobile-first (max. 430px), wird aber auf dem Laptop in einem visuellen Smartphone-Rahmen dargestellt. So wirkt der Prototyp bei Präsentationen bewusst als Mobile-App und nicht wie eine schmale Rohfassung.

## Schnellzugriff: Ansichten & Links

Nach dem Start kannst du je nach Bedarf zwischen einer Ansicht **mit Controller** und einer **simplen Ansicht** ohne Controller unterscheiden.

### Ansicht mit Controller

Start:

```bash
npm run dev:mobile:controller
```

Links:

- Controller UI (Laptop): [http://localhost:5174](http://localhost:5174)
- App-Ansicht am Laptop: [http://localhost:5173](http://localhost:5173)
- App Vollbildansicht Laptop: [http://localhost:5173/?role=mirror](http://localhost:5173/?role=mirror)
- Mirror am Handy (Demo): `http://<LAPTOP_IP>:5173?role=mirror`
- Controller im Netzwerk (Demo): `http://<LAPTOP_IP>:5174`

IP manuell pruefen:

```bash
npm run ip:laptop
# alternativ direkt:
ipconfig getifaddr en0 || ipconfig getifaddr en1
```

### Simple Ansicht (ohne Controller)

Start:

```bash
npm run dev
```

Links:

- App lokal: [http://localhost:5173](http://localhost:5173)
- App im Netzwerk (bei `--host`): `http://<LAPTOP_IP>:5173`

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Express + TypeScript (Chat-Proxy + YouTube-Zufallsvideo-Endpunkt)
- AI: OpenAI Chat API (`gpt-4o-mini`) über minimalen Proxy-Endpunkt
- Persistenz: komplett via `localStorage` (kein DB-Backend; u.a. Begleiter, Chat, Happiness, XP, Daily, Feed-Timer, Quiz-Session mit Cooldown)

## Projektstruktur

```text
Walter-Zoo-App/
├── .env
├── .env.secrets
├── README.md
├── package.json
├── frontend/
└── backend/
```
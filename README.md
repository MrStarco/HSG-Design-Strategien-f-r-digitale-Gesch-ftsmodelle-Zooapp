# Walter Zoo – Mein Tierfreund

High-Fidelity Prototyp (localhost) für den Kurskontext: eine mobile Lern-App für Kinder und Jugendliche (10–16), die Artenschutz emotional, spielerisch und interaktiv vermittelt.

Inspiration und Kontext zum Zoo: [walterzoo.ch](https://www.walterzoo.ch)

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Express + TypeScript (Chat-Proxy + YouTube-Zufallsvideo-Endpunkt)
- AI: OpenAI Chat API (`gpt-4o-mini`) über minimalen Proxy-Endpunkt
- Persistenz: komplett via `localStorage` (kein DB-Backend)

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

- Onboarding mit 9 Tierbegleitern
- Companion Home mit Happiness-System, Action Buttons und Chat
- OpenAI-Companion-Chat (mit einfacher Memory via Chat-History in `localStorage`)
- Daily Challenge, Quiz, XP-Logik
- Zoo-Karte mit Events und Artenschutz-Facts
- Tierprofile im Instagram-Stil mit Video-Overlay
- Floating Companion auf Nicht-Home-Screens
- Desktop-Präsentationsmodus mit Phone-Frame

## Präsentationsmodus (Laptop)

Die App ist mobile-first (max. 430px), wird aber auf dem Laptop in einem visuellen Smartphone-Rahmen dargestellt. So wirkt der Prototyp bei Präsentationen bewusst als Mobile-App und nicht wie eine schmale Rohfassung.

## Mirror Mode (Laptop steuert Handy)

Mit Mirror Mode laeuft der Demo-Controller jetzt als eigene Oberfläche auf einem separaten Port. So bleibt die App-Ansicht sauber (ohne Demo-Panel) und du steuerst alles von einer zweiten UI.

1. Projekt inkl. Controller im Mobile-Setup starten:

```bash
npm run dev:mobile:controller
```

2. Laptop-IP auslesen:

```bash
npm run ip:laptop
```

3. URLs im Browser oeffnen:

- Laptop (Controller UI): `http://<LAPTOP_IP>:5174`
- Handy (Mirror): `http://<LAPTOP_IP>:5173?role=mirror`

Was synchronisiert wird:
- Demo-Commands vom Controller (`Companion zuruecksetzen`, Feed-/Quiz-/Challenge-Reset, `Happiness setzen`) werden live auf alle verbundenen App-Clients uebertragen.

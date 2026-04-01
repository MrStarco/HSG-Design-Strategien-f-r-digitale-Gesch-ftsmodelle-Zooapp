import "./styles.css";

type DemoCommand =
  | { type: "resetCompanion" }
  | { type: "resetFeedTimer" }
  | { type: "resetQuizTimer" }
  | { type: "resetChallengeTimer" }
  | { type: "setHappiness"; value: number };

const pendingCommands: DemoCommand[] = [];
let socket: WebSocket | null = null;

const statusEl = document.getElementById("connection-status");
const happinessInput = document.getElementById("happiness-input") as HTMLInputElement | null;

function setStatus(label: string, connected = false) {
  if (!statusEl) return;
  statusEl.textContent = label;
  statusEl.classList.toggle("is-connected", connected);
}

function normalizeHappiness(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getSocketUrl() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.hostname}:3001/ws`;
}

function flushPending() {
  while (pendingCommands.length && socket?.readyState === WebSocket.OPEN) {
    const command = pendingCommands.shift();
    if (!command) break;
    socket.send(JSON.stringify(command));
  }
}

function connectSocket() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;

  setStatus("Verbinde...");
  socket = new WebSocket(getSocketUrl());

  socket.addEventListener("open", () => {
    setStatus("Verbunden mit Backend (ws://:3001)", true);
    flushPending();
  });

  socket.addEventListener("close", () => {
    setStatus("Verbindung getrennt - neuer Versuch...");
    socket = null;
    window.setTimeout(connectSocket, 1200);
  });

  socket.addEventListener("error", () => {
    setStatus("Fehler bei der Verbindung - neuer Versuch...");
  });
}

function sendCommand(command: DemoCommand) {
  connectSocket();
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    pendingCommands.push(command);
    return;
  }
  socket.send(JSON.stringify(command));
}

function bindButton(id: string, command: DemoCommand) {
  const button = document.getElementById(id);
  if (!button) return;
  button.addEventListener("click", () => sendCommand(command));
}

bindButton("reset-companion", { type: "resetCompanion" });
bindButton("reset-feed", { type: "resetFeedTimer" });
bindButton("reset-quiz", { type: "resetQuizTimer" });
bindButton("reset-challenge", { type: "resetChallengeTimer" });

document.getElementById("set-happiness")?.addEventListener("click", () => {
  if (!happinessInput) return;
  const value = normalizeHappiness(Number(happinessInput.value));
  happinessInput.value = String(value);
  sendCommand({ type: "setHappiness", value });
});

connectSocket();

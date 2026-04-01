import { useEffect, useMemo } from "react";

export type DemoCommand =
  | { type: "resetCompanion" }
  | { type: "resetFeedTimer" }
  | { type: "resetQuizTimer" }
  | { type: "resetChallengeTimer" }
  | { type: "setHappiness"; value: number }
  | { type: "navigate"; path: string };

type MirrorRole = "controller" | "mirror";

const listeners = new Set<(command: DemoCommand) => void>();
let socket: WebSocket | null = null;
const pendingCommands: DemoCommand[] = [];

function getMirrorRole(): MirrorRole {
  const role = new URLSearchParams(window.location.search).get("role");
  if (role === "mirror") return "mirror";
  return "controller";
}

function getSocketUrl() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.hostname}:3001/ws`;
}

function isDemoCommand(value: unknown): value is DemoCommand {
  if (!value || typeof value !== "object") return false;
  const command = value as Partial<DemoCommand>;
  if (typeof command.type !== "string") return false;
  if (command.type === "setHappiness") return typeof command.value === "number";
  if (command.type === "navigate") return typeof command.path === "string";
  return ["resetCompanion", "resetFeedTimer", "resetQuizTimer", "resetChallengeTimer"].includes(command.type);
}

function ensureSocket() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;

  socket = new WebSocket(getSocketUrl());
  socket.addEventListener("open", () => {
    while (pendingCommands.length && socket?.readyState === WebSocket.OPEN) {
      const command = pendingCommands.shift();
      if (!command) break;
      socket.send(JSON.stringify(command));
    }
  });
  socket.addEventListener("message", (event) => {
    try {
      const parsed: unknown = JSON.parse(String(event.data));
      if (!isDemoCommand(parsed)) return;
      listeners.forEach((listener) => listener(parsed));
    } catch {
      // Ignore invalid command payloads.
    }
  });

  socket.addEventListener("close", () => {
    socket = null;
  });
}

export function sendCommand(command: DemoCommand) {
  ensureSocket();
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    pendingCommands.push(command);
    return;
  }
  socket.send(JSON.stringify(command));
}

export function useIncomingCommand(handler: (command: DemoCommand) => void) {
  useEffect(() => {
    ensureSocket();
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, [handler]);
}

export function useMirrorSync() {
  const role = useMemo(() => getMirrorRole(), []);

  useEffect(() => {
    ensureSocket();
  }, [role]);

  return {
    role,
    sendCommand,
  };
}

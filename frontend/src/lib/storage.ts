export const storageKeys = {
  companion: "wz-companion",
  happiness: "wz-happiness",
  chat: "wz-chat-history",
  daily: "wz-daily",
  xp: "wz-xp",
  feedReadyAt: "wz-feed-ready-at",
  quizReadyAt: "wz-quiz-ready-at",
  recentVideos: "wz-recent-videos",
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function resetCompanionInStorage() {
  writeStorage(storageKeys.companion, null);
  writeStorage(storageKeys.happiness, { value: 50, updatedAt: Date.now() });
}

export function setHappinessInStorage(value: number) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)));
  writeStorage(storageKeys.happiness, { value: normalized, updatedAt: Date.now() });
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

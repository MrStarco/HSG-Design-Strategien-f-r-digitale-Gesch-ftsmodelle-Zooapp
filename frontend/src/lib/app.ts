import type { Mood } from "../types";

export function moodByHappiness(happiness: number): Mood {
  if (happiness >= 80) return "happy";
  if (happiness >= 50) return "content";
  if (happiness >= 25) return "bored";
  return "sad";
}

export function pickDailyIndex(length: number): number {
  const seed = Number(new Date().toISOString().slice(0, 10).replaceAll("-", ""));
  return seed % length;
}

export function pickRandom<T>(list: T[], count: number) {
  const copy = [...list];
  const result: T[] = [];
  while (copy.length && result.length < count) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
}

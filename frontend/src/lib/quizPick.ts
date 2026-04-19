import type { QuizQuestion } from "../types";

/** Wählt eine Frage: erste Frage im Zyklus bevorzugt companion-spezifisch; keine Wiederholung innerhalb des Zyklus. */
export function pickQuizQuestion(companionId: string, attemptsSoFar: number, usedIds: string[], pool: QuizQuestion[]): QuizQuestion | null {
  const used = new Set(usedIds);
  const available = pool.filter((q) => !used.has(q.id));
  if (!available.length) return null;

  if (attemptsSoFar === 0) {
    const companionQs = available.filter((q) => q.companionId === companionId);
    if (companionQs.length) {
      return companionQs[Math.floor(Math.random() * companionQs.length)];
    }
  }

  const generic = available.filter((q) => !q.companionId);
  if (generic.length) {
    return generic[Math.floor(Math.random() * generic.length)];
  }

  return available[Math.floor(Math.random() * available.length)];
}

import type { ThreatKind } from "../types";

export const threatMeta: Record<ThreatKind, { emoji: string; label: string }> = {
  habitat: { emoji: "🌳", label: "Lebensraumverlust" },
  poaching: { emoji: "🎯", label: "Wilderei" },
  climate: { emoji: "🌡️", label: "Klimawandel" },
  overfishing: { emoji: "🐟", label: "Überfischung" },
  pollution: { emoji: "🧴", label: "Umweltverschmutzung" },
  conflict: { emoji: "⚠️", label: "Konflikte mit Menschen" },
  traffic: { emoji: "🚗", label: "Verkehr & Zäune" },
};

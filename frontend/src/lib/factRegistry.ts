import { artenschutzFacts, type Fact } from "../data/artenschutz";
import { threatFacts } from "../data/threatFacts";
import type { ThreatKind } from "../types";

export const topicFacts: Fact[] = [
  ...artenschutzFacts,
  ...Object.values(threatFacts),
];

const factById = new Map<string, Fact>();
for (const fact of topicFacts) {
  factById.set(fact.id, fact);
}

export function getFactById(id: string | undefined | null): Fact | null {
  if (!id) return null;
  return factById.get(id) ?? null;
}

export function getThreatFact(kind: ThreatKind): Fact {
  return threatFacts[kind];
}

type KeywordMatcher = {
  factId: string;
  patterns: RegExp[];
  label: string;
  emoji: string;
};

const matchers: KeywordMatcher[] = [
  {
    factId: "threat-habitat",
    label: "Lebensraumverlust",
    emoji: "🌳",
    patterns: [
      /lebensraum/i,
      /abholzung/i,
      /rodung/i,
      /regenwald/i,
      /waldverlust/i,
    ],
  },
  {
    factId: "threat-poaching",
    label: "Wilderei",
    emoji: "🎯",
    patterns: [/wilder(ei|er)/i, /ilegal(e|er)?\s+jagd/i, /elfenbein/i],
  },
  {
    factId: "threat-climate",
    label: "Klimawandel",
    emoji: "🌡️",
    patterns: [/klimawandel/i, /klimakrise/i, /erderw[äa]rmung/i, /co2/i, /gletscher/i],
  },
  {
    factId: "threat-overfishing",
    label: "Überfischung",
    emoji: "🐟",
    patterns: [/[üu]berfisch/i, /fangquote/i, /fischerei/i],
  },
  {
    factId: "threat-pollution",
    label: "Umweltverschmutzung",
    emoji: "🧴",
    patterns: [/umweltverschmutzung/i, /plastik/i, /m[üu]ll/i, /verschmutz/i],
  },
  {
    factId: "threat-conflict",
    label: "Mensch-Tier-Konflikte",
    emoji: "⚠️",
    patterns: [/mensch[- ]tier[- ]konflikt/i, /konflikt(e)? mit menschen/i],
  },
  {
    factId: "threat-traffic",
    label: "Verkehr & Zäune",
    emoji: "🚗",
    patterns: [/gr[üu]nbr[üu]cke/i, /wildunfall/i, /z[äa]une?\b/i, /stra(ß|ss)en\s+zersch/i],
  },
  {
    factId: "was-ist-artenschutz",
    label: "Artenschutz",
    emoji: "🌱",
    patterns: [/artenschutz/i, /artenvielfalt/i, /biodiversit/i],
  },
  {
    factId: "wie-hilft-ein-zoo",
    label: "Rolle des Zoos",
    emoji: "🏞️",
    patterns: [/zuchtprogramm/i, /auswilder/i, /\beep\b/i, /rettungsarche/i],
  },
  {
    factId: "rote-liste",
    label: "Rote Liste",
    emoji: "📕",
    patterns: [/rote liste/i, /iucn/i, /vom aussterben bedroht/i, /stark gef[äa]hrdet/i],
  },
  {
    factId: "walter-zoo",
    label: "Walter Zoo",
    emoji: "🦓",
    patterns: [/walter zoo/i, /zooschule/i, /gossau/i],
  },
  {
    factId: "kann-ich-helfen",
    label: "Was du tun kannst",
    emoji: "💡",
    patterns: [/was kann ich tun/i, /wie helfe/i, /alltag\w* hel/i, /selber hel/i],
  },
];

export type TopicLink = {
  factId: string;
  label: string;
  emoji: string;
};

export function collectTopicLinks(...texts: string[]): TopicLink[] {
  const combined = texts.join(" ");
  const seen = new Set<string>();
  const links: TopicLink[] = [];
  for (const matcher of matchers) {
    if (seen.has(matcher.factId)) continue;
    if (matcher.patterns.some((pattern) => pattern.test(combined))) {
      links.push({ factId: matcher.factId, label: matcher.label, emoji: matcher.emoji });
      seen.add(matcher.factId);
      if (links.length >= 2) break;
    }
  }
  return links;
}

export function pickDemoTopicLinks(seed: string, count = 2): TopicLink[] {
  if (topicFacts.length === 0) return [];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const candidates = topicFacts.map((fact) => ({
    factId: fact.id,
    label: fact.title,
    emoji: fact.emoji,
  }));
  const picked: TopicLink[] = [];
  const used = new Set<number>();
  for (let step = 0; picked.length < count && step < candidates.length; step += 1) {
    const index = Math.abs(hash + step * 7) % candidates.length;
    if (used.has(index)) continue;
    used.add(index);
    picked.push(candidates[index]);
  }
  return picked;
}

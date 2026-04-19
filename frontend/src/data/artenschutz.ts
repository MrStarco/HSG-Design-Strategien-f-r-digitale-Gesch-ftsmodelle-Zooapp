export type FactSection = {
  heading: string;
  body: string;
};

export type Fact = {
  id: string;
  emoji: string;
  title: string;
  teaser: string;
  sections: FactSection[];
  bullets?: string[];
  footer?: string;
};

export const artenschutzFacts: Fact[] = [
  {
    id: "was-ist-artenschutz",
    emoji: "🌱",
    title: "Was ist Artenschutz?",
    teaser: "Tiere und Lebensräume langfristig schützen.",
    sections: [
      {
        heading: "Kurz erklärt",
        body: "Artenschutz heißt: Dafür sorgen, dass Tier- und Pflanzenarten nicht aussterben. Dazu gehört, ihren Lebensraum zu erhalten und sie vor Gefahren wie Wilderei oder Umweltverschmutzung zu schützen.",
      },
      {
        heading: "Warum ist das wichtig?",
        body: "Jede Art ist Teil eines Netzes: Bienen bestäuben Pflanzen, Wölfe halten Rehbestände gesund, Korallen bieten Fischen Zuhause. Verschwindet eine Art, wackelt das ganze Netz.",
      },
    ],
    bullets: [
      "🌳 Lebensräume schützen (Wald, Wiese, Meer)",
      "🧬 Bedrohte Arten züchten und wieder auswildern",
      "📚 Menschen aufklären – genau wie hier in der App!",
    ],
  },
  {
    id: "wie-hilft-ein-zoo",
    emoji: "🏞️",
    title: "Wie hilft ein Zoo?",
    teaser: "Zucht bedrohter Arten, Forschung, Aufklärung.",
    sections: [
      {
        heading: "Die drei wichtigsten Aufgaben",
        body: "Moderne Zoos sind heute viel mehr als Schaugehege. Sie sind Rettungsarchen, Forschungsstationen und Lernorte.",
      },
      {
        heading: "Zucht & Auswilderung",
        body: "In europäischen Zoos gibt es gemeinsame Zuchtprogramme (in Europa EEP genannt). Einige Tiere wurden durch solche Programme vor dem Aussterben bewahrt – zum Beispiel das Przewalski-Pferd, das letzte echte Wildpferd der Welt.",
      },
      {
        heading: "Forschung & Aufklärung",
        body: "Tierpfleger und Wissenschaftler beobachten Verhalten, Krankheiten und Ernährung. Dieses Wissen hilft, wild lebende Tiere besser zu schützen. Und Besucher wie du lernen, warum Schutz nötig ist.",
      },
    ],
  },
  {
    id: "rote-liste",
    emoji: "📕",
    title: "Was ist die Rote Liste?",
    teaser: "Zeigt, welche Arten wie stark bedroht sind.",
    sections: [
      {
        heading: "Ein Ampelsystem für Arten",
        body: "Die Rote Liste ist so etwas wie ein Gesundheitscheck für alle bekannten Tier- und Pflanzenarten. Geführt wird sie von einer weltweiten Umweltorganisation (IUCN). Fachleute bewerten regelmäßig, wie es um jede Art steht.",
      },
      {
        heading: "Die Stufen – vereinfacht",
        body: "Von „Nicht gefährdet“ (alles gut) über „Gefährdet“ und „Stark gefährdet“ bis zu „Vom Aussterben bedroht“ und „Ausgestorben“. In der App zeigen wir dir dazu eine farbige Karte im Tierprofil.",
      },
    ],
    bullets: [
      "🟢 Nicht gefährdet – stabile Bestände",
      "🟡 Gefährdet – Bestand geht zurück",
      "🟠 Stark gefährdet – nur noch wenige übrig",
      "🔴 Vom Aussterben bedroht – letzte Chance",
    ],
  },
  {
    id: "walter-zoo",
    emoji: "🦓",
    title: "Was macht der Walter Zoo?",
    teaser: "Programme und Zooschule für Artenschutz.",
    sections: [
      {
        heading: "Mittendrin statt nur dabei",
        body: "Der Walter Zoo in Gossau (Schweiz) beteiligt sich an europäischen Zuchtprogrammen und unterstützt internationale Schutzprojekte – von Löwen in Afrika bis zu Humboldt-Pinguinen an der südamerikanischen Küste.",
      },
      {
        heading: "Zooschule",
        body: "In der Zooschule lernen Kinder und Schulklassen, wie Tiere leben und was jeder im Alltag für den Schutz tun kann. Diese App ist eine Ergänzung für zu Hause.",
      },
    ],
    footer: "Mehr dazu: walterzoo.ch",
  },
  {
    id: "kann-ich-helfen",
    emoji: "💡",
    title: "Kann ich helfen?",
    teaser: "Konsum, Müll, Natur respektieren.",
    sections: [
      {
        heading: "Artenschutz beginnt zu Hause",
        body: "Du musst kein Zoopfleger werden, um zu helfen. Schon kleine Dinge machen einen Unterschied, wenn viele Menschen mitmachen.",
      },
    ],
    bullets: [
      "♻️ Müll trennen & weniger wegwerfen",
      "🛍️ Weniger Plastik – Stofftasche statt Tüte",
      "🐝 Bienen- und insektenfreundliche Pflanzen im Garten oder auf dem Balkon",
      "🌱 Weniger Fleisch essen, mehr Gemüse",
      "🚲 Mit Velo oder Bus statt Auto, wenn möglich",
      "🔦 Nachts Licht aus, das hilft Insekten und Vögeln",
    ],
    footer: "Klein anfangen ist okay – Hauptsache, du fängst an!",
  },
];

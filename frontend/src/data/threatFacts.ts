import type { ThreatKind } from "../types";
import type { Fact } from "./artenschutz";

export const threatFacts: Record<ThreatKind, Fact> = {
  habitat: {
    id: "threat-habitat",
    emoji: "🌳",
    title: "Lebensraumverlust",
    teaser: "Wenn Wälder, Wiesen oder Riffe verschwinden.",
    sections: [
      {
        heading: "Was passiert da?",
        body: "Lebensraumverlust heißt: Der Ort, an dem ein Tier lebt, wird kleiner oder verschwindet ganz. Häufige Gründe sind Rodungen für Felder, neue Straßen, Häuser oder Bergbau.",
      },
      {
        heading: "Warum ist das so schlimm?",
        body: "Ohne Lebensraum finden Tiere kein Futter und keinen Platz, um Junge großzuziehen. Viele Arten sind heute genau deshalb bedroht – vom Regenwald bis zu den heimischen Wiesen.",
      },
    ],
    bullets: [
      "🌴 Regenwald wird für Palmöl-Plantagen abgeholzt",
      "🏗️ Wachsende Städte: Immer mehr Natur wird zubetoniert",
      "🌊 Korallenriffe bleichen aus, wenn das Meer zu warm wird",
    ],
    footer: "Kauf bewusst ein und schütze Natur vor deiner Haustür.",
  },
  poaching: {
    id: "threat-poaching",
    emoji: "🎯",
    title: "Wilderei",
    teaser: "Illegale Jagd auf bedrohte Tiere.",
    sections: [
      {
        heading: "Was ist Wilderei?",
        body: "Wilderei heißt: Tiere werden illegal gejagt oder gefangen. Manche Arten werden wegen ihres Fells, ihrer Hörner oder als Haustiere erbeutet.",
      },
      {
        heading: "Wie wird dagegen gekämpft?",
        body: "Nationalparks stellen Ranger ein, die Tiere und Lebensräume schützen. Zoos helfen mit Zucht und Aufklärung, damit diese Arten nicht verschwinden.",
      },
    ],
    bullets: [
      "🐯 Tiger werden wegen ihres schönen Fells illegal gejagt",
      "🦏 Nashörner werden wegen ihrer Hörner bedroht",
      "🛡️ Ranger schützen Tiere in Nationalparks rund um die Uhr",
    ],
    footer: "Kaufe niemals Souvenirs aus Horn, Elfenbein oder Schildpatt.",
  },
  climate: {
    id: "threat-climate",
    emoji: "🌡️",
    title: "Klimawandel",
    teaser: "Wärmer, trockener, unberechenbarer.",
    sections: [
      {
        heading: "Kurz erklärt",
        body: "Das Klima wird weltweit wärmer, vor allem weil wir zu viel CO₂ in die Luft lassen. Das verändert Lebensräume schneller, als Tiere sich anpassen können.",
      },
      {
        heading: "Was merken die Tiere?",
        body: "Eisbären verlieren Meereis, Alpen-Tiere müssen höher hinauf, Korallen bleichen im warmen Wasser aus. Auch heimische Arten wie Bienen haben es schwerer.",
      },
    ],
    bullets: [
      "🚲 Weniger Auto, mehr Velo & Bus",
      "💡 Energie sparen (Licht aus, Heizung runter)",
      "🥦 Weniger Fleisch essen",
    ],
  },
  overfishing: {
    id: "threat-overfishing",
    emoji: "🐟",
    title: "Überfischung",
    teaser: "Zu viele Fische werden aus dem Meer geholt.",
    sections: [
      {
        heading: "Was heißt das?",
        body: "Wenn mehr Fische gefangen werden, als nachwachsen können, sinken die Bestände. Manche Arten sind fast verschwunden – Futter für Pinguine, Robben und andere Meerestiere fehlt dann.",
      },
      {
        heading: "Was hilft?",
        body: "Schutzgebiete, sanftere Fangmethoden und Siegel auf Fischverpackungen (wie MSC) helfen, Bestände zu schonen. Auch du kannst auf nachhaltigen Fisch achten – oder öfter pflanzlich essen.",
      },
    ],
    bullets: [
      "🐧 Pinguinen fehlt das Futter, wenn Fische zu knapp werden",
      "🦈 Haie verfangen sich oft in Netzen, obwohl sie gar nicht gefangen werden sollen",
      "🥫 Das MSC-Siegel zeigt dir Fisch aus nachhaltigem Fang",
    ],
  },
  pollution: {
    id: "threat-pollution",
    emoji: "🧴",
    title: "Umweltverschmutzung",
    teaser: "Plastik, Chemikalien und Müll schaden Tieren.",
    sections: [
      {
        heading: "Das Problem",
        body: "Jede Minute landet rund eine LKW-Ladung Plastik im Meer. Tiere verwechseln Plastik mit Nahrung oder verfangen sich darin. Auch Chemikalien aus Fabriken und Landwirtschaft belasten Böden und Gewässer.",
      },
      {
        heading: "Was kannst du tun?",
        body: "Müll trennen, Mehrweg statt Einweg, weniger Plastikverpackungen kaufen. Auf Wanderungen keinen Müll liegen lassen – auch Zigarettenstummel zählen.",
      },
    ],
    bullets: [
      "♻️ Trennen statt wegwerfen",
      "🛍️ Stofftasche statt Plastiksack",
      "🥤 Trinkflasche auffüllen statt PET kaufen",
    ],
  },
  conflict: {
    id: "threat-conflict",
    emoji: "⚠️",
    title: "Mensch-Tier-Konflikte",
    teaser: "Wenn Menschen und Tiere sich in die Quere kommen.",
    sections: [
      {
        heading: "Warum gibt es Konflikte?",
        body: "Wo Lebensräume schrumpfen, treffen Tiere öfter auf Menschen. Elefanten fressen Felder leer, Löwen greifen Nutztiere an, Wölfe kommen näher an Dörfer heran.",
      },
      {
        heading: "Wie lösen wir das?",
        body: "Moderne Schutzprojekte arbeiten eng mit der lokalen Bevölkerung zusammen – zum Beispiel mit Elefantenzäunen aus Bienenstöcken, Schutz für Herden oder Ausgleichszahlungen bei Schäden.",
      },
    ],
    bullets: [
      "🐘 Bienenstock-Zäune halten Elefanten von Feldern fern",
      "🐑 Herdenschutzhunde schützen Schafe vor Wölfen",
      "🤝 Aufklärung hilft beiden Seiten",
    ],
  },
  traffic: {
    id: "threat-traffic",
    emoji: "🚗",
    title: "Verkehr & Zäune",
    teaser: "Straßen zerschneiden Lebensräume.",
    sections: [
      {
        heading: "Barrieren in der Landschaft",
        body: "Autobahnen, Zäune und Bahntrassen teilen Lebensräume in Stücke. Tiere verunglücken im Straßenverkehr oder kommen nicht mehr zu Futter, Wasser oder Partnern.",
      },
      {
        heading: "Was hilft?",
        body: "Grünbrücken, Tierunterführungen und wildtierfreundliche Zäune ermöglichen sichere Wanderungen. In der Schweiz gibt es davon immer mehr.",
      },
    ],
    bullets: [
      "🌉 Grünbrücken über Autobahnen",
      "🦔 Igelfreundliche Gärten ohne scharfe Zäune",
      "🚗 Nachts langsamer fahren in Wildgebieten",
    ],
  },
};

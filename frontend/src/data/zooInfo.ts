import type { Fact } from "./artenschutz";

export const openingHoursFact: Fact = {
  id: "oeffnungszeiten",
  emoji: "🕘",
  title: "Öffnungszeiten & Anreise",
  teaser: "Wann der Zoo geöffnet ist und wie du hinkommst.",
  sections: [
    {
      heading: "Öffnungszeiten",
      body: "Der Walter Zoo in Gossau ist jeden Tag geöffnet – auch an den meisten Feiertagen. Sommer: 9:00 bis 18:00 Uhr, Winter: 9:00 bis 17:00 Uhr. Letzter Einlass ist jeweils eine Stunde vor Schließung.",
    },
    {
      heading: "Anreise",
      body: "Mit dem ÖV fährst du zum Bahnhof Gossau SG, von dort sind es ca. 15 Minuten zu Fuß oder eine kurze Busfahrt. Mit dem Auto gibt es direkt am Zoo einen großen Parkplatz.",
    },
    {
      heading: "Tipp für deinen Besuch",
      body: "Plane etwa 3–4 Stunden ein, wenn du alle Tiere sehen willst. Bei warmem Wetter sind die Afrikaanlage und der Streichelzoo besonders beliebt.",
    },
  ],
  bullets: [
    "🌞 Sommer (April – Oktober): 9:00 – 18:00 Uhr",
    "❄️ Winter (November – März): 9:00 – 17:00 Uhr",
    "⏰ Letzter Einlass: 1 Stunde vor Schließung",
    "🚍 Bahnhof Gossau SG + Bus/Fußweg",
    "🅿️ Großer Parkplatz direkt am Zoo",
  ],
  footer: "Aktuelle Zeiten findest du auf walterzoo.ch",
};

export type ZooEvent = Fact & {
  shortLabel: string;
};

export const zooEventFacts: ZooEvent[] = [
  {
    id: "event-loewen",
    shortLabel: "🦁 Löwen-Fütterung – heute 14:00 Uhr",
    emoji: "🦁",
    title: "Löwen-Fütterung",
    teaser: "Täglich um 14:00 Uhr – direkt an der Afrikaanlage.",
    sections: [
      {
        heading: "Worum geht's?",
        body: "Einmal am Tag werden die Löwen gefüttert. Du kannst live zuschauen, wie sie ihr Futter jagen und zerlegen. Ein Tierpfleger erklärt dabei, wie Löwen in der Natur leben.",
      },
      {
        heading: "Was du lernst",
        body: "Warum Löwen so lange schlafen, wie sie in der Savanne jagen und warum es im Walter Zoo ein internationales Zuchtprogramm für sie gibt.",
      },
    ],
    bullets: [
      "📍 Afrikaanlage",
      "⏰ Täglich 14:00 Uhr (ca. 15 Minuten)",
      "👨‍🔬 Mit Kommentar vom Tierpfleger",
      "🎟️ Im normalen Eintritt enthalten",
    ],
    footer: "Sei 10 Minuten früher da – beste Plätze sind schnell weg!",
  },
  {
    id: "event-geburtstag",
    shortLabel: "🎂 Kindergeburtstag im Zoo – Sa & So",
    emoji: "🎂",
    title: "Kindergeburtstag im Zoo",
    teaser: "Dein Geburtstag zwischen Löwen, Pandas und Pinguinen.",
    sections: [
      {
        heading: "Das erwartet dich",
        body: "Feiere deinen Geburtstag mitten im Walter Zoo. Du bekommst einen eigenen Geburtstagsraum, eine Spezialführung zu deinen Lieblingstieren und einen kleinen Artenschutz-Workshop.",
      },
      {
        heading: "Für wen?",
        body: "Geeignet für 6- bis 14-Jährige, in kleinen Gruppen bis zu 12 Kindern. Erwachsene dürfen natürlich auch mit.",
      },
    ],
    bullets: [
      "📅 Jedes Wochenende (Sa & So)",
      "👥 Bis zu 12 Kinder",
      "🎁 Kleines Geschenk inklusive",
      "🐾 Tiererlebnis zum Auswählen",
    ],
    footer: "Anmeldung frühzeitig über walterzoo.ch – Plätze sind begehrt.",
  },
  {
    id: "event-nacht",
    shortLabel: "🌙 Nachtführung – Fr 20:00",
    emoji: "🌙",
    title: "Nachtführung",
    teaser: "Der Zoo nach Einbruch der Dunkelheit.",
    sections: [
      {
        heading: "Ein ganz anderer Zoo",
        body: "Wenn die Besucher weg sind, werden viele Tiere erst richtig aktiv. Mit einem Tierpfleger wanderst du im Dunkeln durch den Zoo und erlebst nachtaktive Tiere wie Eulen, Igel und Alligatoren.",
      },
      {
        heading: "Was du mitbringen solltest",
        body: "Warme Kleidung, festes Schuhwerk und eine Taschenlampe (gibts auch vor Ort zum Ausleihen). Die Tour dauert etwa 90 Minuten.",
      },
    ],
    bullets: [
      "📅 Ausgewählte Freitage, 20:00 Uhr",
      "⏱️ Rund 90 Minuten",
      "🔦 Taschenlampe oder Stirnlampe mitbringen",
      "👨‍👩‍👧 Für Familien mit Kindern ab 8 Jahren",
    ],
    footer: "Termine und Anmeldung: walterzoo.ch",
  },
];

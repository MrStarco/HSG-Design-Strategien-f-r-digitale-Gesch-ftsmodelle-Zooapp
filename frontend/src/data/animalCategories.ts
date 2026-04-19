import type { Fact } from "./artenschutz";

export type AnimalCategoryFact = Fact & {
  shortLabel: string;
};

export const animalCategoryFacts: AnimalCategoryFact[] = [
  {
    id: "cat-grosskatzen",
    shortLabel: "Großkatzen",
    emoji: "🦁",
    title: "Großkatzen",
    teaser: "Löwen und Tiger – Könige der Savanne und des Dschungels.",
    sections: [
      {
        heading: "Wer lebt im Walter Zoo?",
        body: "Im Walter Zoo findest du Afrikanische Löwen und Sumatra-Tiger. Beide Arten leben in großen Anlagen mit viel Platz zum Rennen, Klettern und Ruhen.",
      },
      {
        heading: "Warum sind sie bedroht?",
        body: "Großkatzen verlieren weltweit Lebensraum. Löwen haben in den letzten 25 Jahren mehr als die Hälfte ihres Bestandes eingebüßt, Sumatra-Tiger gibt es in der Natur nur noch wenige hundert.",
      },
      {
        heading: "Wie hilft der Zoo?",
        body: "Der Walter Zoo beteiligt sich an europäischen Zuchtprogrammen (EEP) und unterstützt Aufklärung, damit Menschen und Großkatzen besser zusammenleben können.",
      },
    ],
    bullets: [
      "🦁 Simba – Afrikanischer Löwe",
      "🐯 Raja – Sumatra-Tiger",
      "📍 Afrikaanlage & Raubtierhaus",
    ],
    footer: "Lerne beide auch im Chat kennen!",
  },
  {
    id: "cat-primaten",
    shortLabel: "Primaten",
    emoji: "🐵",
    title: "Primaten",
    teaser: "Affen – neugierig, clever und unsere nächsten Verwandten.",
    sections: [
      {
        heading: "Wer lebt im Walter Zoo?",
        body: "Auf der Primateninsel leben unter anderem Kapuzineraffen. Sie knacken Nüsse mit Steinen, lösen Rätsel und kommunizieren mit vielen Lauten und Gesten.",
      },
      {
        heading: "Bedrohung: Regenwald",
        body: "Viele Affenarten leben im Regenwald, der jeden Tag kleiner wird. Brandrodung, Palmöl und Jagd setzen den Populationen schwer zu.",
      },
      {
        heading: "Was du tun kannst",
        body: "Auf Produkte mit Palmöl achten, weniger Papier verschwenden und Recyclingholz nutzen hilft, den Regenwald zu schonen.",
      },
    ],
    bullets: [
      "🐒 Kiko – Kapuzineraffe",
      "🐼 Momo – Roter Panda (fast ein Bären-Verwandter, aber auch Waldbewohner)",
      "📍 Primateninsel & Panda-Anlage",
    ],
  },
  {
    id: "cat-voegel",
    shortLabel: "Vögel",
    emoji: "🦅",
    title: "Vögel",
    teaser: "Von Greifvögeln bis Pinguinen – die Welt der Gefiederten.",
    sections: [
      {
        heading: "Wer lebt im Walter Zoo?",
        body: "Unter den Vögeln des Zoos sind Steinadler und Humboldt-Pinguine besonders beliebt. Beide zeigen, wie unterschiedlich Vögel sich an ihren Lebensraum anpassen – einer gleitet in den Alpen, der andere jagt unter Wasser.",
      },
      {
        heading: "Bedrohungen",
        body: "Greifvögel leiden unter Störungen an Brutplätzen und gefährlichen Stromleitungen. Pinguine in Südamerika sind durch Klimawandel und Überfischung bedroht.",
      },
      {
        heading: "Zucht & Schutz",
        body: "Zoos wie der Walter Zoo unterstützen internationale Schutzprojekte für Pinguine und helfen bei der Aufzucht von Greifvögeln.",
      },
    ],
    bullets: [
      "🦅 Adler – Steinadler (Alpenraum)",
      "🐧 Humboldt-Pinguin (Südamerika)",
      "📍 Vogelzone & Pinguinbucht",
    ],
  },
  {
    id: "cat-reptilien",
    shortLabel: "Reptilien",
    emoji: "🐊",
    title: "Reptilien",
    teaser: "Schuppentiere – älter als die Dinosaurier.",
    sections: [
      {
        heading: "Wer lebt im Walter Zoo?",
        body: "Im Reptilienhaus wohnt unter anderem Kroko, ein Amerikanischer Alligator. Reptilien sind wechselwarm: Sie heizen ihren Körper über Sonnenlicht oder Wärmequellen.",
      },
      {
        heading: "Warum schützen?",
        body: "Alligatoren waren schon fast ausgerottet. Heute geht es ihnen wieder besser – aber Feuchtgebiete, ihr Lebensraum, werden weltweit trockengelegt oder zubetoniert.",
      },
      {
        heading: "Feuchtgebiete sind Superhelden",
        body: "Sümpfe und Moore speichern Wasser, filtern es sauber und binden viel CO₂. Ihr Schutz hilft nicht nur den Reptilien, sondern auch uns.",
      },
    ],
    bullets: [
      "🐊 Kroko – Amerikanischer Alligator",
      "📍 Reptilienhaus",
      "🌡️ Brauchen Wärme von außen",
    ],
  },
  {
    id: "cat-saeugetiere",
    shortLabel: "Säugetiere",
    emoji: "🦓",
    title: "Weitere Säugetiere",
    teaser: "Zebras, Otter, Igel und viele mehr.",
    sections: [
      {
        heading: "Wer lebt im Walter Zoo?",
        body: "Säugetiere sind im Zoo besonders vielfältig: Steppenzebras im Savannenhaus, Fischotter in der Wasserwelt und Europäische Igel in der Lernzone – nur um ein paar zu nennen.",
      },
      {
        heading: "Gemeinsam und doch verschieden",
        body: "Alle Säugetiere sind warmblütig und säugen ihren Nachwuchs. Trotzdem ist die Anpassung riesig: Ein Otter schwimmt, ein Zebra rennt, ein Igel rollt sich ein.",
      },
      {
        heading: "Artenschutz vor der Haustür",
        body: "Der Europäische Igel zeigt: Du musst nicht nach Afrika reisen, um Artenschutz zu betreiben. Naturnahe Gärten, Hecken und weniger Chemie helfen enorm.",
      },
    ],
    bullets: [
      "🦓 Streifi – Steppenzebra",
      "🦦 Pippa – Fischotter",
      "🦔 Finn – Europäischer Igel",
    ],
  },
  {
    id: "cat-streichelzoo",
    shortLabel: "Streichelzoo",
    emoji: "🐐",
    title: "Streichelzoo",
    teaser: "Hautnah bei Ziegen, Schafen und Co.",
    sections: [
      {
        heading: "Tierkontakt mit Respekt",
        body: "Im Streichelzoo lernst du, wie man Tieren ruhig und respektvoll begegnet. Die Tiere entscheiden selbst, ob sie zu dir kommen – bitte sie nicht jagen oder erschrecken.",
      },
      {
        heading: "Warum das wichtig ist",
        body: "Viele Kinder haben selten Kontakt zu echten Nutztieren. Sie kennenzulernen hilft, eine bessere Beziehung zur Natur aufzubauen – und das ist der erste Schritt zum Schutz.",
      },
    ],
    bullets: [
      "🐐 Ziegen, Schafe und mehr",
      "✋ Ruhig bleiben, sanft streicheln",
      "🧼 Danach Hände waschen nicht vergessen",
    ],
    footer: "Nicht füttern – die Tiere bekommen ihr perfektes Futter vom Zoo.",
  },
];

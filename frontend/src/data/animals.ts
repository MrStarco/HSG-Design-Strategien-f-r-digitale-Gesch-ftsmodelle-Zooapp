import type { AnimalProfile, VideoItem } from "../types";

export const animalProfiles: AnimalProfile[] = [
  {
    id: "simba",
    companionId: "simba",
    name: "Simba",
    species: "Afrikanischer Löwe",
    origin: "Ostafrika",
    age: "6 Jahre",
    inZooSince: "2019",
    enclosure: "Afrikaanlage",
    story: "Simba lebt seit 2019 mit seiner Gruppe im Walter Zoo.",
    favoriteActivity: "In der Sonne dösen und die Anlage beobachten.",
    abroadFriends: "Wild lebende Löwen brauchen Platz und Schutz vor Wilderei.",
    conservationStatus: {
      label: "Gefährdet",
      description: "In freier Natur gibt es viel weniger Löwen als früher. Schutzgebiete und Aufklärung helfen der Art.",
      threats: ["habitat", "poaching", "conflict"],
    },
    categories: [{ key: "life", label: "🦁 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "raja",
    companionId: "raja",
    name: "Raja",
    species: "Sumatra-Tiger",
    origin: "Südostasien",
    age: "7 Jahre",
    inZooSince: "2018",
    enclosure: "Tigeranlage",
    story: "Raja zeigt seine Stärke vor allem bei den Trainingszeiten.",
    favoriteActivity: "Pirschen und Duftspuren erkunden.",
    abroadFriends: "Sumatra-Tiger verlieren viel Regenwald – deshalb sind sie sehr selten.",
    conservationStatus: {
      label: "Stark gefährdet",
      description: "Nur noch wenige hundert Tiere leben in freier Natur. Der Zoo unterstützt Zucht und Aufklärung.",
      threats: ["habitat", "poaching"],
    },
    categories: [{ key: "life", label: "🐯 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "momo",
    companionId: "momo",
    name: "Momo",
    species: "Roter Panda",
    origin: "Himalaya",
    age: "4 Jahre",
    inZooSince: "2021",
    enclosure: "Panda-Anlage",
    story: "Momo ruht tagsüber gern im Schatten auf hohen Plattformen.",
    favoriteActivity: "Bambus knabbern und klettern.",
    abroadFriends: "Der Wald am Himalaya wird kleiner – das macht roten Pandas zu schaffen.",
    conservationStatus: {
      label: "Gefährdet",
      description: "Roter Panda braucht dichten Wald. Zoos helfen mit Forschung und bekannten Arten-Schutzprojekten.",
      threats: ["habitat", "poaching"],
    },
    categories: [{ key: "life", label: "🐼 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "pippa",
    companionId: "pippa",
    name: "Pippa",
    species: "Fischotter",
    origin: "Europa",
    age: "5 Jahre",
    inZooSince: "2020",
    enclosure: "Wasserwelt",
    story: "Pippa entdeckt täglich das Wasserbecken.",
    favoriteActivity: "Tauchen und mit Futterbällen spielen.",
    abroadFriends: "Saubere Flüsse und Ufer sind für Otter überlebenswichtig.",
    conservationStatus: {
      label: "Gefährdet",
      description: "Verschmutzung und verbaute Gewässer erschweren das Leben. Naturschutz vor Ort hilft.",
      threats: ["pollution", "habitat"],
    },
    categories: [{ key: "life", label: "🦦 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "streifi",
    companionId: "streifi",
    name: "Streifi",
    species: "Steppenzebra",
    origin: "Ostafrika",
    age: "8 Jahre",
    inZooSince: "2017",
    enclosure: "Savannenhaus",
    story: "Streifi lebt in einer Herde und ist oft am ersten am Zaun.",
    favoriteActivity: "Gemeinsam grasen und kurz sprinten.",
    abroadFriends: "Weite Savannen und Schutzgebiete sind für Zebras wichtig.",
    conservationStatus: {
      label: "Nicht stark gefährdet",
      description: "Die Art gilt derzeit als relativ stabil – trotzdem schützen Zoos die Vielfalt und informieren Besucher.",
      threats: ["habitat", "poaching"],
    },
    categories: [{ key: "life", label: "🦓 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "kroko",
    companionId: "kroko",
    name: "Kroko",
    species: "Amerikanischer Alligator",
    origin: "Nordamerika",
    age: "12 Jahre",
    inZooSince: "2016",
    enclosure: "Reptilienhaus",
    story: "Kroko beobachtet ruhig vom Ufer aus.",
    favoriteActivity: "Sich sonnen und durchs Wasser gleiten.",
    abroadFriends: "Sümpfe und Flüsse müssen erhalten bleiben.",
    conservationStatus: {
      label: "Bestand erholt sich",
      description: "Nach starker Bedrohung gibt es wieder mehr Alligatoren – Feuchtgebiete bleiben aber schützenswert.",
      threats: ["habitat", "pollution"],
    },
    categories: [{ key: "life", label: "🐊 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "finn",
    companionId: "finn",
    name: "Finn",
    species: "Europäischer Igel",
    origin: "Europa",
    age: "3 Jahre",
    inZooSince: "2022",
    enclosure: "Lernzone",
    story: "Finn zeigt, wie wichtig Hecken und Gärten für Igel sind.",
    favoriteActivity: "Abends Futtersuche und Verstecke bauen.",
    abroadFriends: "Zu viel Beton und Gift schaden Igeln in Städten und auf dem Land.",
    conservationStatus: {
      label: "Gefährdet",
      description: "Igel brauchen Verbindungen zwischen Grünflächen. Jeder Garten kann helfen.",
      threats: ["habitat", "traffic", "pollution"],
    },
    categories: [{ key: "life", label: "🦔 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "adler",
    companionId: "adler",
    name: "Adler",
    species: "Steinadler",
    origin: "Alpenraum",
    age: "9 Jahre",
    inZooSince: "2017",
    enclosure: "Vogelzone",
    story: "Adler trainiert Flugmanöver und zeigt seine Spannweite.",
    favoriteActivity: "Von erhöhten Sitzen die Umgebung beobachten.",
    abroadFriends: "Weite Jagdgebiete und Ruhe beim Brüten sind nötig.",
    conservationStatus: {
      label: "Nicht stark gefährdet",
      description: "In vielen Regionen geht es dem Steinadler wieder besser – Störungen und Leitungen bleiben aber Themen.",
      threats: ["habitat", "traffic"],
    },
    categories: [{ key: "life", label: "🦅 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
  {
    id: "kiko",
    companionId: "kiko",
    name: "Kiko",
    species: "Kapuzineraffe",
    origin: "Südamerika",
    age: "5 Jahre",
    inZooSince: "2020",
    enclosure: "Primateninsel",
    story: "Kiko beobachtet die Besucher gern von oben.",
    favoriteActivity: "Geschicklichkeitsspiele und Futterrätsel.",
    abroadFriends: "Regenwald schwindet – viele Affen verlieren ihr Zuhause.",
    conservationStatus: {
      label: "Gefährdet",
      description: "Lebensraumverlust und Jagd bedrohen viele Primaten. Zoos unterstützen Schutzprojekte.",
      threats: ["habitat", "poaching"],
    },
    categories: [{ key: "life", label: "🐒 Aus meinem Leben" }, { key: "abroad", label: "🌍 Meine Freunde im Ausland" }, { key: "live", label: "📡 Live aus dem Zoo" }, { key: "experts", label: "🔬 Experten erklären" }, { key: "keepers", label: "👨‍🔬 Pfleger-Geheimnisse" }],
  },
];

const durations = ["1:42", "2:14", "2:34", "3:01", "1:56"];
export const walterZooChannelHandle = "@WalterZooSG";

function pickFallbackImage(animalId: string, category: string, index: number) {
  return `https://picsum.photos/seed/walter-zoo-${animalId}-${category}-${index}/640/360`;
}

export const videos: VideoItem[] = animalProfiles.flatMap((animal) =>
  animal.categories.flatMap((category, i) =>
    Array.from({ length: 3 }).map((_, n) => {
      const fallbackImageUrl = pickFallbackImage(animal.id, category.key, n);
      return {
        id: `${animal.id}-${category.key}-${n}`,
        animalId: animal.id,
        category: category.key,
        title: `${animal.name}: ${category.label.replace(/^[^\s]+\s/, "")} ${n + 1}`,
        duration: durations[(i + n) % durations.length],
        description: `${animal.name} zeigt dir spannende Einblicke in ${animal.species} und erklärt, warum Artenschutz so wichtig ist.`,
        fallbackImageUrl,
      };
    }),
  ),
);

export const zooCategories = ["Großkatzen", "Primaten", "Vögel", "Reptilien", "Säugetiere", "Streichelzoo"];
export const zooEvents = [
  "🦁 Löwen-Fütterung – heute 14:00 Uhr",
  "🎂 Kindergeburtstag im Zoo – Sa & So",
  "🌙 Nachtführung – Fr 20. April, 20:00",
];

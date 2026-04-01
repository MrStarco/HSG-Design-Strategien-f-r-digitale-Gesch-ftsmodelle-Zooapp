export type MapPath = {
  id: string;
  d: string;
  kind: "main" | "side";
};

export type MapZone = {
  id: string;
  label: string;
  d: string;
  labelX: number;
  labelY: number;
};

export type InfrastructurePoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: string;
};

export type CompanionAnchor = {
  id: string;
  x: number;
  y: number;
};

export const mapViewBox = "-130 -53 1282 875";

export const mapPaths: MapPath[] = [
  {
    id: "main-loop",
    kind: "main",
    d: "M140 645 C230 620, 320 592, 420 560 C530 524, 642 480, 735 410 C810 352, 858 295, 930 230",
  },
  {
    id: "upper-walk",
    kind: "main",
    d: "M540 325 C620 300, 700 275, 780 246 C845 220, 896 185, 940 140",
  },
  {
    id: "mid-connection",
    kind: "side",
    d: "M430 560 C470 500, 500 446, 540 390",
  },
  {
    id: "tiger-branch",
    kind: "side",
    d: "M300 590 C285 552, 270 520, 255 485",
  },
  {
    id: "reptile-branch",
    kind: "side",
    d: "M170 640 C145 608, 132 575, 126 538",
  },
  {
    id: "zebra-branch",
    kind: "side",
    d: "M745 410 C727 375, 720 345, 715 317",
  },
  {
    id: "adler-branch",
    kind: "side",
    d: "M895 235 C915 210, 930 182, 940 148",
  },
];

export const mapZones: MapZone[] = [
  {
    id: "entry",
    label: "Eingang / Kiosk",
    d: "M258 633 L395 594 L475 617 L372 681 L245 681 Z",
    labelX: 348,
    labelY: 648,
  },
  {
    id: "reptile",
    label: "Reptilienhaus",
    d: "M84 560 L205 520 L248 575 L140 640 L64 616 Z",
    labelX: 150,
    labelY: 578,
  },
  {
    id: "tiger",
    label: "Tigeranlage",
    d: "M225 524 L373 471 L423 548 L314 595 L224 573 Z",
    labelX: 317,
    labelY: 539,
  },
  {
    id: "savanna",
    label: "Savannenhaus",
    d: "M625 248 L809 186 L902 241 L738 323 L612 298 Z",
    labelX: 758,
    labelY: 252,
  },
  {
    id: "panda",
    label: "Kleiner Panda / Otter",
    d: "M760 334 L865 302 L924 353 L815 406 L748 384 Z",
    labelX: 834,
    labelY: 353,
  },
  {
    id: "vogel",
    label: "Flugtraining / Vogelzone",
    d: "M847 93 L940 89 L985 132 L910 179 L840 153 Z",
    labelX: 915,
    labelY: 130,
  },
  {
    id: "chimp",
    label: "Schimpansenhaus",
    d: "M474 437 L570 401 L628 434 L548 494 L474 476 Z",
    labelX: 550,
    labelY: 445,
  },
];

export const infrastructurePoints: InfrastructurePoint[] = [
  { id: "wc1", label: "WC", x: 332, y: 592, icon: "🚻" },
  { id: "wc2", label: "WC", x: 760, y: 300, icon: "🚻" },
  { id: "restaurant", label: "Restaurant", x: 304, y: 544, icon: "🍽️" },
  { id: "kiosk", label: "Kiosk", x: 415, y: 610, icon: "🛒" },
  { id: "info", label: "Info", x: 390, y: 646, icon: "ℹ️" },
  { id: "parking", label: "Parkplatz", x: 86, y: 664, icon: "🅿️" },
];

export const companionAnchors: CompanionAnchor[] = [
  { id: "simba", x: 667, y: 266 },
  { id: "raja", x: 353, y: 560 },
  { id: "momo", x: 775, y: 352 },
  { id: "pippa", x: 826, y: 386 },
  { id: "streifi", x: 752, y: 249 },
  { id: "kroko", x: 150, y: 580 },
  { id: "finn", x: 882, y: 154 },
  { id: "adler", x: 936, y: 114 },
  { id: "kiko", x: 530, y: 449 },
];

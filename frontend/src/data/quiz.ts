import type { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Wie viele Tierarten sind laut Schätzungen weltweit vom Aussterben bedroht?", answers: ["500", "Über 8.000", "100"], correctIndex: 1 },
  { id: "q2", question: "Was bedeutet Artenschutz?", answers: ["Tiere einsperren", "Tierarten und Lebensräume schützen", "Nur Zoos finanzieren"], correctIndex: 1 },
  { id: "q3", question: "Warum sind Zoos wichtig für den Artenschutz?", answers: ["Nur zur Unterhaltung", "Zucht und Schutz bedrohter Arten", "Tiere ersetzen den Wald"], correctIndex: 1 },
  { id: "q4", question: "Was ist Lebensraumverlust?", answers: ["Tiere werden grösser", "Wald und Wiese verschwinden", "Tiere wandern in den Süden"], correctIndex: 1 },
  { id: "q5", question: "Was bedroht viele Arten in den Ozeanen besonders?", answers: ["Zu viel Regen", "Plastik und Überfischung", "Zu wenig Wellen"], correctIndex: 1 },
  { id: "q6", question: "Was kannst du zu Hause für die Natur tun?", answers: ["Mehr Plastik kaufen", "Müll trennen und sparsam leben", "Wiese betonieren"], correctIndex: 1 },
  { id: "q7", question: "Was ist Wilderei?", answers: ["Tiere im Zoo füttern", "Illegales Jagen oder Fangen", "Tiere fotografieren"], correctIndex: 1 },
  { id: "q8", question: "Warum brauchen bedrohte Arten manchmal Zuchtprogramme?", answers: ["Um mehr Tickets zu verkaufen", "Damit die Art nicht ausstirbt", "Damit Tiere grösser werden"], correctIndex: 1 },
  { id: "q9", question: "Was ist eine „bedrohte Tierart“?", answers: ["Ein Tier, das laut ist", "Eine Art, die aussterben könnte", "Ein Tier im Streichelzoo"], correctIndex: 1 },

  { id: "simba-q1", companionId: "simba", question: "Warum brauchen Löwen in freier Natur besonders Schutz?", answers: ["Sie sind zu klein", "Lebensraum und Konflikte mit Menschen", "Sie mögen kein Wasser"], correctIndex: 1 },
  { id: "raja-q1", companionId: "raja", question: "Was bedroht Sumatra-Tiger am stärksten?", answers: ["Zu viel Schnee", "Abholzung und Lebensraumverlust", "Zu wenig Zoos"], correctIndex: 1 },
  { id: "momo-q1", companionId: "momo", question: "Warum sind rote Pandas gefährdet?", answers: ["Sie fressen zu wenig Fleisch", "Wald wird kleiner und zerschnitten", "Sie leben nur in der Wüste"], correctIndex: 1 },
  { id: "pippa-q1", companionId: "pippa", question: "Warum brauchen Otter saubere Gewässer?", answers: ["Sie trinken nur Cola", "Sie jagen Fische und brauchen intakte Ufer", "Sie hassen Regen"], correctIndex: 1 },
  { id: "streifi-q1", companionId: "streifi", question: "Was brauchen Zebras in der Savanne besonders?", answers: ["Eisige Kälte", "Weite Weiden und Schutzgebiete", "Nur Sand ohne Gras"], correctIndex: 1 },
  { id: "kroko-q1", companionId: "kroko", question: "Warum sind Feuchtgebiete für Alligatoren wichtig?", answers: ["Sie mögen nur Wüste", "Dort leben sie und finden Nahrung", "Sie brauchen hohe Berge"], correctIndex: 1 },
  { id: "finn-q1", companionId: "finn", question: "Womit helfen naturnahe Gärten Igeln?", answers: ["Sie mögen nur Beton", "Hecken, Verstecke und weniger Gift", "Sie brauchen Lärm"], correctIndex: 1 },
  { id: "adler-q1", companionId: "adler", question: "Was brauchen Greifvögel zum Überleben?", answers: ["Nur Futter im Zoo", "Weite Jagdgebiete und Ruhe beim Brüten", "Laute Musik"], correctIndex: 1 },
  { id: "kiko-q1", companionId: "kiko", question: "Warum ist Regenwald für Affen so wichtig?", answers: ["Nur wegen der Farben", "Als Zuhause und Nahrungsquelle", "Weil es nie regnet"], correctIndex: 1 },
];

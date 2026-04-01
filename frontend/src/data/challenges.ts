import type { DailyChallenge } from "../types";

const seedChallenges = [
  ["🌱", "Pflanze heute etwas Grünes!", "Pflanze eine Blume oder säe Kresse ein."],
  ["🚿", "Spare heute Wasser!", "Dusche heute 2 Minuten kürzer als sonst."],
  ["🛍️", "Plastikfrei unterwegs", "Sage heute Nein zu einer Plastiktüte."],
  ["🐦", "Vogel-Scout", "Beobachte heute 3 verschiedene Vogelarten."],
  ["🍎", "Green Meal", "Iss heute eine Mahlzeit ohne Fleisch."],
  ["♻️", "Recycling-Profi", "Trenne heute deinen Müll besonders sorgfältig."],
  ["📚", "Artenschutz erzählen", "Lerne eine bedrohte Tierart und erzähle sie einem Freund."],
  ["🌍", "Naturtagebuch", "Schreibe auf, was du heute für die Natur getan hast."],
  ["🐝", "Bienen-Mission", "Suche nach Bienen oder Schmetterlingen."],
  ["💧", "Wasserheld", "Giesse eine Pflanze und erkläre, warum Wasser wichtig ist."],
];

export const challenges: DailyChallenge[] = Array.from({ length: 30 }).map((_, index) => {
  const [emoji, title, description] = seedChallenges[index % seedChallenges.length];
  return {
    id: `challenge-${index + 1}`,
    emoji,
    title: `${title} #${index + 1}`,
    description,
  };
});

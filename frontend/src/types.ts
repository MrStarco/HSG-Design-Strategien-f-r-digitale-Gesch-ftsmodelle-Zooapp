export type Mood = "happy" | "content" | "bored" | "sad";

export type Companion = {
  id: string;
  animal: string;
  emoji: string;
  name: string;
  cardColor: string;
  origin: string;
  habitat: string;
  personality: string;
  systemPrompt: string;
  greetingMessage: string;
  pinnedChips: [string, string];
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  profileLinks?: Array<{ id: string; label: string }>;
  topicLinks?: Array<{ factId: string; label: string; emoji: string }>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
  companionId?: string;
};

export type DailyChallenge = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

export type ThreatKind =
  | "habitat"
  | "poaching"
  | "climate"
  | "overfishing"
  | "pollution"
  | "conflict"
  | "traffic";

export type ConservationStatus = {
  label: string;
  description: string;
  threats?: ThreatKind[];
};

export type AnimalProfile = {
  id: string;
  companionId: string;
  name: string;
  species: string;
  origin: string;
  age: string;
  inZooSince: string;
  enclosure: string;
  story: string;
  favoriteActivity: string;
  abroadFriends: string;
  conservationStatus: ConservationStatus;
  categories: Array<{ key: string; label: string }>;
};

export type VideoItem = {
  id: string;
  animalId: string;
  category: string;
  title: string;
  duration: string;
  description: string;
  youtubeVideoId?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  fallbackImageUrl?: string;
};

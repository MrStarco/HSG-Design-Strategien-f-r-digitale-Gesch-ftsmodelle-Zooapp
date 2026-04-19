import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { companions } from "../data/companions";
import type { ChatMessage } from "../types";
import { readStorage, storageKeys, todayKey, writeStorage } from "../lib/storage";
import { emitHappinessGain } from "../lib/happinessFx";

type DailyState = {
  dateKey: string;
  quizDone: boolean;
  mapVisitDone: boolean;
  challengeDone: boolean;
};

type AppContextType = {
  selectedCompanionId: string | null;
  selectCompanion: (id: string) => void;
  happiness: number;
  addHappiness: (points: number) => void;
  consumeFeed: () => boolean;
  feedReadyAt: number;
  resetFeedTimer: () => void;
  /** Ende des Quiz-Cooldowns (Session-Start + 15 min), 0 wenn keine laufende Session */
  quizCooldownEndAt: number;
  quizAttemptsInCycle: number;
  quizUsedQuestionIds: string[];
  ensureQuizSessionStarted: () => void;
  registerQuizAnswer: (questionId: string, correct: boolean) => { happiness: number; xp: number; completedCycle: boolean };
  chatHistory: Record<string, ChatMessage[]>;
  addMessage: (companionId: string, message: ChatMessage) => void;
  daily: DailyState;
  resetQuizSession: () => void;
  /** Demo/Mirror: Quiz-Session zurücksetzen (wie früher resetQuizTimer) */
  resetQuizTimer: () => void;
  completeMapVisit: () => boolean;
  completeChallenge: () => boolean;
  resetChallengeTimer: () => void;
  xp: number;
  addXp: (points: number) => void;
  resetCompanion: () => void;
};

const initialDaily = (): DailyState => ({
  dateKey: todayKey(),
  quizDone: false,
  mapVisitDone: false,
  challengeDone: false,
});

const FEED_COOLDOWN_MS = 4 * 60 * 60 * 1000;
const QUIZ_COOLDOWN_MS = 15 * 60 * 1000;

const AppContext = createContext<AppContextType | null>(null);

function applyDecay(saved: { value: number; updatedAt: number }) {
  const elapsedMs = Date.now() - saved.updatedAt;
  const steps = Math.floor(elapsedMs / (30 * 60 * 1000));
  return Math.max(0, saved.value - steps * 5);
}

function buildGreetingMessage(companionId: string): ChatMessage[] {
  const companion = companions.find((entry) => entry.id === companionId);
  if (!companion) return [];
  return [
    {
      role: "assistant",
      content: companion.greetingMessage,
      createdAt: Date.now(),
    },
  ];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(() =>
    readStorage<string | null>(storageKeys.companion, null),
  );
  const [happiness, setHappiness] = useState<number>(() => {
    const saved = readStorage<{ value: number; updatedAt: number } | null>(storageKeys.happiness, null);
    return saved ? applyDecay(saved) : 50;
  });
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>(() =>
    readStorage<Record<string, ChatMessage[]>>(storageKeys.chat, {}),
  );
  const [daily, setDaily] = useState<DailyState>(() => {
    const saved = readStorage<DailyState>(storageKeys.daily, initialDaily());
    return saved.dateKey === todayKey() ? saved : initialDaily();
  });
  const [xp, setXp] = useState<number>(() => readStorage<number>(storageKeys.xp, 0));
  const [feedReadyAt, setFeedReadyAt] = useState<number>(() => readStorage<number>(storageKeys.feedReadyAt, 0));
  const [quizSessionStart, setQuizSessionStart] = useState<number | null>(() => readStorage<number | null>(storageKeys.quizSessionStart, null));
  const [quizAttemptsInCycle, setQuizAttemptsInCycle] = useState<number>(() => readStorage<number>(storageKeys.quizAttempts, 0));
  const [quizUsedQuestionIds, setQuizUsedQuestionIds] = useState<string[]>(() => readStorage<string[]>(storageKeys.quizUsedQuestionIds, []));

  useEffect(() => writeStorage(storageKeys.companion, selectedCompanionId), [selectedCompanionId]);
  useEffect(() => writeStorage(storageKeys.chat, chatHistory), [chatHistory]);
  useEffect(() => writeStorage(storageKeys.daily, daily), [daily]);
  useEffect(() => writeStorage(storageKeys.xp, xp), [xp]);
  useEffect(() => writeStorage(storageKeys.feedReadyAt, feedReadyAt), [feedReadyAt]);
  useEffect(() => writeStorage(storageKeys.quizSessionStart, quizSessionStart), [quizSessionStart]);
  useEffect(() => writeStorage(storageKeys.quizAttempts, quizAttemptsInCycle), [quizAttemptsInCycle]);
  useEffect(() => writeStorage(storageKeys.quizUsedQuestionIds, quizUsedQuestionIds), [quizUsedQuestionIds]);
  useEffect(() => writeStorage(storageKeys.happiness, { value: happiness, updatedAt: Date.now() }), [happiness]);

  const syncDay = () => {
    setDaily((prev) => (prev.dateKey === todayKey() ? prev : initialDaily()));
  };

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (quizSessionStart === null) return;
      const end = quizSessionStart + QUIZ_COOLDOWN_MS;
      if (now >= end) {
        setQuizSessionStart(null);
        setQuizAttemptsInCycle(0);
        setQuizUsedQuestionIds([]);
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [quizSessionStart]);

  const value = useMemo<AppContextType>(
    () => ({
      selectedCompanionId,
      selectCompanion: (id) => {
        if (selectedCompanionId !== id) {
          const greeting = buildGreetingMessage(id);
          setChatHistory(greeting.length ? { [id]: greeting } : {});
        }
        setSelectedCompanionId(id);
        if (!chatHistory[id]?.length && selectedCompanionId === id) {
          const greeting = buildGreetingMessage(id);
          if (greeting.length) {
            setChatHistory((prev) => ({
              ...prev,
              [id]: greeting,
            }));
          }
        }
      },
      happiness,
      addHappiness: (points) => {
        if (points > 0) emitHappinessGain(points);
        setHappiness((h) => Math.max(0, Math.min(100, h + points)));
      },
      consumeFeed: () => {
        const now = Date.now();
        if (now < feedReadyAt) return false;
        setFeedReadyAt(now + FEED_COOLDOWN_MS);
        return true;
      },
      feedReadyAt,
      resetFeedTimer: () => setFeedReadyAt(0),
      quizCooldownEndAt: quizSessionStart ? quizSessionStart + QUIZ_COOLDOWN_MS : 0,
      quizAttemptsInCycle,
      quizUsedQuestionIds,
      ensureQuizSessionStarted: () => {
        if (quizAttemptsInCycle === 0 && quizSessionStart === null) {
          setQuizSessionStart(Date.now());
        }
      },
      registerQuizAnswer: (questionId: string, correct: boolean) => {
        const nextAttempt = quizAttemptsInCycle + 1;
        setQuizUsedQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]));
        setQuizAttemptsInCycle(nextAttempt);
        const happiness = correct ? 2 : 0;
        const xp = correct ? 7 : 0;
        if (nextAttempt === 3) {
          syncDay();
          setDaily((prev) => {
            if (prev.quizDone) return prev;
            return { ...prev, quizDone: true };
          });
        }
        return { happiness, xp, completedCycle: nextAttempt === 3 };
      },
      chatHistory,
      addMessage: (companionId, message) => {
        setChatHistory((prev) => ({
          ...prev,
          [companionId]: [...(prev[companionId] ?? []), message],
        }));
      },
      daily,
      resetQuizSession: () => {
        setQuizSessionStart(null);
        setQuizAttemptsInCycle(0);
        setQuizUsedQuestionIds([]);
      },
      resetQuizTimer: () => {
        setQuizSessionStart(null);
        setQuizAttemptsInCycle(0);
        setQuizUsedQuestionIds([]);
      },
      completeMapVisit: () => {
        syncDay();
        let award = false;
        setDaily((prev) => {
          if (prev.mapVisitDone) return prev;
          award = true;
          return { ...prev, mapVisitDone: true };
        });
        return award;
      },
      completeChallenge: () => {
        syncDay();
        let award = false;
        setDaily((prev) => {
          if (prev.challengeDone) return prev;
          award = true;
          return { ...prev, challengeDone: true };
        });
        return award;
      },
      resetChallengeTimer: () =>
        setDaily((prev) =>
          prev.dateKey === todayKey() ? { ...prev, challengeDone: false } : { ...initialDaily(), challengeDone: false },
        ),
      xp,
      addXp: (points) => setXp((value) => value + points),
      resetCompanion: () => {
        setSelectedCompanionId(null);
        setChatHistory({});
        setHappiness(50);
        setFeedReadyAt(0);
        setQuizSessionStart(null);
        setQuizAttemptsInCycle(0);
        setQuizUsedQuestionIds([]);
        setDaily((prev) =>
          prev.dateKey === todayKey() ? { ...prev, challengeDone: false } : { ...initialDaily(), challengeDone: false },
        );
      },
    }),
    [chatHistory, daily, feedReadyAt, happiness, quizAttemptsInCycle, quizSessionStart, quizUsedQuestionIds, selectedCompanionId, xp],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext muss innerhalb von AppProvider verwendet werden.");
  return context;
}

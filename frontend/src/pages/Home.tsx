import { Mic, Send, Settings, MapPinned, Brain, Bolt, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ChatChip } from "../components/ChatChip";
import { FactSheet } from "../components/FactSheet";
import { QuizModal } from "../components/QuizModal";
import { DailyChallengeSheet } from "../components/DailyChallengeSheet";
import { SpeakButton } from "../components/SpeakButton";
import { useAppContext } from "../context/AppContext";
import { animalProfiles } from "../data/animals";
import type { Fact } from "../data/artenschutz";
import { companions, defaultQuestionChips } from "../data/companions";
import { moodByHappiness, pickRandom } from "../lib/app";
import { collectTopicLinks, getFactById } from "../lib/factRegistry";
import { todayKey } from "../lib/storage";

type SpeechRecognitionResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  start: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

const profileAliases: Array<{ id: string; label: string; aliases: string[] }> = [
  { id: "simba", label: "Simba", aliases: ["simba", "loewe", "löwe", "loewen", "löwen"] },
  { id: "raja", label: "Raja", aliases: ["raja", "tiger", "sumatra-tiger", "sumatra tiger"] },
  { id: "momo", label: "Momo", aliases: ["momo", "roter panda", "red panda", "kleiner panda"] },
  { id: "pippa", label: "Pippa", aliases: ["pippa", "otter", "fischotter"] },
  { id: "streifi", label: "Streifi", aliases: ["streifi", "zebra", "zebras"] },
  { id: "kroko", label: "Kroko", aliases: ["kroko", "alligator", "alligatoren", "krokodil"] },
  { id: "finn", label: "Finn", aliases: ["finn", "igel", "igeln"] },
  { id: "adler", label: "Adler", aliases: ["adler", "greifvogel", "greifvögel"] },
  { id: "kiko", label: "Kiko", aliases: ["kiko", "affe", "affen", "kapuzineraffe"] },
];

const knownProfileIds = new Set(animalProfiles.map((profile) => profile.id));

function collectProfileLinks(...texts: string[]) {
  const combined = texts.join(" ").toLowerCase();
  return profileAliases
    .filter((profile) => knownProfileIds.has(profile.id) && profile.aliases.some((alias) => combined.includes(alias)))
    .map(({ id, label }) => ({ id, label }));
}

export function Home() {
  const navigate = useNavigate();
  const {
    selectedCompanionId,
    happiness,
    addHappiness,
    consumeFeed,
    feedReadyAt,
    quizCooldownEndAt,
    quizAttemptsInCycle,
    quizUsedQuestionIds,
    ensureQuizSessionStarted,
    registerQuizAnswer,
    chatHistory,
    addMessage,
    daily,
    completeMapVisit,
    completeChallenge,
    addXp,
    resetCompanion,
  } = useAppContext();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizLockedInfoOpen, setQuizLockedInfoOpen] = useState(false);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [now, setNow] = useState(Date.now());
  const companionFaceRef = useRef<HTMLDivElement | null>(null);
  const [feedAnimation, setFeedAnimation] = useState<null | { x: number; y: number; dx: number; dy: number }>(null);
  const [feedAnimationActive, setFeedAnimationActive] = useState(false);
  const [openFact, setOpenFact] = useState<Fact | null>(null);

  const companion = useMemo(
    () => companions.find((c) => c.id === selectedCompanionId) ?? companions[0],
    [selectedCompanionId],
  );
  const messages = chatHistory[companion.id] ?? [];
  const askedQuestions = useMemo(() => {
    const set = new Set<string>();
    for (const message of messages) {
      if (message.role === "user") {
        set.add(message.content.trim().toLowerCase());
      }
    }
    return set;
  }, [messages]);
  const randomDefaultChips = useMemo(
    () => pickRandom(defaultQuestionChips, 2),
    [companion.id],
  );
  const chips = useMemo(() => {
    const all = [...companion.pinnedChips, ...randomDefaultChips];
    return all.filter((chip) => !askedQuestions.has(chip.trim().toLowerCase()));
  }, [companion.pinnedChips, randomDefaultChips, askedQuestions]);
  const onChipSelect = useCallback((label: string) => setInput(label), []);
  const mood = moodByHappiness(happiness);
  const feedLocked = now < feedReadyAt;
  const remainingMs = Math.max(0, feedReadyAt - now);
  const remainingHours = Math.floor(remainingMs / (60 * 60 * 1000));
  const remainingMinutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
  const remainingSeconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
  const feedTimer = `${String(remainingHours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  const quizLocked = quizAttemptsInCycle >= 3 && quizCooldownEndAt > 0 && now < quizCooldownEndAt;
  const quizRemainingMs = Math.max(0, quizCooldownEndAt - now);
  const quizRemainingMinutes = Math.floor((quizRemainingMs % (60 * 60 * 1000)) / (60 * 1000));
  const quizRemainingSeconds = Math.floor((quizRemainingMs % (60 * 1000)) / 1000);
  const quizTimer = `${String(quizRemainingMinutes).padStart(2, "0")}:${String(quizRemainingSeconds).padStart(2, "0")}`;
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);
  const challengeDoneToday = daily.dateKey === todayKey() && daily.challengeDone;
  const challengeRemainingMs = challengeDoneToday ? Math.max(0, nextMidnight.getTime() - now) : 0;
  const challengeRemainingHours = Math.floor(challengeRemainingMs / (60 * 60 * 1000));
  const challengeRemainingMinutes = Math.floor((challengeRemainingMs % (60 * 60 * 1000)) / (60 * 1000));
  const challengeRemainingSeconds = Math.floor((challengeRemainingMs % (60 * 1000)) / 1000);
  const challengeTimer = `${String(challengeRemainingHours).padStart(2, "0")}:${String(challengeRemainingMinutes).padStart(2, "0")}:${String(challengeRemainingSeconds).padStart(2, "0")}`;

  const startFeedAnimation = () => {
    if (!companionFaceRef.current) return;
    const companionRect = companionFaceRef.current.getBoundingClientRect();
    const startX = Math.max(20, companionRect.left - 70);
    const startY = companionRect.top + companionRect.height / 2;
    const endX = companionRect.left + companionRect.width / 2;
    const endY = companionRect.top + companionRect.height / 2;

    setFeedAnimation({
      x: startX,
      y: startY,
      dx: endX - startX,
      dy: endY - startY,
    });
    setFeedAnimationActive(false);
    window.requestAnimationFrame(() => setFeedAnimationActive(true));
  };

  useEffect(() => {
    if (!feedLocked && !quizLocked && !challengeDoneToday) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [challengeDoneToday, feedLocked, quizLocked]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const nextUser = { role: "user" as const, content: trimmed, createdAt: Date.now() };
    addMessage(companion.id, nextUser);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: companion.systemPrompt,
          messages: [...messages, nextUser].map((message) => ({ role: message.role, content: message.content })),
        }),
      });
      const data = (await response.json()) as { content?: string };
      const assistantContent = data.content ?? "Ups, ich brauche gerade eine kurze Pause.";
      const profileLinks = collectProfileLinks(trimmed, assistantContent);
      const topicLinks = collectTopicLinks(trimmed, assistantContent);
      addMessage(companion.id, {
        role: "assistant",
        content: assistantContent,
        createdAt: Date.now(),
        profileLinks,
        topicLinks,
      });
    } catch {
      addMessage(companion.id, {
        role: "assistant",
        content: "Ich erreiche mein Wissen gerade nicht. Versuch es gleich noch einmal.",
        createdAt: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "de-CH";
    recognition.interimResults = false;
    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);
    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <main className="page home">
      <header className="home-header">
        <strong>Walter Zoo</strong>
        <div>
          {companion.name} {mood === "happy" ? "😄" : mood === "content" ? "🙂" : mood === "bored" ? "😐" : "😢"}
        </div>
        <button className="icon-btn" onClick={resetCompanion} aria-label="Begleiter wechseln">
          <Settings size={18} />
        </button>
      </header>

      <section className="companion-zone">
        <div
          ref={companionFaceRef}
          className="companion-face"
          style={{ width: 150, height: 150, margin: "0 auto", fontSize: "5rem" }}
          role="img"
          aria-label={companion.animal}
        >
          {companion.emoji}
        </div>
        <p className="happiness-label">Wie glücklich bin ich gerade?</p>
        <div className="happiness-bar">
          <div className="happiness-fill" style={{ width: `${happiness}%` }} />
        </div>
        <small>{happiness}%</small>
      </section>

      <section className="action-grid">
        <button
          className="action-feed"
          disabled={feedLocked}
          onClick={() => {
            if (!consumeFeed()) return;
            addHappiness(5);
            addXp(10);
            startFeedAnimation();
            setNow(Date.now());
          }}
        >
          🍖 Füttern <span>{feedLocked ? `Wieder in ${feedTimer}` : "Jetzt möglich"}</span>
        </button>
        <button
          className="action-quiz"
          type="button"
          onClick={() => {
            if (quizLocked) {
              setQuizLockedInfoOpen(true);
              return;
            }
            ensureQuizSessionStarted();
            setQuizOpen(true);
          }}
        >
          <Brain size={16} /> Quiz {quizLocked ? `🔒 ${quizTimer}` : ""}
        </button>
        <button
          className="action-map"
          onClick={() => {
            if (completeMapVisit()) {
              addHappiness(20);
              addXp(20);
            }
            navigate("/map");
          }}
        >
          <MapPinned size={16} /> Karte
        </button>
        <button className="action-challenge" onClick={() => setChallengeOpen(true)}>
          <Bolt size={16} /> Heutige Challenge {challengeDoneToday ? `🔒 ${challengeTimer}` : ""}
        </button>
      </section>

      <div className="chips-row">
        {chips.map((chip) => (
          <ChatChip key={chip} label={chip} onSelect={onChipSelect} />
        ))}
      </div>

      <section className="chat-history">
        {messages.map((message, i) => (
          <article key={`${message.createdAt}-${i}`} className={`bubble ${message.role}`}>
            <p>{message.content}</p>
            {message.role === "assistant" ? (
              <div className="bubble-footer">
                <SpeakButton text={message.content} label="Nachricht vorlesen" className="bubble-speak" />
              </div>
            ) : null}
            {message.role === "assistant" && message.profileLinks?.length ? (
              <div className="bubble-links">
                {message.profileLinks.map((profileLink) => (
                  <button key={profileLink.id} className="bubble-link" onClick={() => navigate(`/profiles/${profileLink.id}`)}>
                    Zum Profil: {profileLink.label}
                  </button>
                ))}
              </div>
            ) : null}
            {message.role === "assistant" && message.topicLinks?.length ? (
              <div className="bubble-links">
                {message.topicLinks.map((topicLink) => {
                  const fact = getFactById(topicLink.factId);
                  if (!fact) return null;
                  return (
                    <button
                      key={topicLink.factId}
                      className="bubble-link bubble-link--topic"
                      onClick={() => setOpenFact(fact)}
                    >
                      <span aria-hidden>{topicLink.emoji}</span> {topicLink.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </article>
        ))}
        {loading ? (
          <article className="bubble assistant typing-bubble" aria-label={`${companion.name} tippt`}>
            <span className="typing-dots" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </article>
        ) : null}
      </section>

      <div className="chat-input">
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Stell mir eine Frage..." />
        <button className={recording ? "recording" : ""} onClick={startVoice} aria-label="Spracheingabe">
          <Mic size={18} />
        </button>
        <button onClick={() => sendMessage(input)} aria-label="Senden">
          <Send size={18} />
        </button>
      </div>

      {quizOpen ? (
        <QuizModal
          companionId={companion.id}
          companionName={companion.name}
          attemptsSoFar={quizAttemptsInCycle}
          usedQuestionIds={quizUsedQuestionIds}
          quizCooldownEndAt={quizCooldownEndAt}
          onClose={() => setQuizOpen(false)}
          onAnswer={(questionId, correct) => {
            const result = registerQuizAnswer(questionId, correct);
            if (result.happiness) addHappiness(result.happiness);
            if (result.xp) addXp(result.xp);
          }}
        />
      ) : null}
      {quizLockedInfoOpen ? (
        <div
          className="overlay"
          onClick={() => setQuizLockedInfoOpen(false)}
          onPointerDown={() => setQuizLockedInfoOpen(false)}
          onTouchStart={() => setQuizLockedInfoOpen(false)}
        >
          <div
            className="sheet"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <button className="modal-close-btn" type="button" onClick={() => setQuizLockedInfoOpen(false)} aria-label="Schließen">
              <X size={18} />
            </button>
            <h3>🧠 Quiz-Pause</h3>
            <div className="quiz-feedback">
              <p className="quiz-cooldown-hint">
                Super gemacht! Du hast das Quiz abgeschlossen. Das nächste Quiz ist in{" "}
                <strong>{quizTimer}</strong> wieder verfügbar. In der Zwischenzeit kannst du noch mehr lernen, damit du für das nächste Quiz bereit bist.
              </p>
              <button className="challenge-done-btn" type="button" onClick={() => setQuizLockedInfoOpen(false)}>
                Verstanden
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <FactSheet fact={openFact} onClose={() => setOpenFact(null)} />
      <DailyChallengeSheet
        open={challengeOpen}
        done={challengeDoneToday}
        onClose={() => setChallengeOpen(false)}
        onComplete={() => {
          if (completeChallenge()) {
            addHappiness(15);
            addXp(30);
          }
        }}
      />
      {feedAnimation ? (
        <div
          className={`feed-fly-emoji${feedAnimationActive ? " is-active" : ""}`}
          style={
            {
              left: `${feedAnimation.x}px`,
              top: `${feedAnimation.y}px`,
              "--feed-dx": `${feedAnimation.dx}px`,
              "--feed-dy": `${feedAnimation.dy}px`,
            } as CSSProperties
          }
          onTransitionEnd={() => {
            setFeedAnimation(null);
            setFeedAnimationActive(false);
          }}
          aria-hidden="true"
        >
          🍖
        </div>
      ) : null}
    </main>
  );
}

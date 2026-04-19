import { X } from "lucide-react";
import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { quizQuestions } from "../data/quiz";
import { pickQuizQuestion } from "../lib/quizPick";

type Props = {
  companionId: string;
  companionName: string;
  attemptsSoFar: number;
  usedQuestionIds: string[];
  quizCooldownEndAt: number;
  onClose: () => void;
  onAnswer: (questionId: string, correct: boolean) => void;
};

const TOTAL_ROUNDS = 3;

function formatTimer(ms: number) {
  const safe = Math.max(0, ms);
  const minutes = Math.floor((safe % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((safe % (60 * 1000)) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function QuizModal({
  companionId,
  companionName,
  attemptsSoFar,
  usedQuestionIds,
  quizCooldownEndAt,
  onClose,
  onAnswer,
}: Props) {
  const question = useMemo(
    () => pickQuizQuestion(companionId, attemptsSoFar, usedQuestionIds, quizQuestions),
    [companionId, attemptsSoFar, usedQuestionIds],
  );
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [now, setNow] = useState(Date.now());

  const roundNumber = Math.min(attemptsSoFar + 1, TOTAL_ROUNDS);
  const isLastRound = roundNumber >= TOTAL_ROUNDS;
  const showCooldown = feedback !== null && isLastRound;

  useEffect(() => {
    if (!showCooldown) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [showCooldown]);

  const stopEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const commitAnswer = () => {
    if (!question || feedback === null) return;
    onAnswer(question.id, feedback);
  };

  const handleNext = () => {
    commitAnswer();
    setFeedback(null);
  };

  const handleLater = () => {
    commitAnswer();
    onClose();
  };

  const handleClose = () => {
    if (feedback !== null) {
      commitAnswer();
    }
    onClose();
  };

  if (!question) {
    return (
      <div className="overlay" onClick={stopEvent} onPointerDown={stopEvent} onTouchStart={stopEvent}>
        <div className="sheet" onClick={stopEvent} onPointerDown={stopEvent} onTouchStart={stopEvent}>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Schließen">
            <X size={18} />
          </button>
          <h3>🧠 Artenschutz-Quiz</h3>
          <p>Alle Fragen in diesem Durchlauf waren schon dran. Versuch es später wieder!</p>
          <button type="button" className="challenge-done-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    );
  }

  const cooldownTimer = formatTimer(quizCooldownEndAt - now);

  return (
    <div
      className="overlay"
      onClick={stopEvent}
      onPointerDown={stopEvent}
      onPointerUp={stopEvent}
      onTouchStart={stopEvent}
      onTouchEnd={stopEvent}
    >
      <div
        className="sheet"
        onClick={stopEvent}
        onPointerDown={stopEvent}
        onPointerUp={stopEvent}
        onTouchStart={stopEvent}
        onTouchEnd={stopEvent}
      >
        <button className="modal-close-btn" type="button" onClick={handleClose} aria-label="Schließen">
          <X size={18} />
        </button>
        <h3>🧠 Artenschutz – Hilf {companionName}!</h3>
        <p className="quiz-progress">Frage {roundNumber} von {TOTAL_ROUNDS}</p>
        <p className="quiz-question">{question.question}</p>
        <div className="quiz-answers">
          {question.answers.map((answer, answerIndex) => (
            <button
              key={answer}
              type="button"
              disabled={feedback !== null}
              className={feedback === null ? "" : answerIndex === question.correctIndex ? "correct" : "wrong"}
              onClick={() => {
                if (feedback !== null) return;
                const ok = answerIndex === question.correctIndex;
                setFeedback(ok);
              }}
            >
              {answer}
            </button>
          ))}
        </div>

        {feedback !== null ? (
          <div className="quiz-feedback">
            <p className={`quiz-feedback-text ${feedback ? "is-correct" : "is-wrong"}`}>
              {feedback
                ? "🎉 Gut gemacht! Richtig beantwortet."
                : "🌱 Schade, vielleicht beim nächsten Mal!"}
            </p>

            {showCooldown ? (
              <>
                <p className="quiz-cooldown-hint">
                  Super gemacht! Du hast das Quiz abgeschlossen. Das nächste Quiz ist in{" "}
                  <strong>{cooldownTimer}</strong> wieder verfügbar. In der Zwischenzeit kannst du
                  noch mehr lernen, damit du für das nächste Quiz bereit bist.
                </p>
                <button type="button" className="challenge-done-btn" onClick={handleLater}>
                  Verstanden
                </button>
              </>
            ) : (
              <div className="quiz-feedback-actions">
                <button type="button" className="quiz-later-btn" onClick={handleLater}>
                  Später
                </button>
                <button type="button" className="quiz-next-btn" onClick={handleNext}>
                  Weiter
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

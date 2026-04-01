import { X } from "lucide-react";
import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { quizQuestions } from "../data/quiz";
import { pickRandom } from "../lib/app";

type Props = {
  open: boolean;
  companionName: string;
  onClose: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
};

export function QuizModal({ open, companionName, onClose, onComplete }: Props) {
  const [sessionId, setSessionId] = useState(0);
  const questions = useMemo(() => pickRandom(quizQuestions, 3), [sessionId]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const done = index >= questions.length;
  const stopEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!open) return;
    setSessionId((value) => value + 1);
    setIndex(0);
    setScore(0);
    setFeedback(null);
  }, [open]);

  if (!open) return null;

  const question = questions[index];
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
        <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Schließen">
          <X size={18} />
        </button>
        <h3>🧠 Artenschutz Quiz – Hilf {companionName} klüger zu werden!</h3>
        {done ? (
          <div className="quiz-result">
            <p>Du hast {score} von 3 richtig!</p>
            {score === questions.length ? <p>+20 Punkte für {companionName}! 🌟</p> : <p>Leider Falsch. Viel Glück beim nächsten Versuch!🍀</p>}
          </div>
        ) : (
          <>
            <p className="quiz-progress">
              Frage {index + 1}/3
            </p>
            <p className="quiz-question">{question.question}</p>
            <div className="quiz-answers">
              {question.answers.map((answer, answerIndex) => (
                <button
                  key={answer}
                  className={feedback === null ? "" : answerIndex === question.correctIndex ? "correct" : "wrong"}
                  onClick={() => {
                    if (feedback !== null) return;
                    const ok = answerIndex === question.correctIndex;
                    const nextScore = ok ? score + 1 : score;
                    if (ok) setScore((value) => value + 1);
                    setFeedback(ok);
                    setTimeout(() => {
                      setFeedback(null);
                      setIndex((value) => value + 1);
                      if (index === 2) onComplete(nextScore, questions.length);
                    }, 900);
                  }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

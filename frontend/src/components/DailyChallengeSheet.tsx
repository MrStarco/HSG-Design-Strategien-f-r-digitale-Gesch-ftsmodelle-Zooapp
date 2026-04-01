import { X } from "lucide-react";
import type { SyntheticEvent } from "react";
import { challenges } from "../data/challenges";
import { pickDailyIndex } from "../lib/app";

type Props = {
  open: boolean;
  done: boolean;
  onClose: () => void;
  onComplete: () => void;
};

export function DailyChallengeSheet({ open, done, onClose, onComplete }: Props) {
  if (!open) return null;
  const challenge = challenges[pickDailyIndex(challenges.length)];
  const stopEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };
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
        <h3>{challenge.emoji} Heutige Challenge</h3>
        <p className="challenge-title">{challenge.title}</p>
        <p>{challenge.description}</p>
        <button
          className="challenge-done-btn"
          disabled={done}
          onClick={() => {
            onComplete();
            onClose();
          }}
        >
          {done ? "Schon erledigt ✅" : "Gemacht"}
        </button>
      </div>
    </div>
  );
}

import { X } from "lucide-react";
import type { SyntheticEvent } from "react";
import type { Fact } from "../data/artenschutz";
import { SpeakButton } from "./SpeakButton";

type Props = {
  fact: Fact | null;
  onClose: () => void;
};

export function FactSheet({ fact, onClose }: Props) {
  if (!fact) return null;

  const stopEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const spokenText = [
    fact.title,
    ...fact.sections.flatMap((section) => [section.heading, section.body]),
    ...(fact.bullets ?? []),
    fact.footer ?? "",
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <div
      className="overlay"
      onClick={onClose}
      onPointerDown={onClose}
      onTouchStart={onClose}
    >
      <div
        className="sheet fact-sheet"
        onClick={stopEvent}
        onPointerDown={stopEvent}
        onTouchStart={stopEvent}
      >
        <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Schließen">
          <X size={18} />
        </button>

        <div className="fact-sheet-header">
          <div className="fact-sheet-icon" aria-hidden>
            {fact.emoji}
          </div>
          <div className="fact-sheet-title">
            <h3>{fact.title}</h3>
            <p className="fact-sheet-teaser">{fact.teaser}</p>
          </div>
          <SpeakButton text={spokenText} label="Vorlesen" />
        </div>

        <div className="fact-sheet-body">
          {fact.sections.map((section) => (
            <section key={section.heading} className="fact-section">
              <h4>{section.heading}</h4>
              <p>{section.body}</p>
            </section>
          ))}

          {fact.bullets?.length ? (
            <ul className="fact-bullets">
              {fact.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}

          {fact.footer ? <p className="fact-sheet-footer">{fact.footer}</p> : null}
        </div>

        <button type="button" className="challenge-done-btn" onClick={onClose}>
          Verstanden
        </button>
      </div>
    </div>
  );
}

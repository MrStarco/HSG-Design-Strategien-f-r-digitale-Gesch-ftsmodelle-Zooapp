import type { ThreatKind } from "../types";
import { threatMeta } from "../lib/threats";

type Props = {
  threats: ThreatKind[] | undefined;
  onSelect?: (kind: ThreatKind) => void;
};

export function ThreatIcons({ threats, onSelect }: Props) {
  if (!threats?.length) return null;
  const isInteractive = typeof onSelect === "function";
  return (
    <ul className={`threat-icons${isInteractive ? " threat-icons--interactive" : ""}`} aria-label="Hauptbedrohungen">
      {threats.map((kind) => {
        const meta = threatMeta[kind];
        const content = (
          <>
            <span aria-hidden>{meta.emoji}</span>
            <span className="threat-label">{meta.label}</span>
          </>
        );
        return (
          <li key={kind}>
            {isInteractive ? (
              <button
                type="button"
                className="threat-chip"
                title={`${meta.label} – Mehr erfahren`}
                onClick={() => onSelect?.(kind)}
                aria-label={`${meta.label} – Mehr erfahren`}
              >
                {content}
              </button>
            ) : (
              <span title={meta.label}>{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

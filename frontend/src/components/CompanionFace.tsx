import type { Mood } from "../types";

type Props = {
  mood: Mood;
  color: string;
  size?: number;
};

export function CompanionFace({ mood, color, size = 80 }: Props) {
  const mouthPath =
    mood === "happy"
      ? "M 28 52 Q 40 64 52 52"
      : mood === "content"
        ? "M 28 54 Q 40 58 52 54"
        : mood === "bored"
          ? "M 28 56 Q 40 56 52 56"
          : "M 28 60 Q 40 48 52 60";
  const eyeY = mood === "bored" ? 34 : 30;

  return (
    <div className={`companion-face ${mood}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" role="img" aria-label="Companion Face">
        <circle cx="40" cy="40" r="38" fill={color} />
        <circle cx="28" cy={eyeY} r="4" fill="#1f2937" />
        <circle cx="52" cy={eyeY} r="4" fill="#1f2937" />
        {mood === "happy" && (
          <>
            <circle cx="24" cy="24" r="2" fill="#fff" opacity="0.85" />
            <circle cx="56" cy="23" r="2" fill="#fff" opacity="0.85" />
          </>
        )}
        <path d={mouthPath} stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
        {mood === "sad" && <path d="M 58 38 C 63 42, 62 48, 56 52" stroke="#60a5fa" strokeWidth="3" fill="none" />}
      </svg>
    </div>
  );
}

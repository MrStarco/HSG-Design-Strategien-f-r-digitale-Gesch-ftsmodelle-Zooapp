import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { speakText, speechAvailable, stopSpeech } from "../lib/speech";

type Props = {
  text: string;
  size?: number;
  label?: string;
  className?: string;
};

export function SpeakButton({ text, size = 16, label = "Vorlesen", className = "" }: Props) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const check = window.setInterval(() => {
      if (!window.speechSynthesis.speaking) setPlaying(false);
    }, 250);
    return () => window.clearInterval(check);
  }, [playing]);

  if (!speechAvailable()) return null;

  const toggle = () => {
    if (playing) {
      stopSpeech();
      setPlaying(false);
    } else {
      speakText(text);
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`speak-btn ${className}`.trim()}
      aria-label={playing ? "Vorlesen stoppen" : label}
      aria-pressed={playing}
    >
      {playing ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  );
}

const EMOJI_REGEX = /\p{Extended_Pictographic}|\u200d|\uFE0F/gu;

export function speechAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined";
}

function pickGermanVoice(): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const deDe = voices.find((v) => v.lang === "de-DE");
  const deCh = voices.find((v) => v.lang === "de-CH");
  const anyDe = voices.find((v) => v.lang.toLowerCase().startsWith("de"));
  return deDe ?? deCh ?? anyDe ?? null;
}

export function speakText(text: string): void {
  if (!speechAvailable()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const clean = text.replace(EMOJI_REGEX, "").replace(/\s+/g, " ").trim();
  if (!clean) return;
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = "de-DE";
  utter.rate = 1;
  utter.pitch = 1;
  const voice = pickGermanVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

export function stopSpeech(): void {
  if (!speechAvailable()) return;
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (!speechAvailable()) return false;
  return window.speechSynthesis.speaking;
}

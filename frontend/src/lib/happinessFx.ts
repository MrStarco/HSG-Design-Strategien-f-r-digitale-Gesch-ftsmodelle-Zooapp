export type HappinessFxDetail = { value: number; id: number };

const EVENT_NAME = "wz:happiness-fx";

let nextId = 1;

export function emitHappinessGain(value: number): void {
  if (typeof window === "undefined" || value <= 0) return;
  const detail: HappinessFxDetail = { value, id: nextId++ };
  window.dispatchEvent(new CustomEvent<HappinessFxDetail>(EVENT_NAME, { detail }));
}

export function subscribeHappinessGain(handler: (detail: HappinessFxDetail) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const ce = event as CustomEvent<HappinessFxDetail>;
    handler(ce.detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}

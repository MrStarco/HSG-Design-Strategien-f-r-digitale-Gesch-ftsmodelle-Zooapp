import { useEffect, useState } from "react";
import { subscribeHappinessGain } from "../lib/happinessFx";

type Toast = { id: number; value: number };
const LIFETIME_MS = 1400;

export function HappinessToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return subscribeHappinessGain(({ value, id }) => {
      setToasts((prev) => [...prev, { id, value }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, LIFETIME_MS);
    });
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="happiness-toast-host" aria-hidden>
      {toasts.map((toast) => (
        <span key={toast.id} className="happiness-toast">
          +{toast.value} 💚
        </span>
      ))}
    </div>
  );
}

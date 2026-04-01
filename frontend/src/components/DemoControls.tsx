import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { setHappinessInStorage } from "../lib/storage";
import { useMirrorSync } from "../hooks/useMirrorSync";

function normalizeHappiness(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function DemoControls() {
  const [inputValue, setInputValue] = useState("50");
  const { resetFeedTimer, resetQuizTimer, resetChallengeTimer, resetCompanion } = useAppContext();
  const { role, sendCommand } = useMirrorSync();

  const broadcast = (command: Parameters<typeof sendCommand>[0]) => {
    if (role !== "controller") return;
    sendCommand(command);
  };

  const applyHappiness = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const value = normalizeHappiness(parsed);
    setHappinessInStorage(value);
    broadcast({ type: "setHappiness", value });
    setInputValue(String(value));
    window.location.reload();
  };

  return (
    <aside className="demo-controls" aria-label="Demo Controls">
      <h2 className="demo-controls__title">Demo Controls</h2>
      <p className="demo-controls__hint">Steuert nur den lokalen Demo-Status.</p>

      <div className="demo-controls__section">
        <button
          type="button"
          className="demo-controls__button demo-controls__button--reset"
          onClick={() => {
            resetCompanion();
            broadcast({ type: "resetCompanion" });
          }}
        >
          Companion zuruecksetzen
        </button>
      </div>

      <div className="demo-controls__section">
        <button
          type="button"
          className="demo-controls__button"
          onClick={() => {
            resetFeedTimer();
            broadcast({ type: "resetFeedTimer" });
          }}
        >
          Feed-Timer resetten
        </button>
      </div>

      <div className="demo-controls__section">
        <button
          type="button"
          className="demo-controls__button"
          onClick={() => {
            resetQuizTimer();
            broadcast({ type: "resetQuizTimer" });
          }}
        >
          Quiz-Timer resetten
        </button>
      </div>

      <div className="demo-controls__section">
        <button
          type="button"
          className="demo-controls__button"
          onClick={() => {
            resetChallengeTimer();
            broadcast({ type: "resetChallengeTimer" });
          }}
        >
          Challenge-Timer resetten
        </button>
      </div>

      <div className="demo-controls__section">
        <label htmlFor="happiness-input" className="demo-controls__label">
          Happiness (0-100)
        </label>
        <div className="demo-controls__row">
          <input
            id="happiness-input"
            type="number"
            min={0}
            max={100}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="button" className="demo-controls__button" onClick={() => applyHappiness(inputValue)}>
            Setzen
          </button>
        </div>
      </div>
    </aside>
  );
}

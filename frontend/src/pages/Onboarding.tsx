import { companions } from "../data/companions";
import { useAppContext } from "../context/AppContext";

export function Onboarding() {
  const { selectCompanion } = useAppContext();
  return (
    <main className="page onboarding">
      <h1>Wähle deinen Begleiter 🌿</h1>
      <p className="onboarding-subtitle">
        Zusammen lernt ihr über Artenschutz und die Tiere im Walter Zoo.
      </p>
      <div className="companion-grid">
        {companions.map((companion) => (
          <button
            key={companion.id}
            className="companion-card"
            style={{ background: companion.cardColor }}
            onClick={() => selectCompanion(companion.id)}
            aria-label={`${companion.name} – ${companion.animal}`}
          >
            <div className="companion-face" aria-hidden>
              {companion.emoji}
            </div>
            <strong>{companion.name}</strong>
            <small>{companion.animal}</small>
          </button>
        ))}
      </div>
    </main>
  );
}

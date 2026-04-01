import { companions } from "../data/companions";
import { useAppContext } from "../context/AppContext";

export function Onboarding() {
  const { selectCompanion } = useAppContext();
  return (
    <main className="page onboarding">
      <h1>Suche dir deinen neuen Freund aus und lernt zusammen über Artenschutz und das Leben im Zoo 🌿</h1>
      <div className="companion-grid">
        {companions.map((companion) => (
          <button
            key={companion.id}
            className="companion-card"
            style={{ background: companion.cardColor }}
            onClick={() => selectCompanion(companion.id)}
          >
            <div className="companion-face" style={{ width: 80, height: 80, fontSize: "3rem" }} aria-hidden>
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

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { animalProfiles } from "../data/animals";
import { companions } from "../data/companions";
import { useAppContext } from "../context/AppContext";

export function AnimalProfiles() {
  const { happiness } = useAppContext();
  const color = useMemo(() => (happiness > 70 ? "#2D5A27" : happiness > 40 ? "#f5d547" : "#c4813a"), [happiness]);

  return (
    <main className="page">
      <h2>🐾 Tier-Profile</h2>
      <div className="profile-grid">
        {animalProfiles.map((profile) => {
          const companion = companions.find((c) => c.id === profile.companionId)!;
          return (
            <Link key={profile.id} to={`/profiles/${profile.id}`} className="profile-card" style={{ borderColor: color }}>
              <div className="profile-avatar" style={{ background: companion.cardColor }}>
                {companion.name[0]}
              </div>
              <strong>{companion.name}</strong>
              <small>{profile.species}</small>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

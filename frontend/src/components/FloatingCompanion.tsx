import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { companions, floatingMessages } from "../data/companions";
import { useAppContext } from "../context/AppContext";

export function FloatingCompanion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCompanionId } = useAppContext();
  const [hint, setHint] = useState("");

  const companion = useMemo(
    () => companions.find((c) => c.id === selectedCompanionId),
    [selectedCompanionId],
  );

  useEffect(() => {
    if (!selectedCompanionId || location.pathname === "/") return;
    const showHint = () => {
      setHint(floatingMessages[Math.floor(Math.random() * floatingMessages.length)]);
      setTimeout(() => setHint(""), 4000);
    };
    showHint();
    const id = setInterval(showHint, 45000);
    return () => clearInterval(id);
  }, [location.pathname, selectedCompanionId]);

  if (!companion || location.pathname === "/") return null;

  return (
    <button className="floating-companion" onClick={() => navigate("/")}>
      {hint && <div className="floating-hint">{hint}</div>}
      <div className="floating-companion-frame">
        <div className="companion-face" style={{ width: 50, height: 50, fontSize: "2rem" }} role="img" aria-label={companion.animal}>
          {companion.emoji}
        </div>
      </div>
    </button>
  );
}

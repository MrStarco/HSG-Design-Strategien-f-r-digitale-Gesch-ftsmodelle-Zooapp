import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { FloatingCompanion } from "./components/FloatingCompanion";
import { HappinessToastHost } from "./components/HappinessToastHost";
import { MirrorReceiver } from "./components/MirrorReceiver";
import { PhoneFrame } from "./components/PhoneFrame";
import { useAppContext } from "./context/AppContext";
import { AnimalDetail } from "./pages/AnimalDetail";
import { Home } from "./pages/Home";
import { Onboarding } from "./pages/Onboarding";
import { ZooMap } from "./pages/ZooMap";

function App() {
  const { selectedCompanionId } = useAppContext();

  return (
    <PhoneFrame>
      {!selectedCompanionId ? (
        <Onboarding />
      ) : (
        <div className="app-shell">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<ZooMap />} />
              <Route path="/profiles" element={<Navigate to="/map" replace />} />
              <Route path="/profiles/:id" element={<AnimalDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <FloatingCompanion />
          <BottomNav />
        </div>
      )}
      <HappinessToastHost />
      <MirrorReceiver />
    </PhoneFrame>
  );
}

export default App;

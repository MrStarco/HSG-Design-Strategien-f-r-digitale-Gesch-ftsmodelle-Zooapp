import { useMirrorSync } from "../hooks/useMirrorSync";
import { useEffect } from "react";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { role } = useMirrorSync();
  const isMirror = role === "mirror";

  useEffect(() => {
    document.documentElement.classList.toggle("mirror-mode", isMirror);
    document.body.classList.toggle("mirror-mode", isMirror);
    return () => {
      document.documentElement.classList.remove("mirror-mode");
      document.body.classList.remove("mirror-mode");
    };
  }, [isMirror]);

  if (isMirror) {
    return <div className="mirror-screen">{children}</div>;
  }

  return (
    <div className="desktop-stage">
      <div className="phone-frame">
        <div className="phone-notch">
          <span className="camera-dot" />
          <span className="speaker" />
        </div>
        <div className="phone-screen">{children}</div>
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}

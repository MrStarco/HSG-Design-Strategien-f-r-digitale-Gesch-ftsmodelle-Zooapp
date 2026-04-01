import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { setHappinessInStorage } from "../lib/storage";
import { type DemoCommand, useIncomingCommand } from "../hooks/useMirrorSync";

export function MirrorReceiver() {
  const navigate = useNavigate();
  const { resetFeedTimer, resetQuizTimer, resetChallengeTimer, resetCompanion } = useAppContext();

  const handleCommand = useCallback(
    (command: DemoCommand) => {
      switch (command.type) {
        case "resetCompanion":
          resetCompanion();
          return;
        case "resetFeedTimer":
          resetFeedTimer();
          return;
        case "resetQuizTimer":
          resetQuizTimer();
          return;
        case "resetChallengeTimer":
          resetChallengeTimer();
          return;
        case "setHappiness":
          setHappinessInStorage(command.value);
          window.location.reload();
          return;
        case "navigate":
          navigate(command.path);
          return;
        default:
          return;
      }
    },
    [navigate, resetChallengeTimer, resetCompanion, resetFeedTimer, resetQuizTimer],
  );

  useIncomingCommand(handleCommand);

  return null;
}

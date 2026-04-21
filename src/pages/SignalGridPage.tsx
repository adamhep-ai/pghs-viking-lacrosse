import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SignalGrid } from "../components/SignalGrid";
import { BackButton, StartOverButton } from "../components/BackButton";
import { pushHistory } from "../lib/history";

export function SignalGridPage() {
  const location = useLocation();
  useEffect(() => {
    pushHistory(location.pathname);
  }, [location.pathname]);

  return (
    <div className="space-y-6">
      <SignalGrid />
      <div className="flex flex-wrap gap-2 pt-2">
        <BackButton />
        <StartOverButton />
      </div>
    </div>
  );
}

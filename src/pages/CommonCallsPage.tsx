import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { SignalName } from "../data/rules";
import { rules } from "../data/rules";
import { SignalSvg } from "../components/SignalSvg";
import { BackButton, StartOverButton } from "../components/BackButton";
import { pushHistory } from "../lib/history";

type CommonCall = {
  ruleId: string;
  blurb: string;
  signal?: SignalName;
};

// The 8 calls a new parent is most likely to see in a given game.
// Ordered loosely by frequency, biggest names first.
const COMMON_CALLS: CommonCall[] = [
  { ruleId: "slashing", blurb: "Hard or reckless stick swing", signal: "slash" },
  { ruleId: "cross_check", blurb: "Check using the shaft of the stick", signal: "cross_check" },
  { ruleId: "illegal_body_check", blurb: "Late, from behind, or over the shoulders", signal: "illegal_body_check" },
  { ruleId: "push", blurb: "Shove or extended arm-bar", signal: "push" },
  { ruleId: "hold", blurb: "Grabbing a player or their stick", signal: "hold" },
  { ruleId: "offsides", blurb: "Too many players on one side of midfield", signal: "offsides" },
  { ruleId: "crease_violation", blurb: "Offensive player steps in the crease", signal: "no_goal" },
  { ruleId: "play_on", blurb: "A foul happened but play continues", signal: "play_on" },
];

export function CommonCallsPage() {
  const location = useLocation();
  useEffect(() => {
    pushHistory(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-team-blue-dark leading-tight">
          The most common calls
        </h1>
        <p className="text-team-grey">
          Not sure what you saw? Start here — these are the calls you'll hear most often at a
          game. Tap one to read what it means.
        </p>
      </header>

      <ul className="grid sm:grid-cols-2 gap-3" role="list">
        {COMMON_CALLS.map((call) => {
          const rule = rules.find((r) => r.id === call.ruleId);
          if (!rule) return null;
          return (
            <li key={call.ruleId}>
              <Link
                to={`/r/${call.ruleId}`}
                replace
                className="flex items-start gap-3 p-4 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99]"
              >
                {call.signal && (
                  <SignalSvg
                    name={call.signal}
                    size={48}
                    className="text-team-blue shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-team-blue-dark">{rule.title}</div>
                  <div className="text-sm text-team-grey mt-0.5">{call.blurb}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="rounded-lg border border-team-grey-light p-4 bg-team-grey-light/40 space-y-1">
        <p className="text-sm text-team-grey">
          Still not finding it?{" "}
          <Link
            to="/t/signals"
            replace
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            Try matching the ref's signal
          </Link>
          {" "}or{" "}
          <Link
            to="/rules"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            browse every rule
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <BackButton />
        <StartOverButton />
      </div>
    </div>
  );
}

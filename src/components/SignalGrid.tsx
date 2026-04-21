import { useState } from "react";
import { Link } from "react-router-dom";
import type { SignalName } from "../data/rules";
import { SignalSvg } from "./SignalSvg";

type GridTile = {
  signal: SignalName;
  ruleId: string;
  caption: string;
};

// Primary 10: most common calls a parent would see.
const PRIMARY: GridTile[] = [
  { signal: "slash", ruleId: "slashing", caption: "Slash" },
  { signal: "cross_check", ruleId: "cross_check", caption: "Cross-check" },
  { signal: "push", ruleId: "push", caption: "Push" },
  { signal: "hold", ruleId: "hold", caption: "Hold" },
  { signal: "offsides", ruleId: "offsides", caption: "Offsides" },
  { signal: "play_on", ruleId: "play_on", caption: "Play-on" },
  { signal: "possession", ruleId: "possession_direction", caption: "Possession" },
  { signal: "illegal_body_check", ruleId: "illegal_body_check", caption: "Illegal body check" },
  { signal: "technical_foul", ruleId: "technical_foul_overview", caption: "Technical foul" },
  { signal: "no_goal", ruleId: "no_goal", caption: "No goal" },
];

// Secondary 10: less frequent but still useful.
const SECONDARY: GridTile[] = [
  { signal: "goal", ruleId: "goal_signal", caption: "Goal" },
  { signal: "flag_down", ruleId: "flag_down", caption: "Flag down" },
  { signal: "timeout", ruleId: "timeout", caption: "Timeout" },
  { signal: "stalling", ruleId: "stalling_situations", caption: "Stalling" },
  { signal: "interference", ruleId: "interference", caption: "Interference" },
  { signal: "warding", ruleId: "warding", caption: "Warding" },
  { signal: "illegal_screen", ruleId: "illegal_screen", caption: "Illegal screen" },
  { signal: "illegal_procedure", ruleId: "illegal_procedure", caption: "Illegal procedure" },
  { signal: "tripping", ruleId: "tripping", caption: "Tripping" },
  { signal: "unsportsmanlike", ruleId: "unsportsmanlike", caption: "Unsportsmanlike" },
];

export function SignalGrid() {
  const [expanded, setExpanded] = useState(false);
  const tiles = expanded ? [...PRIMARY, ...SECONDARY] : PRIMARY;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-team-blue-dark leading-tight">
          Tap the signal that looks closest
        </h2>
        <p className="mt-2 text-team-grey">
          Don't worry about being exact — pick whichever is nearest.
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="list">
        {tiles.map((tile) => (
          <li key={tile.signal}>
            <Link
              to={`/r/${tile.ruleId}`}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99] text-team-blue-dark h-full"
            >
              <SignalSvg name={tile.signal} size={72} className="text-team-blue" />
              <span className="text-sm font-medium text-center">{tile.caption}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="px-4 py-2 rounded-md text-sm font-medium text-team-blue hover:text-team-blue-dark hover:bg-team-blue-light"
        >
          {expanded ? "Fewer signals ↑" : "More signals ↓"}
        </button>
      </div>

      <div className="rounded-lg border border-team-grey-light p-4 bg-team-grey-light/40 space-y-1">
        <p className="text-sm text-team-grey">
          Still not sure?{" "}
          <Link
            to="/t/common"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            See the most common calls
          </Link>
          {" "}or{" "}
          <Link
            to="/"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            start over
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

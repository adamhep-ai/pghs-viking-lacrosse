import { Link } from "react-router-dom";
import type { SignalName } from "../data/rules";
import { SignalSvg } from "./SignalSvg";

type GridTile = {
  signal: SignalName;
  ruleId: string;
  caption: string;
};

// The 10 tiles a parent is most likely to see in a game.
const TILES: GridTile[] = [
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

export function SignalGrid() {
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
        {TILES.map((tile) => (
          <li key={tile.signal}>
            <Link
              to={`/r/${tile.ruleId}`}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99] text-team-blue-dark"
            >
              <SignalSvg name={tile.signal} size={72} className="text-team-blue" />
              <span className="text-sm font-medium text-center">{tile.caption}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-2">
        <Link
          to="/"
          className="text-sm text-team-grey hover:text-team-blue-dark underline underline-offset-2"
        >
          None of these?
        </Link>
      </div>
    </section>
  );
}

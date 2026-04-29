import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppLink } from "../components/AppLink";
import { rules, type Rule } from "../data/rules";
import { pushHistory } from "../lib/history";
import { TEAM_NAME } from "../config";

// Authoritative homepage ordering. The first list is the 5 "big picture"
// rules that unlock most games; the second is 8 other calls parents
// frequently ask about.
const BIG_PICTURE_IDS = [
  "offsides",
  "failure_to_advance",
  "crease_violation",
  "basic_penalties_overview",
  "substitution_box",
];

// Rule IDs that should render full-width on sm+ inside the big-picture grid.
// Currently just the combined slash/push/hold overview, which benefits from
// extra visual weight.
const WIDE_CARD_IDS = new Set(["basic_penalties_overview"]);

const COMMON_CONFUSION_IDS = [
  "illegal_body_check",
  "slashing",
  "push",
  "hold",
  "loose_ball_push",
  "possession_vs_loose_ball",
  "stalling_situations",
  "faceoff_situations",
];

export function HomePage() {
  const location = useLocation();
  useEffect(() => {
    pushHistory(location.pathname);
  }, [location.pathname]);

  const bigPicture = resolveRules(BIG_PICTURE_IDS);
  const otherCalls = resolveRules(COMMON_CONFUSION_IDS);

  return (
    <div className="space-y-10">
      <Hero />

      {/* BIG PICTURE — 5 featured rules */}
      <section aria-labelledby="big-picture-heading" className="space-y-4">
        <header>
          <h2
            id="big-picture-heading"
            className="text-2xl sm:text-3xl font-bold text-team-blue-dark leading-tight"
          >
            The 5 rules that unlock most games
          </h2>
          <p className="mt-1 text-team-grey">
            If you understand just these, you'll follow almost every call.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 gap-3" role="list">
          {bigPicture.map((rule, i) => (
            <li
              key={rule.id}
              className={WIDE_CARD_IDS.has(rule.id) ? "sm:col-span-2" : ""}
            >
              <AppLink
                to={`/r/${rule.id}`}
                className="block h-full rounded-xl border-2 border-team-blue-light bg-white hover:border-team-blue hover:bg-team-blue-light/40 active:scale-[0.995] p-5 transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-team-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-team-blue-dark leading-snug">
                    {rule.title}
                  </h3>
                </div>
                {rule.summary && (
                  <p className="text-gray-800 text-sm leading-snug mb-2">{rule.summary}</p>
                )}
                {rule.whyItsConfusing && (
                  <p className="text-team-grey text-sm italic leading-snug">
                    Why it trips parents up:{" "}
                    <span className="not-italic">{firstSentence(rule.whyItsConfusing)}</span>
                  </p>
                )}
              </AppLink>
            </li>
          ))}
        </ul>
      </section>

      {/* FINDER CTA — live-game emergency path, visually prominent */}
      <section aria-label="Finder shortcut">
        <AppLink
          to="/t/root"
          className="flex items-center justify-between gap-4 rounded-xl bg-team-blue text-white p-5 shadow-sm hover:bg-team-blue-dark active:scale-[0.995] transition-colors"
        >
          <div>
            <div className="text-lg font-bold">
              Something just happened — help me find it
            </div>
            <div className="text-sm text-team-blue-light/90 mt-0.5">
              Walk through a few quick questions to identify the call you saw.
            </div>
          </div>
          <span className="text-2xl shrink-0" aria-hidden>→</span>
        </AppLink>
      </section>

      {/* OTHER COMMON CONFUSIONS — 8 smaller cards */}
      <section aria-labelledby="other-calls-heading" className="space-y-4">
        <header>
          <h2
            id="other-calls-heading"
            className="text-2xl font-bold text-team-blue-dark leading-tight"
          >
            Other calls parents ask about
          </h2>
          <p className="mt-1 text-team-grey">
            Smaller pieces of the game that still confuse people.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 gap-3" role="list">
          {otherCalls.map((rule) => (
            <li key={rule.id}>
              <AppLink
                to={`/r/${rule.id}`}
                className="block h-full rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.995] p-4"
              >
                <h3 className="font-semibold text-team-blue-dark leading-snug">
                  {rule.title}
                </h3>
                {rule.summary && (
                  <p className="mt-1 text-sm text-team-grey leading-snug">{rule.summary}</p>
                )}
              </AppLink>
            </li>
          ))}
        </ul>
      </section>

      {/* TERTIARY — leisure-reading paths */}
      <section aria-labelledby="more-heading" className="space-y-3">
        <h2
          id="more-heading"
          className="text-lg font-semibold text-team-blue-dark"
        >
          More to read
        </h2>
        <ul className="space-y-2" role="list">
          <li>
            <AppLink
              to="/basics"
              className="flex items-start justify-between gap-3 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue p-4"
            >
              <div>
                <div className="font-medium text-team-blue-dark">
                  New to the game? Start with Basics
                </div>
                <div className="text-sm text-team-grey mt-0.5">
                  The field, the positions, and how a game flows.
                </div>
              </div>
              <span className="text-team-blue shrink-0" aria-hidden>→</span>
            </AppLink>
          </li>
          <li>
            <AppLink
              to="/rules"
              className="flex items-start justify-between gap-3 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue p-4"
            >
              <div>
                <div className="font-medium text-team-blue-dark">
                  Browse every rule
                </div>
                <div className="text-sm text-team-grey mt-0.5">
                  The full catalog, grouped by category.
                </div>
              </div>
              <span className="text-team-blue shrink-0" aria-hidden>→</span>
            </AppLink>
          </li>
          <li>
            <AppLink
              to="/roster"
              className="flex items-start justify-between gap-3 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue p-4"
            >
              <div>
                <div className="font-medium text-team-blue-dark">
                  This year's roster
                </div>
                <div className="text-sm text-team-grey mt-0.5">
                  Numbers, names, positions, and grades.
                </div>
              </div>
              <span className="text-team-blue shrink-0" aria-hidden>→</span>
            </AppLink>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <div className="pt-1">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-team-blue-dark leading-tight">
        The confusing rules, explained
      </h1>
      <p className="mt-1 text-sm sm:text-base text-team-grey">
        A sideline guide for parents of {TEAM_NAME} boys lacrosse.
      </p>
    </div>
  );
}

// Resolve an ordered list of rule IDs into Rule objects, warning if any are
// missing (the smoke test should catch this, but fail loud in the browser too).
function resolveRules(ids: string[]): Rule[] {
  const out: Rule[] = [];
  for (const id of ids) {
    const rule = rules.find((r) => r.id === id);
    if (!rule) {
      console.warn(`HomePage: rule "${id}" not found in rules data`);
      continue;
    }
    out.push(rule);
  }
  return out;
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

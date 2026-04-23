import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { rules } from "../data/rules";
import { pushHistory } from "../lib/history";
import { TEAM_NAME } from "../config";

// Authoritative ordering for the homepage cards. The order matches the
// user-facing priority: the 5 "big picture" rules that let a parent follow
// any game, then the 7 other calls parents frequently ask about.
const BIG_PICTURE_IDS = [
  "offsides",
  "failure_to_advance",
  "crease_violation",
  "basic_penalties_overview",
  "substitution_box",
];

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

  const bigPicture = BIG_PICTURE_IDS.map((id) => rules.find((r) => r.id === id)!).filter(Boolean);
  const otherCalls = COMMON_CONFUSION_IDS.map((id) => rules.find((r) => r.id === id)!).filter(Boolean);

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
              // Card #4 (basic penalties overview) spans full width on sm+ to
              // give the combined slash/push/hold card extra visual weight.
              className={i === 3 ? "sm:col-span-2" : ""}
            >
              <Link
                to={`/r/${rule.id}`}
                className="block h-full rounded-xl border-2 border-team-blue-light bg-white hover:border-team-blue hover:bg-team-blue-light/40 active:scale-[0.995] p-5 transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="inline-block w-6 h-6 rounded-full bg-team-blue text-white text-xs font-bold flex items-center justify-center">
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
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* OTHER COMMON CONFUSIONS — 7 smaller cards */}
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
              <Link
                to={`/r/${rule.id}`}
                className="block h-full rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.995] p-4"
              >
                <h3 className="font-semibold text-team-blue-dark leading-snug">
                  {rule.title}
                </h3>
                {rule.summary && (
                  <p className="mt-1 text-sm text-team-grey leading-snug">{rule.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SECONDARY TOOLS */}
      <section aria-labelledby="more-heading" className="space-y-4">
        <h2
          id="more-heading"
          className="text-lg font-semibold text-team-blue-dark"
        >
          Other ways to find what you need
        </h2>
        <ul className="space-y-2" role="list">
          <li>
            <Link
              to="/t/root"
              className="flex items-start justify-between gap-3 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue p-4"
            >
              <div>
                <div className="font-medium text-team-blue-dark">
                  Something just happened — help me find it
                </div>
                <div className="text-sm text-team-grey mt-0.5">
                  Walk through a few questions to narrow down what you saw.
                </div>
              </div>
              <span className="text-team-blue shrink-0" aria-hidden>→</span>
            </Link>
          </li>
          <li>
            <Link
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
            </Link>
          </li>
          <li>
            <Link
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
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center text-center pt-4 pb-2">
      <img
        src="/viking-badge.png"
        alt={`${TEAM_NAME} logo`}
        className="h-28 w-28 mb-3 rounded-full shadow-sm"
        width={112}
        height={112}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-team-blue-dark leading-tight">
        The confusing rules, explained
      </h1>
      <p className="mt-2 text-team-grey max-w-md">
        A sideline guide for parents of {TEAM_NAME} boys lacrosse. Written for
        the rules most parents ask about.
      </p>
    </div>
  );
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

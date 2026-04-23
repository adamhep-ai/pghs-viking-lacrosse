import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { rules, type Rule, type RuleCategory } from "../data/rules";
import { pushHistory } from "../lib/history";

const CATEGORY_ORDER: { id: RuleCategory; label: string; blurb: string }[] = [
  {
    id: "personal_foul",
    label: "Personal fouls",
    blurb: "Penalty box, 1–3 minutes. The serious ones.",
  },
  {
    id: "technical_foul",
    label: "Technical fouls",
    blurb: "30 seconds or a turnover. The smaller violations.",
  },
  {
    id: "procedural",
    label: "Procedural / turnovers",
    blurb: "Ball changes hands without a penalty.",
  },
  {
    id: "faceoff",
    label: "Faceoffs",
    blurb: "How each period and post-goal restart works.",
  },
  {
    id: "equipment",
    label: "Equipment",
    blurb: "Sticks, helmets, mouthguards.",
  },
  {
    id: "mechanics",
    label: "What the ref is doing",
    blurb: "Play-on, flag-down, 'why is there no call?'",
  },
  {
    id: "stalling",
    label: "Stalling",
    blurb: "Holding the ball, keep-it-in, late-game rules.",
  },
];

export function RulesPage() {
  const location = useLocation();

  useEffect(() => {
    pushHistory(location.pathname);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Group rules by category and alphabetize within each group.
  const grouped = useMemo(() => groupByCategory(rules), []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
          All rules
        </h1>
        <p className="mt-2 text-team-grey">
          Every rule, grouped by category.{" "}
          <Link
            to="/"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            Start with the confusing-rule cards
          </Link>{" "}
          if you don't know where to look.
        </p>
      </header>

      {/* Jump nav — sticky within the page, helps parents find a category fast. */}
      <nav
        aria-label="Jump to category"
        className="rounded-lg border border-team-grey-light bg-team-grey-light/40 p-3"
      >
        <ul className="flex flex-wrap gap-2 text-sm" role="list">
          {CATEGORY_ORDER.map(({ id, label }) => {
            if (!grouped[id] || grouped[id].length === 0) return null;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-block px-3 py-1 rounded-full bg-white border border-team-grey-light text-team-blue-dark hover:bg-team-blue-light hover:border-team-blue"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {CATEGORY_ORDER.map(({ id, label, blurb }) => {
        const list = grouped[id];
        if (!list || list.length === 0) return null;
        return (
          <section key={id} id={id} className="space-y-3 scroll-mt-24">
            <div>
              <h2 className="text-2xl font-bold text-team-blue-dark">{label}</h2>
              <p className="text-sm text-team-grey">{blurb}</p>
            </div>
            <ul className="space-y-2" role="list">
              {list.map((rule) => (
                <li key={rule.id}>
                  <RuleListItem rule={rule} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function RuleListItem({ rule }: { rule: Rule }) {
  // Surface whyItsConfusing as a one-line teaser when it exists (this is the
  // redesign's payoff — the detail page will have the full version).
  const confusionTeaser = rule.whyItsConfusing
    ? firstSentence(rule.whyItsConfusing)
    : null;

  return (
    <Link
      to={`/r/${rule.id}`}
      id={rule.id}
      className="block scroll-mt-24 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.995] p-4"
    >
      <h3 className="font-semibold text-team-blue-dark leading-snug">
        {rule.title}
      </h3>
      {rule.summary && (
        <p className="mt-1 text-sm text-gray-800 leading-snug">{rule.summary}</p>
      )}
      {confusionTeaser && (
        <p className="mt-1 text-sm text-team-grey italic leading-snug">
          Why it trips parents up:{" "}
          <span className="not-italic">{confusionTeaser}</span>
        </p>
      )}
    </Link>
  );
}

function groupByCategory(list: Rule[]): Record<RuleCategory, Rule[]> {
  const out: Record<RuleCategory, Rule[]> = {
    personal_foul: [],
    technical_foul: [],
    procedural: [],
    faceoff: [],
    equipment: [],
    mechanics: [],
    stalling: [],
  };
  for (const r of list) out[r.category].push(r);
  for (const cat of Object.keys(out) as RuleCategory[]) {
    out[cat].sort((a, b) => a.title.localeCompare(b.title));
  }
  return out;
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

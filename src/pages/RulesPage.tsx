import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { rules, type Rule, type RuleCategory } from "../data/rules";
import { RuleExplanation } from "../components/RuleExplanation";
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
    blurb: "Signals, mechanics, and \"why is there no call?\"",
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
    // Scroll to anchor if hash present
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const grouped = groupByCategory(rules);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
          All rules
        </h1>
        <p className="mt-2 text-team-grey">
          Every rule, grouped by category. Not sure where to look?{" "}
          <Link
            to="/"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            Start with the tree
          </Link>
          .
        </p>
      </header>

      {CATEGORY_ORDER.map(({ id, label, blurb }) => {
        const list = grouped[id];
        if (!list || list.length === 0) return null;
        return (
          <section key={id} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-team-blue-dark">{label}</h2>
              <p className="text-sm text-team-grey">{blurb}</p>
            </div>
            <ul className="space-y-6" role="list">
              {list.map((rule) => (
                <li
                  key={rule.id}
                  id={rule.id}
                  className="scroll-mt-24 rounded-lg border border-team-grey-light bg-white p-4"
                >
                  <RuleExplanation rule={rule} compact />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
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
  return out;
}

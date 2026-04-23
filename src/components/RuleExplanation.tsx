import { Link } from "react-router-dom";
import type { Rule, RuleCategory } from "../data/rules";
import { rules } from "../data/rules";

type Props = {
  rule: Rule;
  compact?: boolean; // used inline on /rules list
};

const OVERVIEW_IDS = new Set([
  "technical_foul_overview",
  "personal_foul_one_minute",
  "personal_foul_severe",
  "no_goal_overview",
  "basic_penalties_overview",
]);

const CATEGORY_LABEL: Record<RuleCategory, string> = {
  personal_foul: "Personal foul",
  technical_foul: "Technical foul",
  procedural: "Procedural",
  faceoff: "Faceoff",
  equipment: "Equipment",
  mechanics: "Mechanics",
  stalling: "Stalling",
};

export function RuleExplanation({ rule, compact = false }: Props) {
  const isOverview = OVERVIEW_IDS.has(rule.id);
  const related = (rule.relatedRuleIds ?? [])
    .map((id) => rules.find((r) => r.id === id))
    .filter((r): r is Rule => Boolean(r));

  return (
    <article className="space-y-5">
      {!compact && (
        <header className="space-y-3">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-team-blue bg-team-blue-light px-2 py-1 rounded-full">
              {CATEGORY_LABEL[rule.category]}
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
              {rule.title}
            </h1>
          </div>
          {rule.summary && (
            <p className="text-lg text-gray-800 leading-snug">{rule.summary}</p>
          )}
        </header>
      )}

      {compact && (
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-team-blue-dark">{rule.title}</h3>
          {rule.summary && (
            <p className="text-sm text-team-grey leading-snug">{rule.summary}</p>
          )}
        </div>
      )}

      {rule.whyItsConfusing && !compact && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-800 mb-1">
            Why it's confusing
          </h4>
          <p className="text-amber-950 leading-relaxed">{rule.whyItsConfusing}</p>
        </div>
      )}

      <Section title="What you see">{rule.whatYouSee}</Section>
      <Section title="What it means">{rule.whatItMeans}</Section>

      <div className="rounded-lg bg-team-blue-light p-4 border border-team-blue/10">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-team-blue-dark mb-1">
          What happens next
        </h4>
        <p className="text-team-blue-dark">{rule.whatHappensNext}</p>
      </div>

      {related.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-team-grey mb-2">
            {isOverview ? "Rules in this group" : "See also"}
          </h4>
          <ul className="space-y-2" role="list">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/r/${r.id}`}
                  replace
                  className="block rounded-md px-3 py-2 border border-team-grey-light hover:bg-team-blue-light hover:border-team-blue"
                >
                  <span className="font-medium text-team-blue-dark">{r.title}</span>
                  {isOverview && (
                    <span className="block text-sm text-team-grey mt-0.5">
                      {r.summary ?? r.whatYouSee}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-team-grey mb-1">
        {title}
      </h4>
      <p className="text-gray-900 leading-relaxed">{children}</p>
    </div>
  );
}

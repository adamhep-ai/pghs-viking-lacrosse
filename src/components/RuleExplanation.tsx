import { Link } from "react-router-dom";
import type { Rule } from "../data/rules";
import { rules } from "../data/rules";
import { SignalSvg } from "./SignalSvg";

type Props = {
  rule: Rule;
  compact?: boolean; // compact mode: skip h1 (used inline on /rules)
};

const OVERVIEW_IDS = new Set([
  "technical_foul_overview",
  "personal_foul_one_minute",
  "personal_foul_severe",
  "no_goal_overview",
]);

export function RuleExplanation({ rule, compact = false }: Props) {
  const isOverview = OVERVIEW_IDS.has(rule.id);
  const related = (rule.relatedRuleIds ?? [])
    .map((id) => rules.find((r) => r.id === id))
    .filter((r): r is Rule => Boolean(r));

  return (
    <article className="space-y-5">
      {!compact && (
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
            {rule.title}
          </h1>
          {rule.signal && (
            <div className="flex items-center gap-3 text-team-blue">
              <SignalSvg name={rule.signal} size={56} />
              <span className="text-sm text-team-grey">
                Ref signal: {rule.signal.replace(/_/g, " ")}
              </span>
            </div>
          )}
        </header>
      )}

      {compact && (
        <div className="flex items-center gap-3">
          {rule.signal && (
            <SignalSvg name={rule.signal} size={40} className="text-team-blue shrink-0" />
          )}
          <h3 className="text-xl font-semibold text-team-blue-dark">{rule.title}</h3>
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
            {isOverview ? "Fouls in this group" : "See also"}
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
                      {r.whatYouSee}
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

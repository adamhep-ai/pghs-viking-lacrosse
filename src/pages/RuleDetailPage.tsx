import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppLink } from "../components/AppLink";
import { rules } from "../data/rules";
import { RuleExplanation } from "../components/RuleExplanation";
import { BackButton } from "../components/BackButton";
import { pushHistory } from "../lib/history";

export function RuleDetailPage() {
  const { ruleId } = useParams<{ ruleId: string }>();
  const location = useLocation();
  const rule = rules.find((r) => r.id === ruleId);

  useEffect(() => {
    pushHistory(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!rule) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-team-blue-dark">
          We couldn't find that rule
        </h1>
        <p className="text-team-grey">
          It may have been renamed, or the link is outdated.
        </p>
        <div className="flex gap-2">
          <BackButton />
          <AppLink
            to="/rules"
            className="inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
          >
            Browse all rules →
          </AppLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <RuleExplanation rule={rule} />

      <div className="flex flex-wrap gap-2 pt-4 border-t border-team-grey-light">
        <BackButton />
        <AppLink
          to="/rules"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        >
          Browse all rules →
        </AppLink>
      </div>
    </div>
  );
}

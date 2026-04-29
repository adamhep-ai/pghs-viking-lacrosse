import { AppLink } from "./AppLink";
import { SEASON_TAG } from "../config";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-team-grey-light">
      <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-team-grey space-y-1">
        <p>Simplified spectator guide. Not an official rulebook.</p>
        <p>
          <AppLink
            to="/roster"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            View the team roster
          </AppLink>
        </p>
        <p>Updated for the {SEASON_TAG} season</p>
      </div>
    </footer>
  );
}

import { AppLink } from "../components/AppLink";

export function NotFoundPage() {
  return (
    <div className="text-center py-12 space-y-4">
      <h1 className="text-3xl font-bold text-team-blue-dark">Page not found</h1>
      <p className="text-team-grey">
        That link didn't resolve to anything we know.
      </p>
      <AppLink
        to="/"
        className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-team-blue text-white hover:bg-team-blue-dark"
      >
        Start over
      </AppLink>
    </div>
  );
}

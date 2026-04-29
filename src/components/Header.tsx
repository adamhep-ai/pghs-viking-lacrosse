import { AppLink, AppNavLink } from "./AppLink";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-team-grey-light">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
        <AppLink
          to="/"
          className="flex items-center gap-2 text-team-blue font-bold shrink-0"
          aria-label="Home"
        >
          <img
            src="/viking-primary.png"
            alt=""
            className="h-9 w-9 object-contain"
            width={36}
            height={36}
          />
          <span className="hidden sm:inline">Viking Lacrosse</span>
        </AppLink>

        <nav className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <HeaderLink to="/roster">Roster</HeaderLink>
          <HeaderLink to="/t/root">Finder</HeaderLink>
          <HeaderLink to="/basics">Basics</HeaderLink>
          <HeaderLink to="/rules">All Rules</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <AppNavLink
      to={to}
      className={({ isActive }) =>
        `px-2.5 sm:px-3 py-2.5 min-h-[44px] inline-flex items-center rounded-md text-sm font-medium ${
          isActive
            ? "bg-team-blue-light text-team-blue-dark"
            : "text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        }`
      }
    >
      {children}
    </AppNavLink>
  );
}

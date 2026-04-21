import { Link, NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-team-grey-light">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-team-blue font-bold"
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
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <HeaderLink to="/basics">Basics</HeaderLink>
          <HeaderLink to="/rules">All Rules</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "bg-team-blue-light text-team-blue-dark"
            : "text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

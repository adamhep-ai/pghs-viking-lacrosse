import {
  Link,
  NavLink,
  useLocation,
  type LinkProps,
  type NavLinkProps,
  type To,
} from "react-router-dom";

// Browser history strategy:
//   - From `/`, links PUSH so home stays one back-press away.
//   - From a section root into one of its subpages, links PUSH so back goes
//     subpage → section root → home (two presses, matching the header).
//   - Everywhere else, links REPLACE so history doesn't accumulate.
// In-app navigation (Header, BackButton) keeps working independently.
const SECTION_SUBPAGE_PATTERNS: Record<string, RegExp> = {
  "/roster": /^\/roster\/[^/]+$/,
  "/t/root": /^\/t\/[^/]+$/,
  "/rules": /^\/r\/[^/]+$/,
};

function pathFromTo(to: To): string {
  return typeof to === "string" ? to : to.pathname ?? "";
}

function useReplace(explicit: boolean | undefined, to: To): boolean {
  if (explicit !== undefined) return explicit;
  const { pathname } = useLocation();
  if (pathname === "/") return false;
  const subpagePattern = SECTION_SUBPAGE_PATTERNS[pathname];
  if (subpagePattern) {
    const target = pathFromTo(to);
    if (target !== pathname && subpagePattern.test(target)) return false;
  }
  return true;
}

export function AppLink({ replace, to, ...rest }: LinkProps) {
  return <Link to={to} {...rest} replace={useReplace(replace, to)} />;
}

export function AppNavLink({ replace, to, ...rest }: NavLinkProps) {
  return <NavLink to={to} {...rest} replace={useReplace(replace, to)} />;
}

import {
  Link,
  NavLink,
  useLocation,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";

// Browser history strategy:
//   - From `/`, links PUSH so home stays one back-press away.
//   - From any other page, links REPLACE so history caps at [/, current].
// Net result: from anywhere in the app, browser back → home, back again → exit.
// In-app navigation (Header, BackButton) keeps working independently.
function useReplace(explicit: boolean | undefined): boolean {
  const { pathname } = useLocation();
  return explicit ?? pathname !== "/";
}

export function AppLink({ replace, ...rest }: LinkProps) {
  return <Link {...rest} replace={useReplace(replace)} />;
}

export function AppNavLink({ replace, ...rest }: NavLinkProps) {
  return <NavLink {...rest} replace={useReplace(replace)} />;
}

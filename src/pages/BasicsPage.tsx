import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { basics } from "../data/basics";
import { renderMarkdown } from "../lib/markdown";
import { pushHistory } from "../lib/history";
import { TEAM_NAME } from "../config";

export function BasicsPage() {
  const location = useLocation();
  useEffect(() => {
    pushHistory(location.pathname);
  }, [location.pathname]);

  return (
    <article className="space-y-10">
      <header className="flex items-center gap-4">
        <img
          src="/viking-badge.svg"
          alt={`${TEAM_NAME} logo`}
          className="h-16 w-16 shrink-0"
          width={64}
          height={64}
        />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
            Lacrosse, for parents
          </h1>
          <p className="mt-1 text-team-grey">
            A one-read intro to how the game works.
          </p>
        </div>
      </header>

      <nav aria-label="On this page" className="rounded-lg border border-team-grey-light p-4 bg-team-grey-light/40">
        <p className="text-sm font-semibold uppercase tracking-wide text-team-grey mb-2">
          On this page
        </p>
        <ul className="space-y-1 text-sm">
          {basics.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {basics.map((section) => (
        <section key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-bold text-team-blue-dark">{section.heading}</h2>
          <div className="space-y-3">{renderMarkdown(section.body)}</div>
        </section>
      ))}
    </article>
  );
}

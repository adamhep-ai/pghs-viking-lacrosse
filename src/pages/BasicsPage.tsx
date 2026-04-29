import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { basics } from "../data/basics";
import { renderMarkdown } from "../lib/markdown";
import { pushHistory } from "../lib/history";

export function BasicsPage() {
  const location = useLocation();
  useEffect(() => {
    pushHistory(location.pathname);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <article className="space-y-10">
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
          Lacrosse, for parents
        </h1>
        <p className="text-sm sm:text-base text-team-grey">
          A one-read intro to how the game works.
        </p>
      </header>

      <nav aria-label="On this page" className="rounded-lg border border-team-grey-light p-3 sm:p-4 bg-team-grey-light/40">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-team-grey mb-1 sm:mb-2 px-1">
          On this page
        </p>
        <ul role="list">
          {basics.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block px-1 py-2 text-team-blue hover:text-team-blue-dark underline underline-offset-2"
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

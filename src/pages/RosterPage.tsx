import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppLink } from "../components/AppLink";
import { roster, POSITION_LABEL, type Player, type Position } from "../data/roster";
import { pushHistory } from "../lib/history";
import { SEASON_TAG } from "../config";

type SortMode = "number" | "position" | "grade";

const POSITION_ORDER: Position[] = ["A", "M", "D", "G"];

const GRADE_ORDER = [12, 11, 10, 9] as const;

const GRADE_LABEL: Record<number, string> = {
  12: "Seniors",
  11: "Juniors",
  10: "Sophomores",
  9: "Freshmen",
};

export function RosterPage() {
  const location = useLocation();
  const [sort, setSort] = useState<SortMode>("number");

  useEffect(() => {
    pushHistory(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const grouped = useMemo(() => groupByPosition(roster), []);
  const groupedByGrade = useMemo(() => groupByGrade(roster), []);
  const byNumber = useMemo(
    () => [...roster].sort((a, b) => a.number - b.number || a.name.localeCompare(b.name)),
    []
  );

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
          {SEASON_TAG} Roster
        </h1>
        <p className="text-sm sm:text-base text-team-grey">
          {roster.length} players.{" "}
          <AppLink
            to="/basics#positions"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            What do the positions mean?
          </AppLink>
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Sort roster by"
        className="inline-flex rounded-lg border border-team-grey-light bg-white p-1 text-sm"
      >
        <SortTab active={sort === "number"} onClick={() => setSort("number")}>
          By number
        </SortTab>
        <SortTab active={sort === "position"} onClick={() => setSort("position")}>
          By position
        </SortTab>
        <SortTab active={sort === "grade"} onClick={() => setSort("grade")}>
          By grade
        </SortTab>
      </div>

      {sort === "number" && <PlayerGrid players={byNumber} />}

      {sort === "position" && (
        <div className="space-y-8">
          {POSITION_ORDER.map((pos) => {
            const list = grouped[pos];
            if (!list || list.length === 0) return null;
            return (
              <section key={pos} className="space-y-3">
                <h2 className="text-2xl font-bold text-team-blue-dark">
                  {POSITION_LABEL[pos]}{" "}
                  <span className="text-team-grey font-medium text-lg">
                    ({list.length})
                  </span>
                </h2>
                <PlayerGrid players={list} />
              </section>
            );
          })}
        </div>
      )}

      {sort === "grade" && (
        <div className="space-y-8">
          {GRADE_ORDER.map((grade) => {
            const list = groupedByGrade[grade];
            if (!list || list.length === 0) return null;
            return (
              <section key={grade} className="space-y-3">
                <h2 className="text-2xl font-bold text-team-blue-dark">
                  {GRADE_LABEL[grade]}{" "}
                  <span className="text-team-grey font-medium text-lg">
                    ({list.length})
                  </span>
                </h2>
                <PlayerGrid players={list} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SortTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md font-medium ${
        active
          ? "bg-team-blue text-white"
          : "text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
      }`}
    >
      {children}
    </button>
  );
}

function PlayerGrid({ players }: { players: Player[] }) {
  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      role="list"
    >
      {players.map((p) => (
        <li
          key={`${p.number}-${p.name}`}
          className="flex items-center gap-3 rounded-lg border border-team-grey-light bg-white p-3"
        >
          <span
            className="shrink-0 w-10 h-10 rounded-full bg-team-blue text-white font-bold flex items-center justify-center tabular-nums"
            aria-label={`Number ${p.number}`}
          >
            {p.number}
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-team-blue-dark leading-tight truncate">
              {p.name}
            </div>
            <div className="text-sm text-team-grey leading-tight">
              {POSITION_LABEL[p.position]} · Grade {p.grade}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function groupByPosition(list: Player[]): Record<Position, Player[]> {
  const out: Record<Position, Player[]> = { A: [], M: [], D: [], G: [] };
  for (const p of list) out[p.position].push(p);
  for (const pos of POSITION_ORDER) {
    out[pos].sort((a, b) => a.number - b.number || a.name.localeCompare(b.name));
  }
  return out;
}

function groupByGrade(list: Player[]): Record<number, Player[]> {
  const out: Record<number, Player[]> = {};
  for (const p of list) {
    if (!out[p.grade]) out[p.grade] = [];
    out[p.grade].push(p);
  }
  for (const grade of Object.keys(out)) {
    out[Number(grade)].sort(
      (a, b) => a.number - b.number || a.name.localeCompare(b.name)
    );
  }
  return out;
}

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppLink } from "../components/AppLink";
import { BackButton } from "../components/BackButton";
import { roster, POSITION_LABEL, type Player } from "../data/roster";
import { playerLifts, type Lift } from "../data/lifts";
import { getPlayerStats, STATS_FETCHED_AT, type StatCategory } from "../lib/stats";
import { pushHistory } from "../lib/history";

const GRADE_LABEL: Record<number, string> = {
  12: "Senior",
  11: "Junior",
  10: "Sophomore",
  9: "Freshman",
};

export function PlayerPage() {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const jersey = number ? Number.parseInt(number, 10) : NaN;
  const player = Number.isFinite(jersey)
    ? roster.find((p) => p.number === jersey)
    : undefined;

  useEffect(() => {
    pushHistory(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!player) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-team-blue-dark">
          We couldn't find that player
        </h1>
        <p className="text-team-grey">
          Check the jersey number, or browse the full roster.
        </p>
        <div className="flex gap-2">
          <BackButton />
          <AppLink
            to="/roster"
            className="inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
          >
            Browse roster →
          </AppLink>
        </div>
      </div>
    );
  }

  const stats = getPlayerStats(player.number);
  const lifts = playerLifts[player.number] ?? [];
  const hasSeasonStats = Boolean(stats?.hasStats && stats.categories.length > 0);

  return (
    <div className="space-y-6">
      <PlayerHero player={player} maxprepsPhoto={stats?.photoUrl ?? null} />

      <PlayerMeta player={player} />

      {hasSeasonStats && <StatsGrid categories={stats!.categories} />}

      {lifts.length > 0 && <LiftsGrid lifts={lifts} />}

      {!hasSeasonStats && lifts.length === 0 && (
        <div className="rounded-lg border border-team-grey-light bg-white p-4 text-sm text-team-grey">
          No stats posted yet for {player.name} this season.
        </div>
      )}

      {stats && (
        <p className="text-xs text-team-grey">
          Stats from{" "}
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            MaxPreps
          </a>
          , last refreshed {formatFetchedAt(STATS_FETCHED_AT)}.
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-4 border-t border-team-grey-light">
        <BackButton />
        <AppLink
          to="/roster"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        >
          Full roster →
        </AppLink>
      </div>
    </div>
  );
}

function PlayerHero({
  player,
  maxprepsPhoto,
}: {
  player: Player;
  maxprepsPhoto: string | null;
}) {
  const sources = [`/players/${player.number}.jpg`];
  if (maxprepsPhoto) sources.push(maxprepsPhoto);
  const [srcIndex, setSrcIndex] = useState(0);
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-full aspect-square sm:aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden bg-team-grey-light">
      {errored ? (
        <div className="w-full h-full bg-team-blue text-white flex items-center justify-center">
          <span className="text-6xl sm:text-7xl font-bold">
            {initials(player.name)}
          </span>
        </div>
      ) : (
        <img
          src={sources[srcIndex]}
          alt={`${player.name}, number ${player.number}`}
          loading="eager"
          decoding="async"
          onError={() => {
            if (srcIndex + 1 < sources.length) {
              setSrcIndex(srcIndex + 1);
            } else {
              setErrored(true);
            }
          }}
          className="w-full h-full object-cover"
        />
      )}
      <span
        className="absolute bottom-3 right-3 min-w-[3rem] h-12 px-3 rounded-full bg-team-blue text-white text-2xl font-bold flex items-center justify-center tabular-nums ring-4 ring-white"
        aria-label={`Number ${player.number}`}
      >
        {player.number}
      </span>
    </div>
  );
}

function PlayerMeta({ player }: { player: Player }) {
  return (
    <header className="space-y-1 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-team-blue-dark leading-tight">
        {player.name}
      </h1>
      <p className="text-sm sm:text-base text-team-grey">
        {POSITION_LABEL[player.position]} · {GRADE_LABEL[player.grade]} (
        {player.grade}th grade)
      </p>
    </header>
  );
}

function LiftsGrid({ lifts }: { lifts: Lift[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-team-blue-dark">Lifts</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list">
        {lifts.map((lift) => (
          <li
            key={lift.name}
            className="rounded-lg border border-team-grey-light bg-white p-3"
          >
            <div className="text-2xl font-bold text-team-blue-dark tabular-nums">
              {lift.value}
            </div>
            <div className="text-xs font-medium text-team-grey leading-tight">
              {lift.name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatsGrid({ categories }: { categories: StatCategory[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-team-blue-dark">2026 Season</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list">
        {categories.map((cat) => (
          <li
            key={cat.name}
            className="rounded-lg border border-team-grey-light bg-white p-3"
          >
            <div className="text-2xl font-bold text-team-blue-dark tabular-nums">
              {cat.value}
            </div>
            <div className="text-xs font-medium text-team-grey leading-tight">
              {cat.name}
            </div>
            {cat.nationalAverage && (
              <div className="text-[11px] text-team-grey mt-1">
                Nat. avg {cat.nationalAverage}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatFetchedAt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

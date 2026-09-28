// Typed accessors over the scraped MaxPreps stats JSON.
// Source: scripts/scrape-stats.mjs writes src/data/stats.json.
// Automatic refresh is paused; this file represents the archived 2026 snapshot.

import statsJson from "../data/stats.json";

export type StatCategory = {
  name: string;
  value: string;
  nationalAverage: string | null;
  comparison: "Above" | "Below" | "Average" | string | null;
};

export type PlayerStats = {
  careerid: string;
  profileUrl: string;
  firstName: string;
  lastName: string;
  seasonYear: string | null;
  hasStats: boolean;
  photoUrl: string | null;
  categories: StatCategory[];
};

type StatsFile = {
  fetchedAt: string;
  source: string;
  teamUrl: string;
  players: Record<string, PlayerStats>;
};

const data = statsJson as StatsFile;

export function getPlayerStats(jersey: number): PlayerStats | null {
  return data.players[String(jersey)] ?? null;
}

export const STATS_FETCHED_AT: string = data.fetchedAt;
export const STATS_SOURCE_URL: string = data.teamUrl;

#!/usr/bin/env node
// Scrape PGHS Vikings lacrosse stats from MaxPreps and write src/data/stats.json.
//
// Source pages (Next.js, all stats embedded in __NEXT_DATA__ JSON blob):
//   1. team roster     -> jersey -> careerid mapping
//   2. athlete profile -> per-player season totals (quickStats)
//
// Run locally:  node scripts/scrape-stats.mjs
// Run in CI:    same; the GitHub Action commits the result if it changed.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TEAM_ROSTER_URL =
  "https://www.maxpreps.com/ut/pleasant-grove/pleasant-grove-vikings/lacrosse/roster/";

const USER_AGENT =
  "Mozilla/5.0 (compatible; viking-lacrosse-stats/1.0; +https://github.com/adamhep-ai/viking-lacrosse)";

const REQUEST_DELAY_MS = 500;

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..");
const OUTPUT_PATH = resolve(ROOT, "src", "data", "stats.json");

// athleteData rows are positional arrays. Indexes verified by inspection 2026-04-29.
// If MaxPreps changes the schema, the script will throw loudly and we fix it.
const COL = {
  firstName: 5,
  lastName: 6,
  gradeNum: 7,
  jersey: 8,
  primaryPosition: 12,
  canonicalUrl: 31,
};

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${url} -> ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function extractNextData(html, url) {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!match) {
    throw new Error(`No __NEXT_DATA__ blob found in ${url}`);
  }
  try {
    return JSON.parse(match[1]);
  } catch (err) {
    throw new Error(`Failed to parse __NEXT_DATA__ from ${url}: ${err.message}`);
  }
}

function parseCareerIdFromUrl(url) {
  if (typeof url !== "string") return null;
  const m = url.match(/careerid=([a-z0-9]+)/i);
  return m ? m[1] : null;
}

async function loadRoster() {
  const html = await fetchHtml(TEAM_ROSTER_URL);
  const data = extractNextData(html, TEAM_ROSTER_URL);
  const rows = data?.props?.pageProps?.athleteData;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("athleteData missing or empty on roster page");
  }
  const players = [];
  for (const row of rows) {
    if (!Array.isArray(row)) continue;
    const url = row[COL.canonicalUrl];
    const careerid = parseCareerIdFromUrl(url);
    const jerseyRaw = row[COL.jersey];
    const jersey = jerseyRaw == null ? null : Number.parseInt(String(jerseyRaw), 10);
    if (!careerid || !Number.isFinite(jersey)) continue;
    players.push({
      jersey,
      firstName: row[COL.firstName] ?? "",
      lastName: row[COL.lastName] ?? "",
      gradeNum: row[COL.gradeNum] ?? null,
      primaryPosition: row[COL.primaryPosition] ?? "",
      careerid,
      profileUrl: url,
    });
  }
  return players;
}

async function loadPlayerStats(profileUrl) {
  const html = await fetchHtml(profileUrl);
  const data = extractNextData(html, profileUrl);
  const pp = data?.props?.pageProps;
  const careerData = pp?.careerContext?.careerData ?? {};
  const quick = pp?.careerHomeCards?.quickStats?.[0];
  const hasStats = Boolean(pp?.careerDataAvailability?.hasStats);

  const categories = Array.isArray(quick?.categories)
    ? quick.categories.map((c) => ({
        name: c.name,
        value: c.seasonValue,
        nationalAverage: c.nationalValue,
        comparison: c.averageIndicator,
      }))
    : [];

  return {
    seasonYear: quick?.seasonYear ?? null,
    hasStats,
    photoUrl: careerData.hasProfileImage ? careerData.photoUrl ?? null : null,
    categories,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Fetching roster…");
  const players = await loadRoster();
  console.log(`Found ${players.length} players with careerids.`);

  const result = {};
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    process.stdout.write(
      `[${i + 1}/${players.length}] #${p.jersey} ${p.firstName} ${p.lastName}… `
    );
    try {
      const stats = await loadPlayerStats(p.profileUrl);
      const incoming = {
        careerid: p.careerid,
        profileUrl: p.profileUrl,
        firstName: p.firstName,
        lastName: p.lastName,
        ...stats,
      };
      // MaxPreps occasionally has two athletes share a jersey (transfers,
      // mid-season changes). Keep the record with more stat categories so we
      // don't blank out a populated player.
      const existing = result[p.jersey];
      if (!existing || stats.categories.length > existing.categories.length) {
        result[p.jersey] = incoming;
      }
      console.log(
        stats.hasStats ? `ok (${stats.categories.length} categories)` : "ok (no stats yet)"
      );
    } catch (err) {
      console.log(`SKIP (${err.message})`);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    source: "maxpreps.com",
    teamUrl: TEAM_ROSTER_URL,
    players: result,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");

  const withStats = Object.values(result).filter((p) => p.hasStats).length;
  console.log(
    `\nWrote ${OUTPUT_PATH}\n${Object.keys(result).length} players, ${withStats} with stats.`
  );
}

main().catch((err) => {
  console.error("\nScrape failed:", err);
  process.exit(1);
});

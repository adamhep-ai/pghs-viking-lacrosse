# Pleasant Grove Vikings Lacrosse

The spectator guide and 2026 roster remain available. Player statistics are an
archived snapshot last fetched June 5, 2026, not a live feed or a guarantee of
complete final-season totals.

## Off-season status

Automatic statistics refresh was removed on September 27, 2026. The
`Refresh MaxPreps stats` workflow retains only a manual trigger; no automatic
restart is scheduled. The MaxPreps scraper currently fails because its expected
`__NEXT_DATA__` page data is no longer present.

## Preparing for March 2027

1. Update the season, roster and app content for the new season.
2. Repair `scripts/scrape-stats.mjs` for the current MaxPreps page format.
3. Run `npm run scrape:stats`, review the resulting player matches and statistics,
   then run `npm run build` and `npm run smoke` before committing the new snapshot.
4. Update the archive notice in `src/pages/PlayerPage.tsx` and the status comment
   in `src/lib/stats.ts` when fresh data is ready.
5. Enable the workflow if GitHub still shows it disabled, and validate a manual
   run before restoring a schedule in `.github/workflows/refresh-stats.yml`.
   The former schedule was `0 13 */2 * *` (every other day at 13:00 UTC).

The scraper has not been repaired as part of this off-season cleanup. Do not
restore automatic refresh until the new-season output has been checked.

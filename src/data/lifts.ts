// Manual lift PRs, keyed by jersey number. These are NOT scraped — kept here
// so they survive the MaxPreps stats refresh that overwrites src/data/stats.json.

export type Lift = { name: string; value: string };

export const playerLifts: Record<number, Lift[]> = {
  52: [
    { name: "Squat", value: "450 lbs" },
    { name: "Bench", value: "245 lbs" },
  ],
};

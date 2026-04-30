# Viking Lacrosse — V2 Plan

A response to the 40-item review, organized into shippable phases. Items the
review proposed are referenced as **R#** so you can cross-check.

---

## Status — as of 2026-04-29

What has shipped since this plan was written:

- **Rules content audit against 2025-26 NFHS / UHSAA.** All 14 items
  from the rule-accuracy review applied. Six factual corrections
  (helmet-off now an illegal-procedure technical, defender-in-own-crease
  prohibition, expanded holding definition, "ball in flight" added to
  legal stick checks, intentional vs. unintentional head/neck contact,
  reconciled crease wording between rules and basics), eight tightening
  passes (stick-check failed-request → timeout, mouthguard wording,
  out-of-bounds inbounds clarification, tripping fixed at 1-min
  personal foul, last-2-min clock margin condition added, three stale
  `// VERIFY` comments stripped). Commits `a0a50e9`, `2820c05`.
- **Player headshots on `/roster`.** Not in the original plan; added
  ad-hoc. 64×64 photo on each roster card with the jersey number as a
  corner chip, initials-avatar fallback for the two players without a
  photo (#49 absent on photo day; #52 cropped from the freshman group
  shot). Resize tooling lives in `scripts/resize-headshots.ps1` and
  `scripts/crop-from-group.ps1`. Commits `1788472`, `e775513`.
- **R11 retired.** The "shot clock explainer" item is removed from the
  plan — UHSAA / NFHS does not have a shot clock; the 60-second clock
  is a New York state experimental rule only. The existing
  failure-to-advance content (20s + 10s) is correct.

Not yet started: Phases 1, 3, 4, 5, 6, and most of Phase 2.

---

## Guiding principles (carried over from the brief)

The original brief is deliberately constrained. Before adopting a suggestion,
it has to fit these:

1. **Tap-to-answer beats search.** A parent has ~10 seconds and one thumb. The
   Finder tree is the answer mechanism. We do *not* ship a search box.
2. **Static, no backend.** No accounts, no submission forms, no newsletter.
   Mailto and external links are fine.
3. **Boys' HS lacrosse only.** Specifically UHSAA / NFHS. We say so out loud.
4. **Sideline first.** Every change is judged by whether it helps a parent at
   a Tuesday game with bad cell service.

These principles drive several "decline" decisions below — they aren't
oversights.

---

## The biggest finding: signals were never built

The original brief specifies 20 inline-SVG ref signals, a 10-tile signal grid
at `/t/signals`, and a signal block on every rule page. **None of that
exists in the current codebase.** No `SignalSvg.tsx`, no signal grid route,
no signal rendering in `RuleExplanation.tsx`.

That means review item **R4 ("Add ref signal references")** isn't a new
feature — it's the headline promise of the site ("What did the ref just
call?") that has never shipped. This becomes Phase 1 by itself.

---

## Phase 1 — Deliver the title's promise (signals)

Goal: make the site actually answer "what did the ref just call?" by
recognizing the signal.

- **Build `SignalSvg.tsx`** with all 20 signals from the brief (one component,
  switch on `name: SignalName`, 120×120 viewBox, single stroke, currentColor).
- **Render the signal on every rule page** (`RuleExplanation.tsx`) — inline
  SVG plus the human-readable signal name, near the top.
- **Build the signal grid route** at `/t/signals` (10 tiles per the brief),
  reachable from the Finder root branch 2 ("The ref made a signal I don't
  recognize") and from a new homepage entry point.
- **Promote signals on the homepage**: a small "Recognize the signal" tile
  next to the Finder entry — currently signals are buried.

Covers: **R4** (the big one), **R1** in part (delivers visuals for signals).

## Phase 2 — Trust, scope, and content honesty

Small, near-trivial fixes that materially change how parents perceive the
site's authority and safety.

- **R9** Add a one-line scope banner on the homepage and an `/about` blurb:
  *"Boys' high school lacrosse, UHSAA / NFHS rules. Girls' rules differ
  significantly."*
- **R10** State the rulebook in the footer + Basics page: *"Based on NFHS
  rules as adopted by UHSAA for the 2026 season."*
- **R11 — RETIRED.** A shot-clock explainer was on the plan, but UHSAA /
  NFHS does not have a shot clock; the 60-second clock referenced in
  some sources is a New York state experiment and does not apply here.
  The existing `failure_to_advance` content (20s + 10s) is current.
- **R12** Add a "Reading the clock and scoreboard" section to Basics
  (quarter length, last-two-minutes stop-clock with the 4-goal margin
  condition that was added in the rules pass, timeouts, how penalty
  time is displayed).
- **R13** Expand each Equipment rule (`broken_stick`, `helmet_off`,
  `stick_check`, `mouthguard`) to a real explanation card. Today these are
  listed but several are stubs.
- **R16** Make the All Rules page consistent — every entry gets a one-line
  summary OR none do. Pick one and apply it across the file.
- **R17** Resolve the homepage / All Rules duplication. Decide: homepage
  shows curated highlights ("Most-asked calls"), `/rules` is the full
  catalog. Remove the copy-paste overlap.

## Phase 3 — Visual literacy (the spatial gap)

Lacrosse is a spatial game and the site is 100% text. Beyond signals
(Phase 1), parents need to see the field.

- **R1** Add three SVG diagrams (same single-stroke style as signals so they
  theme together):
  - **Field diagram** on Basics: crease, midline, restraining lines, "the
    box," wing lines.
  - **Positions diagram** on Basics: where attack, midfield, defense, and
    goalie start.
  - **Inline mini-diagrams** in the rule cards that need them: offsides
    (4/3 split), crease violation (the arc), faceoff setup.
- **R22** Add subtle category color: red accent for personal fouls, yellow
  for technical, gray for procedural / mechanics. Today every chip is the
  same blue. Apply to the chip on rule pages and the headings on `/rules`.

## Phase 4 — Wayfinding and cross-linking

The catalog is bigger than it looks; help parents move through it.

- **R3** Add a `/glossary` page (alphabetical, anchor-linked). No tooltip
  layer — that's heavier than the value justifies. Inline links in prose
  point to glossary anchors.
- **R18** Inline cross-link key terms in rule prose ("cross-check" inside
  the Slashing description, etc.). Auto-link a small allowlist of terms
  during render rather than hand-editing each string.
- **R19** Make the Basics "On this page" TOC sticky on desktop, collapsible
  on mobile.
- **R20** Add breadcrumbs on rule pages: *All Rules › Personal fouls ›
  Slashing*. Already half-implied by the category chip — promote it to a
  real navigable trail.
- **R6** Soften the Finder: add an "I'm not sure" branch on the first
  screen (currently only on penalty length), and make the "↑ How do you
  want to narrow it down?" line a real, full-size breadcrumb.

## Phase 5 — Sideline polish and a11y

The cheap-but-real wins.

- **R23** Fix the homepage card grid (odd-cell gap). Use a 1-2-1-2 layout
  or fill with a "Tip of the day" / quick link.
- **R24** Expand the footer: feedback mailto, official UHSAA / NFHS
  rulebook link, last-updated date per page (driven by a `updatedAt` field
  in `rules.ts`), credits.
- **R26** Hero image alt text — leave `alt=""` (it's decorative beside the
  H1). Add a comment in code so this doesn't get re-flagged.
- **R27** Run the muted "Why it trips parents up" italic gray text through
  a contrast checker; bump the gray darker if it fails AA.
- **R28** Audit and harden focus states on every interactive element
  (cards, NavLinks, Finder buttons, footer links).
- **R29** Per-page `<title>` via a tiny `useDocumentTitle` hook —
  *"Slashing — Viking Lacrosse"*, *"Basics — Viking Lacrosse"*, etc.
- **R30** Open Graph tags + a 1200×630 OG image (Viking badge + headline).
  This is what makes parents texting the link to each other look good.
- **R31** Add `FAQPage` / `HowTo` schema.org JSON-LD on rule pages so
  Google can answer "what is slashing in lacrosse" with a card pointing
  here.
- **R37** Tighten the intro tagline to *"the calls that confuse most
  parents."*
- **R38** Penalty durations get a chip badge (30s / 1m / 2-3m) rather than
  buried prose.
- **R39** Drop the duplicate "Personal foul" chip on Finder result pages
  when the title already conveys it.
- **R40** Per-page updated date in the footer of each rule page (uses the
  same `updatedAt` field as R24).

## Phase 6 — Cheat sheet + PWA (the field-Wi-Fi answer)

The single most useful artifact for game day.

- **R7** Add `/cheat-sheet`: one printable page with the 5 core rules,
  the most common penalties, and (once Phase 1 ships) their ref signals.
  Print stylesheet so it lays out cleanly on letter paper.
- **R32** Make the site installable as a PWA with offline caching of all
  rule pages and the cheat sheet. Vite has a plug-in (`vite-plugin-pwa`)
  that handles this with ~20 lines of config. Massive sideline win because
  outdoor field cell coverage is unreliable.

---

## Declined — and why

These contradict the brief or aren't worth the cost. Listed so you can push
back if you disagree.

- **R2 Search bar.** The brief explicitly says "No search. No filters." The
  Finder is the answer mechanism. A search box dilutes the central design
  choice and tempts us to skip building good Finder paths. **If parents are
  asking for search, that's a signal that the Finder paths or signal grid
  aren't working — fix those, don't paper over it with search.**
- **R5 Recently-viewed / pinned favorites.** Adds state for a use case
  (returning to a rule mid-game) that the Finder already solves in 3 taps.
  Skip.
- **R8 Penalty timer.** Feature creep. The scoreboard already shows it.
- **R14 Audio cues for whistles.** Recording effort + autoplay rules in
  browsers + accessibility complications. The "Listen for the whistle"
  prose is enough.
- **R15 Video clips.** Out of scope per brief. Rights are messy and
  PGHS-recorded film won't license cleanly. Re-evaluate post-Phase-3.
- **R25 Logo links to home.** Already done. Header.tsx wraps the logo in a
  `<Link to="/">`. No action needed.
- **R33 "Was this helpful?" feedback.** Needs analytics or a backend.
  Defer until we have either.
- **R34 Suggest-a-rule form.** No backend. A `mailto:` link in the footer
  (covered by **R24**) is sufficient.
- **R35 Newsletter / game-day reminder.** Backend + ESP + compliance
  overhead for a static spectator guide. Skip.
- **R36 Parent-coach Q&A archive.** Content burden with no editorial
  pipeline. Glossary (Phase 4) covers most of the value.
- **R21 Hero takes too much space.** Reviewer flagged this themselves as
  possibly an artifact of their agent UI overlapping. Verify on a clean
  load before changing the hero.

---

## Suggested sequencing

| Phase | Effort | Ship together? |
|-------|--------|----------------|
| 1. Signals | Largest single chunk (~20 SVGs + grid + RuleExplanation update) | One PR |
| 2. Trust + content | Mostly content edits in `rules.ts` + `basics.ts` | One PR, can land in parallel with Phase 1 |
| 3. Visual literacy | Three diagrams + category colors | One PR |
| 4. Wayfinding | Glossary + cross-linking + breadcrumbs + sticky TOC + Finder polish | Split into 2 PRs (glossary alone, then the rest) |
| 5. Polish + a11y | Many small items | One bundled "polish" PR |
| 6. Cheat sheet + PWA | Two distinct features | One PR each |

**Recommended order to start:** Phase 1, then Phase 2, then Phase 5
(polish), because polish has the highest visible-quality-per-hour and lets
the site feel finished before we layer on more content (Phase 3, 4, 6).

---

## Open questions for the user

1. **Search (R2).** Is the brief's "no search" still a hard rule, or do you
   want to revisit it? My recommendation: keep it out, but confirm.
2. **Cheat sheet scope (R7).** Should the cheat sheet be one page or a
   short PDF download? Print stylesheet is simpler and avoids hosting a
   file; PDF feels more "shareable parent artifact."
3. **Glossary depth (R3).** Quick (~20 terms covering the slang already in
   prose) or comprehensive (~60 terms)?
4. **PWA (R32).** Worth a real commitment? It's not free —
   service-worker caching means we need a deploy hygiene story (cache
   busting on rule updates). Worth it if parents will install; not worth
   it if everyone uses the link from a text once a season.
5. **Last-updated dates (R24/R40).** Manual `updatedAt` per rule, or
   git-derived at build time? Manual is simpler but rots; git-derived is
   honest but needs a build step.

---

## Resolved questions

- **R11 shot clock (resolved 2026-04-29).** Confirmed against the NFHS
  2025-26 rulebook and the ArbiterSports clinic that NFHS does not have
  a shot clock. The 60-second clock referenced in some articles is a
  New York state experimental rule for 2025-2026 only and does not
  apply to UHSAA. R11 is retired; the existing 20s + 10s clearing
  content is current.

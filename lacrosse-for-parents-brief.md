# Lacrosse for Parents — Build Brief

## What we're building

A mobile-first web app that helps parents of the Pleasant Grove High School boys lacrosse team identify what just happened in a game. The main interface is a **decision tree**: a parent taps through 2–4 questions and lands on an explanation of the rule or situation they just saw.

Two reference pages sit alongside the tree for parents who want to read more on their own time.

This is a simplified spectator guide, not an official rulebook.

## The parent's experience

A parent sees something happen, opens the app, and taps:

> "What did you just see?" → "The ref made a signal I don't recognize" → *taps a signal tile that looks like what they saw* → lands on the explanation.

Every path ends in 2–4 taps. No scrolling a long list. No searching. No reading a rulebook.

## App shape

```
┌─────────────────────────────────────────┐
│  Header: [Logo] [Basics] [All Rules]    │
├─────────────────────────────────────────┤
│                                         │
│  The tree (main screen)                 │
│  OR a rule explanation page             │
│  OR the Basics page                     │
│  OR the All Rules page                  │
│                                         │
├─────────────────────────────────────────┤
│  Footer: disclaimer + roster + season   │
└─────────────────────────────────────────┘
```

Three surfaces:

1. **The tree** — the main app. Fast taps ending at a rule explanation.
2. **Basics** — a one-page read about how lacrosse works. Linked from the header.
3. **All Rules** — a browseable list of every rule. Linked from the header.

## Stack

- Vite + React + TypeScript
- React Router (path-based routes — see URL scheme below)
- Tailwind CSS
- Inline SVG for ref signals (no external assets)
- Content in typed TS files under `/src/data`
- Static build, deploys to **Vercel**

No Next.js, no CMS, no search library, no filter library.

## Brand and palette

Team: Pleasant Grove High School Vikings.

Colors (match the school site):

```css
--team-blue:        #1E4FB8;   /* primary — sampled from logo */
--team-blue-dark:   #143A8A;   /* hover, headings */
--team-blue-light:  #E8F0FF;   /* tinted backgrounds, "What happens next" block */
--team-grey:        #6B7280;   /* secondary text, borders */
--team-grey-light:  #F3F4F6;   /* page background on rule pages */
--team-white:       #FFFFFF;
```

Exact hex values to be calibrated by sampling directly from the provided logo files.

Logos (provided):

- **Primary mark (flat blue Viking, no background)** — used in the header at ~32px, and as a small mark in the footer.
- **Circle badge (blue fill, silver rim)** — used as the hero mark on `/` (large, ~120px) and the Basics page header.

Store both under `/src/assets/logos/` as SVG if vector versions are available, otherwise PNG @2x (header: 64×64, hero: 256×256).

Typography: system font stack — `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. No web fonts (keeps load fast).

## File structure

```
/src
  App.tsx                  (router + layout)
  main.tsx
  index.css                (Tailwind + CSS vars for team palette)
  /pages
    TreePage.tsx           (the decision tree — handles / and /t/:nodeId)
    SignalGridPage.tsx     (/t/signals)
    RuleDetailPage.tsx     (/r/:ruleId)
    BasicsPage.tsx         (/basics)
    RulesPage.tsx          (/rules — browseable list)
    NotFoundPage.tsx
  /components
    Header.tsx
    Footer.tsx
    TreeNode.tsx           (one question + buttons screen)
    SignalGrid.tsx         (10-tile grid used on /t/signals)
    RuleExplanation.tsx    (shared rule content block)
    SignalSvg.tsx          (inline SVG, switched by SignalName)
    BackButton.tsx         (reads sessionStorage history)
  /data
    tree.ts
    rules.ts               (already drafted — 39 entries)
    basics.ts
  /lib
    history.ts             (sessionStorage nav history helpers)
  /assets
    /logos
      viking-primary.svg
      viking-badge.svg
```

## URL scheme

Path-based, not query params. Every state is copy-pasteable and shareable.

| Route              | What it renders                                       |
|--------------------|-------------------------------------------------------|
| `/`                | Tree root node (the hero + root question)            |
| `/t/:nodeId`       | A tree node screen (e.g. `/t/penalty_by_action`)     |
| `/t/signals`       | The signal grid (Branch 2)                            |
| `/r/:ruleId`       | A rule detail page (e.g. `/r/slashing`)              |
| `/basics`          | The long-read basics page                             |
| `/rules`           | All rules, grouped by category                        |
| `/rules#<ruleId>`  | Anchor into the All Rules list                        |

Vercel `vercel.json` rewrites all unmatched paths to `/index.html` so client-side routing works on refresh and deep links.

## Navigation history (replaces `parentId`)

The tree has nodes reached from multiple parents (e.g. `penalty_by_action` is linked from Branch 1, Branch 3's "one flag," and Branch 4's "whistle before shot"). A static `parentId` can't represent that — so we use a **session history stack** instead.

`/src/lib/history.ts`:

```ts
const KEY = "lax-nav-history";

export function pushHistory(path: string) {
  const h = JSON.parse(sessionStorage.getItem(KEY) ?? "[]") as string[];
  if (h[h.length - 1] !== path) h.push(path);
  sessionStorage.setItem(KEY, JSON.stringify(h));
}

export function popHistory(): string | null {
  const h = JSON.parse(sessionStorage.getItem(KEY) ?? "[]") as string[];
  h.pop();                          // current path
  const prev = h.pop() ?? null;     // previous path
  sessionStorage.setItem(KEY, JSON.stringify(h));
  return prev;
}

export function clearHistory() {
  sessionStorage.removeItem(KEY);
}
```

- Every page push-records its path on mount.
- `BackButton` calls `popHistory()` → navigates to the result, or `/` if empty.
- `Start over` calls `clearHistory()` → navigates to `/`.
- Browser back still works naturally via the native history stack.

## The three content types

### 1. Tree nodes

```ts
// /src/data/tree.ts

export type TreeNode = {
  id: string;
  question: string;
  buttons: TreeButton[];
};

export type TreeButton = {
  label: string;
  goesTo:
    | { type: "node"; nodeId: string }
    | { type: "rule"; ruleId: string }
    | { type: "signal_grid" };
};
```

No `parentId` — history handles back navigation.

### 2. Rule explanations (already drafted in `rules.ts`)

```ts
export type Rule = {
  id: string;
  title: string;
  category: RuleCategory;
  whatYouSee: string;
  whatItMeans: string;
  whatHappensNext: string;
  signal?: SignalName;
  relatedRuleIds?: string[];
};

export type RuleCategory =
  | "personal_foul"
  | "technical_foul"
  | "procedural"
  | "faceoff"
  | "equipment"
  | "mechanics"
  | "stalling";
```

**Overview pages (`technical_foul_overview`, `personal_foul_one_minute`, `personal_foul_severe`, `no_goal_overview`) use this same schema.** Their `relatedRuleIds` array serves as the enumerated list of specific fouls, and `RuleExplanation.tsx` should render that "See also" list prominently (title, one-liner via `whatYouSee`) for overview-category rules.

### 3. Basics content

```ts
// /src/data/basics.ts

export type BasicsSection = {
  heading: string;
  body: string;      // markdown allowed
};

export const basics: BasicsSection[] = [ ... ];
```

**Markdown link convention:** cross-links to rules use absolute app paths: `[crease violation](/r/crease_violation)`. Internal anchors in basics itself: `[positions](#positions)`.

---

## The decision tree (full spec)

The tree has one root node and eight top-level branches.

### Root node (`/`)

**Question:** "What did you just see?"

**Buttons:**
1. A player went to the penalty box → `penalty_box`
2. The ref made a signal I don't recognize → *signal grid* (`/t/signals`)
3. A flag is on the ground → `flag_on_ground`
4. Something happened at the goal → `goal_event`
5. Play didn't stop when I expected it to → `play_continued`
6. The faceoff keeps getting reset → rule: `faceoff_situations`
7. A stick broke or a helmet came off → `equipment_event`
8. The team is just holding the ball → rule: `stalling_situations`

### Branch 1 — Penalty box (`penalty_box`)

**Question:** "How do you want to narrow it down?"
1. By what you saw the player do → `penalty_by_action`
2. By how long the penalty is → `penalty_by_length`

#### `penalty_by_action`

**Question:** "What did you see the player do?"
1. Swung the stick hard → rule: `slashing`
2. Check with two hands on the shaft → rule: `cross_check`
3. Big body hit → `body_check_detail`
4. Shoved an opponent → rule: `push`
5. Grabbed or tackled an opponent → `grab_detail`
6. Yelled at a ref or opponent → rule: `unsportsmanlike`

##### `body_check_detail`
1. Late (after release) → rule: `illegal_body_check`
2. From behind → rule: `illegal_body_check`
3. To the head or neck → rule: `dangerous_contact`
4. On a player not looking at the ball → rule: `defenseless_player`
5. Just a hard but clean hit → rule: `legal_body_check`

##### `grab_detail`
1. Grabbed body or stick → rule: `hold`
2. Tripped with stick or foot → rule: `tripping`
3. Blocked a player without the ball → rule: `interference`

#### `penalty_by_length`

**Question:** "How long is the penalty?"
1. 30 seconds → rule: `technical_foul_overview`
2. 1 minute → rule: `personal_foul_one_minute`
3. 2–3 minutes → rule: `personal_foul_severe`
4. I'm not sure → `penalty_by_action`

### Branch 2 — Signal grid (`/t/signals`)

A 10-tile grid. Each tile: inline SVG on top, signal name underneath. Tap → rule detail.

| Tile | Visual | Routes to |
|------|--------|-----------|
| 1 | Chopping arm motion | `/r/slashing` |
| 2 | Forearm punching motion | `/r/cross_check` |
| 3 | Fist pump forward | `/r/push` |
| 4 | Hands grabbing motion | `/r/hold` |
| 5 | Arms extended horizontally | `/r/offsides` |
| 6 | Arms waving horizontally | `/r/play_on` |
| 7 | Arm pointed at a goal | `/r/possession_direction` |
| 8 | Hand on hip, other arm out | `/r/illegal_body_check` |
| 9 | Arms crossed at wrists | `/r/technical_foul_overview` |
| 10 | Hands moving apart horizontally | `/r/no_goal` |

Bottom of grid: **"None of these?"** link → `/` (root).

*Note: tiles are chosen for parent recognizability, not official NFHS mechanic accuracy.*

### Branch 3 — Flag on the ground (`flag_on_ground`)

1. Yes, still playing → rule: `flag_down`
2. No, whistle blew → `flag_then_whistle`

#### `flag_then_whistle`
1. One flag → `penalty_by_action`
2. Multiple flags → rule: `matching_fouls`

### Branch 4 — Something at the goal (`goal_event`)

1. Goal counted → rule: `goal_signal`
2. Goal was waved off → `no_goal_reason`
3. Ref made a signal, no one scored → *signal grid*

#### `no_goal_reason`
1. Player stepped in the crease → rule: `crease_violation`
2. Player was already in the crease → rule: `crease_violation`
3. Whistle blew before the shot → `penalty_by_action`
4. I don't know → rule: `no_goal_overview`

### Branch 5 — Play didn't stop (`play_continued`)

1. Ref waved arms and yelled "play-on" → rule: `play_on`
2. Flag down but they kept playing → rule: `flag_down`
3. Contact but no call → rule: `legal_contact`

### Branch 6 — Faceoff resets

Root button → rule: `faceoff_situations` (single explainer page).

### Branch 7 — Stick or helmet (`equipment_event`)

1. Helmet came off → rule: `helmet_off`
2. Stick broke → rule: `broken_stick`
3. Ref checked a stick → rule: `stick_check`
4. Something about a mouthguard → rule: `mouthguard`

### Branch 8 — Holding the ball

Root button → rule: `stalling_situations`.

---

## Ref signal SVGs (complete set)

`SignalName` is an enum of 20 values (already in `rules.ts`). All need inline SVGs — rules outside the grid still render their signal on the rule detail page.

All SVGs share a single style: 120×120 viewBox, single stroke (`currentColor`), 2.5px stroke width, rounded line caps, minimalist stick-figure silhouette. This lets them theme with CSS color and stay crisp at any size.

| Signal | Visual description |
|--------|--------------------|
| `slash` | Stick figure mid-chop, one arm raised and angled down toward opposite shoulder |
| `cross_check` | Two fists side-by-side, forearms pushing forward |
| `push` | One arm extended, fist forward, pushing motion |
| `hold` | Two hands closing into grabbing fists, shown together |
| `interference` | Crossed forearms in front of chest |
| `illegal_screen` | One leg bent out, stationary stance mark |
| `tripping` | Foot sweeping across, lower leg emphasized |
| `warding` | Free arm swinging across body |
| `illegal_procedure` | Rolling hands motion (two circling arms) |
| `offsides` | Both arms extended straight out to sides |
| `illegal_body_check` | One hand on hip, other arm straight out |
| `play_on` | Both arms swinging horizontally (motion lines) |
| `flag_down` | Arm extended, pointing down at ground |
| `goal` | Both arms raised straight up overhead |
| `no_goal` | Both arms sweeping outward, hands apart |
| `possession` | One arm pointed toward a goal end |
| `technical_foul` | Arms crossed at wrists above head |
| `timeout` | Hands forming a T |
| `unsportsmanlike` | One fist on hip, other arm pointed at offender |
| `stalling` | One arm circling overhead (winding motion) |

Implementation: `SignalSvg.tsx` exports one component with a `name: SignalName` prop and a `switch` that returns the right `<g>` path. One file, ~20 small paths.

---

## Rule explanation page layout

`RuleExplanation.tsx`, used on `/r/:ruleId` and inline on `/rules`:

1. **Title** (large, team-blue)
2. **Signal** (inline SVG + signal name, if `signal` is set)
3. **What you see** — 1–2 sentences
4. **What it means** — 2–4 sentences
5. **What happens next** — 1–2 sentences, `--team-blue-light` tinted background
6. **See also** — links to `relatedRuleIds` (for overview rules, this is the primary content block)
7. **Bottom actions:** ← Back · Start over · Browse all rules

---

## Tree navigation rules

- Every node renders a **Back** button (uses history stack).
- Every node renders a **Start over** link (clears history, goes to `/`).
- URL matches the current node: `/t/penalty_by_action`. Browser back works natively.
- Tapping a button feels instant — no loading state, no animation over 150ms. All data is bundled at build; route changes only swap components.
- Keyboard navigable: Tab through buttons, Enter to select, Escape → Back.

---

## The two reference pages

### Basics page (`/basics`)

One-page read for new parents. No rules — just how the game works:

1. The field — dimensions, crease, midline, restraining lines
2. The positions — attack, middies, defense, goalie
3. How a game flows — four quarters, faceoffs
4. Offense and defense — clearing, riding, settled offense
5. Scoring — shots, rebounds, the crease rule (links to `/r/crease_violation`)
6. Substitutions — the box, on-the-fly changes
7. How penalties work — box, man-up / man-down (links to penalty rules)
8. What to watch for as a parent

### All Rules page (`/rules`)

Grouped by category. Each rule expands inline (or anchors to `/rules#<ruleId>`).

- Category heading
- Rules listed in that category
- Tap → expand inline full explanation

No search. No filters. Scroll and skim.

---

## Hero / landing screen (`/`)

- Viking circle badge logo (large, ~120px)
- Big headline: **"What did the ref just call?"**
- One line of support: "Tap what you saw. We'll get you to an answer."
- Root tree node renders directly below — no "Start" button.

Header persists on all pages: `[Primary logo] [Basics] [All Rules]`.

---

## Footer

Three lines, same on every page:
- "Simplified spectator guide. Not an official rulebook."
- Roster link (URL set via one constant at top of `App.tsx`)
- Season tag: "Updated for the 2026 season"

---

## Deployment

- **Host:** Vercel
- **Build:** `vite build` → static `/dist`
- **Config:** `vercel.json` with SPA rewrite:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Preview deploys** on every push to a non-main branch.
- **Production** deploys from `main`.

---

## Acceptance checklist

### Framework
- [ ] Vite + React + TS scaffold running
- [ ] Tailwind configured with team palette CSS vars
- [ ] React Router with all routes wired
- [ ] `vercel.json` SPA rewrite in place

### Data
- [ ] `tree.ts` complete with all 8 top-level branches and sub-nodes
- [ ] `rules.ts` already drafted — verify all `ruleId` references in `tree.ts` exist
- [ ] `basics.ts` drafted with all 8 sections and correct markdown link convention

### Components
- [ ] `TreeNode` renders question + buttons, links to next node or rule
- [ ] `SignalGrid` renders 10 SVG tiles + "None of these?" link
- [ ] `RuleExplanation` renders all fields incl. overview-style "See also"
- [ ] `SignalSvg` implements all 20 signals
- [ ] `BackButton` uses session history stack, defaults to `/` when empty
- [ ] `Header` shows logo and nav; `Footer` shows disclaimer, roster link, season

### Navigation
- [ ] Every leaf routes to a real rule page
- [ ] Browser back works
- [ ] Deep link to any `/t/:nodeId`, `/r/:ruleId`, or `/rules#<ruleId>` works on refresh
- [ ] Start over clears history and returns to `/`

### Quality
- [ ] Smoke test: every `TreeButton` with `goesTo.type === "rule"` has a matching `Rule.id`
- [ ] Smoke test: every `Rule.signal` is a valid `SignalName`
- [ ] Content review pass by coach or ref (flag items marked `// VERIFY` in `rules.ts`)
- [ ] Mobile-first, loads under 2s on simulated 4G (Lighthouse)
- [ ] WCAG AA contrast, keyboard navigable, SVG signals have `aria-label`
- [ ] Roster URL configurable via one constant

### Deploy
- [ ] Vercel project connected
- [ ] Preview URL shared with coach for content review
- [ ] Production deploy live before first game

---

## Out of scope

Search, filters, user accounts, analytics, CMS, PDF export, animations beyond 150ms transitions, girls lacrosse, Spanish translation, real-time game data. All future work.

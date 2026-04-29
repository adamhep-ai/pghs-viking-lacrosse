// /src/data/basics.ts
//
// Long-form "how lacrosse works" content for the /basics page.
// Markdown is allowed in `body`. Cross-links to rules use /r/<ruleId>.

export type BasicsSection = {
  id: string;
  heading: string;
  body: string;
};

export const basics: BasicsSection[] = [
  {
    id: "the-field",
    heading: "The field",
    body: `A boys lacrosse field is 110 yards long and 60 yards wide — a little shorter and narrower than a football field, with goals set 15 yards in from each end line.

Key markings to know:

- **The crease** is the circle around each goal. Offensive players are not allowed to step inside it. The goalie lives there; defenders can pass through, but a new 2026 rule means a non-goalie defender can't step in their own crease to block a shot or act like a backup goalkeeper without drawing a personal foul.
- **The midline** splits the field in half and is used to enforce the offsides rule: each team must keep a minimum number of players on each half of the field.
- **The restraining lines** are the lines 20 yards up from each end line. They bound the offensive and defensive zones for certain situations, including faceoffs.
- **The box** at midfield is the substitution area — players run in and out of the game through here on the fly.`,
  },
  {
    id: "positions",
    heading: "The positions",
    body: `Each team has ten players on the field:

- **Attack (3)** — stay on the offensive end. Their job is to score and create scoring chances. They carry short sticks.
- **Midfielders / "middies" (3)** — run the whole field. They play offense and defense and take faceoffs. Short sticks, usually, but one middie can carry a long pole ("LSM" — long-stick midfielder).
- **Defense (3)** — stay on the defensive end. They carry long poles (up to 72 inches) to make it harder for attackers to get around them.
- **Goalie (1)** — lives in and around the crease. Carries a stick with a much wider head.

Because of the offsides rule, the 3 attackers stay on one half and the 3 defenders stay on the other. Only the middies cross the midline freely.`,
  },
  {
    id: "how-a-game-flows",
    heading: "How a game flows",
    body: `High school boys lacrosse games are **four 12-minute quarters**. The clock stops on whistles in the last two minutes of the game (and on some other dead-ball situations).

A **faceoff** restarts play. There's one at the start of each quarter and after every goal. Two players crouch over the ball at midfield, and a whistle releases them to fight for possession. Wing midfielders stand 20 yards away and can run in as soon as the whistle blows.

Between faceoffs, play is continuous — a lot like hockey. There's no "offensive set" that stops after a possession; teams run, pass, shoot, clear, and transition in real time.`,
  },
  {
    id: "offense-and-defense",
    heading: "Offense and defense",
    body: `When a team wins possession, they try to **clear** the ball — move it from their defensive end up past the midline. The other team tries to **ride** — pressure the ball-carrier in the defensive end and force a turnover.

Once the ball is in the offensive end, you'll see a **settled offense**: the attackers and middies pass around the outside of the defense looking for a shot or a chance to dodge past a defender. Defenders try to stay between their man and the goal, often using checks (controlled stick hits) to disrupt passes and dodges.

A **fast break** is when the offense gets the ball up the field before the defense can set — usually a 4-on-3 advantage that leads to a quick shot.`,
  },
  {
    id: "scoring",
    heading: "Scoring",
    body: `A goal is scored when the entire ball crosses the goal line. Shots come from outside the crease — remember, [an offensive player cannot step in the crease](/r/crease_violation) — so most goals come from jump shots, side-armed rips, or quick-stick finishes on a pass.

After a goal, there's a faceoff at midfield. A common fan moment to watch: if a team scores and was already on a man-up penalty situation, the penalty ends (if it was releasable) and play resumes even.`,
  },
  {
    id: "substitutions",
    heading: "Substitutions",
    body: `Subs happen **on the fly** through the substitution box at the midline. There's no stoppage — a player runs off the field into the box and a fresh player runs on. You'll often see defense-to-offense and offense-to-defense swaps immediately after a turnover.

Fouls and goals also allow subs, so teams often run fresh legs on after a whistle.`,
  },
  {
    id: "how-penalties-work",
    heading: "How penalties work",
    body: `When a foul is called, the offending player typically serves time in the **penalty box** on the sideline. The penalized team plays **a man down** until the penalty expires or, for releasable penalties, until the opposing team scores.

Penalties come in two main families:

- **Personal fouls** — the serious ones. 1 to 3 minutes. Examples: [slashing](/r/slashing), [cross-check](/r/cross_check), [illegal body check](/r/illegal_body_check).
- **Technical fouls** — smaller violations. 30 seconds if the fouled team didn't have the ball, or just a turnover if they did. Examples: [push](/r/push), [hold](/r/hold), [interference](/r/interference), [offsides](/r/offsides).

When the offense plays with the advantage, that's called **man-up** (or "extra man" — EMO). The defense playing short is **man-down**.`,
  },
  {
    id: "what-to-watch-for",
    heading: "What to watch for as a parent",
    body: `A few tips for following the game:

- **Watch the ball, but also the field balance.** The midline is where the game is won or lost — pay attention to which team is getting fresh middies on and getting numbers to the ball.
- **Listen for the whistle.** A single quick whistle usually means a dead ball (out of bounds, goal, faceoff reset). A loud blown-dead whistle after a flag means a penalty has been assessed.
- **The ref's signals tell you everything.** That's what this whole app is about — if you see one you don't recognize, open the tree.
- **Cheer the effort, not just the goals.** Ground balls, clears, and defensive stops decide most games more than highlight-reel goals do.`,
  },
];

// /src/data/rules.ts
//
// All rule explanations for the Lacrosse for Parents app.
// This file is the single source of truth for rule content.
// The tree's leaf nodes and the All Rules page both read from here.
//
// NOTE: These drafts should be reviewed by a coach or ref for accuracy,
// especially items flagged with // VERIFY — penalty lengths and newer
// NFHS rules can vary year to year.

export type SignalName =
  | "slash"
  | "cross_check"
  | "push"
  | "hold"
  | "offsides"
  | "play_on"
  | "possession"
  | "illegal_body_check"
  | "technical_foul"
  | "no_goal"
  | "goal"
  | "interference"
  | "illegal_screen"
  | "tripping"
  | "unsportsmanlike"
  | "warding"
  | "illegal_procedure"
  | "timeout"
  | "flag_down"
  | "stalling";

export type RuleCategory =
  | "personal_foul"
  | "technical_foul"
  | "procedural"
  | "faceoff"
  | "equipment"
  | "mechanics"
  | "stalling";

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

export const rules: Rule[] = [
  // ──────────────────────────────────────────────────────────────
  // PERSONAL FOULS (penalty box, 1–3 minutes)
  // ──────────────────────────────────────────────────────────────

  {
    id: "slashing",
    title: "Slashing",
    category: "personal_foul",
    whatYouSee:
      "A loud stick-on-body contact, a quick whistle, and usually a flag dropping to the ground.",
    whatItMeans:
      "Slashing is a hard, uncontrolled, or reckless stick swing that makes contact with an opponent's body. Not every loud stick sound is a slash — defenders are allowed to throw controlled stick checks at an opponent's stick or gloved hand on the stick. The call is about how the check was thrown, not just whether it made noise. A wild baseball-bat swing at a player's arm or back is the textbook version.",
    whatHappensNext:
      "The player who slashed goes to the penalty box for 1 minute. The other team gets the ball and plays with a one-man advantage until the time runs out or they score.",
    signal: "slash",
    relatedRuleIds: ["cross_check", "illegal_body_check", "unnecessary_roughness"],
  },

  {
    id: "cross_check",
    title: "Cross-check",
    category: "personal_foul",
    whatYouSee:
      "A defender hits an opponent using the shaft of the stick, with both hands clearly apart on the shaft.",
    whatItMeans:
      "A cross-check is when a player checks an opponent with the part of the stick between their hands — the shaft itself — instead of with the head of the stick. Because the shaft is rigid and the hands are braced, it's a harder, more dangerous check than a normal body check or stick check. The giveaway is seeing the defender's two hands spaced apart on the shaft as contact is made.",
    whatHappensNext:
      "1-minute penalty. The offending player goes to the box and their team plays a man down.",
    signal: "cross_check",
    relatedRuleIds: ["slashing", "illegal_body_check"],
  },

  {
    id: "illegal_body_check",
    title: "Illegal body check",
    category: "personal_foul",
    whatYouSee:
      "A big hit, often followed by a flag. The player who got hit may be slow to get up.",
    whatItMeans:
      "Body checking is legal in boys lacrosse, but only under specific conditions. A check becomes illegal if it's late (after the opponent has passed or released the ball), from behind, above the shoulders, below the waist, or delivered with excessive force. It's also illegal to check a player who doesn't have the ball and isn't within about five yards of a loose ball.",
    whatHappensNext:
      "1 to 3 minutes in the penalty box depending on how severe the ref considers the hit. More dangerous checks get longer penalties, and the worst ones can be non-releasable (see Dangerous contact).",
    signal: "illegal_body_check",
    relatedRuleIds: ["dangerous_contact", "defenseless_player", "legal_body_check", "unnecessary_roughness"],
  },

  {
    id: "unnecessary_roughness",
    title: "Unnecessary roughness",
    category: "personal_foul",
    whatYouSee:
      "A hit or check that looked legal in type but was unusually violent, or extra contact after a whistle.",
    whatItMeans:
      "This is the catch-all for contact that goes beyond what the game needs — a legal body check delivered way too hard, a shove after a whistle, or piling on at the end of a play. It exists so officials can penalize dangerous or aggressive behavior that doesn't fit neatly into the other foul categories.",
    whatHappensNext:
      "Typically a 1-minute personal foul. Severe cases can run 2–3 minutes and can be non-releasable.",
    signal: "illegal_body_check",
    relatedRuleIds: ["illegal_body_check", "dangerous_contact", "unsportsmanlike"],
  },

  {
    id: "tripping",
    title: "Tripping",
    category: "personal_foul",
    whatYouSee:
      "A player hits the ground after their legs get tangled with an opponent's stick or foot.",
    whatItMeans:
      "Tripping is using a stick, arm, leg, or foot to cause an opponent to lose their footing. It doesn't matter whether the player had the ball. The tripped player doesn't have to actually fall — the attempt is enough.",
    whatHappensNext:
      "Usually a 1-minute personal foul. Minor or incidental tripping can be called as a technical foul (30 seconds or turnover) instead, at the ref's discretion.",
    signal: "tripping",
    relatedRuleIds: ["hold", "interference"],
  },

  {
    id: "dangerous_contact",
    title: "Dangerous contact (head/neck)",
    category: "personal_foul",
    whatYouSee:
      "A check or hit that clearly made contact with an opponent's head or neck area. Often causes the player to stay down.",
    whatItMeans:
      "NFHS rules treat any forcible contact to the head or neck as one of the most serious fouls in the game. This applies whether the contact was with a stick, shoulder, or any other part of the body, and it applies even if the initial target was lower on the body.", // VERIFY — exact language has been updated recently
    whatHappensNext:
      "2 or 3 minutes in the penalty box, and the penalty is typically non-releasable — the player serves the full time even if the other team scores. Ejection is possible in severe cases.",
    signal: "illegal_body_check",
    relatedRuleIds: ["defenseless_player", "illegal_body_check", "unnecessary_roughness"],
  },

  {
    id: "defenseless_player",
    title: "Hit on a defenseless player",
    category: "personal_foul",
    whatYouSee:
      "A hard hit on a player who wasn't looking, had just released the ball, or was off-balance.",
    whatItMeans:
      "A defenseless player is someone who can't reasonably protect themselves — a shooter in follow-through, a player focused on catching a pass, a player whose head is down looking for a ground ball. NFHS rules specifically prohibit targeting these players with body checks, even if the check would otherwise be legal.", // VERIFY
    whatHappensNext:
      "2 to 3 minutes, often non-releasable. The offending player may also be ejected if the contact is severe.",
    signal: "illegal_body_check",
    relatedRuleIds: ["dangerous_contact", "illegal_body_check"],
  },

  {
    id: "unsportsmanlike",
    title: "Unsportsmanlike conduct",
    category: "personal_foul",
    whatYouSee:
      "A player arguing with a ref, taunting an opponent, or making a rude gesture. A whistle and a flag.",
    whatItMeans:
      "This covers arguing calls, profanity, baiting or taunting, and unsportsmanlike behavior by players or coaches. Officials have wide discretion to call this on anything they consider disrespectful to the game.",
    whatHappensNext:
      "1 to 3 minutes, and often non-releasable. A second unsportsmanlike against the same player or coach can result in ejection.",
    signal: "unsportsmanlike",
    relatedRuleIds: ["unnecessary_roughness"],
  },

  // ──────────────────────────────────────────────────────────────
  // TECHNICAL FOULS (30 seconds or turnover)
  // ──────────────────────────────────────────────────────────────

  {
    id: "push",
    title: "Push",
    category: "technical_foul",
    whatYouSee:
      "One player shoves another off-balance or from behind. Whistle, sometimes a flag.",
    whatItMeans:
      "A push is any shove to an opponent that's not part of a legal body check. The most common version is a defender shoving an offensive player from behind. Players are allowed to play physically with hands on the stick, but they're not allowed to shove with the hands, arms, or body.",
    whatHappensNext:
      "If the player being pushed had the ball, it's a 30-second penalty. If they didn't have the ball, it's usually just a turnover. The other team gets the ball at the spot.",
    signal: "push",
    relatedRuleIds: ["hold", "interference"],
  },

  {
    id: "hold",
    title: "Hold / Holding",
    category: "technical_foul",
    whatYouSee:
      "A whistle near a battle for position, often between a defender and an offensive player.",
    whatItMeans:
      "Holding is when a defender uses their hands, arms, or stick to restrain an opponent — grabbing a jersey, wrapping an arm, or clamping a stick onto an opponent's body to slow them down. Defenders are allowed to use their body to hold position, but they can't grab.",
    whatHappensNext:
      "30-second penalty if the player being held had the ball, otherwise usually a turnover.",
    signal: "hold",
    relatedRuleIds: ["push", "interference", "warding"],
  },

  {
    id: "interference",
    title: "Interference",
    category: "technical_foul",
    whatYouSee:
      "A whistle away from the ball. Two players who aren't involved in the play bumped or tangled.",
    whatItMeans:
      "Interference is when a player blocks or impedes an opponent who isn't within about five yards of a loose ball or isn't the one with the ball. In boys lacrosse, off-ball contact is restricted — you can't just run through an opponent because it would help your team.",
    whatHappensNext:
      "30-second penalty or turnover, depending on how it happened and who had the ball.",
    signal: "interference",
    relatedRuleIds: ["push", "hold", "illegal_screen"],
  },

  {
    id: "warding",
    title: "Warding off",
    category: "technical_foul",
    whatYouSee:
      "An offensive player with the ball uses their free arm to push a defender's stick away.",
    whatItMeans:
      "The player with the ball can't use their free hand or arm to push, hold, or control a defender or their stick. They can protect their stick with their body, but they can't actively ward off a check with their off-hand. This is a surprisingly common call and catches a lot of parents off guard because it looks so natural.",
    whatHappensNext:
      "Turnover. The other team gets the ball at the spot.",
    signal: "warding",
    relatedRuleIds: ["hold", "push"],
  },

  {
    id: "illegal_screen",
    title: "Illegal screen / moving pick",
    category: "technical_foul",
    whatYouSee:
      "An offensive player sets a pick and the defender bumps into them, then a whistle.",
    whatItMeans:
      "An offensive player can set a stationary screen to help a teammate get open. But if the screener is moving when contact happens, or if they stick out a hip or elbow, it's an illegal screen. Similar to basketball's moving-pick rule.",
    whatHappensNext:
      "Turnover. The other team gets the ball.",
    signal: "illegal_screen",
    relatedRuleIds: ["interference", "push"],
  },

  {
    id: "illegal_procedure",
    title: "Illegal procedure",
    category: "technical_foul",
    whatYouSee:
      "A whistle and a ref's arms crossed at the wrists. Often happens around substitutions, restarts, or faceoffs.",
    whatItMeans:
      "Illegal procedure is the catch-all technical foul for procedural mistakes — too many players on the field, an illegal substitution, a player entering the field from the wrong spot, or a bad restart. It's a paperwork foul more than a physical one.",
    whatHappensNext:
      "Usually a turnover. Sometimes a 30-second penalty if it gave the team an unfair advantage.",
    signal: "technical_foul",
    relatedRuleIds: ["offsides", "faceoff_situations"],
  },

  // ──────────────────────────────────────────────────────────────
  // PROCEDURAL / TURNOVER
  // ──────────────────────────────────────────────────────────────

  {
    id: "offsides",
    title: "Offsides",
    category: "procedural",
    whatYouSee:
      "A quick whistle with no contact. Possession flips. Often happens during a clear or a fast break.",
    whatItMeans:
      "Each team must keep a minimum number of players on each side of the midfield line at all times — four on the defensive side (3 defenders + goalie) and three on the offensive side. If too many players cross the midline, it's offsides. The most common cause is a defender jumping up to join a fast break without a teammate dropping back.",
    whatHappensNext:
      "Turnover. The other team gets the ball at the center of the field.",
    signal: "offsides",
    relatedRuleIds: ["illegal_procedure"],
  },

  {
    id: "crease_violation",
    title: "Crease violation",
    category: "procedural",
    whatYouSee:
      "A goal gets waved off, or a whistle near the net right after a shot or a scrum.",
    whatItMeans:
      "Only the goalie is allowed inside the circle around the goal (the crease). If an offensive player steps in the crease — even with just a foot — any shot they take or any goal their team scores on that play is waved off. It doesn't matter whether they were pushed in.",
    whatHappensNext:
      "No goal. The ball goes to the goalie for a free clear.",
    signal: "no_goal",
    relatedRuleIds: ["no_goal_overview", "goal_signal"],
  },

  {
    id: "out_of_bounds",
    title: "Out of bounds",
    category: "procedural",
    whatYouSee:
      "A whistle and the ref points toward one team's goal to show possession.",
    whatItMeans:
      "When the ball or a player carrying the ball goes out of bounds, possession goes to the team that didn't touch it last. The exception is on a shot: if the ball goes out of bounds after a shot on goal, possession goes to whichever player was closest to the ball when it went out, regardless of team. This is why you'll see players sprint to back up their own team's shots — they're positioning to recover possession if it misses.",
    whatHappensNext:
      "The team awarded possession restarts play from the spot where the ball went out.",
    signal: "possession",
    relatedRuleIds: ["possession_direction"],
  },

  {
    id: "failure_to_advance",
    title: "Failure to advance",
    category: "procedural",
    whatYouSee:
      "A whistle during a clear, and possession flips. The defense hadn't done anything obviously wrong.",
    whatItMeans:
      "The team with the ball has time limits to move it up the field. After gaining possession in their defensive end, they have 20 seconds to get the ball across the midfield line, then another 10 seconds to get it into the offensive restraining box. If they don't meet either deadline, they lose the ball.", // VERIFY — shot clock / advance rules have been updated in recent seasons
    whatHappensNext:
      "Turnover at the spot of the ball when the time expired.",
    signal: "technical_foul",
    relatedRuleIds: ["stalling_situations", "offsides"],
  },

  // ──────────────────────────────────────────────────────────────
  // FACEOFF FAMILY (one page)
  // ──────────────────────────────────────────────────────────────

  {
    id: "faceoff_situations",
    title: "Faceoff situations",
    category: "faceoff",
    whatYouSee:
      "The ref keeps resetting the faceoff, moving players around, or eventually awarding the ball without a faceoff at all.",
    whatItMeans:
      "Faceoffs have strict setup rules, and JV games especially can get messy when players are still learning them. Common issues: a player moves before the whistle (false start), the stick or hands aren't positioned correctly, a wing player leaves the wing line too early, or the faceoff taker's body position is illegal. Officials can also call delay of game if a faceoff taker repeatedly asks for stick or position adjustments — recent rules changes specifically allow refs to award the ball to the opponent if a player is stalling the faceoff with repeated adjustments.", // VERIFY — this is the newer NFHS interpretation
    whatHappensNext:
      "A single violation usually results in the other team getting the ball. Repeated violations by the same player can become a 30-second technical foul or a delay-of-game call that awards the ball outright.",
    signal: "technical_foul",
    relatedRuleIds: ["illegal_procedure", "stalling_situations"],
  },

  // ──────────────────────────────────────────────────────────────
  // EQUIPMENT
  // ──────────────────────────────────────────────────────────────

  {
    id: "helmet_off",
    title: "Helmet came off",
    category: "equipment",
    whatYouSee:
      "A player's helmet flies off during play. The ref blows the whistle right away.",
    whatItMeans:
      "Player safety rules require an immediate whistle when a helmet comes off, regardless of how it happened. The player whose helmet came off has to leave the field and can't return until the next dead ball. This is a safety rule, not a penalty — no one gets a penalty just because a helmet came off.",
    whatHappensNext:
      "Play stops. The affected player substitutes out. Possession usually goes to whichever team had it when the whistle blew. If the helmet came off because of a foul, the foul is still called.",
    relatedRuleIds: ["broken_stick", "illegal_crosse"],
  },

  {
    id: "broken_stick",
    title: "Broken stick",
    category: "equipment",
    whatYouSee:
      "A player's stick snaps during a check, a ground ball, or a shot. Play usually continues.",
    whatItMeans:
      "A broken stick isn't a penalty — equipment breaks. If a player's stick breaks, they can't keep playing with it, but they also don't have to stop play immediately. They typically sub off at the next opportunity. If a defender loses their long stick during play, the team has to sub them out at the next dead ball or play with a shorter stick until they can.",
    whatHappensNext:
      "Play continues. The player with the broken stick heads to the sideline to substitute. If play needs to stop for safety reasons — pieces on the field — the ref blows the whistle and handles it as a dead ball.",
    relatedRuleIds: ["helmet_off", "illegal_crosse", "stick_check"],
  },

  {
    id: "stick_check",
    title: "Stick check",
    category: "equipment",
    whatYouSee:
      "During a stoppage, a ref measures or inspects a player's stick. A coach may have requested it.",
    whatItMeans:
      "A coach can ask the ref to inspect an opposing player's stick at specific points in the game — usually after a goal is scored. The ref checks whether the stick meets the rules: head shape, pocket depth, string setup. If the stick is illegal, the player is penalized.",
    whatHappensNext:
      "If the stick is legal, nothing happens. If the stick is illegal, it's a personal foul (1–3 minutes, often non-releasable) and the stick is removed from play. If the check was requested and the stick was legal, the requesting team is sometimes assessed a penalty for a bad request.", // VERIFY — specifics vary
    relatedRuleIds: ["illegal_crosse", "broken_stick"],
  },

  {
    id: "mouthguard",
    title: "Mouthguard",
    category: "equipment",
    whatYouSee:
      "A ref tells a player to put their mouthguard in, or calls a penalty if they keep playing without it.",
    whatItMeans:
      "Mouthguards are required equipment. A player has to have it in their mouth during play. Chewing it, wearing it around the neck, or not wearing it at all is a violation. The first instance is usually a warning; repeated violations become a penalty.",
    whatHappensNext:
      "Typically a 30-second technical foul after a warning. Repeated offenses can escalate.",
    relatedRuleIds: ["helmet_off", "illegal_crosse"],
  },

  {
    id: "illegal_crosse",
    title: "Illegal crosse (stick)",
    category: "equipment",
    whatYouSee:
      "After a stick check, the ref rules the stick illegal and the player goes to the box.",
    whatItMeans:
      "Sticks have to meet specific rules: head dimensions, pocket depth (the ball can't sit too low), and legal stringing. An illegal stick gives the player an unfair advantage — a deep pocket, for example, makes the ball much harder for a defender to check out. Illegal sticks are typically discovered through a coach-requested stick check.",
    whatHappensNext:
      "1 to 3 minutes in the penalty box, often non-releasable. The stick is removed from play.",
    relatedRuleIds: ["stick_check", "broken_stick"],
  },

  // ──────────────────────────────────────────────────────────────
  // MECHANICS (what the ref is doing)
  // ──────────────────────────────────────────────────────────────

  {
    id: "play_on",
    title: "Play-on",
    category: "mechanics",
    whatYouSee:
      "The ref waves their arms back and forth and yells 'play-on!' Play keeps going.",
    whatItMeans:
      "A play-on means the ref saw a small foul but stopping play would hurt the team that got fouled. Rather than blow the whistle, the ref lets play continue so the fouled team keeps whatever advantage they had. Once the advantage ends, the ref may come back and address the foul or just let it go.",
    whatHappensNext:
      "Play continues. If the advantage pays off (a goal, a clear completion), the foul is typically waved off. If the advantage is lost, the ref can still call the foul after the fact.",
    signal: "play_on",
    relatedRuleIds: ["flag_down", "disregard_flag"],
  },

  {
    id: "flag_down",
    title: "Flag down / slow whistle",
    category: "mechanics",
    whatYouSee:
      "A flag is on the ground but play keeps going. Eventually a whistle blows and a player goes to the box.",
    whatItMeans:
      "When the defense commits a penalty while the offense has the ball and a scoring chance, the ref drops a flag but doesn't blow the whistle. This lets the offense try to score — if they make it, great; if they don't, the whistle blows when the chance ends and the penalty is still assessed. The rule exists so the defense can't 'save' a goal by committing a foul.",
    whatHappensNext:
      "The whistle blows once the offensive possession ends (a goal, a save, a missed shot going out of bounds, or the offense loses the ball). Then the penalized defender goes to the box and the offense keeps possession.",
    signal: "flag_down",
    relatedRuleIds: ["play_on", "disregard_flag"],
  },

  {
    id: "goal_signal",
    title: "Goal",
    category: "mechanics",
    whatYouSee:
      "The ref points at the goal with both hands.",
    whatItMeans:
      "The shot counted. The ball fully crossed the goal line inside the goal and no rule was violated on the play (no crease violation, no foul by the offense).",
    whatHappensNext:
      "One point added to the scoring team. Play restarts with a faceoff at the center of the field.",
    signal: "goal",
    relatedRuleIds: ["no_goal", "crease_violation"],
  },

  {
    id: "no_goal",
    title: "No goal",
    category: "mechanics",
    whatYouSee:
      "The ref crosses their arms and waves them apart horizontally. The ball was in the net, but it doesn't count.",
    whatItMeans:
      "The shot didn't count. Most common reasons: an offensive player was in the crease, a foul happened before the shot, the ball didn't fully cross the line, or time expired before the ball went in. The ref will typically give a secondary signal showing why.",
    whatHappensNext:
      "Depends on why. A crease violation gives the ball to the goalie. A foul before the shot is handled like any other foul. An out-of-bounds after a shot follows the shot-possession rule (nearest player gets it).",
    signal: "no_goal",
    relatedRuleIds: ["crease_violation", "goal_signal", "no_goal_overview"],
  },

  {
    id: "possession_direction",
    title: "Possession / direction",
    category: "mechanics",
    whatYouSee:
      "The ref extends an arm horizontally and points toward one team's goal.",
    whatItMeans:
      "This is the signal that shows which way the ball is going. The ref points toward the goal the team with possession is attacking. It's used after out-of-bounds, after penalties, and anywhere possession changes.",
    whatHappensNext:
      "Play restarts with the ball going to the team the ref is pointing toward.",
    signal: "possession",
    relatedRuleIds: ["out_of_bounds"],
  },

  {
    id: "timeout",
    title: "Timeout",
    category: "mechanics",
    whatYouSee:
      "A ref forms a T with their hands and play stops.",
    whatItMeans:
      "A coach called a timeout, or the officials called an official timeout (for an injury, equipment issue, or game management). Each team gets a limited number of coach-called timeouts per game.",
    whatHappensNext:
      "Play stops. Players head to their benches. Play restarts with possession going to whichever team had it when the timeout was called (or via faceoff if no one had clear possession).",
    signal: "timeout",
  },

  {
    id: "disregard_flag",
    title: "Disregard flag",
    category: "mechanics",
    whatYouSee:
      "A flag was on the ground, but after the play ended the ref waves it off and nothing happens.",
    whatItMeans:
      "Sometimes a flag gets thrown during a play but the situation resolves in a way that makes the penalty unnecessary — the fouled team scores, or a second foul offsets the first, or the ref decides the advantage played out fully. In those cases, the ref can disregard the flag.",
    whatHappensNext:
      "No penalty. Play continues from wherever the ball ended up when the whistle blew.",
    relatedRuleIds: ["play_on", "flag_down"],
  },

  {
    id: "legal_contact",
    title: "Legal contact (why no call)",
    category: "mechanics",
    whatYouSee:
      "Two players made hard contact and you expected a whistle, but nothing happened.",
    whatItMeans:
      "Boys lacrosse is a contact sport. A lot of contact that looks like it should be a foul is completely legal: body checks within five yards of a loose ball, stick checks on an opponent's stick or gloved hand, shoulder-to-shoulder position battles, and incidental contact during normal play. If the contact was within the rules, there's no call — even if it was loud.",
    whatHappensNext:
      "Play continues.",
    relatedRuleIds: ["legal_body_check", "slashing", "push"],
  },

  {
    id: "legal_body_check",
    title: "Legal body check",
    category: "mechanics",
    whatYouSee:
      "A defender hits an offensive player with their shoulder and it wasn't called a foul.",
    whatItMeans:
      "Defenders can body check an opponent who has the ball or is within about five yards of a loose ball. The check has to be from the front or side (not behind), between the shoulders and the waist, with the hands on the stick, and not delivered with excessive force. When all those boxes are checked, it's completely legal no matter how hard the hit was.",
    whatHappensNext:
      "Play continues.",
    relatedRuleIds: ["illegal_body_check", "legal_contact", "dangerous_contact"],
  },

  // ──────────────────────────────────────────────────────────────
  // STALLING FAMILY (one page)
  // ──────────────────────────────────────────────────────────────

  {
    id: "stalling_situations",
    title: "Stalling & keep-it-in",
    category: "stalling",
    whatYouSee:
      "The offense passes the ball around without trying to attack. The ref may yell 'get it in!' or make a stalling signal.",
    whatItMeans:
      "Lacrosse rules push teams to actually try to score rather than just run out the clock. A few related situations come up here. First, if the ref thinks the offense is stalling, they can issue a stall warning — the team then has to keep the ball inside the offensive box (the marked rectangle around the goal). Second, inside the final two minutes of a close game, the team with the lead is automatically required to 'keep it in.' Third, if a team loses the ball outside the box during a keep-it-in, it's a turnover.", // VERIFY — the two-minute / automatic keep-it-in rule has specific triggers about score margin
    whatHappensNext:
      "A stall warning itself isn't a penalty — it's a warning. But if the team leaves the box after being warned, it's a turnover. Repeated stalling can also be called as illegal procedure.",
    signal: "stalling",
    relatedRuleIds: ["failure_to_advance", "illegal_procedure"],
  },

  // ──────────────────────────────────────────────────────────────
  // OVERVIEW PAGES (used by the "by length" branch)
  // ──────────────────────────────────────────────────────────────

  {
    id: "technical_foul_overview",
    title: "Technical fouls (30-second penalties)",
    category: "technical_foul",
    whatYouSee:
      "A player goes to the penalty box for 30 seconds, or the ball changes hands without anyone going to the box.",
    whatItMeans:
      "Technical fouls are smaller rule violations. If the fouled team had the ball, it's usually a turnover. If the fouled team didn't have the ball, it's a 30-second penalty and the fouling team plays a man down. The most common technical fouls are push, hold, interference, warding off, illegal screen, illegal procedure, and offsides.",
    whatHappensNext:
      "Either a 30-second box penalty or a turnover, depending on who had the ball when the foul happened.",
    relatedRuleIds: ["push", "hold", "interference", "warding", "illegal_screen", "illegal_procedure", "offsides"],
  },

  {
    id: "personal_foul_one_minute",
    title: "Personal fouls (1 minute)",
    category: "personal_foul",
    whatYouSee:
      "A player goes to the penalty box for 1 minute.",
    whatItMeans:
      "Standard personal fouls carry a 1-minute penalty. The most common ones are slashing, cross-check, standard illegal body check, and unnecessary roughness. The penalized player's team plays a man down until the penalty expires or the other team scores.",
    whatHappensNext:
      "The player serves 1 minute in the box. Most 1-minute penalties are releasable — the player can come out early if the opposing team scores during the penalty.",
    relatedRuleIds: ["slashing", "cross_check", "illegal_body_check", "unnecessary_roughness"],
  },

  {
    id: "personal_foul_severe",
    title: "Severe personal fouls (2–3 minutes)",
    category: "personal_foul",
    whatYouSee:
      "A player goes to the penalty box for 2 or 3 minutes, and they may not come out even if the other team scores.",
    whatItMeans:
      "The most serious personal fouls carry longer penalties. These include dangerous contact to the head or neck, hits on defenseless players, the worst illegal body checks, and serious unsportsmanlike conduct. These penalties are typically non-releasable — the player serves the full time no matter what happens, and multiple goals can be scored against their team during the penalty.",
    whatHappensNext:
      "The player serves the full 2 or 3 minutes. Ejection is possible for the most severe cases, especially dangerous contact to the head.",
    relatedRuleIds: ["dangerous_contact", "defenseless_player", "illegal_body_check", "unsportsmanlike"],
  },

  {
    id: "no_goal_overview",
    title: "Why a goal might not count",
    category: "mechanics",
    whatYouSee:
      "The ball went in the net, but the ref is waving no-goal.",
    whatItMeans:
      "Several things can wave off a goal. The most common are: an offensive player stepped in the crease, an offensive foul happened before the shot (a push or warding), time expired before the ball crossed the line, or the ball didn't fully cross the goal line. The ref will usually signal the specific reason after the wave-off.",
    whatHappensNext:
      "Depends on the reason. Crease violations give the ball to the goalie. Offensive fouls become turnovers. Time expiration just ends the period.",
    signal: "no_goal",
    relatedRuleIds: ["crease_violation", "goal_signal", "no_goal", "warding"],
  },

  // ──────────────────────────────────────────────────────────────
  // EDGE CASE
  // ──────────────────────────────────────────────────────────────

  {
    id: "matching_fouls",
    title: "Matching fouls (both teams flagged)",
    category: "mechanics",
    whatYouSee:
      "Multiple flags on the ground. Players from both teams go to the penalty box at the same time.",
    whatItMeans:
      "When players on both teams commit fouls on the same play, the penalties are called matching or offsetting fouls. The players serve their time simultaneously, which means the teams play even-strength (both down one player) instead of anyone getting a man-up advantage.",
    whatHappensNext:
      "Both players serve their penalties at the same time. Possession usually goes to whichever team had the ball when the whistle blew, or via faceoff if neither clearly had it.",
    relatedRuleIds: ["flag_down", "play_on"],
  },
];

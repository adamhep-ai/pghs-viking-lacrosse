// /src/data/tree.ts
//
// The decision tree structure. Each node is one screen.
// No parentId — back navigation uses the session history stack (see /lib/history.ts).

export type TreeButton = {
  label: string;
  goesTo:
    | { type: "node"; nodeId: string }
    | { type: "rule"; ruleId: string };
};

export type TreeNode = {
  id: string;
  question: string;
  buttons: TreeButton[];
};

export const ROOT_NODE_ID = "root";

export const tree: Record<string, TreeNode> = {
  // ────────────────────────────────────────────────────────────
  // ROOT
  // ────────────────────────────────────────────────────────────
  root: {
    id: "root",
    question: "What did you just see?",
    buttons: [
      { label: "A player went to the penalty box", goesTo: { type: "node", nodeId: "penalty_box" } },
      { label: "A flag is on the ground", goesTo: { type: "node", nodeId: "flag_on_ground" } },
      { label: "Something happened at the goal", goesTo: { type: "node", nodeId: "goal_event" } },
      { label: "The ball changed teams but nobody went to the box", goesTo: { type: "node", nodeId: "ball_changed_teams" } },
      { label: "Play didn't stop when I expected it to", goesTo: { type: "node", nodeId: "play_continued" } },
      { label: "The faceoff keeps getting reset", goesTo: { type: "rule", ruleId: "faceoff_situations" } },
      { label: "A stick broke or a helmet came off", goesTo: { type: "node", nodeId: "equipment_event" } },
      { label: "The team is just holding the ball", goesTo: { type: "rule", ruleId: "stalling_situations" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 1 — PENALTY BOX
  // ────────────────────────────────────────────────────────────
  penalty_box: {
    id: "penalty_box",
    question: "How do you want to narrow it down?",
    buttons: [
      { label: "By what you saw the player do", goesTo: { type: "node", nodeId: "penalty_by_action" } },
      { label: "By how long the penalty is", goesTo: { type: "node", nodeId: "penalty_by_length" } },
    ],
  },

  penalty_by_action: {
    id: "penalty_by_action",
    question: "What did you see the player do?",
    buttons: [
      { label: "Swung the stick hard", goesTo: { type: "rule", ruleId: "slashing" } },
      { label: "Check with two hands on the shaft", goesTo: { type: "rule", ruleId: "cross_check" } },
      { label: "Big body hit", goesTo: { type: "node", nodeId: "body_check_detail" } },
      { label: "Shoved an opponent", goesTo: { type: "rule", ruleId: "push" } },
      { label: "Grabbed or tackled an opponent", goesTo: { type: "node", nodeId: "grab_detail" } },
      { label: "Yelled at a ref or opponent", goesTo: { type: "rule", ruleId: "unsportsmanlike" } },
    ],
  },

  body_check_detail: {
    id: "body_check_detail",
    question: "What kind of hit was it?",
    buttons: [
      { label: "Late (after the player released the ball)", goesTo: { type: "rule", ruleId: "illegal_body_check" } },
      { label: "From behind", goesTo: { type: "rule", ruleId: "illegal_body_check" } },
      { label: "To the head or neck", goesTo: { type: "rule", ruleId: "dangerous_contact" } },
      { label: "On a player not looking at the ball", goesTo: { type: "rule", ruleId: "defenseless_player" } },
      { label: "Just a hard but clean hit", goesTo: { type: "rule", ruleId: "legal_body_check" } },
    ],
  },

  grab_detail: {
    id: "grab_detail",
    question: "What did it look like?",
    buttons: [
      { label: "Grabbed the opponent's body or stick", goesTo: { type: "rule", ruleId: "hold" } },
      { label: "Tripped with a stick or foot", goesTo: { type: "rule", ruleId: "tripping" } },
      { label: "Blocked an opponent who didn't have the ball", goesTo: { type: "rule", ruleId: "interference" } },
    ],
  },

  penalty_by_length: {
    id: "penalty_by_length",
    question: "How long is the penalty?",
    buttons: [
      { label: "30 seconds", goesTo: { type: "rule", ruleId: "technical_foul_overview" } },
      { label: "1 minute", goesTo: { type: "rule", ruleId: "personal_foul_one_minute" } },
      { label: "2–3 minutes", goesTo: { type: "rule", ruleId: "personal_foul_severe" } },
      { label: "I'm not sure", goesTo: { type: "node", nodeId: "penalty_by_action" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 3 — FLAG ON THE GROUND
  // ────────────────────────────────────────────────────────────
  flag_on_ground: {
    id: "flag_on_ground",
    question: "Is play still going?",
    buttons: [
      { label: "Yes, they're still playing", goesTo: { type: "rule", ruleId: "flag_down" } },
      { label: "No, whistle blew", goesTo: { type: "node", nodeId: "flag_then_whistle" } },
    ],
  },

  flag_then_whistle: {
    id: "flag_then_whistle",
    question: "How many flags did you see?",
    buttons: [
      { label: "One flag", goesTo: { type: "node", nodeId: "penalty_by_action" } },
      { label: "Multiple flags", goesTo: { type: "rule", ruleId: "matching_fouls" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 4 — SOMETHING AT THE GOAL
  // ────────────────────────────────────────────────────────────
  goal_event: {
    id: "goal_event",
    question: "What happened?",
    buttons: [
      { label: "The goal counted", goesTo: { type: "rule", ruleId: "goal_signal" } },
      { label: "The goal was waved off", goesTo: { type: "node", nodeId: "no_goal_reason" } },
      { label: "I saw a shot but I'm not sure if it counted", goesTo: { type: "rule", ruleId: "no_goal_overview" } },
    ],
  },

  no_goal_reason: {
    id: "no_goal_reason",
    question: "Why was it waved off?",
    buttons: [
      { label: "Player stepped in the crease", goesTo: { type: "rule", ruleId: "crease_violation" } },
      { label: "Player was already in the crease", goesTo: { type: "rule", ruleId: "crease_violation" } },
      { label: "Whistle blew before the shot", goesTo: { type: "node", nodeId: "penalty_by_action" } },
      { label: "I don't know", goesTo: { type: "rule", ruleId: "no_goal_overview" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 5 (NEW) — BALL CHANGED TEAMS WITHOUT A PENALTY
  // ────────────────────────────────────────────────────────────
  ball_changed_teams: {
    id: "ball_changed_teams",
    question: "Where on the field did it happen?",
    buttons: [
      { label: "Near the goal the offense was attacking", goesTo: { type: "node", nodeId: "ball_changed_near_goal" } },
      { label: "In open field or a scrum for a loose ball", goesTo: { type: "node", nodeId: "ball_changed_open_field" } },
      { label: "Near midfield or during a clear", goesTo: { type: "node", nodeId: "ball_changed_midfield" } },
      { label: "On a faceoff", goesTo: { type: "rule", ruleId: "faceoff_situations" } },
      { label: "Ref had a hand on hip, then dropped it", goesTo: { type: "rule", ruleId: "failure_to_advance" } },
    ],
  },

  ball_changed_near_goal: {
    id: "ball_changed_near_goal",
    question: "What did it look like?",
    buttons: [
      { label: "Offensive player stepped in the crease", goesTo: { type: "rule", ruleId: "crease_violation" } },
      { label: "Offensive player shoved a defender", goesTo: { type: "rule", ruleId: "push" } },
      { label: "Offensive player used a free hand to push off", goesTo: { type: "rule", ruleId: "warding" } },
      { label: "Offensive player set a moving screen", goesTo: { type: "rule", ruleId: "illegal_screen" } },
    ],
  },

  ball_changed_open_field: {
    id: "ball_changed_open_field",
    question: "What did you see?",
    buttons: [
      { label: "A player held or grabbed another player", goesTo: { type: "rule", ruleId: "hold" } },
      { label: "A player shoved another player", goesTo: { type: "rule", ruleId: "push" } },
      { label: "A player blocked someone not near the ball", goesTo: { type: "rule", ruleId: "interference" } },
      { label: "A ball-carrier used a free arm to clear space", goesTo: { type: "rule", ruleId: "warding" } },
      { label: "A player set a moving screen / pick", goesTo: { type: "rule", ruleId: "illegal_screen" } },
      { label: "Ref rolled their hands (stick / equipment)", goesTo: { type: "rule", ruleId: "illegal_procedure" } },
    ],
  },

  ball_changed_midfield: {
    id: "ball_changed_midfield",
    question: "What was the call?",
    buttons: [
      { label: "Ref's arms straight out to the sides", goesTo: { type: "rule", ruleId: "offsides" } },
      { label: "Hand on hip, then dropped — failure to advance", goesTo: { type: "rule", ruleId: "failure_to_advance" } },
      { label: "Ball went out — pointed to the sideline", goesTo: { type: "rule", ruleId: "out_of_bounds" } },
      { label: "Ball looked fine but possession flipped", goesTo: { type: "rule", ruleId: "failure_to_advance" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 6 — PLAY DIDN'T STOP
  // ────────────────────────────────────────────────────────────
  play_continued: {
    id: "play_continued",
    question: "What did you see?",
    buttons: [
      { label: "Ref waved arms and yelled \"play-on\"", goesTo: { type: "rule", ruleId: "play_on" } },
      { label: "Flag on the ground but they kept playing", goesTo: { type: "rule", ruleId: "flag_down" } },
      { label: "Contact happened but no call", goesTo: { type: "rule", ruleId: "legal_contact" } },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // BRANCH 7 — STICK OR HELMET
  // ────────────────────────────────────────────────────────────
  equipment_event: {
    id: "equipment_event",
    question: "Which one?",
    buttons: [
      { label: "A helmet came off", goesTo: { type: "rule", ruleId: "helmet_off" } },
      { label: "A stick broke", goesTo: { type: "rule", ruleId: "broken_stick" } },
      { label: "Ref checked a player's stick", goesTo: { type: "rule", ruleId: "stick_check" } },
      { label: "Something about a mouthguard", goesTo: { type: "rule", ruleId: "mouthguard" } },
    ],
  },
};

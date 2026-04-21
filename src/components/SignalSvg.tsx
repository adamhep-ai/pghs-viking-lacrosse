import type { SignalName } from "../data/rules";

type Props = {
  name: SignalName;
  size?: number;
  className?: string;
};

const SIGNAL_LABELS: Record<SignalName, string> = {
  slash: "Slashing signal",
  cross_check: "Cross-check signal",
  push: "Push signal",
  hold: "Hold signal",
  offsides: "Offsides signal",
  play_on: "Play-on signal",
  possession: "Possession direction signal",
  illegal_body_check: "Illegal body check signal",
  technical_foul: "Technical foul signal",
  no_goal: "No goal signal",
  goal: "Goal signal",
  interference: "Interference signal",
  illegal_screen: "Illegal screen signal",
  tripping: "Tripping signal",
  unsportsmanlike: "Unsportsmanlike conduct signal",
  warding: "Warding signal",
  illegal_procedure: "Illegal procedure signal",
  timeout: "Timeout signal",
  flag_down: "Flag-down signal",
  stalling: "Stalling signal",
};

// Shared head + torso. Each signal overrides or adds the arm/leg positions.
const HEAD = <circle cx="60" cy="22" r="8" fill="none" />;
const TORSO = <line x1="60" y1="30" x2="60" y2="70" />;

export function SignalSvg({ name, size = 96, className }: Props) {
  const label = SIGNAL_LABELS[name];
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {renderSignal(name)}
    </svg>
  );
}

function renderSignal(name: SignalName) {
  switch (name) {
    case "slash":
      // One arm raised high, chopping down across the body
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="40" x2="90" y2="15" />
          <line x1="90" y1="15" x2="35" y2="55" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "cross_check":
      // Two fists forward, forearms parallel, pushing motion
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="85" y2="42" />
          <line x1="85" y1="42" x2="100" y2="50" />
          <line x1="60" y1="52" x2="85" y2="52" />
          <line x1="85" y1="52" x2="100" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "push":
      // One arm extended straight, palm forward
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="100" y2="42" />
          <circle cx="103" cy="42" r="4" />
          <line x1="60" y1="50" x2="40" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "hold":
      // Both fists closed in front, grabbing
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="40" x2="45" y2="55" />
          <line x1="60" y1="40" x2="75" y2="55" />
          <circle cx="42" cy="58" r="5" />
          <circle cx="78" cy="58" r="5" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "offsides":
      // Both arms extended straight out to sides
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="15" y1="42" x2="105" y2="42" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "play_on":
      // Both arms swinging horizontally — motion indicator lines
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="40" x2="30" y2="50" />
          <line x1="60" y1="40" x2="90" y2="50" />
          <line x1="20" y1="55" x2="35" y2="55" />
          <line x1="85" y1="55" x2="100" y2="55" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "possession":
      // One arm extended, pointing — with arrow tip
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="105" y2="35" />
          <line x1="98" y1="30" x2="105" y2="35" />
          <line x1="98" y1="40" x2="105" y2="35" />
          <line x1="60" y1="50" x2="40" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "illegal_body_check":
      // One hand on hip, other arm straight out
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="40" y2="58" />
          <line x1="40" y1="58" x2="55" y2="65" />
          <line x1="60" y1="45" x2="100" y2="45" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "technical_foul":
      // Arms crossed at wrists above head
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="30" x2="40" y2="8" />
          <line x1="60" y1="30" x2="80" y2="8" />
          <line x1="50" y1="18" x2="70" y2="18" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "no_goal":
      // Arms sweeping outward, hands apart — two horizontal strokes
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="45" x2="20" y2="60" />
          <line x1="60" y1="45" x2="100" y2="60" />
          <line x1="15" y1="55" x2="25" y2="65" />
          <line x1="95" y1="65" x2="105" y2="55" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "goal":
      // Both arms raised straight up
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="30" x2="45" y2="5" />
          <line x1="60" y1="30" x2="75" y2="5" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "interference":
      // Crossed forearms in front of chest
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="45" y1="42" x2="75" y2="60" />
          <line x1="75" y1="42" x2="45" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "illegal_screen":
      // Stationary stance — legs spread, hands on hips
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="45" x2="42" y2="58" />
          <line x1="60" y1="45" x2="78" y2="58" />
          <line x1="42" y1="58" x2="52" y2="65" />
          <line x1="78" y1="58" x2="68" y2="65" />
          <line x1="60" y1="70" x2="30" y2="100" />
          <line x1="60" y1="70" x2="90" y2="100" />
        </g>
      );

    case "tripping":
      // One leg sweeping across low
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="45" x2="40" y2="55" />
          <line x1="60" y1="45" x2="80" y2="55" />
          <line x1="60" y1="70" x2="50" y2="95" />
          <line x1="60" y1="70" x2="95" y2="100" />
          <line x1="95" y1="100" x2="105" y2="95" />
        </g>
      );

    case "unsportsmanlike":
      // One fist on hip, other arm pointing out and down
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="40" y2="58" />
          <line x1="40" y1="58" x2="55" y2="65" />
          <line x1="60" y1="42" x2="100" y2="55" />
          <line x1="95" y1="50" x2="100" y2="55" />
          <line x1="100" y1="55" x2="95" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "warding":
      // Free arm swinging across body
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="35" y2="60" />
          <line x1="60" y1="45" x2="85" y2="38" />
          <path d="M 60 45 Q 75 55 90 50" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "illegal_procedure":
      // Two rolling/circling hands
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="42" x2="45" y2="52" />
          <line x1="60" y1="42" x2="75" y2="52" />
          <circle cx="38" cy="55" r="8" />
          <circle cx="82" cy="55" r="8" />
          <path d="M 32 50 A 8 8 0 0 1 44 60" />
          <path d="M 76 50 A 8 8 0 0 1 88 60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "timeout":
      // Hands forming a T
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="25" y1="38" x2="95" y2="38" />
          <line x1="60" y1="38" x2="60" y2="15" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "flag_down":
      // One arm straight down, pointing at ground
      return (
        <g>
          {HEAD}
          {TORSO}
          <line x1="60" y1="45" x2="40" y2="60" />
          <line x1="60" y1="45" x2="95" y2="65" />
          <line x1="95" y1="65" x2="98" y2="100" />
          <line x1="94" y1="95" x2="98" y2="100" />
          <line x1="102" y1="95" x2="98" y2="100" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );

    case "stalling":
      // One arm circling overhead (winding/stirring motion)
      return (
        <g>
          {HEAD}
          {TORSO}
          <circle cx="78" cy="18" r="12" />
          <line x1="60" y1="32" x2="70" y2="25" />
          <line x1="60" y1="50" x2="40" y2="60" />
          <line x1="60" y1="70" x2="45" y2="95" />
          <line x1="60" y1="70" x2="75" y2="95" />
        </g>
      );
  }
}

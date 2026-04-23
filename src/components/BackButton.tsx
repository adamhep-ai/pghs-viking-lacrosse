import { useNavigate } from "react-router-dom";
import { clearHistory, popHistory } from "../lib/history";

type BackProps = {
  variant?: "default" | "ghost";
  label?: string;
};

export function BackButton({ variant = "default", label = "← Back" }: BackProps) {
  const navigate = useNavigate();

  const onClick = () => {
    const prev = popHistory();
    navigate(prev ?? "/", { replace: true });
  };

  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium";
  const styles =
    variant === "ghost"
      ? `${base} text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light`
      : `${base} bg-white border border-team-grey-light text-team-blue-dark hover:bg-team-blue-light`;

  return (
    <button type="button" onClick={onClick} className={styles}>
      {label}
    </button>
  );
}

type StartOverProps = {
  label?: string;
  to?: string;
};

export function StartOverButton({ label = "Start over", to = "/" }: StartOverProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        clearHistory();
        navigate(to, { replace: true });
      }}
      className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
    >
      {label}
    </button>
  );
}

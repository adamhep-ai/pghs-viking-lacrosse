import { Link, useNavigate } from "react-router-dom";
import type { TreeNode as TreeNodeData } from "../data/tree";
import { ROOT_NODE_ID } from "../data/tree";

type Props = { node: TreeNodeData };

export function TreeNode({ node }: Props) {
  const navigate = useNavigate();

  // Tree interactions replace the current history entry instead of pushing
  // a new one, so the browser back button exits the app in a single tap.
  // The in-app "← Back" button uses the sessionStorage trail (see /lib/history.ts).
  const go = (button: TreeNodeData["buttons"][number]) => {
    const opts = { replace: true };
    switch (button.goesTo.type) {
      case "node":
        navigate(`/t/${button.goesTo.nodeId}`, opts);
        return;
      case "rule":
        navigate(`/r/${button.goesTo.ruleId}`, opts);
        return;
      case "signal_grid":
        navigate("/t/signals", opts);
        return;
      case "lifeline":
        navigate("/t/common", opts);
        return;
    }
  };

  const isRoot = node.id === ROOT_NODE_ID;

  // On the root node the lifeline option appears as a full button (it's a
  // first-class entry point). On interior nodes we tuck it into a subtle
  // footer link so every path has an escape hatch.
  const primaryButtons = isRoot
    ? node.buttons
    : node.buttons.filter((b) => b.goesTo.type !== "lifeline");

  const hasLifelineFooter =
    !isRoot && node.buttons.every((b) => b.goesTo.type !== "lifeline");

  return (
    <section aria-labelledby="tree-question" className="space-y-5">
      <h2
        id="tree-question"
        className="text-2xl sm:text-3xl font-bold text-team-blue-dark leading-tight"
      >
        {node.question}
      </h2>

      <ul className="space-y-3" role="list">
        {primaryButtons.map((button, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => go(button)}
              className={
                button.goesTo.type === "lifeline"
                  ? "w-full text-left px-4 py-4 rounded-lg border border-team-grey-light bg-team-grey-light/40 hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99] text-base sm:text-lg text-team-grey font-medium italic"
                  : "w-full text-left px-4 py-4 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99] text-base sm:text-lg text-team-blue-dark font-medium"
              }
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>

      {hasLifelineFooter && (
        <div className="pt-2 text-sm text-team-grey">
          <Link
            to="/t/common"
            className="underline underline-offset-2 hover:text-team-blue-dark"
          >
            Not what you saw? See the most common calls →
          </Link>
        </div>
      )}
    </section>
  );
}

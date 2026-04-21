import { useNavigate } from "react-router-dom";
import type { TreeNode as TreeNodeData } from "../data/tree";

type Props = { node: TreeNodeData };

export function TreeNode({ node }: Props) {
  const navigate = useNavigate();

  const go = (button: TreeNodeData["buttons"][number]) => {
    switch (button.goesTo.type) {
      case "node":
        navigate(`/t/${button.goesTo.nodeId}`);
        return;
      case "rule":
        navigate(`/r/${button.goesTo.ruleId}`);
        return;
      case "signal_grid":
        navigate(`/t/signals`);
        return;
    }
  };

  return (
    <section aria-labelledby="tree-question" className="space-y-5">
      <h2
        id="tree-question"
        className="text-2xl sm:text-3xl font-bold text-team-blue-dark leading-tight"
      >
        {node.question}
      </h2>

      <ul className="space-y-3" role="list">
        {node.buttons.map((button, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => go(button)}
              className="w-full text-left px-4 py-4 rounded-lg border border-team-grey-light bg-white hover:bg-team-blue-light hover:border-team-blue active:scale-[0.99] text-base sm:text-lg text-team-blue-dark font-medium"
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

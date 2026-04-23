import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ROOT_NODE_ID, tree } from "../data/tree";
import { TreeNode } from "../components/TreeNode";
import { BackButton, StartOverButton } from "../components/BackButton";
import { pushHistory } from "../lib/history";

export function TreePage() {
  const { nodeId } = useParams<{ nodeId?: string }>();
  const location = useLocation();
  const currentId = nodeId ?? ROOT_NODE_ID;
  const node = tree[currentId];

  useEffect(() => {
    pushHistory(location.pathname);
  }, [location.pathname]);

  if (!node) {
    return <Navigate to="/" replace />;
  }

  const isRoot = currentId === ROOT_NODE_ID;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-team-grey">
          Help me find what I saw
        </p>
        <p className="text-sm text-team-grey">
          Tap whichever option fits — we'll narrow it down.
        </p>
      </header>

      <TreeNode node={node} />

      <div className="flex flex-wrap gap-2 pt-2">
        {!isRoot && <BackButton />}
        {!isRoot && <StartOverButton label="Start finder over" to="/t/root" />}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        >
          ← Back to rule cards
        </Link>
      </div>
    </div>
  );
}

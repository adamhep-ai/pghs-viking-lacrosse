import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { ROOT_NODE_ID, tree } from "../data/tree";
import { TreeNode } from "../components/TreeNode";
import { BackButton, StartOverButton } from "../components/BackButton";
import { pushHistory, readHistory } from "../lib/history";

export function TreePage() {
  const { nodeId } = useParams<{ nodeId?: string }>();
  const location = useLocation();
  const currentId = nodeId ?? ROOT_NODE_ID;
  const node = tree[currentId];

  // Capture the previous tree node's question for a breadcrumb line.
  // We read history BEFORE pushHistory fires (via useEffect), which is why
  // the last entry in the stack at render time is the PREVIOUS page.
  const [breadcrumb, setBreadcrumb] = useState<string | null>(null);

  useEffect(() => {
    const h = readHistory();
    const lastPath = h.length > 0 ? h[h.length - 1] : null;
    if (lastPath && lastPath !== location.pathname && lastPath.startsWith("/t/")) {
      const lastNodeId = lastPath.slice("/t/".length);
      const prevNode = tree[lastNodeId];
      setBreadcrumb(prevNode ? prevNode.question : null);
    } else {
      setBreadcrumb(null);
    }
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
        {breadcrumb && (
          <p className="text-sm text-team-grey">
            <span aria-hidden>↑</span>{" "}
            <span className="italic">{breadcrumb}</span>
          </p>
        )}
      </header>

      <TreeNode node={node} />

      {!isRoot && (
        <div className="flex flex-wrap gap-2 pt-2">
          <BackButton />
          <StartOverButton label="Start finder over" to="/t/root" />
        </div>
      )}
    </div>
  );
}

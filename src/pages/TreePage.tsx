import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ROOT_NODE_ID, tree } from "../data/tree";
import { TreeNode } from "../components/TreeNode";
import { BackButton, StartOverButton } from "../components/BackButton";
import { pushHistory } from "../lib/history";
import { TEAM_NAME } from "../config";

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
      {isRoot && <Hero />}

      <TreeNode node={node} />

      <div className="flex flex-wrap gap-2 pt-2">
        {!isRoot && <BackButton />}
        {!isRoot && <StartOverButton />}
        <Link
          to="/rules"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-team-grey hover:text-team-blue-dark hover:bg-team-grey-light"
        >
          Browse all rules →
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center text-center pt-4 pb-2">
      <img
        src="/viking-badge.svg"
        alt={`${TEAM_NAME} logo`}
        className="h-24 w-24 mb-3"
        width={96}
        height={96}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-team-blue-dark leading-tight">
        What did the ref just call?
      </h1>
      <p className="mt-2 text-team-grey max-w-md">
        Tap what you saw. We'll get you to an answer.
      </p>
    </div>
  );
}

// Smoke test — run with `npm run smoke`.
//
// Validates:
//   1. Every TreeButton with goesTo.type === "rule" has a matching Rule.id.
//   2. Every TreeButton with goesTo.type === "node" points to a real tree node.
//   3. Every Rule.signal (when set) is a valid SignalName rendered by SignalSvg.
//   4. Every Rule.relatedRuleIds entry points to a real rule.

import { rules } from "../src/data/rules";
import { tree } from "../src/data/tree";

const errors: string[] = [];
const ruleIds = new Set(rules.map((r) => r.id));
const nodeIds = new Set(Object.keys(tree));

for (const node of Object.values(tree)) {
  for (const button of node.buttons) {
    if (button.goesTo.type === "rule") {
      if (!ruleIds.has(button.goesTo.ruleId)) {
        errors.push(
          `Tree node "${node.id}" → button "${button.label}" references missing rule "${button.goesTo.ruleId}"`
        );
      }
    }
    if (button.goesTo.type === "node") {
      if (!nodeIds.has(button.goesTo.nodeId)) {
        errors.push(
          `Tree node "${node.id}" → button "${button.label}" references missing node "${button.goesTo.nodeId}"`
        );
      }
    }
  }
}

for (const rule of rules) {
  for (const id of rule.relatedRuleIds ?? []) {
    if (!ruleIds.has(id)) {
      errors.push(`Rule "${rule.id}" relatedRuleIds contains missing rule "${id}"`);
    }
  }
}

// Every Rule.signal must be a SignalName we actually render. We derive the
// valid set by reading the SignalSvg source and matching the switch cases.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const svgSrc = readFileSync(resolve(here, "../src/components/SignalSvg.tsx"), "utf8");
const renderedSignals = new Set(
  Array.from(svgSrc.matchAll(/case "([a-z_]+)":/g)).map((m) => m[1])
);

for (const rule of rules) {
  if (rule.signal && !renderedSignals.has(rule.signal)) {
    errors.push(
      `Rule "${rule.id}" uses signal "${rule.signal}" but SignalSvg has no case for it`
    );
  }
}

if (errors.length > 0) {
  console.error(`\nFAIL — ${errors.length} issue(s):\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `OK — ${rules.length} rules, ${nodeIds.size} tree nodes, ${renderedSignals.size} signals rendered. All references resolve.`
);

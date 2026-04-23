// Smoke test — run with `npm run smoke`.
//
// Validates:
//   1. Every TreeButton with goesTo.type === "rule" has a matching Rule.id.
//   2. Every TreeButton with goesTo.type === "node" points to a real tree node.
//   3. Every Rule.relatedRuleIds entry points to a real rule.
//   4. Every Rule with feature set uses an allowed value.

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
  if (rule.feature && rule.feature !== "big_picture" && rule.feature !== "common_confusion") {
    errors.push(`Rule "${rule.id}" has invalid feature value "${rule.feature}"`);
  }
}

const bigPictureCount = rules.filter((r) => r.feature === "big_picture").length;
const commonConfusionCount = rules.filter((r) => r.feature === "common_confusion").length;

if (errors.length > 0) {
  console.error(`\nFAIL — ${errors.length} issue(s):\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `OK — ${rules.length} rules (${bigPictureCount} big-picture, ${commonConfusionCount} common-confusion), ${nodeIds.size} tree nodes. All references resolve.`
);

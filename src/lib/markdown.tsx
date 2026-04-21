import { Link } from "react-router-dom";
import { Fragment, type ReactNode } from "react";

// Tiny markdown renderer for basics body strings.
// Supports: paragraphs, unordered lists ("- "), **bold**, [label](url).
// Links: /r/<ruleId> and in-page anchors render as client-side <Link>;
// everything else is a plain <a>.

export function renderMarkdown(source: string): ReactNode {
  const blocks = source.split(/\n\s*\n/);
  return blocks.map((block, i) => renderBlock(block.trim(), i));
}

function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("- ")) {
    const items = block.split(/\n(?=- )/).map((line) => line.replace(/^- /, ""));
    return (
      <ul key={key} className="list-disc pl-5 space-y-1 text-gray-900">
        {items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={key} className="text-gray-900 leading-relaxed">
      {renderInline(block)}
    </p>
  );
}

// Split inline text on a single regex that captures links and bold.
const INLINE_RE = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

function renderInline(text: string): ReactNode {
  const parts = text.split(INLINE_RE);
  return parts.map((part, i) => {
    if (!part) return null;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link
            key={i}
            to={href}
            className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-team-blue hover:text-team-blue-dark underline underline-offset-2"
        >
          {label}
        </a>
      );
    }

    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return <strong key={i}>{bold[1]}</strong>;
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}

// Session history stack for the "← Back" button.
//
// Tree nodes are reached from multiple parents (e.g. penalty_by_action is
// linked from three different branches). A static parentId can't represent
// that, so we track visit order in sessionStorage instead.

const KEY = "lax-nav-history";

function read(): string[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function readHistory(): readonly string[] {
  return read();
}

function write(h: string[]) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(h));
  } catch {
    // sessionStorage can fail in private-browsing mode; history is best-effort.
  }
}

export function pushHistory(path: string) {
  const h = read();
  if (h[h.length - 1] !== path) {
    h.push(path);
    write(h);
  }
}

// Returns the previous path (or null if none), popping the current entry.
export function popHistory(): string | null {
  const h = read();
  h.pop(); // drop the current path
  const prev = h.length > 0 ? h[h.length - 1] : null;
  write(h);
  return prev;
}

export function clearHistory() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // best-effort
  }
}

export function peekPrevious(): string | null {
  const h = read();
  return h.length >= 2 ? h[h.length - 2] : null;
}

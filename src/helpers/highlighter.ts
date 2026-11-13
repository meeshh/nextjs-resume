const HIGHLIGHT_NAME = 'skill-match';
const SKIPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA']);

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const supportsHighlights = () =>
  typeof CSS !== 'undefined' && 'highlights' in CSS;

/**
 * Highlights every occurrence of `words` inside `root` using the CSS Custom
 * Highlight API. Unlike wrapping matches in `<mark>` elements this never
 * mutates the DOM, so React stays in control of its nodes and repeated runs
 * don't accumulate wrapper elements.
 */
export function highlightWords(words: string[], root: Node = document.body) {
  clearHighlights();
  if (!supportsHighlights()) return 0;

  const terms = words.map((word) => word.trim()).filter(Boolean);
  if (!terms.length) return 0;

  // longest first so "Node.js" wins over "Node"; lookarounds act as \b that also works next to "." or "+"
  const pattern = new RegExp(
    `(?<![\\w])(?:${terms
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join('|')})(?![\\w])`,
    'gi',
  );

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement && !SKIPPED_TAGS.has(node.parentElement.tagName)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });

  const ranges: Range[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    for (const match of (node.nodeValue ?? '').matchAll(pattern)) {
      const range = new Range();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      ranges.push(range);
    }
  }

  CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges));
  return ranges.length;
}

export function clearHighlights() {
  if (supportsHighlights()) CSS.highlights.delete(HIGHLIGHT_NAME);
}

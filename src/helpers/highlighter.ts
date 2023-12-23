// @ts-nocheck
export function highlightWords(words: string[]): void {
  // Remove existing highlights
  removeHighlights();

  const textNodes = getAllTextNodes(document.body);

  textNodes.forEach((textNode: Text) => {
    let modifiedText = textNode.nodeValue || '';

    words.forEach((word: string) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi'); // Capture the word in a group, case-insensitive
      modifiedText = modifiedText.replace(regex, (match: string, capturedWord: string) => {
        // Use the captured word to preserve its case
        return `<mark>${capturedWord}</mark>`;
      });
    });

    if (textNode.nodeValue !== modifiedText) {
      const span = document.createElement('span');
      span.innerHTML = modifiedText;
      textNode.replaceWith(span);
    }
  });
}

// Helper function to get all text nodes in a given element
function getAllTextNodes(element: Node): Text[] {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  return textNodes;
}

// Helper function to remove existing highlights
function removeHighlights() {
  const markElements = document.querySelectorAll('mark');
  markElements.forEach((markElement) => {
    const parentNode = markElement.parentNode;
    parentNode.replaceChild(
      document.createTextNode(markElement.textContent),
      markElement,
    );
  });
}

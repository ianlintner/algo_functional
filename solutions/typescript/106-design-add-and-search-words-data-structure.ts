/**
 * Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
 * Difficulty: Med
 * Language: TypeScript
 */
type WNode = { children: Record<string, WNode>; end: boolean };
const newWNode = (): WNode => ({ children: {}, end: false });
const addWord = (node: WNode, word: string): WNode =>
  word.length === 0
    ? { ...node, end: true }
    : { ...node, children: {
        ...node.children,
        [word[0]]: addWord(node.children[word[0]] || newWNode(), word.slice(1))
      }};
const searchWord = (node: WNode, word: string): boolean =>
  word.length === 0 ? node.end
    : word[0] === '.'
      ? Object.values(node.children).some(c => searchWord(c, word.slice(1)))
      : word[0] in node.children && searchWord(node.children[word[0]], word.slice(1));

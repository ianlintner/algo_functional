/**
 * Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
 * Difficulty: Med
 * Language: TypeScript
 */
type TrieNode = { children: Record<string, TrieNode>; end: boolean };
const emptyTrie = (): TrieNode => ({ children: {}, end: false });
const trieInsert = (node: TrieNode, word: string): TrieNode =>
  word.length === 0
    ? { ...node, end: true }
    : { ...node, children: {
        ...node.children,
        [word[0]]: trieInsert(node.children[word[0]] || emptyTrie(), word.slice(1))
      }};
const trieSearch = (node: TrieNode, word: string): boolean =>
  word.length === 0 ? node.end
    : word[0] in node.children && trieSearch(node.children[word[0]], word.slice(1));
const startsWith = (node: TrieNode, prefix: string): boolean =>
  prefix.length === 0 || (prefix[0] in node.children &&
    startsWith(node.children[prefix[0]], prefix.slice(1)));

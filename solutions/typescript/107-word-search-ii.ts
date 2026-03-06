/**
 * Problem 107: Word Search II (LeetCode 212)
 * Difficulty: Hard
 * Language: TypeScript
 */
function findWords(board: string[][], words: string[]): string[] {
  type TN = { children: Record<string, TN>; word: string | null };
  const empty = (): TN => ({ children: {}, word: null });
  const ins = (node: TN, w: string, i: number): TN =>
    i === w.length ? { ...node, word: w }
      : { ...node, children: { ...node.children,
          [w[i]]: ins(node.children[w[i]] || empty(), w, i + 1) }};
  const trie = words.reduce((t, w) => ins(t, w, 0), empty());
  const rows = board.length, cols = board[0].length;
  const dfs = (r: number, c: number, node: TN, seen: Set<string>,
               found: Set<string>): Set<string> => {
    const key = r + ',' + c;
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen.has(key)) return found;
    const ch = board[r][c];
    if (!(ch in node.children)) return found;
    const next = node.children[ch];
    const f = next.word ? new Set([...found, next.word]) : found;
    const s = new Set([...seen, key]);
    return [[-1,0],[1,0],[0,-1],[0,1]].reduce(
      (acc, [dr, dc]) => dfs(r+dr, c+dc, next, s, acc), f);
  };
  const result = Array.from({ length: rows * cols }).reduce<Set<string>>(
    (f, _, idx) => dfs(Math.floor(idx/cols), idx%cols, trie, new Set(), f),
    new Set());
  return [...result];
}

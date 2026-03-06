/**
 * Problem 76: Word Ladder (LeetCode 127)
 * Difficulty: Hard
 * Language: TypeScript
 */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const neighbors = (w: string): string[] =>
    [...w].flatMap((_, i) =>
      'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== w[i])
        .map(c => w.slice(0, i) + c + w.slice(i + 1))
    ).filter(nw => dict.has(nw));
  const bfs = (queue: [string, number][], visited: Set<string>): number => {
    if (queue.length === 0) return 0;
    const [word, depth] = queue[0];
    if (word === endWord) return depth;
    const rest = queue.slice(1);
    const nexts = neighbors(word).filter(w => !visited.has(w));
    const newVis = new Set([...visited, ...nexts]);
    return bfs([...rest, ...nexts.map(w => [w, depth + 1] as [string, number])], newVis);
  };
  return bfs([[beginWord, 1]], new Set([beginWord]));
}

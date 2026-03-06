/**
 * Problem 130: Alien Dictionary (LeetCode 269)
 * Difficulty: Hard
 * Language: TypeScript
 */
function alienOrder(words: string[]): string {
  const chars = new Set(words.join(''));
  const graph = new Map<string, Set<string>>();
  const inDeg = new Map<string, number>();
  chars.forEach(c => { graph.set(c, new Set()); inDeg.set(c, 0); });
  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i + 1]];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j])!.has(w2[j])) {
          graph.get(w1[j])!.add(w2[j]);
          inDeg.set(w2[j], (inDeg.get(w2[j]) || 0) + 1);
        }
        break;
      }
    }
  }
  const topoSort = (queue: string[], result: string[]): string[] => {
    if (queue.length === 0) return result;
    const [c, ...rest] = queue;
    const newResult = [...result, c];
    const neighbors = [...(graph.get(c) || [])];
    const newQueue = neighbors.reduce((q, n) => {
      inDeg.set(n, (inDeg.get(n) || 0) - 1);
      return inDeg.get(n) === 0 ? [...q, n] : q;
    }, rest);
    return topoSort(newQueue, newResult);
  };
  const start = [...inDeg.entries()].filter(([, d]) => d === 0).map(([c]) => c);
  const result = topoSort(start, []);
  return result.length === chars.size ? result.join('') : '';
}

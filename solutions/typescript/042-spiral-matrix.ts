/**
 * Problem 42: Spiral Matrix (LeetCode 54)
 * Difficulty: Med
 * Language: TypeScript
 */
function spiralOrder(matrix: number[][]): number[] {
  const spiral = (
    m: number[][]
  ): number[] =>
    m.length === 0
      ? []
      : [
          ...m[0],
          ...spiral(
            m.slice(1).map(r => r.reverse()).reverse()
                .map(r => r.reverse())
          ),
        ];
  // Functional peel: take top row, rotate rest
  const rotate = (m: number[][]): number[][] =>
    m[0]?.map((_, i) => m.map(r => r[i]).reverse()) ?? [];
  const go = (m: number[][]): number[] =>
    m.length === 0 ? [] : [...m[0], ...go(rotate(m.slice(1)))];
  return go(matrix);
}

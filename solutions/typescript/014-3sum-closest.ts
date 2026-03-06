/**
 * Problem 14: 3Sum Closest (LeetCode 16)
 * Difficulty: Med
 * Language: TypeScript
 */
function threeSumClosest(nums: number[], target: number): number {
  const sorted = [...nums].sort((a, b) => a - b);

  const search = (i: number, l: number, r: number, closest: number): number => {
    if (l >= r) return closest;
    const sum = sorted[i] + sorted[l] + sorted[r];
    const better = Math.abs(sum - target) < Math.abs(closest - target) ? sum : closest;
    if (sum < target) return search(i, l + 1, r, better);
    if (sum > target) return search(i, l, r - 1, better);
    return sum;
  };

  return sorted.reduce((closest, _, i) =>
    search(i, i + 1, sorted.length - 1, closest),
    Infinity
  );
}

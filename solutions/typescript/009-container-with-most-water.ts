/**
 * Problem 9: Container With Most Water (LeetCode 11)
 * Difficulty: Med
 * Language: TypeScript
 */
function maxArea(height: number[]): number {
  const solve = (left: number, right: number, best: number): number => {
    if (left >= right) return best;
    const area = Math.min(height[left], height[right]) * (right - left);
    const newBest = Math.max(best, area);
    return height[left] < height[right]
      ? solve(left + 1, right, newBest)
      : solve(left, right - 1, newBest);
  };
  return solve(0, height.length - 1, 0);
}

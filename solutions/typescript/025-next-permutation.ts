/**
 * Problem 25: Next Permutation (LeetCode 31)
 * Difficulty: Med
 * Language: TypeScript
 */
function nextPermutation(nums: number[]): void {
  const n = nums.length;

  // Find rightmost pair where nums[i] < nums[i+1]
  const i = [...Array(n - 1).keys()].reverse().find(i => nums[i] < nums[i + 1]);

  if (i === undefined) {
    nums.reverse();
    return;
  }

  // Find rightmost element > nums[i]
  const j = [...Array(n).keys()].reverse().find(j => nums[j] > nums[i])!;

  // Swap
  [nums[i], nums[j]] = [nums[j], nums[i]];

  // Reverse suffix after i
  const suffix = nums.splice(i + 1).reverse();
  nums.push(...suffix);
}
